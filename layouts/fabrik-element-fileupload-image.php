<?php
defined('JPATH_BASE') or die;

$d      = $displayData;

// Id task: 212
if($d->fieldType == 1) {
    $d->extraField = '';
} else if($d->fieldType == 2){
    $d->caption = '';
}
// Id task: 212

$var = microtime();
$height = empty($d->height) ? '' : ' height="' . $d->height . 'px" ';
$img = '<img class="fabrikLightBoxImage" ' . $height . 'src="' . $d->file . '?' . $var . '" alt="' . $d->title . '" />';
$nolinkImg    = '<img class="fabrikLightBoxImage" ' . $height . 'src="' . $d->file . '?' . $var . '" alt="' . $d->title . '" title="' . $d->title . '" />';
if (($d->caption) && ($d->inFormView)) {
    $img = '<img class="fabrikLightBoxImage" ' . $height . 'src="' . $d->file . '?'. $var . '" alt="' . $d->caption . '" />';
    $nolinkImg    = '<img class="fabrikLightBoxImage" ' . $height . 'src="' . $d->file . '?'. $var . '" alt="' . $d->caption . '" title="' . $d->caption . '" />';
}

if ($d->showImage == 0 && !$d->inListView) :
    ?>
	<a href="<?php echo $d->fullSize; ?>"><?php echo basename($d->file);?></a>
<?php
else :
	if ($d->isSlideShow) :
		// We're building a Bootstrap slideshow, just a simple img tag
		?>
            <a href="<?php echo $d->fullSize;?>" target="_blank">
            <img height="100%" width="100%" object-fit="contain" src="<?php echo $d->fullSize; ?>?<?php echo $var;?>" alt="<?php if (($d->caption) && ($d->inFormView)) echo $d->caption; else echo $d->title; ?>" style="margin:auto"  />
            </a>
	<?php
	else :
		if ($d->isJoin) :
			?>
			<div class="fabrikGalleryImage"
			style="vertical-align: middle;text-align: center; margin-bottom: 30px;">
            <!--width:<?php //echo $d->width;?>px;height:<?php //echo $d->height;?>px;-->
        <?php
		endif;
		if ($d->view === 'list' && !$d->force_view) :
			?>
            <a href="<?php echo $d->url_details; ?>">
                <?php echo $nolinkImg;?>
            </a>
		<?php
        else :
            if (($d->view === 'details' || $d->force_view) && ($d->makeLink)) :
                ?>
                <!-- Id task: 212 -->
                <div><?php echo $d->extraField ?></div>
                <!-- Id task: 212 -->

                <a href="<?php echo $d->fullSize; ?>" title="<?php if (($d->caption) && ($d->inFormView)) echo $d->caption; else echo $d->title; ?>" <?php if ($d->inFormView) echo "data-lightbox={$d->elementName} "; echo $d->lightboxAttrs; ?>>
                <?php echo $img;?>
                </a>
            <?php
		    else :
                echo $nolinkImg;
		    endif;
		endif;
		if ($d->isJoin) : ?>
			</div>
		<?php
		endif;
	endif;
endif;
?>

<?php if ($d->view === 'details') {?>
<script>
    var existsCss = false, existsScript = false, a, b;

    var head = document.getElementsByTagName('head')[0],
        li = document.getElementsByTagName('link'),
        sc = document.getElementsByTagName('script');

    var path_css = '<?php echo COM_FABRIK_LIVESITE; ?>plugins/fabrik_element/fileupload/lib/lightbox/css/lightbox.css',
        path_js = '<?php echo COM_FABRIK_LIVESITE; ?>plugins/fabrik_element/fileupload/lib/lightbox/js/lightbox.js';

    for (var i=0; i<li.length; i++) {
        if (li[i].getAttribute('href') === path_css) {
            existsCss = true;
        }
    }
    for (i=0; i<sc.length; i++) {
        if (sc[i].getAttribute('src') === path_js) {
            existsScript = true;
        }
    }

    if (!existsCss) {
        a = document.createElement('link');
        a.setAttribute('href', path_css);
        a.setAttribute('rel', 'stylesheet');
        head.appendChild(a);
    }
    if (!existsScript) {
        b = document.createElement('script');
        b.setAttribute('src', path_js);
        head.appendChild(b);
    }

</script>
<?php }?>







