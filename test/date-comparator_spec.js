/* eslint-disable max-lines */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-statements-per-line */
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

require('should');
const moment = require('moment');
const DateComparator = require('../date-comparator.js');

// eslint-disable-next-line max-lines-per-function
describe('date-comparator', function() {
    // eslint-disable-next-line max-lines-per-function
    describe('isWithinRange', function() {
        it('should work with range over midnight starting in the moring', function() {
            const start = moment('2019-11-21 06:30');
            const end = moment('2019-11-21 03:30');

            let now = moment('2019-11-21 06:31');
            let result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 12:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 00:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 03:29');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 06:29');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 03:31');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();
        });
        it('should work with range over midnight starting after midday', function() {
            const start = moment('2019-11-21 12:45');
            const end = moment('2019-11-21 02:45');

            let now = moment('2019-11-21 12:46');
            let result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 00:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 02:44');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 12:44');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 02:46');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 12:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();
        });
        it('should work with range over midnight starting at night', function() {
            const start = moment('2019-11-21 22:45');
            const end = moment('2019-11-21 01:45');

            let now = moment('2019-11-21 22:46');
            let result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 00:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 01:44');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 22:44');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 01:46');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 12:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();
        });
        it('should work with range in the moring', function() {
            const start = moment('2019-11-21 01:45');
            const end = moment('2019-11-21 02:45');

            let now = moment('2019-11-21 01:46');
            let result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 02:11');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 02:44');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 01:44');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 02:46');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 00:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 12:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();
        });
        it('should work should work with range over midday', function() {
            const start = moment('2019-11-21 11:45');
            const end = moment('2019-11-21 12:45');

            let now = moment('2019-11-21 11:46');
            let result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 12:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 12:44');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 11:44');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 12:46');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 00:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();
        });
        it('should work with range in the afternoon', function() {
            const start = moment('2019-11-21 16:10');
            const end = moment('2019-11-21 17:45');

            let now = moment('2019-11-21 16:11');
            let result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 17:44');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 16:59');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 16:09');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 17:46');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 00:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 12:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();
        });
        it('should work from midnight to midnight', function() {
            const start = moment('2019-11-21 00:00');
            const end = moment('2019-11-21 00:00');

            let now = moment('2019-11-21 00:00');
            let result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 12:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 08:59');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 16:59');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();
        });
        it('should work with switching day while processing start and end time', function() {
            const start = moment('2019-11-21 06:30');
            const end = moment('2019-11-22 03:30');

            let now = moment('2019-11-21 06:31');
            let result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 12:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 00:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 03:29');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 06:29');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 03:31');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();
        });
        it('should work with utc', function() {
            const start = moment.utc(moment('2019-11-21 06:30'));
            const end = moment('2019-11-21 03:30');

            let now = moment('2019-11-21 06:31');
            let result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 12:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 00:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 03:29');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-11-21 06:29');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2019-11-21 03:31');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();
        });
        it('should work over years', function() {
            const start = moment('2019-12-31 06:30');
            const end = moment('2020-01-01 03:30');

            let now = moment('2019-12-31 06:31');
            let result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2019-12-31 12:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2020-01-01 00:00');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2020-01-01 03:29');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.true();

            now = moment('2020-01-01 06:29');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();

            now = moment('2020-01-01 03:31');
            result = DateComparator.isWithinRange(start, end, now);
            result.should.be.false();
        });
    });
});
