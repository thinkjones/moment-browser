var moment = require('./moment-browser'),
    assert = require('assert')
    momentTz = require('moment-timezone')

/**
 *
 1486054800000 === newYorkDate = Thu Feb 02 2017 09:00:00 GMT-0800 (PST)
 1486065600000 === newYorkDateInBrowser set to PST= Thu Feb 02 2017 12:00:00 GMT-0800 (PST)
 1486058400000 === newYorkDateOnePm = Thu Feb 02 2017 10:00:00 GMT-0800 (PST)
 */

// Basic Test 1 - Create a date using a New York Timezone.
var newYorkDate = moment.tz("2017-02-02 12:00", "America/New_York");
var converter = newYorkDate.browserConverter();
var newYorkDateInBrowser = converter.asDisplayTz('America/New_York', 'America/Los_Angeles');
var onePmPST = moment.tz("2017-02-02 13:00", "America/Los_Angeles");
var newYorkDateOnePm = converter.fromDisplayTz(onePmPST);

assert.equal(newYorkDate.toDate().getTime(), 1486054800000);
assert.equal(newYorkDateInBrowser.toDate().getTime(), 1486065600000);
assert.equal(newYorkDateOnePm.toDate().getTime(), 1486058400000);

process.exit(0)
