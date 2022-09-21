# SpaceRocks
 
 ## Overview
 SpaceRocks is a an Electron based SPA which allows the user to find asteroids close to the surface of Earth at between any given dates. Asteroid information is also displayed when available. Users can also download data in a CSV format for analysis.

## Installation
Open the project in your IDE of choice. Using a command-line interface, navigate to the ```client``` folder and use the following command to retrieve and install all dependencies:
```
npm install
```

Navigate to the client directory using the CLI and start the application in the command-line using the following commands:
```
cd client
npm run start
```

To end usage, close the application window and use the following command:
```
CTRL + C
```
## Usage
### User Interface
![UI](/img/userInterface.png)
To use SpaceRocks, simply enter a starting date and an end date for your asteroid search.

In the case that a ```Starting Date``` is given, but not an ```End Date```, SpaceRocks will find all close asteroids within a future week of the ```Starting Date```.

In the case that neither a ```Starting Date``` or ```End Date``` are given, SpaceRocks will find all asteroids expected to come close in the next coming week.

### Navigating the Table
![UI](/img/data.png)
Asteroids will be shown in a tabulated form. The user may scroll right to see more data fields, and scroll down to look at more entries within the given timeframe.

To **minimise** the table, click the icon on the bottom right.

### Exporting Data
Data grabbed from SpaceRocks can be exported using the ```Export Data to CSV``` button on the bottom right of the user interface.

## License
Developed by [Aime](https://www.github.com/kai-jinny) (Kai Jin) (2022)

License [MIT](https://choosealicense.com/licenses/mit/)