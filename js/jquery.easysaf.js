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
            activeFiltersHolder: '.active-filters',

            displayNumberOfMatchedElements: true,
            matchedElementsHolder: '.matched-elements',
            searchBoxResultDelay: 500
        }
    });
    
    var saf = self.selectors;
    
    if (saf.displayNumberOfMatchedElements) {
        var timeToShow = null;
         checkNumberOfMatchedItems();
    }

    $(saf.filterClass).click(function() {
        if ( saf.activeFilters.indexOf(this.id) == -1 ) {
            $(this).prepend(' <i class="fa fa-check"> </i> ')
            saf.activeFilters += '.' + this.id;
            $(saf.activeFiltersHolder).append('<li class='+ this.id +'> '+ this.id + ' </li>');
        } else {
            $(this).children('i').remove();
            $(saf.activeFiltersHolder + ' .' + this.id).remove();
            saf.activeFilters = saf.activeFilters.replace('.' + this.id, '');

            if (saf.activeFilters === '') {
                $(saf.item).show();
            }
        }
        
        if ( saf.activeFilters != '' ) {
            $(saf.item).hide();
            $(saf.item + saf.activeFilters).show();
        }

        if ( saf.displayNumberOfMatchedElements ) {
             checkNumberOfMatchedItems();
        }
    });
    
    $(saf.filterCleaner).click(function() {
        cleanUpFilters();

        if ( saf.displayNumberOfMatchedElements ) {
             checkNumberOfMatchedItems();
        }
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
        }

        checkIfUsingSearchBox(value);
    });

    function checkNumberOfMatchedItems() {
        var activeItems = 0;

        $(saf.item).filter(function() {
            if ( $(this).css('display') != 'none' ) {
                activeItems += 1;
            }
        });

        $(saf.matchedElementsHolder).text(activeItems);
    }

    function checkIfUsingSearchBox(value) {
        clearTimeout(timeToShow);
        timeToShow = setTimeout(function() {
            $(saf.item).hide();

            if ( saf.displayNumberOfMatchedElements === true ) {
                var matchedElements = 0;

                $(saf.item + saf.activeFilters).each(function() {
                    if ( $(this).attr('data-name').toLowerCase().indexOf(value) >= 0 ) {
                        $(this).show().css({ 'opacity' : 0 }).animate( { 'opacity' : 1 }, 500 );
                        matchedElements += 1;
                    }
                });

                $(saf.matchedElementsHolder).text(matchedElements);
            } else {
                $(saf.item + saf.activeFilters).each(function() {
                    if ( $(this).attr('data-name').toLowerCase().indexOf(value) >= 0 ) {
                        $(this).show().css({ 'opacity' : 0 }).animate( { 'opacity' : 1 }, 500 );
                    }
                });
            }
        }, saf.searchBoxResultDelay);
    }

    function cleanUpFilters() {
        $(saf.item).show();
        saf.activeFilters = '';
        $(saf.searchBar).val('');
        $(saf.activeFiltersHolder).empty();
        $('i.fa-check').remove();
    }
}
