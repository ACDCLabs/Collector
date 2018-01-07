drop Schema if exists CloudChamberData;
Create Database if NOT EXISTS  CloudChamberData;

Grant ALL on CloudChamberData.* to acdc@localhost;
Grant ALL on CloudChamberData.* to acdc;

USE CloudChamberData;


/* JSON keys as defined in the arduino header file JSONKeys.h */
/* the columns in the database should have the sames names */
/*

*/

CREATE TABLE IF NOT EXISTS Temperatures
(
dbId int unsigned not null auto_increment UNIQUE, /* Datenbank ID */
time timestamp(3),
num integer NOT NULL,
temp float,
message varchar(256),
Primary Key (dbId),
Key(time)
) ;
