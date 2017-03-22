Custom TimeZone Converted in the Browser [![Build Status](https://travis-ci.org/thinkjones/moment-browser.png?branch=master)](https://travis-ci.org/thinkjones/moment-browser)
==================================================

moment-browser.js is an extension to moment.js that helps convert Dates to/from the Browser Timezone to the TimeZone 
required by your browser based applications.  E.g. You have a datepicker which the user expects to be in New York TZ, 
but you are using the application in the Pacific Timezones.  When you display your server provided UTC Date Times 
they will show in the Browser TZ.  This moment extension will create a new Date which helps offset the difference between
the browser TZ and the TZ required by the application.

### Usage

Works with browser environments.


```html
<!-- Browser -->
<script type="text/javascript" src="/moment.js"></script>
<script type="text/javascript" src="/moment-browser.js"></script>
<script type="text/javascript">

// Create a date in New York Time
var newYorkDate = momentBrowser.tz("2017-02-02 12:00", "America/New_York");

// Grab converter object to faciliate Browser <-> Tz Conversion
var converter = newYorkDate.browserConverter();

// Display a date as New York DateTime in a Los_Angeles based browser 
var newYorkDateInBrowser = converter.asDisplayTz('America/New_York', 'America/Los_Angeles');

// The Application then changes the date time to 1pm.  User perception is that it is 1pm New York Time.
// Therefore we have to convert back inorder to persist correctly.
var onePmPST = momentBrowser.tz("2017-02-02 13:00", "America/Los_Angeles");
// Then we want to convert that back to the correct UTC time.
var newYorkDateOnePm = converter.fromDisplayTz(onePmPST)
console.log('newYorkDateOnePm = ' + newYorkDateOnePm.toDate());

</script>
```

### Methods

#### `moment().browserConverter()`

Creates a converter helper object which handles conversion to and from the Browser TZ.

```
var newYorkDate = momentBrowser.tz("2017-02-02 12:00", "America/New_York");
var converter = newYorkDate.browserConverter();
```

#### `converter.asDisplayTz(displayTimeZone, <browserTimeZone>);`
Creates a new date object which is a datetime modified to replicate the display timezone.
browserTimeZone is optional the code will try and guess it.

```
var newYorkDateInBrowser = converter.asDisplayTz('America/New_York');
var newYorkDateInBrowser = converter.asDisplayTz('America/New_York', 'America/Los_Angeles');
```

#### `converter.fromDisplayTz(date);`
Now a user makes a selection in the UI and changes the DateTime.  On the workflow back to the server we need to convert
this date back to it's correct current browser TimeZone value.
```
var onePmPST = momentBrowser.tz("2017-02-02 13:00", "America/Los_Angeles");
var newYorkDateOnePm = converter.fromDisplayTz(onePmPST)
```
