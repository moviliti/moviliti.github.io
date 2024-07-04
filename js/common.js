/*
NOTE:   This script contains the COMMON namespace which can be accessed from all other scripts loaded after this one.
        COMMON is a namespace for functions that are used across multiple scripts as well as arrays and constants.
*/


window.COMMON = {};

$(function() {
    COMMON.isNone = function(value) {
        return ((value === undefined) || (value === null) || (value === ''));
    };

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
    COMMON.isAccessibilityMode = false; //TODO:
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

    COMMON.newTab = {'rel': 'noreferrer noopener', 'target': '_blank'};

    COMMON.makeMenu = function(menuName, menuType, itemsData) {
        let menu = $('<div>').attr('class', menuName + 'Menu menu menu-' + menuType);
        let menuItemsCon = $('<div>').attr('class', menuName + 'Menu-itemsCon menu-itemsCon');
        let menuItems = '';
        for (let i = 0; i < itemsData.length; i++) {
            options = '';
            if (itemsData[i][2] != undefined) {
                for (const [option, value] of Object.entries(itemsData[i][2])) {
                    options += ' ' + option + '="' + value + '"';
                }
            }
            menuItems += '<a href="' + itemsData[i][1] + '"' + options + '><div class="' + menuName + 'Menu-item menu-item"><span>' + itemsData[i][0] + '</span></div></a>';
        }
        menuItemsCon.append(menuItems);
        menu.append(menuItemsCon);

        return menu;
    };

    COMMON.makeFormMenu = function(menuName, menuType, itemsData, submitData) {
        let menu = $('<div>').attr('class', menuName + 'Menu menu menu-' + menuType);
        let menuFormCon = $('<div>').attr('class', menuName + 'Menu-formCon menu-formCon');
        let menuForm = $('<form>').attr('action', submitData.target).attr('class', menuName + 'Menu-form menu-form');
        let menuFormItems = '';
        for (let i = 0; i < itemsData.length; i++) {
            options = '';
            /*if (itemsData[i][3] != undefined) {
                for (const [option, value] of Object.entries(itemsData[i][3])) {
                    options += ' ' + option + '="' + value + '"';
                }
            }*/
            menuFormItems += '<div class="' + menuName + 'Menu-formItem menu-formItem"><label for="' + itemsData[i][0] + '">' + itemsData[i][1] + '</label><input type="text" id="' + itemsData[i][0] + '" name="' + itemsData[i][0] + '" value="' + itemsData[i][2] + '"' + options + ' /></div>';
        }
        submitButtonClasses = '';
        if ((submitData.buttonIcon != undefined) && (submitData.buttonIcon != '')) {
            submitButtonClasses += 'needsSpaceForIcon';
        }
        menuFormItems += '<div class="' + menuName + 'Menu-submitButton menu-submitButton"><div class="buttonNeedsI-con"><input type="submit" value="' + submitData.buttonContent + '" class="' + submitButtonClasses + '"/><icon data-icon="' + submitData.buttonIcon + '" data-icon-color="black" data-icon-mask="mask" /></div></div>';
        menuForm.append(menuFormItems);
        menuFormCon.append(menuForm);
        menu.append(menuFormCon);

        return menu;
    }

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