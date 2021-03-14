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

const moment = require('moment-range')
    .extendMoment(require('moment'));


class DateComparator {

    static isWithinRange(startMoment, endMoment, dateToCompare) {
        // align end to be before AND within 24 hours of start
        while (endMoment.diff(startMoment, 'seconds') < 0) {
            // end before start
            endMoment.add(1, 'day');
        }
        // move start and end window to be within a day of dateToCompare
        while (endMoment.diff(dateToCompare, 'seconds') < 0) {
            // end before dateToCompare
            startMoment.add(1, 'day');
            endMoment.add(1, 'day');
        }
        while (endMoment.diff(dateToCompare, 'seconds') > 86400) {
            // end more than day from dateToCompare
            startMoment.subtract(1, 'day');
            endMoment.subtract(1, 'day');
        }

        const range = moment.range(startMoment, endMoment);
        return range.contains(dateToCompare);
    }
}

module.exports = DateComparator;
