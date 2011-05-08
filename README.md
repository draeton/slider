# Slider jQuery Plugin

This is a barebones jQuery slider plugin, for those who don't want to go through the trouble of loading the entire jQuery UI framework just for a slider.

## Install

This plugin is compatible with jQuery 1.3.2+. To get started, link to the stylesheet and script:

    <link rel="stylesheet" type="text/css" href="jquery.slider.css" />
    <script type="text/javascript" src="jquery-1.3.2.min.js"></script>
    <script type="text/javascript" src="jquery.slider.js"></script>

## Usage

The HTML markup is very simple:

    <div class="jquery-slider">
        <div class="handle"></div>
    </div>

The plugin is initialized by calling $.fn.slider on a jQuery collection:

    var options = {
        'evNS': 'slider',               // event namespace
        'throttle': 100,                // throttle rate to updating position
        'handleSelect': '.handle',      // handle selector
        'unselectable': 'unselectable'  // unselectable class
    };

    $('.jquery-slider').slider(options);

Those are the default settings.
