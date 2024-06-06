/*
NOTE:   This script contains animations.
        The functions used to animate are in the ANIM namespace.
*/

window.ANIM = {};

$(document).ready(function() {
    ANIM.vehiclePrefix = 'vehicle_';
    const vehicleCon = $('.vehicleCon');
    const vehicleHeight = 19; // px
    const durationBuffer = 10; // milliseconds to wait before resetting animation
    
    const vehicleRatios = {
        'trainRE': 13.5,
        'trainICE': 15,
        'bus': 3.5,
        'bike': 5,
        'boat': 1.25,
    };
    const fallbackVehicleRatio = '-100%';
    
    function oppositeDirection(direction) {
        if (direction == 'left') {
            return 'right';
        } else if (direction == 'right') {
            return 'left';
        }
    }

    vehicleCon.each(function() {
        let currentCon = $(this);
        let vehicleTypes = currentCon.data('vehicle-types').split(' ');
        for (let i = 0; i < vehicleTypes.length; i++) {
            let vehicle = $('<div>');
            COMMON.appendClasses(vehicle, [
                'vehicle',
                ANIM.vehiclePrefix + vehicleTypes[i],
                'pixelArt'
            ])
            if (vehicleTypes[i] in vehicleRatios) {
                vehicle.attr('data-vehicle-ratio', vehicleRatios[vehicleTypes[i]]);
            } else {
                vehicle.attr('data-vehicle-ratio', 0);
            }
            COMMON.setBG(vehicle, ANIM.vehiclePrefix + vehicleTypes[i]);
            vehicleCon.append(vehicle);
        }
    });


    $('.vehicle').each(function() {
        const currentVeh = $(this);
        let currentVehDirection;
        let currentVehOffset; 
        if (currentVeh.data('vehicle-ratio')) {
            currentVehOffset = '-' + Math.ceil(vehicleHeight * currentVeh.data('vehicle-ratio') + 1) + 'px';
        } else {
            currentVehOffset = fallbackVehicleRatio;
        }
        if (currentVeh.data('vehicle-direction')) {
            currentVehDirection = currentVeh.data('vehicle-direction');
        } else {
            currentVehDirection = 'right';
            currentVeh.attr('data-vehicle-direction', currentVehDirection);
        }
        currentVeh.css(oppositeDirection(currentVehDirection), currentVehOffset);
    });


    ANIM.moveVehicleAcrossScreen = async function(vehicle, duration) {
        vehDirection = vehicle.data('vehicle-direction');
        vehSrcDirection = oppositeDirection(vehDirection);
        vehOffset = vehicle.css(vehSrcDirection);
        vehicle.css('transition', vehSrcDirection + ' ' + duration + 'ms linear');
        vehicle.css(vehSrcDirection, '100%');
        await COMMON.sleep(duration + durationBuffer);
        vehicle.css('transition', '');
        vehicle.css(vehSrcDirection, vehOffset);
    }

    ANIM.loopThroughVehicles = async function(animationContext, vehiclesWithDurations) {
        animationContext += '.' + ANIM.vehiclePrefix;
        do {
            for (let i = 0; i < vehiclesWithDurations.length; i++) {
                await ANIM.moveVehicleAcrossScreen($(animationContext + vehiclesWithDurations[i][0]), vehiclesWithDurations[i][1]);
                /* CHECK: this doesn't work because the animation is not awaited correctly
                if (vehiclesWithDurations[i][2]) {
                    await COMMON.sleep(vehiclesWithDurations[i][2]);
                } else {
                    await COMMON.sleep(vehiclesWithDurations[i][1]);
                }
                */
            }
        } while (true);
    }
});