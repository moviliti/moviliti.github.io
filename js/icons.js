/*
NOTE:   This script extends the SNIP namespace with icons.
*/

const defaultCSS = {
    'width': '100%',
    'height': '100%',
    'color': 'inherit',
    'background-repeat': 'no-repeat',
};

SNIP.ICONS = {
    'up': {
        'iconURL': "../resources/img/ui-icons/arrow-up.svg",
        'mask-mode': 'alpha',
        'iconURL-inv': "../resources/img/ui-icons/arrow-up-inv.svg",
        'mask-mode-inv': 'luminance',
        'css': {
            'width': '20px',
            'height': '20px',
            'transform': 'translate(-10px, -10px)',
        },
    },
    'down': {
        'iconURL': "../resources/img/ui-icons/arrow-up.svg",
        'mask-mode': 'alpha',
        'iconURL-inv': "../resources/img/ui-icons/arrow-up-inv.svg",
        'mask-mode-inv': 'luminance',
        'css': {
            'width': '20px',
            'height': '20px',
            'transform': 'translate(-10px, -10px) scaleY(-1)',
        }
    },
};

async function setIcon(icon, $) {
    let currentIcon = $(icon);
    let currentIconName = currentIcon.attr('data-icon');
    if (!currentIconName) {
        return;
    }
    let currentIconColor = currentIcon.attr('data-icon-color');
    console.log(currentIcon.attr('data-icon')); //debug
    let currentIconData = SNIP.ICONS[currentIconName];
    let imageRole;
    if (currentIcon.attr('data-icon-mask') === 'mask') {
        imageRole = 'mask-image';
    } else {
        imageRole = 'background-image';
    }
    let iconURL;
    let maskMode;
    if (currentIcon.attr('data-icon-invert') === 'invert') {
        iconURL = currentIconData['iconURL-inv'];
        maskMode = currentIconData['mask-mode-inv'];
    } else {
        iconURL = currentIconData['iconURL'];
        maskMode = currentIconData['mask-mode'];
    }
    let currentIconContent = $('<div>').css({
        ...defaultCSS,
        ...currentIconData['css'],
        [imageRole]: 'url(' + iconURL + ')',
        'mask-mode': maskMode,
    });
    currentIcon.css({
        'color': currentIconColor,
    }).append(currentIconContent);
}

$(document).ready(function() {   
    $('icon').each(function() {
        setIcon(this, $);
    });
});