(function($) {

    $.fn.autoSortSelect = function(options, method) {
        var defaults = {
            data: [],                   // the data
            name:'name',                // the key in data where the text to sort on rests
            id:'id',                    // the key in data where the id for each element rests
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
                    
                    // bind list events
                    helpers.bind_list_events($element, settings, id_prefix);
                    
                    // set up key commands
                    helpers.key_commands($element);
                    
                    var old_value = ''; // store the previous value
                    $element.bind('keyup focus', function(e){
                        // only do this whole thang if the value changed
                        if( $element.val() != old_value ){
                            old_value = $element.val();
                            
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
                            
                            _.each(settings.data, function(d){     // loop through our data
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
                            
                            $suggest
                                .show() // the big reveal
                                .children().each(function(){
                                    $( this ).attr('data-scroll-top',$(this).offset().top - $suggest.offset().top)
                                });
                        } // old val check
                    }); // the binding
                    
                }); // the each
            } // init

        } // methods

        var helpers = {

            // a private method to bind stuff and things
            bind_list_events: function(element, settings, id_prefix) {
                
                // bind the list item click
                $( '#' + id_prefix + 'suggest li' ).live('click', function(){

                    var value = $(this).attr('id').replace(id_prefix,'');
                    element
                        .val( $(this).text() )
                        .data('selected_option',value)
                        .attr('data-' + settings.data_attr,value);

                    $( '#' + id_prefix + 'suggest' ).slideUp();
                }); // live

            }, // bind_list_events
            
            key_commands: function($el){
                
                $el.keydown(function(e){
                    var suggestions = $el.next(),
                        height = suggestions.height(),
                        pressed = e.which,
                        height = suggestions.height(),
                        scrolled = suggestions.scrollTop(),
                        offset_top = suggestions.offset() ? suggestions.offset().top : 0; // was getting some null errors without the ternary
                            
                    if( $el.next().hasClass('suggest')){ // make sure the suggest box is there
                        if( pressed == 40 ){ // and that they pressed down
                            if( suggestions.children('.selected').length == 0 )
                                suggestions.children( 'li:first' ).addClass('selected');
                            
                            else
                                suggestions.children('.selected').removeClass('selected').next().addClass('selected');
                                
                        } // if
                        
                        else if( pressed == 38 ) { // up arrow
                            if( suggestions.children('.selected').length == 0 )
                                suggestions.children( 'li:last' ).addClass('selected');
                                
                            else
                                suggestions.children('.selected').removeClass('selected').prev().addClass('selected');
                        } // else if
                        
                        else if( pressed == 13 || pressed == 39 ){ // it's a trap! i mean, an enter! or a right arrow
                            if( suggestions.children('.selected').length != 0 )
                                suggestions.children('.selected').click().removeClass('selected');
                        } // else if
                        
                        
                        // smooth scrolling around the bend.
                        
                        var selected = suggestions.children('.selected'),
                            selected_scroll_top = selected.attr('data-scroll-top'),
                            selected_offset_top = selected.offset() ? selected.offset().top - offset_top : offset_top,
                            selected_height = selected.height();
                        
                        if( selected_scroll_top > suggestions.scrollTop() + height )
                            suggestions.scrollTop( selected_scroll_top - height + selected_height);
                        
                        else if( selected_offset_top  < 0)
                            suggestions.scrollTop( selected_scroll_top );                        

                    } // if
                }); // keyup
            } // key_commands

        } // helpers



        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in autoSortSelect plugin!');
        }

    }

})(jQuery);
