<?php
defined('JPATH_BASE') or die;

$d = $displayData;

// $$$ hugh - using 'make_thumbnail' to mean 'use default $ext.png as an icon
// instead of just putting the filename.

?>

<?php
if ($d->useThumb) :
	?>
	<a class="download-archive fabrik-filetype-<?php echo $d->ext;?>" title="<?php echo $d->file; ?>" href="<?php echo $d->file; ?>">
		<img src="<?php echo $d->thumb;?>" alt="<?php echo $d->filename; ?>">
	</a>
<?php
else :
	?>
	<a class="download-archive fabrik-filetype-<?php echo $d->ext;?>" title="<?php echo $d->file; ?>" href="<?php echo $d->file; ?>">
		<?php 
		$dfilename = explode(".",$d->filename);
                $exten = end($dfilename);
                $aqvmin = mb_strimwidth($d->filename, 0, 10, "...");
                $aqvmin= $aqvmin . '.' . $exten;
		echo "<span style='background: #2d6a6b;color: #fff; font-size: 10px; display: inline-block; min-width: auto;  border-radius: 4px;text-align: center;padding: 0 3px'>$aqvmin</span>"; ?>
	</a>
<?php
endif;

