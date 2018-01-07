var myConfig ={};

myConfig.SERVER_PORT = 4080;
myConfig.DB_NAME = 'CloudChamberData';
myConfig.DB_USER = 'acdc';
myConfig.DB_PASSWORD=  'acdc';
myConfig.DB_HOST = 'localhost';
myConfig.SERIAL_INTERFACE ='/dev/cu.usbmodem14411';
myConfig.SERIAL_BAUDRATE = 115200;

// these is the data model as stored in the MySQL Database
// Keys must correspond to the table names in the database
// and to the arduino header file JSONKeys.h

myConfig.dataModel = {
    time: new Date(),
    num: 0,
    temp: 0.0,
};

module.exports = myConfig;
