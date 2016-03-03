# Securities-Case

This is the securities-case project. This project is used as a case when selecting new hires at the company I work for.

Build this project by;

    $ mvn clean install

## Main subprojects

### securities-case-service

securities-case-services implements the services for this application and contains its domain model.
The domain model is simple. There are is an Instrument class and a Price class. An instrument has a code and price.
A price has a timestamp and an amount. The services module contains the InstrumentService (spring component) which can be used to retrieve all instruments with their latest prices. It is also possible to register a InstrumentListener which will callback in case a price of an instrument is updated.
To simulate real instrument price updates a spring scheduler is used which randomly updates prices every second and triggers the callback.


### securities-case-web

securities-case-web implements a REST API to retrieve the instrument list '/instruments' and contains a websocket to retrieve updates of instrument prices.

## The Assignment

Please refactor the index.html to a AngularJS or React page. The page should show all the instruments and their prices.
Instrument price updates should preferably be shown and highlighted in this page using the available WebSocket.

please create a clone of this repository and send me a zip-file or sent me a pull request!
