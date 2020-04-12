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
            return this.createTime(day, parsedTime);
        }
        return null;
    };

    static getMomentBySunCalcName(day, name, location) {
        const sunCalcTime = this.getSunCalcTime(day, name, location);
        if (sunCalcTime) {
            const parsedTime = this.convertLocalTimeToTimezone(sunCalcTime, day.utcOffset());
            return this.createTime(day, parsedTime);
        }
        return null;
    };

    static getSunCalcTime(day, name, location) {
        const midDay = day.clone().startOf('day').add(12, 'hours');
        const sunCalcTimes = SunCalc.getTimes(midDay, location.lat, location.lon);
        return sunCalcTimes[name];
    }

    static createTime(day, time) {
        const hour = time.get('hour');
        const minute = time.get('minute');
        const seconds = 0;

        const result = day.clone().set({hour, minute, seconds});
        return result;
    };

    static convertLocalTimeToTimezone(time, offset) {
        const utcTime = moment.utc(time);
        const result = utcTime.utcOffset(offset);
        return result;
    }
}

module.exports = DateParser;
