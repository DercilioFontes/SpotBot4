# Driven
A reservation app for electric vehicle charging stations at UBC. 

![HomePage](https://github.com/DercilioFontes/SpotBot4/blob/master/docs/login-signup-screen.png =250x500)

## User Action Flow

![Action GIF](https://github.com/DercilioFontes/SpotBot4/blob/master/docs/driven-demo.gif =250x500)

Users can view all parking lots with stations in the map view. Availability status is indicated via colour. Red means all stations at the given location are full, while green indicates atleast one space is available. 

When a green marker is chosen, a list of the individual stations is rendered. The list can be filtered to only show accessible stations if necessary.

Once a reservation is made, a timer for 30 minutes begins. If the driver cancels, the spot becomes available for a new reservation. If the driver fails to arrive, the driver is unable to book the same spot for 2 hours. 

When the driver arrives at the station, a sensor will pick on the car's arrival and unlock the charging port. Once the car is plugged in, this will begin a new timer for 30 minutes of charging.

Once the session is ended by the user, the user has 15 minutes to move their car before security is alerted. When the car is removed, the sensor will pick up the change in status and make the station available for the next client. 


## Table of Contents

 * [Getting Started](#getting-started)
 * [Prerequisites](#prerequisites)
 * [Installing](#installing)
 * [QR Code does not scan](#qr-code-does-not-scan)

## Getting Started

Download and set up Expo Simulator [here](https://docs.expo.io/versions/latest/index.html) or a simulator of your choice.

Alternatively, download the Expo app on your phone.

Before setting up this client side of the app, got to [this repo](https://github.com/pabloaredu/SpotBotServer) and follow the installation instructions. 

### Prerequisites

* Nodejs to run app client side

### Installing

Clone this and navigate to the project in your terminal. Run npm install. 

Next, navigate to your copy of the spotbot server and run it on local host 3000. 

Run npm start in the client side terminal, then scan the QR with your phone or follow the terminal prompts to open your simulator. 

## Trouble Shooting

### QR Code does not scan

If you're not able to scan the QR code, make sure your phone's camera is focusing correctly, and also make sure that the contrast on the two colors in your terminal is high enough. For example, WebStorm's default themes may [not have enough contrast](https://github.com/react-community/create-react-native-app/issues/49) for terminal QR codes to be scannable with the system barcode scanners that the Expo app uses.

If this causes problems for you, you may want to try changing your terminal's color theme to have more contrast, or running Create React Native App from a different terminal. You can also manually enter the URL printed by the packager script in the Expo app's search bar to load it manually.



## Built With

* [React Native](http://www.reactnative.com/)
* [Node js](https://nodejs.org/en/)
* [Expo](https://expo.io/)

## Authors

* [Julia Bartley](https://github.com/bartleyjulia)
* [Pablo Arellano](https://github.com/pabloaredu)
* [Dercilio Fontes](https://github.com/DercilioFontes)
* [Prerana Shrestha](https://github.com/PreranaShrestha)
 

## Acknowledgments

Thank you to all Lighthouse Staff and Mentors who guided our completion of this project! Also to our families who supported us while we spent 12+ hours a day at Ligthhouse during our Web Dev course. 




