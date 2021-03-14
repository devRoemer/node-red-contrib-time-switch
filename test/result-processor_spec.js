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

const moment = require('moment');
const should = require('should');
const mock = require('node-red-contrib-mock-node');

const ResultProcessor = require('../result-processor.js');
const nodeRedModule = require('../index.js');

// eslint-disable-next-line max-lines-per-function
describe('result-processor', function() {
    let day = null;
    before(function() {
        day = moment.parseZone('2019-11-21 18:10:03+02:00');
    });
    describe('sendMessage', function() {
        it('should send to output 1', function() {
            const node = mock(nodeRedModule, {});

            ResultProcessor.sendMessage(node, 'messageText', 0);
            const result = node.sent(0);

            result[0].should.equal('messageText')
            should.not.exist(result[1]);
        });
        it('should send outside range to output 2', function() {
            const node = mock(nodeRedModule, {});

            ResultProcessor.sendMessage(node, 'messageText', 1);
            const result = node.sent(0);
            
            should.not.exist(result[0]);
            result[1].should.equal('messageText')
        });
    });

    describe('setStatusSuccess', function() {
        it('should set icon for met condition', function() {
            const node = mock(nodeRedModule, {});

            ResultProcessor.setStatusSuccess(node, 'successText', true, day);
            const result = node.status();

            result.fill.should.equal('green');
            result.shape.should.equal('dot');
            result.text.should.equal('successText at: Nov 21st 18:10');
        });
        it('should set icon for not met condition', function() {
            const node = mock(nodeRedModule, {});

            ResultProcessor.setStatusSuccess(node, 'successText', false, day);
            const result = node.status();

            result.fill.should.equal('green');
            result.shape.should.equal('ring');
            result.text.should.equal('successText at: Nov 21st 18:10');
        });
    });

    describe('setStatusFailed', function() {
        it('should set status failed', function() {
            const node = mock(nodeRedModule, {});

            ResultProcessor.setStatusFailed(node, 'failureText', day);
            const result = node.status();

            result.fill.should.equal('red');
            result.shape.should.equal('ring');
            result.text.should.equal('failureText at: Nov 21st 18:10');
        });
    });
});
