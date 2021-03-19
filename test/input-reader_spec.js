/* eslint-disable max-lines */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-statements-per-line */
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

require('should');
const assert = require('assert');
const moment = require('moment');

const InputReader = require('../input-reader.js');

// eslint-disable-next-line max-lines-per-function
describe('input-reader', function() {
    // eslint-disable-next-line max-lines-per-function
    describe('timeToMoment', function() {
        let day = null;
        let reader = null;
        before(function() {
            day = moment.parseZone('2019-11-21 00:00:00+01:00');
            const config = { lat: 51.33411, lon: -0.83716 };
            reader = new InputReader('testmessage', null, config);
        });
        it('should add offset', function() {
            const result = reader.timeToMoment(day, '12:00', 10);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T12:10:00+01:00');
        });
        it('should subtract negative offset', function() {
            const result = reader.timeToMoment(day, '12:00', -10);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T11:50:00+01:00');
        });
        it('should not change date with offset 0', function() {
            const result = reader.timeToMoment(day, '12:00', 0);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T12:00:00+01:00');
        });
        it('should add offset to suncal names', function() {
            const result = reader.timeToMoment(day, 'goldenHour', 5);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T16:19:00+01:00');
        });
        it('should not change date with offset null', function() {
            const result = reader.timeToMoment(day, '12:00', null);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T12:00:00+01:00');
        });
        it('should not change date with offset undefined', function() {
            const result = reader.timeToMoment(day, '12:00', undefined);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T12:00:00+01:00');
        });
        it('should not change date with offset invalid', function() {
            const result = reader.timeToMoment(day, '12:00', 'invalid');
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T12:00:00+01:00');
        });
        it('should throw exception if time is empty', function() {
            assert.throws(() => reader.timeToMoment(day, '', 0), Error);
        });
        it('should throw exception if time is null', function() {
            assert.throws(() => reader.timeToMoment(day, null, 0), Error);
        });
        it('should throw exception if time is undefined', function() {
            assert.throws(() => reader.timeToMoment(day, undefined, 0), Error);
        });
        it('should throw exception if time is invalid', function() {
            assert.throws(() => reader.timeToMoment(day, 'invalid', 0), Error);
        });
    });

    // eslint-disable-next-line max-lines-per-function
    describe('getLocation', function() {
        let reader = null;
        let config = null;
        before(function() {
            config = { };
            reader = new InputReader({payload: 'testmessage', field1: 51.33411, field2: -0.83716}, null, config);
        });
        it('should get correct location', function() {
            config.lat = 51.33411;
            config.lon = -0.83716
            const result = reader.getLocation();
            result.lat.should.equal(51.33411);
            result.lon.should.equal(-0.83716);
        });
        it('should parse location from message', function() {
            config.lat = "{{msg.field1}}";
            config.lon = "{{msg.field2}}";
            const result = reader.getLocation();
            result.lat.should.equal(51.33411);
            result.lon.should.equal(-0.83716);
        });
        it('should throw exception if geo is empty', function() {
            config.lat = '';
            config.lon = -0.83716;
            assert.throws(() => reader.getLocation(), Error);

            config.lat = 51.33411;
            config.lon = '';
            assert.throws(() => reader.getLocation(), Error);

            config.lat = '';
            config.lon = '';
            assert.throws(() => reader.getLocation(), Error);
        });
        it('should throw exception if geo is null', function() {
            config.lat = null;
            config.lon = -0.83716;
            assert.throws(() => reader.getLocation(), Error);

            config.lat = 51.33411;
            config.lon = null;
            assert.throws(() => reader.getLocation(), Error);

            config.lat = null;
            config.lon = null;
            assert.throws(() => reader.getLocation(), Error);
        });
        it('should throw exception if geo is undefined', function() {
            config.lat = undefined;
            config.lon = -0.83716;
            assert.throws(() => reader.getLocation(), Error);

            config.lat = 51.33411;
            config.lon = undefined;
            assert.throws(() => reader.getLocation(), Error);

            config.lat = undefined;
            config.lon = undefined;
            assert.throws(() => reader.getLocation(), Error);
        });
        it('should throw exception if geo is invalid', function() {
            config.lat = 'invalid';
            config.lon = -0.83716;
            assert.throws(() => reader.getLocation(), Error);

            config.lat = 51.33411;
            config.lon = 'invalid';
            assert.throws(() => reader.getLocation(), Error);

            config.lat = 'invalid';
            config.lon = 'invalid';
            assert.throws(() => reader.getLocation(), Error);
        });
    });
});
