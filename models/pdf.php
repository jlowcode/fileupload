<?php
/**
 * Fileupload adaptor to render uploaded PDFs
 *
 * @package     Joomla.Plugin
 * @subpackage  Fabrik.element.fileupload
 * @copyright   Copyright (C) 2005-2016  Media A-Team, Inc. - All rights reserved.
 * @license     GNU/GPL http://www.gnu.org/copyleft/gpl.html
 */

// No direct access
defined('_JEXEC') or die('Restricted access');

/**
 * Fileupload adaptor to render uploaded PDFs
 *
 * @package     Joomla.Plugin
 * @subpackage  Fabrik.element.fileupload
 * @since       3.0
 */
class PdfRenderModel
{
    /**
     * Render output
     *
     * @var  string
     */
    public $output = '';

    /**
     * File extension for PDF thumbnails
     *
     * @var  string
     */
    protected $pdf_thumb_type = 'png';

    /**
     * Is the element in a list view
     *
     * @var  bool
     */
    protected $inTableView = false;

    /**
     * When in form or detailed view, do we want to show the full image or thumbnail/link?
     *
     * @param   object &$model  Element model
     * @param   object &$params Element params
     * @param   string $file    Element's data
     *
     * @return bool
     */

    private function getThumbnail(&$model, &$params, $file)
    {
        if ($this->inTableView || ($params->get('make_thumbnail') == '1' && $params->get('fu_show_image') == 1))
        {
            if (!$params->get('make_thumbnail', false))
            {
                return false;
            }
            else
            {
                $thumb_url      = $model->getStorage()->_getThumb($file);
                $thumb_file     = $model->getStorage()->urlToPath($thumb_url);
                $thumb_url_info = pathinfo($thumb_url);

                if (JString::strtolower($thumb_url_info['extension'] == 'pdf'))
                {
                    $thumb_url       = $thumb_url_info['dirname'] . '/' . $thumb_url_info['filename'] . '.' . $this->pdf_thumb_type;
                    $thumb_file_info = pathinfo($thumb_file);
                    $thumb_file      = $thumb_file_info['dirname'] . '/' . $thumb_file_info['filename'] . '.' . $this->pdf_thumb_type;
                }

                if ($model->getStorage()->exists($thumb_file))
                {
                    return $thumb_url;
                }
                else
                {
                    // If file specific thumb doesn't exist, try the generic per-type image in media folder
                    $thumb_file = COM_FABRIK_BASE . 'media/com_fabrik/images/pdf.png';

                    if (JFile::exists($thumb_file))
                    {
                        //return thumb_url
                        return COM_FABRIK_LIVESITE . 'media/com_fabrik/images/pdf.png';
                    }
                    else
                    {
                        // Nope, nothing we can use as a thumb
                        return false;
                    }
                }
            }
        }

        return false;
    }

    /**
     * Render PDF in the list view
     *
     * @param   object &$model  Element model
     * @param   object &$params Element params
     * @param   string $file    Row data for this element
     * @param   object $thisRow All row's data
     *
     * @return  void
     */

    public function renderListData(&$model, &$params, $file, $thisRow)
    {
        $this->inTableView = true;
        $this->render($model, $params, $file, $thisRow->__pk_val);
    }

    /**
     * Render PDF in the form view
     *
     * @param   object &$model  Element model
     * @param   object &$params Element params
     * @param   string $file    Row data for this element
     *
     * @return  void
     */

    public function render(&$model, &$params, $file, $rowId = '')
    {
        jimport('joomla.filesystem.file');
        $layout      = $model->getLayout('pdf');
        $displayData = new stdClass;
        $filename    = basename($file);
        $fileNameToCaption = $file;
        $filename    = strip_tags($filename);
        $formModel   = $model->getFormModel();
        $input = JFactory::getApplication()->input;
        $inFormView = false;
        if ($formModel->data) {
            $inFormView = true;
        }

        $fileNameAux = $file;

        if (!strstr($file, 'http://') && !strstr($file, 'https://'))
        {
            // $$$rob only add in livesite if we don't already have a full url (e.g. from amazons3)
            // $$$ hugh trim / or \ off the start of $file
            $file = JString::ltrim($file, '/\\');
            $file = COM_FABRIK_LIVESITE . $file;
        }

        foreach($model->fullNames as $t){
            $table = explode("___", $t)[0];
            break;
        }

        $elementName = $model->element->name;
        $isAjax = (bool) $params->get('ajax_upload');

        if (!$rowId) {
            $rowId = $model->getFormModel()->getRowId();
        }

        $fileThumb = $this->getFileName($table, $fileNameAux, $elementName, $rowId, $isAjax);
        $fileThumb = str_replace('\\', '/', $fileThumb);
        $fileThumbName = end(explode('/', $fileThumb));
        $fileThumbName = str_replace('.pdf', '.png', $fileThumbName);

        $file                  = str_replace("\\", "/", $file);
        $file                  = $model->storage->preRenderPath($file);
        $displayData->file     = $file;
        $displayData->filename = $filename;
        $displayData->thumb    = $this->getThumbnail($model, $params, $file);
        $displayData->inFormView    = $inFormView;
        $displayData->simulate_context = (bool) $params->get('simulate_context');

        //Data necessary to make thumb from 1st page work (JP)
        $displayData->make_pdf_thumb = (bool) $params->get('fu_make_pdf_thumb');
        $displayData->path_thumb = COM_FABRIK_LIVESITE . $params->get('thumb_dir') . '/' . $fileThumbName;
        $displayData->name_thumb = $fileThumbName;
        $displayData->default_path = $params->get('default_image');
        $displayData->make_link = (bool) $params->get('make_link');

        if ($isAjax) {
            $displayData->caption = $this->getCaption($fileNameToCaption, $table, $model->element->name, $rowId);
        }

        $displayData->path_thumb_dir = $params->get('thumb_dir');

        $displayData->url_details = COM_FABRIK_LIVESITE . "index.php?option=com_fabrik&view=details&Itemid={$input->get('Itemid')}&formid={$formModel->getId()}&rowid={$rowId}&listid={$formModel->getListModel()->getId()}";

        $this->output = $layout->render($displayData);
    }

    /**
     * Build Carousel HTML
     *
     * @param   string $id      Widget HTML id
     * @param   array  $data    Images to add to the carousel
     * @param   object $model   Element model
     * @param   object $params  Element params
     * @param   object $thisRow All rows data
     *
     * @return  string  HTML
     */

    public function renderCarousel($id = 'carousel', $data = array(), $model = null, $params = null, $thisRow = null)
    {
        $rendered = '';

        foreach ($data as $file) {
            $this->renderListData($model, $params, $file, $thisRow);
        }

        return $this->output;
    }

    public function getFileName($table, $file, $elementName, $rowId, $isAjax) {
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        if ($isAjax) {
            $query->select($elementName)->from($table . '_repeat_' . $elementName)->where('parent_id = ' . (int)$rowId . ' AND ' . $elementName . ' = "' . $db->escape($file) . '"');
        }
        else {
            $query->select($elementName)->from($table)->where('id = ' . (int)$rowId);
        }

        $db->setQuery($query);

        return $db->loadResult();
    }

    public function getCaption ($file, $table, $elementName, $rowId) {
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select('params')->from($table . '_repeat_' . $elementName)->where($elementName . ' = "' . $db->escape($file) . '" AND parent_id = ' . (int)$rowId);
        $db->setQuery($query);
        $result = $db->loadResult();

        $caption = '';
        if ($result) {
            $result = json_decode($result);
            if ($result->caption) {
                $caption = $result->caption;
            }
        }

        return $caption;
    }
}
