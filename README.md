_Slider jQuery Plugin_

This is a barebones jQuery slider plugin, for those who don't want to go through the trouble of loading the entire jQuery UI framework just for a slider.

This plugin is compatible with jQuery 1.3.2+. To get started, link to the stylesheet and script:

    <link rel="stylesheet" type="text/css" href="slider.css" />
    <script type="text/javascript" src="jquery-1.3.2.min.js"></script>
    <script type="text/javascript" src="slider.js"></script>

The HTML markup is very simple:

    <div class="slider">
        <div class="handle"></div>
    </div>

The plugin is initialized by calling $.fn.slider on a jQuery collection:

    $('.slider').slider();

That's it!