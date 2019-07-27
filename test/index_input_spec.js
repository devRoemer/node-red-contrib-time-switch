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

const should = require('should');
const moment = require('moment');
const mock = require('node-red-contrib-mock-node');

const nodeRedModule = require('../index.js');

// eslint-disable-next-line max-lines-per-function
describe('index', function() {
    describe('input', function() {
        it('should run through entire process with success', function() {
            // arrange
            let result = null;
            const node = mock(nodeRedModule, {
                startTime: '08:00',
                endTime: '10:00',
                startOffset: 1,
                endOffset: 2,
                lat: 51.33411,
                lon: -0.83716,
                unitTest: true
            });
            node.context = function() {
                return {
                    flow: {
                        'keys'() { return ['flowKey']},
                        'get'() { return '10:00' }
                    },
                    global: {
                        'keys'() { return []},
                        'get'() { return undefined }
                    }
                }
            };
            node.send = function(msg) {
                result = msg;
            };
            node.now = function() {
                return moment('2019-03-22 09:00:00');
            };
        
            // act
            node.emit('input', {});

            // assert
            should.exist(result[0]);
            should.not.exist(result[1]);
        });
    });
});
