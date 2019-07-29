/* eslint-disable prefer-named-capture-group */
/* eslint-disable require-unicode-regexp */
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

class ResultProcessor {

    static sendMessage(nrModule, message, outputIndex) {
        const messageContainer = [];
        messageContainer[outputIndex] = message;

        nrModule.send(messageContainer);
    };

    static setStatusFailed(nrModule, stateText)  {
        nrModule.status({
            fill: 'red',
            shape: 'ring',
            text: `${stateText} at: ${ResultProcessor.getStatusTextDate()}`
        });
    };

    static setStatusSuccess(nrModule, stateText, isConditionMet) {
        nrModule.status({
            fill: 'green',
            shape: isConditionMet ? 'dot' : 'ring',
            text: `${stateText} at: ${ResultProcessor.getStatusTextDate()}`
        });
    }

    static getStatusTextDate() {
        return new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour12: false,
            hour: 'numeric',
            minute: 'numeric'
        });
    }
}

module.exports = ResultProcessor;
