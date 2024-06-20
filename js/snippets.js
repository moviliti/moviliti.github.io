/*
NOTE:   This script contains the system for managin snippets
        (shortcodes in the HTML document which are replaced by code)
        Public functions and data are accessible under the namespace SNIP.
        
        This script does NOT contain buttons. Those can be found in buttons.js
        This script does NOT contain icons. Those can be found in icons.js
*/

window.SNIP = {};


$(document).ready(function() {
    SNIP.SNIPPETS = {};
    SNIP.snippetData = {};

    function getBonusDataNames(elem, snippetName) {
        let bonusDataNames;

        if (snippetName == 'vehicle') {
            bonusDataNames = [
                'vehicle-types',
                'vehicle-direction',
            ];
        } else {
            bonusDataNames = undefined;
        }

        return bonusDataNames;
    }

    SNIP.insertSnippet = function(elem, snippetName, snippet) {
        let id = elem.attr('id');
        let title = elem.attr('title');
        let classes = COMMON.getClasses(elem);
        let style = elem.attr('style');
        let bonusDataNames = getBonusDataNames(elem, snippetName);
        let snippetCopy = snippet;
        snippetCopy.attr('id', id).attr('style', style).attr('title', title);
        COMMON.appendClasses(snippetCopy, classes); // CHECK: is this necessary? maybe can be solved with .attr('class') instead
        if (bonusDataNames) {
            for (let i = 0; i < bonusDataNames.length; i++) {
                snippetCopy.attr('data-' + bonusDataNames[i], elem.data(bonusDataNames[i]));
            }
        }
        elem.replaceWith(snippetCopy);

        return elem;
    }

    function insertSnippetFromAttr(snippetName, snippet) {

        const elems = $('[data-insert="' + snippetName + '"]');
        elems.each(function() {
            SNIP.insertSnippet($(this), snippetName, snippet);
        });
    }
    
    SNIP.SNIPPETS.pfp = COMMON.setBG($('<div>'), 'avatar').addClass('pixelArt');
    
    SNIP.SNIPPETS.navMenu = COMMON.makeMenu('nav', 'floating', [
        ['Home', ""],
        ['Our Mission', "our-mission"],
        ['Contact', "#"]
    ]);

    SNIP.SNIPPETS.accMenu = COMMON.makeMenu('acc', 'floating', [
        ['My Account', ""],
        ['Bookmarks', ""],
        ['Recent Connections', ""],
        ['Settings', ""],
        ['Logout', ""]
    ]);
    
    SNIP.SNIPPETS.vehicleModule = $('<div>').attr('class', 'vehicleCon');

    SNIP.SNIPPETS.footer = $('<div>').attr('id', 'footer');
    SNIP.SNIPPETS.footer.append(
        '<div id="legal">' +
            '<span>© 2024 - ' + COMMON.currentYear + ' placeholderING Ink Inc.</span>' +
        '</div>'
    );

    SNIP.SNIPPETS.extraButtons = $('<div>').attr('id', 'extraButtons');
    SNIP.SNIPPETS.extraButtons.append(
        '<div id="extraButtons-left">' + 
            //'<div data-insert-button="uiButton" data-button-icon="lang" data-button-function=""></div>' +
        '</div>' +
        '<div id="extraButtons-right">' +
            '<div data-insert-button="uiButton" data-button-icon="up" data-button-icon-color="black" data-button-icon-mask="mask" data-button-function=""></div>' +
        '</div>'
    );
    
    snippets = [
        ['pfp', SNIP.SNIPPETS.pfp],
        ['accMenu', SNIP.SNIPPETS.accMenu],
        ['navMenu', SNIP.SNIPPETS.navMenu],
        ['vehicle', SNIP.SNIPPETS.vehicleModule],
        ['footer', SNIP.SNIPPETS.footer],
        ['extraButtons', SNIP.SNIPPETS.extraButtons]
    ]

    for (let i = 0; i < snippets.length; i++) {
        insertSnippetFromAttr(snippets[i][0], snippets[i][1]);

        SNIP.snippetData[snippets[i][0]] = snippets[i][1];
    }
});
