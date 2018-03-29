# Driven
A reservation app for electric vehicle charging stations at UBC. 




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

Download and set up Expo Simulator 

### Prerequisites


### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Trouble Shooting

### QR Code does not scan

If you're not able to scan the QR code, make sure your phone's camera is focusing correctly, and also make sure that the contrast on the two colors in your terminal is high enough. For example, WebStorm's default themes may [not have enough contrast](https://github.com/react-community/create-react-native-app/issues/49) for terminal QR codes to be scannable with the system barcode scanners that the Expo app uses.

If this causes problems for you, you may want to try changing your terminal's color theme to have more contrast, or running Create React Native App from a different terminal. You can also manually enter the URL printed by the packager script in the Expo app's search bar to load it manually.


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc





