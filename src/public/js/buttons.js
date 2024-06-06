/*
NOTE:
*/

$(document).ready(function() {
    $('[data-insert-button="dropDownMenuButton"]').each(function() {
        let currentButton = $(this);
        let buttonText = currentButton.attr('data-button-text');
        let buttonMenuName = currentButton.attr('data-button-menu');
        let buttonMenu = SNIP.snippetData[buttonMenuName + 'Menu'].clone();

        let buttonContent = '<span>' + buttonText + '</span><icon></icon>'; //TODO:

        currentButton.replaceWith(
            COMMON.makeMenuButton(buttonMenuName + 'Menu', buttonContent, buttonMenu)
        );
    });
    $('[data-insert-button="uiButton"]').each(function() {
        let currentButton = $(this);
        let buttonFunction = currentButton.attr('data-button-function');
        let buttonIcon = currentButton.attr('data-button-icon');
        currentButton.replaceWith(
            '<div class="uiButton" onclick="' + buttonFunction + '">' +
                '<icon data-icon="' + buttonIcon + '"></icon>' +
            '</div>'
        ); // TODO:
    });
});