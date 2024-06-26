<?php
defined('JPATH_BASE') or die;

$d   = $displayData;
// Begin - Id task: 212
if($d->fieldType == 1) {
    $d->extraField = '';
} else if($d->fieldType == 2){
    $d->caption = '';
}
// End - Id task: 212

$ext = JFile::getExt($d->filename);
?>
    <?php

    echo "<div style=\"vertical-align: middle;text-align: center; margin-bottom: 30px;\">";

    if (!$d->inFormView && !$d->force_view) {
        echo "<a href='{$d->url_details}'>";
    }
    else {
        // Id task: 212
        echo "<div>" . $d->extraField . "</div>";
        echo "<a class=\"download-archive fabrik-filetype-{$ext}\" title=\"{$d->caption}\"
	href=\"{$d->file}\" target='_blank'>";
    }

    if ($d->make_pdf_thumb) {
        if (JFile::exists(JPATH_BASE . '/' . $d->path_thumb_dir . '/' . $d->name_thumb)) {
            ?>
            <img src="<?php echo $d->path_thumb; ?>" alt="<?php if ($d->caption) echo $d->caption; else echo $d->name_thumb; ?>"/>
            <?php
        }
        else if (JFile::exists(JPATH_BASE . '/' . $d->default_path)) {
            ?>
            <img src="<?php echo COM_FABRIK_LIVESITE . $d->default_path;?>" alt="<?php if ($d->caption) echo $d->caption; else echo 'pdf'; ?>" />
            <?php
        }
        else {
            ?>
            <img src="https://cdn3.iconfinder.com/data/icons/line-icons-set/128/1-02-512.png" alt="<?php if ($d->caption) echo $d->caption; else echo 'pdf'; ?>" style="height: 50px; width: 70px;" />
            <?php
        }
    }
    else {
        ?>
        <img src="https://cdn3.iconfinder.com/data/icons/line-icons-set/128/1-02-512.png" alt="pdf" style="height: 50px; width: 70px;" />
        <?php
    }

    echo "</div>";

    ?>
</a>
