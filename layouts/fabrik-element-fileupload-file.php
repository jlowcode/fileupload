<?php
defined('JPATH_BASE') or die;

$d = $displayData;

// Id task: 212
if($d->fieldType == 1) {
    $d->extraField = '';
} else if($d->fieldType == 2){
    $d->caption = '';
}
// Id task: 212

// $$$ hugh - using 'make_thumbnail' to mean 'use default $ext.png as an icon
// instead of just putting the filename.

?>

<!-- Id task: 212 -->
<div style="vertical-align: middle;text-align: center; margin-bottom: 30px;">
	<div>
		<?php echo $d->extraField ?>
	</div>
<!-- Id task: 212 -->

<?php
if ($d->useThumb) :
	?>
	<a class="download-archive fabrik-filetype-<?php echo $d->ext;?>" title="<?php echo $d->file; ?>" href="<?php echo $d->file; ?>">
		<img src="<?php echo $d->thumb;?>" alt="<?php echo $d->filename; ?>">
	</a>
</div>
<?php
else :
	?>
	<a class="download-archive fabrik-filetype-<?php echo $d->ext;?>" title="<?php echo $d->file; ?>" href="<?php echo $d->file; ?>">
		<?php echo $d->filename; ?>
	</a>
</div>
<?php
endif;