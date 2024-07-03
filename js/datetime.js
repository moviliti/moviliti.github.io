/*  NOTE:   This script contains the DATETIME namespace used for date and time functions.
            For only the current year, don't import this script, use COMMON.currentYear instead.
*/

DATETIME = {}

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