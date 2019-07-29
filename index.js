/* eslint-disable max-lines-per-function */
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

module.exports = function(RED) {

    const moment = require('moment');

    const PlaceholderParser = require('./placeholder-parser');
    const DateParser = require('./date-parser');
    const DateComparator = require('./date-comparator');
    const ResultProcessor = require('./result-processor');

    RED.nodes.registerType('time-switch', function(config) {
        RED.nodes.createNode(this, config);

        this.on('input', msg => {
            try {
                const parser = new PlaceholderParser(this.context(), msg);

                const startMoment = this.getParsedMoment(config.startTime, config.startOffset, parser, config.lat, config.lon);
                const endMoment = this.getParsedMoment(config.endTime, config.endOffset, parser, config.lat, config.lon);

                const isWithinRange = DateComparator.isWithinRange(startMoment, endMoment, this.now());

                const outputIndex = isWithinRange ? 0 : 1;
                ResultProcessor.sendMessage(this, msg, outputIndex);

                const successText = `${startMoment.format('HH:mm')} - ${endMoment.format('HH:mm')}`;
                ResultProcessor.setStatusSuccess(this, successText, isWithinRange);
            }
            catch (e) {
                ResultProcessor.setStatusFailed(this, e.message);
            }
        });

        this.now = function() {
            return moment();
        };

        this.getParsedMoment = function(timeString, offset, placeholderParser, lat, lon) {
            const parsedTime = placeholderParser.getParsedValue(timeString);
            const parsedMoment = DateParser.momentFor(parsedTime, this.now(), lat, lon);

            if (!parsedMoment) {
                throw new Error(`'${parsedTime}' is no valid time`);
            }

            const parsedOffset = placeholderParser.getParsedValue(offset);
            parsedMoment.add(parsedOffset, 'minutes');
            return parsedMoment;
        };
    });
};
