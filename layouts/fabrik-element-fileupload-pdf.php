<?php

use Joomla\CMS\Filesystem\File;

defined('JPATH_BASE') or die;

$d   = $displayData;
$ext = File::getExt($d->filename);

$dfilename = explode(".", $d->file);
$exten = end($dfilename);
$aqvmin = mb_strimwidth(basename($d->file), 0, 20, "...");
$aqvmin = $aqvmin . $exten;

?>

<div style="vertical-align: middle;">

    <?php if(!$d->inFormView) : ?>
        <a href="<?php echo $d->file ?>" download="<?php echo $d->caption ?>" target="_blank">
    <?php else : ?>
        <a class="download-archive fabrik-filetype-<?php echo $ext ?>" title="<?php echo $d->caption ?>" href="<?php echo $d->file ?>" target='_blank'>
    <?php endif; ?>

    <?php if($d->make_pdf_thumb && $d->showImage != 0) : ?>
        <?php if(File::exists(JPATH_BASE . '/' . $d->path_thumb_dir . '/' . $d->name_thumb)) : ?>
            <img src="<?php echo $d->path_thumb; ?>" alt="<?php if ($d->caption) echo $d->caption; else echo $d->name_thumb; ?>"/>

        <?php elseif ((isset($d->thumb) && !empty($d->thumb))) : ?>
            <img src="<?php echo $d->thumb ?>" alt="<?php echo $d->fileName?>"/>

        <?php elseif (File::exists(JPATH_BASE . '/' . $d->default_path)) : ?>
            <img src="<?php echo COM_FABRIK_LIVESITE . $d->default_path;?>" alt="<?php if ($d->caption) echo $d->caption; else echo 'pdf'; ?>" />

        <?php else: ?>
            <img src="https://cdn3.iconfinder.com/data/icons/line-icons-set/128/1-02-512.png" alt="<?php if ($d->caption) echo $d->caption; else echo 'pdf'; ?>" style="height: 50px; width: 70px;" />
        <?php endif; ?>

    <?php else : ?>
        <span class="little-box-files" title='<?php echo $fileName ?>'><?php echo $aqvmin ?></span>
    <?php endif; ?>
    </a>
</div>