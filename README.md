[![Build Status](https://travis-ci.com/huzergackl/node-red-time-switch.svg?branch=master)](https://travis-ci.com/huzergackl/node-red-time-switch) [![Coverage Status](https://coveralls.io/repos/github/huzergackl/node-red-time-switch/badge.svg?branch=master)](https://coveralls.io/github/huzergackl/node-red-time-switch?branch=master)


## Node-RED Time Switch

A simple Node-RED node that routes messages depending on the time or sun position.

![Node](https://raw.githubusercontent.com/huzergackl/node-red-time-switch/master/screenshots/screenshot_node.png)

It is possible to specify a time, the sun position (requires your geo location to be configured) or even a value of the message, the flow or the instance of node red.

![Config](https://raw.githubusercontent.com/huzergackl/node-red-time-switch/master/screenshots/screenshot_config.png)

This is basically a rewrite of biddsters module node-red-contrib-time-range-switch. It has the same features with additional fixes and features. Thanks [@biddster](https://github.com/biddster/node-red-contrib-time-range-switch) for providing the base for this plugin.


### Installation
 
Change the directory to your node red installation:

    $ npm install node-red-time-switch
 
### Configuration 
    
The times can be a 24 hour time or a [suncalc](https://github.com/mourner/suncalc) event:


| Time        | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `00:00 ... 23:59`       | 24hr time (without seconds)                    |
| `sunrise`       | sunrise (top edge of the sun appears on the horizon)                     |
| `sunriseEnd`    | sunrise ends (bottom edge of the sun touches the horizon)                |
| `goldenHourEnd` | morning golden hour (soft light, best time for photography) ends         |
| `solarNoon`     | solar noon (sun is in the highest position)                              |
| `goldenHour`    | evening golden hour starts                                               |
| `sunsetStart`   | sunset starts (bottom edge of the sun touches the horizon)               |
| `sunset`        | sunset (sun disappears below the horizon, evening civil twilight starts) |
| `dusk`          | dusk (evening nautical twilight starts)                                  |
| `nauticalDusk`  | nautical dusk (evening astronomical twilight starts)                     |
| `night`         | night starts (dark enough for astronomical observations)                 |
| `nadir`         | nadir (darkest moment of the night, sun is in the lowest position)       |
| `nightEnd`      | night ends (morning astronomical twilight starts)                        |
| `nauticalDawn`  | nautical dawn (morning nautical twilight starts)                         |
| `dawn`          | dawn (morning nautical twilight ends, morning civil twilight starts)     |
| `{{msg.fieldName}}`       | Access a field of the message (mustache template syntax)       |
| `{{flow.fieldName}}`       | Access a field of the flow (mustache template syntax)       |
| `{{global.fieldName}}`       | Access a global field (mustache template syntax)       |

Placeholders with prefix msg, flow or global are replaced by the corresponding field value.

### Offsets

The start and end time can have an offset. This is specified in minutes:
- -ve number brings the time forward. E.g. if the time is dusk and offset is -60, the start time will be 60 minutes before dusk.
- +ve number delays the time by the specified number of minutes
