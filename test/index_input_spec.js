/* eslint-disable prefer-named-capture-group */
/* eslint-disable require-unicode-regexp */
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

const should = require('should');
const moment = require('moment');
const mock = require('node-red-contrib-mock-node');

const nodeRedModule = require('../index.js');

// eslint-disable-next-line max-lines-per-function
describe('index', function() {
    describe('getCurrentDate', function() {
        it('should return a date', function() {
            // arrange
            const node = mock(nodeRedModule, {
                startTime: '08:00',
                endTime: '10:00',
                startOffset: 1,
                endOffset: 2,
                lat: 52.5192,
                lon: 13.4061,
                unitTest: true
            });

            // act
            const result = node.getCurrentDate();

            // assert
            should.exist(result);
            result._isAMomentObject.should.be.true();
            result._isValid.should.be.true();
        });
    });
    // eslint-disable-next-line max-lines-per-function
    describe('input', function() {
        it('should run through entire process (within range)', function() {
            // arrange
            let result = null;
            const node = mock(nodeRedModule, {
                startTime: '08:00',
                endTime: '{{flow.flowKey}}',
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
            node.getCurrentDate = function() { return moment.parseZone('2020-04-12 09:00:00+02:00'); }
        
            // act
            node.emit('input', {});

            // assert
            should.exist(result[0]);
            should.not.exist(result[1]);

            const status = node.status();
            status.fill.should.equal('green');
            status.shape.should.equal('dot');
            status.text.should.equal('Apr 12th 08:01 - Apr 12th 10:02 at: Apr 12th 09:00')
        });
        it('should run through entire process (outside range)', function() {
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
            node.getCurrentDate = function() { return moment.parseZone('2020-04-12 11:00:00+02:00'); }

            // act
            node.emit('input', {});

            // assert
            should.not.exist(result[0]);
            should.exist(result[1]);

            const status = node.status();
            status.fill.should.equal('green');
            status.shape.should.equal('ring');
            status.text.should.startWith('Apr 13th 08:01 - Apr 13th 10:02 at: Apr 12th 11:00')
        });
        it('should run through entire process with suncalc (within range)', function() {
            // arrange
            let result = null;
            const node = mock(nodeRedModule, {
                startTime: '08:00',
                endTime: 'goldenHour',
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
            node.getCurrentDate = function() { return moment.parseZone('2020-04-12 11:00:00+02:00'); }

            // act
            node.emit('input', {});

            // assert
            should.exist(result[0]);
            should.not.exist(result[1]);

            const status = node.status();
            status.fill.should.equal('green');
            status.shape.should.equal('dot');
            status.text.should.equal('Apr 12th 08:01 - Apr 12th 20:12 at: Apr 12th 11:00'); // TODO: Verify
        });
        it('should get red with invalid dates', function() {
            // arrange
            let result = null;
            const node = mock(nodeRedModule, {
                startTime: '08:00',
                endTime: 'invalid',
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
            node.getCurrentDate = function() { return moment.parseZone('2020-04-12 11:00:00+02:00'); }
        
            // act
            node.emit('input', {});

            // assert
            should.not.exist(result);

            const status = node.status();
            status.fill.should.equal('red');
            status.shape.should.equal('ring');
            status.text.should.startWith("'invalid' is no valid time");
        });
        it('should detect changing times', function() {
            // arrange
            let result = null;
            const node = mock(nodeRedModule, {
                startTime: '08:00',
                endTime: '10:00',
                unitTest: true
            });
            node.context = function() {
                return {
                    flow: {
                        'keys'() { return []},
                        'get'() { return undefined }
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
            node.getCurrentDate = function() { return moment.parseZone('2020-04-12 09:00:00+02:00'); }
        
            // act
            node.emit('input', {});

            // assert - should be within
            should.exist(result[0]);
            should.not.exist(result[1]);

            let status = node.status();
            status.fill.should.equal('green');
            status.shape.should.equal('dot');
            status.text.should.equal('Apr 12th 08:00 - Apr 12th 10:00 at: Apr 12th 09:00')

            // arrange - changed time
            node.getCurrentDate = function() { return moment.parseZone('2020-04-12 11:00:00+02:00'); }

            // act
            node.emit('input', {});

            // assert - should be outside
            status = node.status();
            status.fill.should.equal('green');
            status.shape.should.equal('ring');
            status.text.should.equal('Apr 13th 08:00 - Apr 13th 10:00 at: Apr 12th 11:00')
        });
    });
});
