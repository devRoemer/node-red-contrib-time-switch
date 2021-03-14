/* eslint-disable max-lines-per-function */
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

module.exports = function(RED) {

    const InputReader = require('./input-reader');
    const DateComparator = require('./date-comparator');
    const ResultProcessor = require('./result-processor');
    const DateUtils = require('./date-utils');

    RED.nodes.registerType('time-switch', function(config) {
        RED.nodes.createNode(this, config);

        this.getCurrentDate = function() {
            return DateUtils.getCurrent();
        }

        this.on('input', msg => {
            try {
                this.now = this.getCurrentDate();
                const inputReader = new InputReader(msg, this.context(), config);
                const start = inputReader.getDateStart(this.now);
                const end = inputReader.getDateEnd(this.now);

                const isWithinRange = DateComparator.isWithinRange(start, end, this.now);

                const outputIndex = isWithinRange ? 0 : 1;
                ResultProcessor.sendMessage(this, msg, outputIndex);

                const successText = `${start.format('MMM Do HH:mm')} - ${end.format('MMM Do HH:mm')}`;
                ResultProcessor.setStatusSuccess(this, successText, isWithinRange, this.now);
            }
            catch (e) {
                ResultProcessor.setStatusFailed(this, e.message, this.now);
            }
        });
    });
};
