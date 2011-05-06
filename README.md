## This plugin attaches a selectable list of sorted items to an input.

[Demo](http://jsfiddle.net/4eRx8/)

### Dependencies:
* [jQuery](http://jquery.com) (1.4.4+ for the all_attrs option to work)
* [Underscore](http://documentcloud.github.com/underscore/)
* [String Score](https://github.com/joshaven/string_score)
    
### Usage:
    $( selector ).autoSortSelect(options) // basic usage
    $( '#your_input' ).autoSortSelect( {data: your_data} ); // minimal options
    
Clicking on an item will set the text of the input to that item's text, set the input's .data('selected_option') to the resulting id, and set data-autosortselect to the id.
    
### Options:
    data - An array of JSON object. Each must have a key of 'name', unless otherwise specified
    name - The key in data where each item's text can be found. Defaults to 'name'.
    id - The key in data to set each item's id to. Defaults to 'id'.
    id_prefix - Each item gets an id of the input's id plus (if it exists, otherwise it is set to autoSortSelect) the selector's id. You can override the prefix here.
    input_css - CSS object (example: {color:'#000',height:100})
        I don't think this one is required.. since you can just edit the input yourself. but.. why not.
    select_css - CSS object (example: {color:'#000',height:100})
    data_attr - the data attr of the input, set to the selected item's id
    all_attrs - Defaults to false. Set to true to attach all keys from the object to the elements.
    
### Notes:
Set a max-height on the select_css to ensure a scrollbar / not an endless list. My example CSS has it set to 250px.  
Key commands work. You can use your up and down arrows to scroll through the list, and the enter or right arrow to select an item.

        
Much credit to [Taylor Beseda at QuickLeft](http://quickleft.com/blog/search-suggestions-with-string-score)
I also used the [jQuery plugin boilerplate](http://stefangabos.ro/jquery/jquery-plugin-boilerplate/) as a base