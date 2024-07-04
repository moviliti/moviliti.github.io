/*  NOTE:   This script contains the DATETIME namespace used for date and time functions.
            For only the current year, don't import this script, use COMMON.currentYear instead.
*/

DATETIME = {}

DATETIME.isToday = function(datetime, timeZone) {
    return moment(datetime).tz(timeZone).isSame(moment(), 'day');
}

DATETIME.formatTime = function(dateTime, timeZone) {
    let format;
    if (DATETIME.isToday(dateTime, timeZone)) {
        format = 'HH:mm';
    } else {
        format = 'D.M. HH:mm';
    }
    return moment(dateTime).tz(timeZone).format(format);
}

DATETIME.now = function() {
    return moment().format('YYYY-MM-DDTHH:mm');
}

DATETIME.currentTimeZone = function() {
    return moment.tz.guess();
}

DATETIME.timeZoneSelector = function(elem) {
    let currentTimeZone = DATETIME.currentTimeZone();
    let timeZones = moment.tz.names();
    for (let i=0; i<=timeZones.length; i++) {
        let timeZone = timeZones[i];
        let option = $('<option>').attr('value', timeZone).text(timeZone);
        if (timeZone === currentTimeZone) {
            option.attr('selected','selected');
        }
        $(elem).append(option);
    }
}