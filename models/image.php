<?php
/**
 * Fileupload adaptor to render uploaded images
 *
 * @package     Joomla.Plugin
 * @subpackage  Fabrik.element.fileupload
 * @copyright   Copyright (C) 2005-2016  Media A-Team, Inc. - All rights reserved.
 * @license     GNU/GPL http://www.gnu.org/copyleft/gpl.html
 */

// No direct access
defined('_JEXEC') or die('Restricted access');

/**
 * Fileupload adaptor to render uploaded images
 *
 * @package     Joomla.Plugin
 * @subpackage  Fabrik.element.fileupload
 * @since       3.0
 */
class ImageRenderModel
{
	/**
	 * Render output
	 *
	 * @var  string
	 */
	public $output = '';

	/**
	 * In list view
	 *
	 * @var bool
	 */
	protected $inTableView = false;

	/**
	 * Render list data
	 *
	 * @param   object &$model  Element model
	 * @param   object &$params Element params
	 * @param   string $file    Row data for this element
	 * @param   object $thisRow All rows data
	 *
	 * @return  void
	 */

	public function renderListData(&$model, &$params, $file, $thisRow)
	{
		$this->inTableView = true;
		$this->render($model, $params, $file, $thisRow);
	}

	/**
	 * Render uploaded image
	 *
	 * @param   object &$model  Element model
	 * @param   object &$params Element params
	 * @param   string $file    Row data for this element
	 * @param   object $thisRow All row's data
	 *
	 * @return  void
	 */

	public function render(&$model, &$params, $file, $thisRow = null, $view = 'list')
	{
		/*
		 * $$$ hugh - added this hack to let people use elementname__title as a title element
		 * for the image, to show in the lightbox popup.
		 * So we have to work out if we're being called from a table or form
		 */
		$formModel = $model->getFormModel();
		$input = JFactory::getApplication()->input;
		$listModel = $model->getListModel();
		$title     = basename($file);
		$table = $listModel->getTable()->db_table_name . '_repeat_' . $model->element->name;
        $rowId = $formModel->getRowId();
        $fileNameToCaption = $file;
        $inFormView = false;
        if ($formModel->data) {
            $inFormView = true;
        }

		if ($params->get('fu_title_element') == '')
		{
			$title_name = $model->getFullName(true, false) . '__title';
		}
		else
		{
			$title_name = str_replace('.', '___', $params->get('fu_title_element'));
		}

		if ($this->inTableView)
		{
			if (array_key_exists($title_name, $thisRow))
			{
				$title = $thisRow->$title_name;
			}
		}
		else
		{
			if (is_object($formModel))
			{
				if (is_array($formModel->data))
				{
					$title = FArrayHelper::getValue($formModel->data, $title_name, '');
				}
			}
		}

		$bits  = FabrikWorker::JSONtoData($title, true);
		$title = FArrayHelper::getValue($bits, $model->_repeatGroupCounter, $title);
		$title = htmlspecialchars(strip_tags($title, ENT_NOQUOTES));
		$file  = $model->getStorage()->getFileUrl($file);

		$fullSize = $file;

		if (!$this->fullImageInRecord($params))
		{
			if ($params->get('fileupload_crop'))
			{
				$file = $model->getStorage()->_getCropped($fullSize);
			}
			else
			{
				$file = $model->getStorage()->_getThumb($file);
			}
		}

		list($width, $height) = $this->imageDimensions($params);

		$file = $model->storage->preRenderPath($file);

		$n = $this->inTableView ? '' : $model->getElement()->name;

		if ($params->get('restrict_lightbox', 1) == 0)
		{
			$n = '';
		}

		$layout                     = $model->getLayout('image');
		$displayData                = new stdClass;
		$displayData->lightboxAttrs = FabrikHelperHTML::getLightboxAttributes($title, $n);
		$displayData->fullSize      = $model->storage->preRenderPath($fullSize);
		$displayData->file          = $file;
		$displayData->makeLink      = $params->get('make_link', true)
			//Necessary to comment this to make link to original file when the file is a thumb or a crop (JP) && $this->fullImageInRecord($params)
			&& $listModel->getOutPutFormat() !== 'feed';
		$displayData->title         = $title;
		$displayData->isJoin        = $model->isJoin();
		$displayData->width         = $width;
		$displayData->showImage     = $params->get('fu_show_image');
		$displayData->view = $input->get('view');
		$displayData->inListView    = $this->inTableView;
		$displayData->height        = $height;
		$displayData->isSlideShow   = ($this->inTableView && $params->get('fu_show_image_in_table', '0') == '2')
			|| (!$this->inTableView && !$formModel->isEditable() && $params->get('fu_show_image', '0') == '3');

		if ((bool) $params->get('ajax_upload')) {
            $displayData->caption = $this->getCaption($fileNameToCaption, $table, $model->element->name, $rowId);
        }

		$displayData->inFormView    = $inFormView;
        $displayData->force_view = (bool) $params->get('force_view');
		$displayData->elementName   = $model->element->name;

		$displayData->url_details = COM_FABRIK_LIVESITE . "index.php?option=com_fabrik&view=details&Itemid={$input->get('Itemid')}&formid={$formModel->getId()}&rowid={$thisRow->__pk_val}&listid={$listModel->getId()}";

		$displayData->default_image = $params->get('default_image', '#');

		$this->output = $layout->render($displayData);
	}

	/**
	 * Get the image width / height
	 *
	 * @param   JParameter $params Params
	 *
	 * @since   3.1rc2
	 *
	 * @return  array ($width, $height)
	 */
	private function imageDimensions($params)
	{
		$width  = $params->get('fu_main_max_width');
		$height = $params->get('fu_main_max_height');

		if (!$this->fullImageInRecord($params))
		{
			if ($params->get('fileupload_crop'))
			{
				$width  = $params->get('fileupload_crop_width');
				$height = $params->get('fileupload_crop_height');
			}
			else
			{
				$width  = $params->get('thumb_max_width');
				$height = $params->get('thumb_max_height');
			}
		}

		return array($width, $height);
	}

	/**
	 * When in form or detailed view, do we want to show the full image or thumbnail/link?
	 *
	 * @param   object &$params params
	 *
	 * @return  bool
	 */
	private function fullImageInRecord(&$params)
	{
		if ($this->inTableView)
		{
			return ($params->get('make_thumbnail') || $params->get('fileupload_crop')) ? false : true;
		}


		if (($params->get('make_thumbnail') || $params->get('fileupload_crop')) && $params->get('fu_show_image') == 1)
		{
			return false;
		}

		return true;
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
		$id .= '_carousel';
		$layout         = $model->getLayout('carousel');
		$layoutData     = new stdClass;
		$layoutData->id = $id;
		list($layoutData->width, $layoutData->height) = $this->imageDimensions($params);

		if (!empty($data))
		{
			$imgs = array();
			$i    = 0;

			$ordenacao = (bool) $params->get('upload_ordenacao');
			if ($ordenacao) {
                $db = JFactory::getDbo();
                $rowId = $model->getFormModel()->getRowId();
                $elementName = $model->element->name;
                $table = $model->getFormModel()->getTableName() . '_repeat_' . $elementName;
                $new_data = array();
                $without_ordenacao = array();
                foreach ($data as $item) {
                    $query = $db->getQuery(true);
                    $query->select('params')->from($table)->where("parent_id =  {$rowId} AND {$elementName} = '{$item}'");
                    $db->setQuery($query);
                    $result = $db->loadResult();
                    $result = json_decode($result);
                    $obj = new stdClass();
                    $obj->data = $item;
                    if ($result->ordenacao) {
                        $obj->ordenacao = $result->ordenacao;
                        $new_data[] = $obj;
                    }
                    else {
                        $without_ordenacao[] = $obj;
                    }
                }
                usort($new_data, function ($a, $b) {
                    if ((($a->ordenacao > $b->ordenacao)) || ((!$a->ordenacao) && ($b->ordenacao))) {
                        return 1;
                    }
                    if ((($a->ordenacao < $b->ordenacao)) || (($a->ordenacao) && (!$b->ordenacao))) {
                        return -1;
                    }
                    return 0;
                    /*if(($a->ordenacao == $b->ordenacao) || ((!$a->ordenacao) && (!$b->ordenacao))) return 0;
                    return ((($a->ordenacao < $b->ordenacao) || (($a->ordenacao) && (!$b->ordenacao))) ? -1 : 1 );*/
                });

                $new_data = array_merge($new_data, $without_ordenacao);

                foreach ($new_data as $item) {
                    $model->_repeatGroupCounter = $i++;
                    $this->renderListData($model, $params, $item->data, $thisRow);
                    $imgs[] = $this->output;
                }
            }
            else {
                foreach ($data as $img) {
                    $model->_repeatGroupCounter = $i++;
                    $this->renderListData($model, $params, $img, $thisRow);
                    $imgs[] = $this->output;
                }
            }

			if (count($imgs) == 1)
			{
				return $imgs[0];
			}
		}

		$layoutData->imgs = $imgs;

		return $layout->render($layoutData);
	}

	public function getCaption ($file, $table, $elementName, $rowId) {
	    $db = JFactory::getDbo();
	    $query = $db->getQuery(true);
	    $query->select('params')->from($table)->where($elementName . ' = "' . $db->escape($file) . '" AND parent_id = ' . (int)$rowId);
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
