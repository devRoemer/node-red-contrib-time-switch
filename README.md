## Node-RED Time Switch

A simple Node-RED node that routes messages depending on the time. If the current time falls within the range specified
in the node configuration, the message is routed to output 1. Otherwise the message is routed to output 2.


### Installation
 
Change the directory to your node red installation:

    $ npm install node-red-contrib-time-range-switch
 
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
