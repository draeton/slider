/*!
 * Slider plugin
 *
 * This is a barebones jQuery slider plugin, for those who don't want to go
 * through the trouble of loading the entire jQuery UI framework just for a slider.
 *
 * @requires jQuery 1.3.2+
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Matthew Cobbs <matthew.cobbs@gmail.com>
 */
/*global jQuery */
(function ($, window) {

    var document = window.document; // save a reference to the document

    $.fn.leaseSlider = function (options) {
        var defaults = {
                'evNS': 'slider',               // event namespace
                'throttle': 100,                // throttle rate to updating position
                'handleSelect': '.handle',      // handle selector
                'unselectable': 'unselectable'  // unselectable class
            },
            settings = $.extend({}, defaults, options),
            dragInterval,
            clientX;

        return this.each(function (idx, element) {
            var $slider = $(element),
                sWidth = $slider.width(),
                sOffset = $slider.offset(),
                $handle = $slider.find(settings['handleSelect']),
                hWidth = $handle.width(),
                hOffset = $handle.offset(),
                lBound = Math.floor(sOffset.left + hWidth / 2),
                rBound = Math.floor(sOffset.left + sWidth - hWidth / 2),
                max = rBound - lBound;

            /**
             * set the slider position value as a fraction of the width
             *
             * @namespace $.fn.leaseSlider
             * @private
             */
            function updateValue() {
                var val;

                // update the handle offset for the new position
                hOffset = $handle.offset();

                // the value is the ratio of the x position to the max
                val = ((hOffset.left + hWidth / 2 - lBound) / (max));
                $slider.val(val);

                // trigger the update event for any listeners
                $slider.trigger('change.' + settings['evNS'], [val]);
            }

            /**
             * move the slider relative to the mouse position
             *
             * @param {Number} clientX - The mouse x position
             * @namespace $.fn.leaseSlider
             * @private
             */
            function updatePosition(clientX) {
                var pos = Math.floor(clientX - sOffset.left - hWidth / 2), pos2;

                // keep position within bounds
                pos2 = (pos > 0) ? (pos > max) ? max : pos : 0;

                // update the display position
                $handle.css('left', pos2 + 'px');

                // pass to update the value
                updateValue();
            }

            // set initial value
            updateValue();

            // bind handlers
            $handle.bind('mousedown.' + settings['evNS'], function (e) {
                e.preventDefault();

                // prevent selection in IE
                $slider.parents().bind('onselectstart.' + settings['evNS'] + ' ondragstart.' + settings['evNS'], function (e) {
                    return false;
                });

                // prevent selection in FF + Webkit
                $slider.parents().addClass(settings['unselectable']);

                // set an interval to throttle updates to handle
                dragInterval = setInterval(function () {
                    if (clientX) {
                        updatePosition(clientX);
                    }
                }, settings['throttle']);

                // bind mousemove to get clientx and y
                $(document).bind('mousemove.' + settings['evNS'], function (e) {
                    clientX = e.clientX;
                });

                // clear the interval on mouseup and unbind the handler
                $(document).bind('mouseup.' + settings['evNS'], function (e) {
                    clearInterval(dragInterval);

                    // unbind events
                    $(document).unbind('mouseup.' + settings['evNS']);
                    $(document).unbind('mousemove.' + settings['evNS']);
                    $slider.parents().unbind('onselectstart.' + settings['evNS'] + ' ondragstart.' + settings['evNS']);
                    $slider.parents().removeClass(settings['unselectable']);
                });
            });
        });
    };

}(jQuery, this));