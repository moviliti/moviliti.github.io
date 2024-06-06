/*
NOTE:   This script contains the system to generate CSS properties from class names.
        The functions and data are part of the VARCLASS namespace.
*/


var VARCLASS = {};

$(function() {
    const delimiter = '__';
    const delimRegEx = new RegExp(delimiter, 'g');
    const delimLength = delimiter.length;

    //// varClass system: ////
    VARCLASS.setVarFromClassName = function(classNameMatch, propertyName) {
        const elems = $('.' + classNameMatch);
        elems.each(function() {
            classList = COMMON.getClasses($(this));
            for (let i = 0; i < classList.length; i++) {
                let currentClassName = classList[i];
                if (currentClassName.startsWith(classNameMatch + delimiter)) {
                    $(this).css(propertyName, currentClassName.slice(classNameMatch.length + delimLength).replace(delimRegEx, ' '));
                }
            }
        });
    }

    VARCLASS.varClassNames = [
        ['fGap', 'gap'],
        ['margin', 'margin'],
        ['aspectRatio', 'aspect-ratio'],
        ['padding', 'padding'],
        ['bRadius', 'border-radius'],
        ['border', 'border'],
        ['top', 'top'],
        ['right', 'right'],
        ['bottom', 'bottom'],
        ['left', 'left'],
        ['height', 'height'],
        ['width', 'width']
    ];
});
