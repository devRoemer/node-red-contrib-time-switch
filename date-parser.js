/* eslint-disable prefer-named-capture-group */
/* eslint-disable require-unicode-regexp */
/**
 The MIT License (MIT)

 Copyright (c) 2019 @huzergackl

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

const moment = require('moment');
const SunCalc = require('suncalc2');

class DateParser {

    static timeToMoment(day, time, location)  {
        const parsedTime = this.getMomentByTime(day, time, 'HH:mm');

        if (parsedTime) {
            return parsedTime;
        }

        return this.getMomentBySunCalcName(day, time, location);
    };

    static getMomentByTime(day, time, format) {
        const parsedTime = moment(time, format);
        if (parsedTime.isValid()) {
            this.setDateOfParsedTime(day, parsedTime);
            return parsedTime;
        }
        return null;
    };

    static setDateOfParsedTime(day, timeMoment) {
        timeMoment
            .year(day.year())
            .month(day.month())
            .date(day.date());
    };

    static getMomentBySunCalcName(day, name, location) {
        const suncalDate = day.clone().toDate();
        const sunCalcTimes = SunCalc.getTimes(suncalDate, location.lat, location.lon);
        const sunCalcTime = sunCalcTimes[name];
        if (sunCalcTime) {
            const parsedTime = moment(sunCalcTime);
            parsedTime.seconds(0);
            return parsedTime;
        }
        return null;
    };
}

module.exports = DateParser;
