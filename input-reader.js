/* eslint-disable prefer-named-capture-group */
/* eslint-disable require-unicode-regexp */
/**
 The MIT License (MIT)

 Copyright (c) 2020 @devRoemer

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

const DateParser = require('./date-parser');
const PlaceholderParser = require('./placeholder-parser');

class InputReader {

    constructor(message, context, config) {
        this.message = message;
        this.config = config;

        this.placeholderParser = new PlaceholderParser(message, context);
    }

    getDateStart(day) {
        return this.timeToMoment(day, this.config.startTime, this.config.startOffset);
    }

    getDateEnd(day) {
        return this.timeToMoment(day, this.config.endTime, this.config.endOffset);
    }

    timeToMoment(day, timeString, offset) {
        const parsedTime = this.placeholderParser.getParsedValue(timeString);
        const geoLocation = this.getLocation();
        const parsedMoment = DateParser.timeToMoment(day, parsedTime, geoLocation);

        if (!parsedMoment) {
            throw new Error(`'${parsedTime}' is no valid time`);
        }

        const parsedOffset = this.placeholderParser.getParsedValue(offset);
        parsedMoment.add(parsedOffset, 'minutes');
        return parsedMoment;
    }

    getLocation() {
        const parsedLat = this.placeholderParser.getParsedValue(this.config.lat);
        const parsedLon = this.placeholderParser.getParsedValue(this.config.lon);

        if (!parsedLat || !parsedLon || isNaN(parsedLat) || isNaN(parsedLon)) {
            throw new Error(`Geo location lat: '${parsedLat}', lon: '${parsedLon}' is not valid`);
        }

        return { lat: parseFloat(parsedLat), lon: parseFloat(parsedLon) };
    }

}

module.exports = InputReader;
