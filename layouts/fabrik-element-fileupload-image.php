<?php
defined('JPATH_BASE') or die;

$d      = $displayData;
$height = empty($d->height) ? '' : ' height="' . $d->height . 'px" ';
$alt = ($d->caption && $d->inFormView) ? $d->caption : $d->title;
$lightBox = $d->inFormView ? "data-lightbox={$d->elementName}" : "";

$img    = '<img class="fabrikLightBoxImage" ' . $height . 'src="' . $d->file . '" alt="' . $alt . '" />';
$nolinkImg    = '<img class="fabrikLightBoxImage" ' . $height . 'src="' . $d->file . '" alt="' . $alt . '" title="' . $alt . '" />';

$file = $d->file;
$fileName = basename($file);

$fileInfo = pathinfo($fileName);
$fileBaseName = $fileInfo['filename'];
$fileExtension = $fileInfo['extension'];
$maxLength = 12;

if (strlen($fileBaseName) > $maxLength) {
    $fileBaseName = substr($fileBaseName, 0, $maxLength) . '...';
}

$truncatedFileName = $fileBaseName . '.' . $fileExtension;
?>

<?php if ($d->showImage == 0 && !$d->inListView) : ?>
	<a class="little-box-files" href="<?php echo $d->fullSize; ?>" download><?php echo $truncatedFileName?></a>
<?php else : ?>
	<?php if ($d->isSlideShow) : ?>
			<!-- We're building a Bootstrap slideshow, just a simple img tag -->
			<img aspect-ratio="16/9" width="400px" object-fit="cover" object-fit="center" src="<?php echo $d->fullSize; ?>" alt="<?php echo $alt; ?>" style="margin:auto" />

	<?php else : ?>
			<?php if ($d->isJoin) : ?>
				<div class="fabrikGalleryImage" style="vertical-align: middle;text-align: center;">
			<?php endif; ?>

			<?php if ($d->makeLink) : ?>
				<a href="<?php echo $d->fullSize; ?>" <?php echo $d->lightboxAttrs;?> title="<?php echo $alt; ?>" <?php echo $lightBox ?>>
					<?php echo $img; ?>
				</a>
			<?php else :
					echo $nolinkImg;
				endif;
			?>

			<?php if ($d->isJoin) : ?>
				</div>
			<?php endif; ?>
	<?php endif; ?>
<?php endif; ?>