/*
NOTE:   This script contains the COMMON namespace which can be accessed from all other scripts loaded after this one.
        COMMON is a namespace for functions that are used across multiple scripts as well as arrays and constants.
*/


window.COMMON = {};

$(function() {
    COMMON.currentYear = new Date().getFullYear();

    const imgDirPath = "../resources/img/";
    COMMON.bgs = {
        // NOTE:
        // single style imgs:
        //   'handle': ["filename.ext", aspect-ratio],
        // imgs with separate versions for dark mode and light mode:
        //   'handle': [false, "filename_dark.ext", "filename_light.ext", aspect-ratio],
        'logoPlain': [false, "logo/px_moviliti_logo_plain_lighter.png", "logo/px_moviliti_logo_plain.png"],
        'logoTrain': [false, "logo/px_moviliti_logo_train_lighter.png", "logo/px_moviliti_logo_train.png"],
        'vehicle_trainRE': ["vehicles/px_train-re_wob_full.png"],
        'vehicle_trainICE': ["vehicles/px_train-ice_wob_full.png"],
        'vehicle_bike': ["vehicles/px_bike_wob.png"],
        'vehicle_bus': ["vehicles/px_bus_wob_full.png"],
        'vehicle_boat': ["vehicles/px_boat_wob.png"],
        'avatar': ["avatar/px_avatar_template.png"],
    };

    COMMON.getClasses = function(elem) {
        if (elem.attr('class')) {
            return elem.attr('class').split(' ');
        }
        return elem
    };
    COMMON.appendClasses = function(elem, classNames) {
        if (classNames) {
            for (let i = 0; i < classNames.length; i++) {
                elem.addClass(classNames[i]);
            }
        }
        return elem;
    };
    COMMON.isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    COMMON.isMobile = window.matchMedia('(max-width: 960px)').matches;
    COMMON.setBG = function(elem, bgName) {
        let bgData = COMMON.bgs[bgName];
        let isSingleStyle = Boolean(bgData[0]);
        let bgPath;
        if (isSingleStyle) {
            bgPath = bgData[0];
        } else {
            bgPath = bgData[1 + COMMON.isLightMode];
        }
        elem.css('background-image', 'url(' + imgDirPath + bgPath + ')');
        elem.addClass('imgBG');
        return elem;
    };

    COMMON.sleep = function(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    COMMON.makeMenu = function(menuName, menuType, itemsData) {
        let menu = $('<div>').attr('class', menuName + 'Menu menu menu-' + menuType);
        let menuItemsCon = $('<div>').attr('class', menuName + 'Menu-itemsCon menu-itemsCon');
        let menuItems = '';
        for (let i = 0; i < itemsData.length; i++) {
            menuItems += '<a href="' + itemsData[i][1] + '"><div class="' + menuName + 'Menu-item menu-item"><span>' + itemsData[i][0] + '</span></div></a>';
        }
        menuItemsCon.append(menuItems);
        menu.append(menuItemsCon);

        return menu;
    };

    COMMON.makeMenuButton = function(buttonName, buttonContent, menu, menuPosition) {
        let posCSS;
        if (menuPosition === 'left') {
            posCSS = [['left', '0']];
        } else if (menuPosition === 'right') {
            posCSS = [['right', '0']];
        } else {
            posCSS = [['left', '50%'], ['transform', 'translateX(-50%)']];
        }
        let button = $('<div>').attr('class', buttonName + 'Button menuButton');
        button.append(
            '<div class="buttonSelf">' +
                '<div class="' + buttonName + 'ButtonContent buttonContent">' + 
                    buttonContent +
                '</div>' +
            '</div>'
        );
        for (let i = 0; i < posCSS.length; i++) {
            $(menu).css(posCSS[i][0], posCSS[i][1]);
        }
        button.append(menu);

        return button;
    };

    COMMON.scrollToTop = function() {
        $('html, body').animate({
            'scrollTop': 0,
        }, 1000);
    };
});