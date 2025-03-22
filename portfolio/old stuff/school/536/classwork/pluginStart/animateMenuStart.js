(function($) {

    // here it goes!
    $.fn.animateMenu = function(method) {

        // plugin's default options
        var defaults = {

            animatePadding: 60,
            defaultPadding: 10,
            evenColor: '#ccc',
            oddColor: '#eee'

        }
        
        var settings = {}

        var methods = {
            init : function(options) {
                
                settings = $.extend({}, defaults, options)

                // iterate through all the DOM elements we are attaching the plugin to
                return this.each(function() {
                        var obj = $( this );
                        $('li:even', obj)
                          .css('background-color', settings.evenColor);
                        $('li:odd', obj)
                          .css('background-color', settings.oddColor);
                          
                        var items = $('li', obj);
                        
                        items.mouseover(function(){
                            $(this).animate({
                            paddingLeft: settings.animatePadding
                            },
                            300
                            );  
                        })
                        .mouseout(function(){
                            $(this).animate({
                            paddingLeft: settings.defaultPadding
                            },
                            300
                            );  
                        });
                        
                        
                });

            },

            // a public method. for demonstration purposes only - remove it!
            foo_public_method: function(x) {
                console.log(this);
                
                $(this).on('mouseover', function(){
                    console.log(x.test)
                });
            }

        }

        var helpers = {

            foo_private_method: function() {


            }

        }

        // if a method as the given argument exists
        if (methods[method]) {

            // call the respective method
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        // if an object is given as method OR nothing is given as argument
        } else if (typeof method === 'object' || !method) {

            // call the initialization method
            return methods.init.apply(this, arguments);

        // otherwise
        } else {

            // trigger an error
            $.error( 'Method "' +  method + '" does not exist in pluginName plugin!');

        }

    }

})(jQuery);