$.EasySAF = function() {
    var self = $(this);
    
    $.extend(self, {
        selectors: {
            filterMenu: '.command-menu',
            filterCleaner: '.clear-filters',
            filterClass: '.filter',
            sortClass: '.sort',

            searchBar: '.search-bar',
            container: '.box-container',
            item: '.box-item',

            activeFilters: '',
            activeFiltersHolder: '.active-filters'
        }
    })
    
    var saf = self.selectors;
    
    $(saf.filterClass).click(function() {
        if ( saf.activeFilters.indexOf(this.id) == -1 ) {
            $(this).prepend(' <i class="fa fa-check"> </i> ')
            saf.activeFilters += '.' + this.id;
            $(saf.activeFiltersHolder).append('<li class='+ this.id +'> '+ this.id + ' </li>');
        } else {
            $(this).children('i').remove();
            $(saf.activeFiltersHolder + ' .' + this.id).remove();
            saf.activeFilters = saf.activeFilters.replace('.' + this.id, '');
            $(saf.item + saf.activeFilters).show();
        }
        
        $(saf.item).hide();
        $(saf.item + saf.activeFilters).show();
        
        console.log( saf.activeFilters )
    });
    
    $(saf.filterCleaner).click(function() {
        cleanUpFilters();
    });
    
    
    $(saf.sortClass).click(function() {
        var elementToSort = $(this).data('sort'); 
        
        if ( $(this).data('method') == 'lowtohigh' ) {
            $(saf.container + ' ' + saf.item).sort(function (a, b) {
                return $(a).data( elementToSort ) > $(b).data( elementToSort ) ? 1 : -1;  
            }).appendTo(saf.container);
        } else {
            $(saf.container + ' ' + saf.item).sort(function (a, b) {
                return $(a).data( elementToSort ) < $(b).data( elementToSort ) ? 1 : -1;  
            }).appendTo(saf.container);
        }
    })
    
    $(saf.searchBar).keyup(function() {
        var value = $(saf.searchBar).val().toLowerCase();
        
        if ( value == '' ) {
            cleanUpFilters();
        } else {
            $(saf.item).hide();
            
            $(saf.item + saf.activeFilters).each(function() {
                if ( $(this).attr('data-name').toLowerCase().indexOf(value) >= 0 ) {
                    $(this).show().css({ 'opacity' : 0 }).animate( { 'opacity' : 1 }, 500 );
                }
            })
        }
        
        console.log(value);
    })
    
    function cleanUpFilters() {
        saf.activeFilters = '';
        $(saf.item).show();
        $(saf.searchBar).val('');
        $(saf.activeFiltersHolder).empty();
        $('i.fa-check').remove();
    }
}