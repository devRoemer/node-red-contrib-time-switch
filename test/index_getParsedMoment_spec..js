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
const PlaceholderParser = require('../placeholder-parser');

// eslint-disable-next-line max-lines-per-function
describe('index', function() {
    const parser = new PlaceholderParser(null, null);

    describe('getParsedMoment', function() {
        const node = mock(nodeRedModule, {});
        const time = moment('2019-11-21');
        node.now = function() { 
            return time.clone();
        };

        it('should add offset', function() {
            const result = node.getParsedMoment('12:00', 10, parser);
            result.format('YYYY-MM-DDTHH:mm:ss').should.equal('2019-11-21T12:10:00');
        });
        it('should subtract negative offset', function() {
            const result = node.getParsedMoment('12:00', -10, parser);
            result.format('YYYY-MM-DDTHH:mm:ss').should.equal('2019-11-21T11:50:00');
        });
        it('should not change date with offset 0', function() {
            const result = node.getParsedMoment('12:00', 0, parser);
            result.format('YYYY-MM-DDTHH:mm:ss').should.equal('2019-11-21T12:00:00');
        });
        it('should not change date with offset null', function() {
            const result = node.getParsedMoment('12:00', null, parser);
            result.format('YYYY-MM-DDTHH:mm:ss').should.equal('2019-11-21T12:00:00');
        });
        it('should not change date with offset undefined', function() {
            const result = node.getParsedMoment('12:00', undefined, parser);
            result.format('YYYY-MM-DDTHH:mm:ss').should.equal('2019-11-21T12:00:00');
        });
    });
});
