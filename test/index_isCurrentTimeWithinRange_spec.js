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
const mock = require('node-red-contrib-mock-node');

const nodeRedModule = require('../index.js');

// eslint-disable-next-line max-lines-per-function
describe('index', function() {
    // eslint-disable-next-line max-lines-per-function
    describe('isCurrentTimeWithinRange', function() {
        const node = mock(nodeRedModule, {});
        it('should work with range over midnight starting in the moring', function() {
            const start = moment('2019-11-21 06:30');
            const end = moment('2019-11-21 03:30');

            node.now = function() { return moment('2019-11-21 06:31'); };
            let result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 12:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 00:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 03:29'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 06:29'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 03:31'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();
        });
        it('should work with range over midnight starting after midday', function() {
            const start = moment('2019-11-21 12:45');
            const end = moment('2019-11-21 02:45');

            node.now = function() { return moment('2019-11-21 12:46'); };
            let result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 00:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 02:44'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 12:44'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 02:46'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 12:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();
        });
        it('should work with range over midnight starting at night', function() {
            const start = moment('2019-11-21 22:45');
            const end = moment('2019-11-21 01:45');

            node.now = function() { return moment('2019-11-21 22:46'); };
            let result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 00:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 01:44'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 22:44'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 01:46'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 12:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();
        });
        it('should work with range in the moring', function() {
            const start = moment('2019-11-21 01:45');
            const end = moment('2019-11-21 02:45');

            node.now = function() { return moment('2019-11-21 01:46'); };
            let result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 02:11'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 02:44'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 01:44'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 02:46'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 00:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 12:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();
        });
        it('should work should work with range over midday', function() {
            const start = moment('2019-11-21 11:45');
            const end = moment('2019-11-21 12:45');

            node.now = function() { return moment('2019-11-21 11:46'); };
            let result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 12:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 12:44'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 11:44'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 12:46'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 00:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();
        });
        it('should work with range in the afternoon', function() {
            const start = moment('2019-11-21 16:10');
            const end = moment('2019-11-21 17:45');

            node.now = function() { return moment('2019-11-21 16:11'); };
            let result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 17:44'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 16:59'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 16:09'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 17:46'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 00:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 12:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();
        });
        it('should work from midnight to midnight', function() {
            const start = moment('2019-11-21 00:00');
            const end = moment('2019-11-21 00:00');

            node.now = function() { return moment('2019-11-21 00:00'); };
            let result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 12:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 08:59'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 16:59'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();
        });
        it('should work with switching day while processing start and end time', function() {
            const start = moment('2019-11-21 06:30');
            const end = moment('2019-11-22 03:30');

            node.now = function() { return moment('2019-11-21 06:31'); };
            let result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 12:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 00:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 03:29'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 06:29'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 03:31'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();
        });
        it('should work with utc', function() {
            const start = moment.utc(moment('2019-11-21 06:30'));
            const end = moment('2019-11-21 03:30');

            node.now = function() { return moment('2019-11-21 06:31'); };
            let result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 12:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 00:00'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 03:29'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.true();

            node.now = function() { return moment('2019-11-21 06:29'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();

            node.now = function() { return moment('2019-11-21 03:31'); };
            result = node.isCurrentTimeWithinRange(start, end);
            result.should.be.false();
        });
    });
});
