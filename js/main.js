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
    
    if (COMMON.isMobile) {
        durationFactor = 500;
    } else {
        durationFactor = 1000;
    }
    
    ANIM.loopThroughVehicles(animationContext, [
        ['trainRE', 4 * durationFactor],
        ['trainICE', 2 * durationFactor],
        ['bus', 12 * durationFactor],
        //['bike', 20],
        ['boat', 5 * durationFactor],
    ]);

    $('#home #main_title #title_container').css('position', 'sticky');

    COMMON.makeMenuButton();
});