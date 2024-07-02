/*
NOTE:   This script generates different button templates.
*/

$(document).ready(function() {
    $('[data-insert-button="dropDownMenuButton"]').each(function() {
        let currentButton = $(this);
        let buttonText = currentButton.attr('data-button-text');
        let buttonMenuName = currentButton.attr('data-button-menu');
        let buttonIcon = currentButton.attr('data-button-icon');
        let buttonIconColor = currentButton.attr('data-button-icon-color');
        let buttonIconMask = currentButton.attr('data-button-icon-mask');
        let buttonIconInv = currentButton.attr('data-button-icon-inv');
        let buttonMenu = SNIP.snippetData[buttonMenuName + 'Menu'].clone();

        let buttonContent = '<span>' + buttonText + '</span><icon data-icon="' + buttonIcon + '" data-icon-color="' + buttonIconColor + '" data-icon-mask="' + buttonIconMask + '" data-icon-inv="' + buttonIconInv + '"></icon>'; //TODO:

        currentButton.replaceWith(
            COMMON.makeMenuButton(buttonMenuName + 'Menu', buttonContent, buttonMenu)
        );
    });
    $('[data-insert-button="uiButton"]').each(function() {
        let currentButton = $(this);
        let buttonFunction = currentButton.attr('data-button-function');
        let buttonIcon = currentButton.attr('data-button-icon');
        let buttonIconColor = currentButton.attr('data-button-icon-color');
        let buttonIconMask = currentButton.attr('data-button-icon-mask');
        let buttonIconInv = currentButton.attr('data-button-icon-inv');
        let newButton = $('<div>').attr('class', 'uiButton').attr('onclick', buttonFunction);
        newButton.append('<icon data-icon="' + buttonIcon + '" data-icon-color="' + buttonIconColor + '" data-icon-mask="' + buttonIconMask + '" data-icon-inv="' + buttonIconInv + '"></icon>');
        currentButton.replaceWith(newButton);
    });
});