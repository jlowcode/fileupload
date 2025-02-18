<?php
defined('JPATH_BASE') or die;

$d      = $displayData;
?>

<?php if ($d->nav) : ?>
<div id="<?php echo $d->id;?>"
     class="slickCarousel"
     data-slick='{"slidesToShow": 1, "slidesToScroll": 1, "arrows": true, "fade": true, "pauseOnHover": true, "pauseOnFocus": true, "mobileFirst": true, "adaptiveHeight": true, "swipe": true}'
>
    <?php foreach ($d->imgs as $img) : ?>
    <div style="opacity: 0" class="slickCarouselImage"><h3><?php echo $img ?></h3></div>
    <?php endforeach; ?>
</div>

<!-- <div id="<?php /*echo $d->id . '_nav';?>"
     style="width:<?php echo $d->width;?>px"
     class="slickCarousel"
     data-slick='{"slidesToShow": 3, "slidesToScroll": 1, "dots": false, "centerMode": true, "focusOnSelect": true}'
>
	<?php foreach ($d->thumbs as $img) : ?>
        <div><h3><?php echo $img ?></h3></div>
	<?php endforeach;*/ ?>
</div>-->
<?php else : ?>
    <div style="height: <?php echo $d->height; ?>px; width: <?php echo $d->width; ?>px" id="<?php echo $d->id;?>"
         class="slickCarousel"
         data-slick='{"slidesToShow": 1, "slidesToScroll": 1, "dots": false, "centerMode": true, "adaptiveHeight":true}'
    >
		<?php foreach ($d->thumbs as $img) : ?>
            <div style="opacity: 0" class="slickCarouselImage"><h3><?php echo $img ?></h3></div>
		<?php endforeach; ?>
    </div>
<?php endif; ?>