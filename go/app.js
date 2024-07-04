$(document).ready(function() {

    const urlParams = new URLSearchParams(window.location.search);


    DATETIME.timeZoneSelector('#journeyPlannerParamsCon #timeZone');

    $('#journeyPlannerParamsCon #dateTime').attr('value', DATETIME.now());

    GO.currentParams = {};
    GO.set = function(id, value) {
        if (!(id in GO.paramNames)) {
            console.warn('Unknown parameter name: '+ id);
            return undefined;
        }
        const type = GO.paramNames[id];
        if (COMMON.isNone(value)) {
            if (id in GO.defaultValues) {
                value = GO.defaultValues[id];
            }
        }
        if ((type === 'text') || (type === 'select') || (type === 'datetime-local')) {
            $('#journeyPlannerParamsCon #' + id).val(value);
        } else if (
            (type === 'radio')
            || (
                (type === 'checkbox')
                && ((value === 1) || (value === '1'))
            )
        ) {
            $('#journeyPlannerParamsCon #' + id).prop('checked', true);
        } else if (type !== 'checkbox') {
            console.warn('Unknown parameter type: '+ type);
            return undefined;
        }

        GO.currentParams[id] = value;
        return value;
    }

    for (let paramName in GO.paramNames) {
        let paramValue = urlParams.get(paramName);
        GO.set(paramName, paramValue);
    }

    if (! COMMON.isAccessibilityMode) {
        $('#journeyPlannerParamsCon #dateTime').on('click', function(e) {
            e.target.showPicker();
        });
    }

    const stationButtonCon = `
        <div class="stationButtonCon formFillButtonCon">
            <div class="formFillButton locationButton" onclick="GO.set('from', 'TUHH (current location)')">
                <icon data-icon="location" data-icon-color="black" data-icon-mask="mask" />
            </div>
            <div class="formFillButton favoritesButton">
                <icon data-icon="star" data-icon-color="black" data-icon-mask="mask" />
                <div class="menu floating">
                    <div class="menu-itemsCon"></div>
                </div>
            </div>
        </div>
    `;

    $('#journeyPlannerParamsCon .station').each(function(i) {
        $(this).append(stationButtonCon);
    });

    if (GO.currentParams.from && GO.currentParams.to) {
        GO.getRoute($('#journeyPlannerResultsCon'));
    }


});