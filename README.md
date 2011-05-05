## This plugin attaches a selectable list of sorted items to an input.

### Demo:
    http://jsfiddle.net/4eRx8/

### Dependencies:
    jQuery - http://jquery.com
    Underscore - http://documentcloud.github.com/underscore/
    String Score - https://github.com/joshaven/string_score
    
### Usage:
    $( selector ).autoSortSelect(options)
    Clicking on an item will set the text of the input to that item's text, set the input's .data('selected_option') to the resulting id, and set data-autosortselect to the id.
    
### Options:
    data - An array of JSON object. Each must have a key of 'name', unless otherwise specified
    name - The key in data where each item's text can be found
    id - The key in data to set each item's id to
    id_prefix - Each item gets an id of the input's id plus (if it exists, otherwise it is set to autoSortSelect) the selector's id. You can override the prefix here.
    input_css - CSS object (example: {color:'#000',height:100})
        I don't think this one is required.. since you can just edit the input yourself. but.. why not.
    select_css - CSS object (example: {color:'#000',height:100})
    data-attr - the data attr of the input, set to the selected item's id
    
### Notes:
    Set a max-height on the select_css to ensure a scrollbar / not an endless list. My example CSS has it set to 250px.
    Key commands work. You can use your up and down arrows to scroll through the list, and the enter or right arrow to select an item.
    
### TODO:
    Make the README prettier
        
Much credit to (Taylor Beseda at QuickLeft)[http://quickleft.com/blog/search-suggestions-with-string-score]
I also used the (jQuery plugin boilerplate)[http://stefangabos.ro/jquery/jquery-plugin-boilerplate/] as a base