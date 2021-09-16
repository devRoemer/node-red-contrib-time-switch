![Project Stage][project-stage-shield]
[![License][license-shield]](LICENSE)

[![Build Status][ci-image]][ci-url]
[![Maintenance][maintenance-image]][maintenance-url]

[![Maintainability][codeclimate-image]][codeclimate-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependencies Status][david-image]][david-url]
[![Known Vulnerabilities](https://snyk.io/test/github/devroemer/node-red-contrib-time-switch/badge.svg)](https://snyk.io/test/github/devroemer/node-red-contrib-time-switch)


[project-stage-shield]: https://img.shields.io/badge/project%20stage-stable-green.svg
[license-shield]: https://img.shields.io/github/license/devRoemer/node-red-contrib-time-switch.svg
[maintenance-image]:https://img.shields.io/badge/Maintained%3F-yes-green.svg
[maintenance-url]:https://github.com/devRoemer/node-red-contrib-time-switch/graphs/commit-activity
[ci-image]:https://github.com/devRoemer/node-red-contrib-time-switch/workflows/CI/badge.svg
[ci-url]:https://github.com/devRoemer/node-red-contrib-time-switch/actions
[coveralls-image]:https://coveralls.io/repos/github/devRoemer/node-red-contrib-time-switch/badge.svg?branch=master
[coveralls-url]:https://coveralls.io/github/devRoemer/node-red-contrib-time-switch?branch=master
[david-image]:https://david-dm.org/devRoemer/node-red-contrib-time-switch.svg
[david-url]:https://david-dm.org/devRoemer/node-red-contrib-time-switch
[codeclimate-image]:https://api.codeclimate.com/v1/badges/177b8f6474cc7ae287a5/maintainability
[codeclimate-url]:https://codeclimate.com/github/devRoemer/node-red-contrib-time-switch/maintainability

## Node-RED Time Switch (Contribution package)

A simple Node-RED node that routes messages depending on the time or sun position.

![Node](https://raw.githubusercontent.com/devRoemer/node-red-contrib-time-switch/master/screenshots/screenshot_node.png)

It is possible to specify a time, the sun position (requires your geo location to be configured) or even a value of the message, the flow or the instance of node red.

![Config](https://raw.githubusercontent.com/devRoemer/node-red-contrib-time-switch/master/screenshots/screenshot_config.png)

### Installation

Change directory to your node red installation and run the following command:

[![NPM](https://nodei.co/npm/node-red-contrib-time-switch.png)](https://nodei.co/npm/node-red-contrib-time-switch/)

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

The start and end time can have an offset. You can use fields here aswell.

This is specified in minutes:

- Negative numbers are bringing the time back. E.g. if the time is dusk and offset is -60, the start time will be 60 minutes before dusk.
- Positive numbers are delaying the time by the specified number of minutes

The offset also supports placeholders:

| Placeholder        | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `{{msg.fieldName}}`       | Access a field of the message (mustache template syntax)       |
| `{{flow.fieldName}}`       | Access a field of the flow (mustache template syntax)       |
| `{{global.fieldName}}`       | Access a global field (mustache template syntax)       |

### Geo location

Specify the latitude and longitude of your geo location or use one of the followng placeolders as value:

| Placeholder        | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `{{msg.fieldName}}`       | Access a field of the message (mustache template syntax)       |
| `{{flow.fieldName}}`       | Access a field of the flow (mustache template syntax)       |
| `{{global.fieldName}}`       | Access a global field (mustache template syntax)       |
