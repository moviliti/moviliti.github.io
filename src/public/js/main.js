/*
NOTE:   This script launches functions from other scripts when website finished loading
*/

$(document).ready(function() {
    let animationContext;

    for (let i = 0; i < VARCLASS.varClassNames.length; i++) {
        VARCLASS.setVarFromClassName(VARCLASS.varClassNames[i][0], VARCLASS.varClassNames[i][1]);
    }

    $('[data-bg]').each(function() {
        COMMON.setBG($(this), $(this).data('bg'));
    });

    animationContext = '#siteTitle > .vehicleCon > .vehicle'
    ANIM.loopThroughVehicles(animationContext, [
        ['trainRE', 4000],
        ['trainICE', 2000],
        ['bus', 12000, 2000],
        //['bike', 20000],
        ['boat', 5000],
    ]);

    $('#home #main_title #title_container').css('position', 'sticky');

    COMMON.makeMenuButton();
});