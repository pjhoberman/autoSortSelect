(function($) {

    $.fn.autoSortSelect = function(options, method) {
        var defaults = {
            DATAZ: [],                  // the data
            name:'name',                // the key in DATAZ where the text to sort on rests
            id:'id',                    // the key in DATAZ where the id for each element rests
            id_prefix:'',               // what to prefix the element ids. defaults to the input id, then 'autoSelectSort'
            input_css:{},               // css to apply to the input. not necessary, but keeps things local
            select_css:{},              // css to apply to the select
            data_attr:'autosortselect'  // data-attr of input when you choose an item
        }

        var settings = {}

        var methods = {

            init : function(options) {
                settings = $.extend({}, defaults, options)
                
                return this.each(function() {
                    var
                        $element = $(this),
                        element = this,
                        id_prefix = 
                            settings.id_prefix == '' ? 
                                $element.attr('id') == ''? 'autoSelectSort_' : $element.attr('id')
                                + '_' : settings.id_prefix;
                    
                    // input css
                    $element.css(settings.input_css);
                    
                    // bind the list item click
                    $( '#' + id_prefix + 'suggest li' ).live('click', function(){
                        var value = $(this).attr('id').replace(id_prefix,'');
                        $element
                            .val( $(this).text() )
                            .data('selected_option',value)
                            .attr('data-' + settings.data_attr,value);
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
                        $suggest.css(settings.select_css);
                        
                        $suggest.empty().hide(); // cleanup
                        
                        _.each(settings.DATAZ, function(d){     // loop through our data
                            d.score = d[settings.name].score(val);        // score it based on user input
                            suggestions.push(d);                // add it to our suggestions
                        });
                        
                        // don't want any losers:
                        best = _.reject(suggestions, function(s){ return s.score === 0; });
                        
                        if(best.length === 0) return; // bummer, no match
                        
                        // sort by each suggestion's score in descending order:
                        best = _.sortBy(best, function(s){ return -(s.score); });

                        // add the suggestions to our list:
                        _.each(best, function(d){
                            var id = typeof d[settings.id] != 'undefined' ? d[settings.id] : d[settings.name].replace(' ','_'),
                                $li = $('<li id="' + id_prefix + id + '">'+d[settings.name]+'</li>').data('info', element);
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
