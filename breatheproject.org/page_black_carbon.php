<?php
//-------------------------------------------------------

//Template Name: About: page_black_carbon.php
update_option('current_page_template','page_black_carbon');

//-------------------------------------------------------
get_header();

$pods = new Pod('black_carbon_page_content');
$pods->findRecords('name ASC');

while ($pods->fetchRecord()) {
  $pod_video_id = $pods->get_field('video_vimeo_url');
  $pod_video_imageArray = $pods->get_field('video_image');
  $pod_video_image = $pod_video_imageArray[0]['guid'];

  $pod_video_label = $pods->get_field('video_label');
  $pod_video_link_label = strtoupper($pods->get_field('video_link_label'));

  $pod_hero_title = strtoupper($pods->get_field('hero_title'));
  $pod_hero_body = $pods->get_field('hero_body');

  $pod_coalition_title = strtoupper($pods->get_field('coalition_title'));
  $pod_coalition_body = $pods->get_field('coalition_body');
}
unset($pods)
?>

<script type='text/javascript'>
  var imagesDir  = "<?php bloginfo( 'template_url' ); ?>/images/";
</script>

<img id='navhash' style="top: 59px !important" src="<?php bloginfo( 'template_url' ); ?>/images/navhash.png" />
<div id='breathe-meter-top'>
  <div class="spacer15" style="height: 44px; line-height: 44px"></div>
  <section class="row" style="height: 100% !important">
    <div class="col-3" id="breathe-cam-container">
      <div class="content-block content-block-breathe-cam">
        <div class="gray-area gray-area-breathe-cam" style="padding: 0px !important">
          <iframe width="100%" height="100%" id="black-carbon" frameborder="0" allowfullscreen src="https://explorables.cmucreatelab.org/unreleased/black-carbon/index.html"></iframe>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </section>
</div>

<?php get_footer(); ?>
