<?php
defined('JPATH_BASE') or die;

$d      = $displayData;
$height = empty($d->height) ? '' : ' height="' . $d->height . 'px" ';
$alt = ($d->caption && $d->inFormView) ? $d->caption : $d->title;
$lightBox = $d->inFormView ? "data-lightbox={$d->elementName}" : "";

$classThumb = 'mode-img-card';
$img    = '<img class="fabrikLightBoxImage ' . $classThumb . '" src="' . $d->file . '" alt="' . $alt . '" />';
$nolinkImg    = '<img class="fabrikLightBoxImage ' . $classThumb . '" src="' . $d->file . '" alt="' . $alt . '" title="' . $alt . '" />';

$dfilename = explode(".", $d->file);
$exten = end($dfilename);
$aqvmin = mb_strimwidth(basename($d->file), 0, 20, "...");
$aqvmin = $aqvmin . $exten;

?>

<?php if ($d->showImage == 0 && !$d->inListView) : ?>
	<a class="little-box-files" href="<?php echo $d->fullSize; ?>" target="_blank"><?php echo $aqvmin?></a>
<?php else : ?>
	<?php if ($d->isSlideShow) : ?>
			<!-- We're building a Bootstrap slideshow, just a simple img tag -->
			<div class="div-<?php echo $classThumb; ?>">
				<img class="<?php echo $classThumb; ?>" src="<?php echo $d->fullSize; ?>" alt="<?php echo $alt; ?>"/>
			</div>
	<?php else : ?>
			<?php if ($d->isJoin) : ?>
				<div class="fabrikGalleryImage" style="vertical-align: middle;text-align: center;">
			<?php endif; ?>

			<?php if ($d->makeLink) : ?>
				<a class="<?php echo $classThumb; ?>" href="<?php echo $d->fullSize; ?>" <?php echo $d->lightboxAttrs;?> title="<?php echo $alt; ?>" <?php echo $lightBox ?>>
					<div class="div-<?php echo $classThumb; ?>">
						<?php echo $img; ?>
					</div>
				</a>
			<?php else : ?>
				<div class="div-<?php echo $classThumb; ?>">
					<?php echo $nolinkImg; ?>
				</div>
			<?php endif; ?>

			<?php if ($d->isJoin) : ?>
				</div>
			<?php endif; ?>
	<?php endif; ?>
<?php endif; ?>