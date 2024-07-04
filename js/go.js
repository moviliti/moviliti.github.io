/*
NOTE:   This script contains the system for calculating routes
        Public functions are accessible under the namespace GO.
*/

window.GO = {};

GO.paramNames = { //TODO: generate this automatically
    'from': 'text',
    'via': 'text',
    'to': 'text',
    'dateTime': 'datetime-local',
    'timeZone': 'select',
    'timeRole': 'radio',
    'sort': 'select',
    'bike': 'checkbox',
    'rent': 'checkbox',
    'visualImpairment': 'checkbox',
    'wheelchair': 'checkbox',
};
GO.defaultValues = {
    'dateTime': DATETIME.now(),
    'timeZone': DATETIME.currentTimeZone(),
    'timeRole': 'departure',
    'sort': 'speed',
};

GO.Location = class {
    constructor(lat, lng, name='', address='') {
        this.lat = lat;
        this.lng = lng;
        this._name = name;
        this._address = address;
    }
    static fromName(name) {
        if (name in GO.fav.stations) {
            return GO.fav.stations[name];
        }
        return GO.Location(42.0, 42.0, name); // NOTE: placeholder
    }
    get address() {
        // addresses not supported yet so coordinates for now
        if (!(COMMON.isNone(this._address))) {
            return this._address;
        }
        return this.lat + ', '+ this.lng;
    }
    get name() {
        if (!(COMMON.isNone(this._name))) {
            return this._name;
        }
        return this.address;
    }
};

GO.fav = {
    'stations': {
        'Kasernenstraße': new GO.Location(53.463732, 9.970370, 'Kasernenstraße'),
        'Eißendorfer Straße': new GO.Location(53.459379, 9.971213, 'Eißendorfer Straße'),
        'Harburg Rathaus': new GO.Location(53.460759, 9.979959, 'Harburg Rathaus'),
        'Heimfeld': new GO.Location(53.465479, 9.962866, 'Heimfeld'),
        'Hamburg Hbf': new GO.Location(53.553067, 10.006765, 'Hamburg Hbf'),
        'Nirvana': new GO.Location(-Infinity, Infinity, 'Nirvana'),
        'South Pole': new GO.Location(-90.0, 0, 'South Pole')
    }
};

GO.tolerance = {
    'distance': 0.0001,
}

GO.isSamePlace = function(place1, place2) {
    if ((place1.name === place2.name) && !(COMMON.isNone(place1.name))) {
        return true;
    }
    return (
        (Math.abs(place1.lat - place2.lat) < GO.tolerance.distance)
        && (Math.abs(place1.lng - place2.lng) < GO.tolerance.distance)
    );
};

GO.Point = class {
    constructor(location, time) {
        this._name = location.name;
        this.place = location;
        this.time = time;
    }
};

GO.ModeOfTransport = class {
    constructor(name, direction, icon) {
        this.name = name;
        this.direction = direction;
        this.icon = icon;
    }
};

GO.RouteStep = class {
    constructor(from, to, mode) {
        this.from = from;
        this.to = to;
        this.mode = mode;
    }
};

GO.Result = class {
    constructor(steps) {
        this.steps = steps;
    }

    format() {
        let currentTimeZone = GO.currentParams.timeZone;
        let result = $('<div>').attr('class', 'journeyPlannerResult');
        let step;
        for (let i = 0; i < this.steps.length; i++) {
            step = this.steps[i];
            let from = step.from;
            let to = step.to;
            let mode = step.mode;
            
            let routeStepTimeIntervalCon = $('<div>').attr('class', 'routeStepTimeInterval');
            routeStepTimeIntervalCon.append(
                '<span>' + DATETIME.formatTime(from.time, currentTimeZone) + '</span>' +
                '<span>' + DATETIME.formatTime(to.time, currentTimeZone) + '</span>'
            );

            let routeStepPlacesCon = $('<div>').attr('class', 'routeStepPlaces');
            routeStepPlacesCon.append(
                '<span>' + from.place.name + '</span>' +
                '<span>' + to.place.name + '</span>'
            );

            let routeStepInstructionsCon = $('<div>').attr('class', 'routeStepInstructions');
            routeStepInstructionsCon.append(
                '<span>Take the ' + mode.name + ' in the direction of ' + mode.direction + '</span>'
            );

            result.append(routeStepTimeIntervalCon);
            result.append(routeStepPlacesCon);
            result.append(routeStepInstructionsCon);
        }
        let lastStep = step;
        result.append(
            '<span>' + DATETIME.formatTime(lastStep.to.time, currentTimeZone) + '</span>' +
            '<span>' + GO.currentParams.to + '</span>' +
            "<span>You're there!</span>"
        );

        return result;
    }
};

GO.getResults = function() {
    let results = [];
    
    // This is where the magic happens.
    // So i hardcode it instead because i'm not completely deranged YET

    const result1 = new GO.Result([
        new GO.RouteStep(
            from = new GO.Point(
                GO.Location.fromName('Kasernenstraße'),
                DATETIME.now()
            ), // TODO: change params
            to = new GO.Point(
                GO.Location.fromName('Eißendorfer Straße'),
                DATETIME.now()
            ),
            mode = new GO.ModeOfTransport('18', 'Istanbul', 'bus')
        ),
    ]).format();

    results.push(result1);

    return results;
}

GO.getRoute = function(resultsCon) {
    let results = GO.getResults();

    for (let i = 0; i < results.length; i++) {
        let result = results[i];
        resultsCon.append(result);
    }
};