(function($) {

    $.fn.autoSortSelect = function(options, method) {
        var defaults = {
            DATAZ: [],
            css:{}
        }

        var settings = {}

        var methods = {

            init : function(options) {
                settings = $.extend({}, defaults, options)
                
                return this.each(function() {
                    var
                        $element = $(this),
                        element = this,
                        id_prefix = $element.attr('id') + '_';
                    
                    // bind the list item click
                    $( '#' + id_prefix + 'suggest li' ).live('click', function(){
                        $element.val( $(this).text() ).data('selected_option',$(this).attr('id'));
                        $( '#' + id_prefix + 'suggest' ).slideUp();
                    });
                        
                    $element.bind('keyup focus', function(){
                        var val = $element.val(),
                            suggestions = [],
                            best;
                            
                        if(val.length < 1) return; // no need if nothing is there
                        
                        if( ! $element.next().hasClass('suggest') )
                            $element.after('<div class="suggest" id="' + id_prefix + 'suggest"></div>');
                        
                        var $suggest = $element.next('.suggest');
                        
                        // apply css -- this needs to be moved out of binding, but suggest doesn't always exist...
                        $suggest.css(settings.css);
                        
                        $suggest.empty().hide(); // cleanup
                        
                        _.each(settings.DATAZ, function(d){     // loop through our data
                            d.score = d.name.score(val);        // score it based on user input
                            suggestions.push(d);                // add it to our suggestions
                        });
                        
                        // don't want any losers:
                        best = _.reject(suggestions, function(s){ return s.score === 0; });
                        
                        if(best.length === 0) return; // bummer, no match
                        
                        // sort by each suggestion's score in descending order:
                        best = _.sortBy(best, function(s){ return -(s.score); });

                        // add the suggestions to our list:
                        _.each(best, function(d){
                            var id = typeof d.id != 'undefined' ? d.id : d.name.replace(' ','_'),
                                $li = $('<li id="' + id_prefix + id + '">'+d.name+'</li>').data('info', element);
                            $suggest.append($li);
                        });
                        
                        $suggest.show(); // the big reveal
                    }); // the binding
                    
                }); // the each
            },

            foo_public_method: function() {
                // code goes here
            }

        }

        var helpers = {

            foo_private_method: function() {
                // code goes here
            }

        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in autoSortSelect plugin!');
        }

    }

})(jQuery);
