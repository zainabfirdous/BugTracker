create database bugtracker;

use bugtracker;

CREATE TABLE Bug (
    bugID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bugName VARCHAR(50) NOT NULL,
    priority BIGINT NULL,
    bugDesc VARCHAR(255) NOT NULL,
    projID INT NULL,
    regBy INT NULL,
    crtDate DATE NULL,
    updDate DATE NULL,
    FOREIGN KEY (projID) REFERENCES Project(projID),
    FOREIGN KEY (regBy) REFERENCES Employee(empID)
);


CREATE TABLE Employee (
    empID INT NOT NULL PRIMARY KEY,
    fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    roleID INT NULL,
    crtDate DATE NULL,
    updDate DATE NULL,
    FOREIGN KEY (roleID) REFERENCES Role(roleID)
);


CREATE TABLE Role (
    roleID INT NOT NULL PRIMARY KEY,
    roleName VARCHAR(30) NOT NULL
);

CREATE TABLE Project (
    projID INT NOT NULL PRIMARY KEY,
    projName VARCHAR(30) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    status VARCHAR(30) NOT NULL,
    crtDate DATE NULL,
    updDate DATE NULL
);

CREATE TABLE Admin(
    admID INT NOT NULL PRIMARY KEY,
    fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

CREATE TABLE Team (
    teamID INT NOT NULL PRIMARY KEY,
    admID INT NOT NULL,
    teamName VARCHAR(30) NOT NULL,
    projID INT NULL,
    crtDate DATE NULL,
    updDate DATE NULL,
    FOREIGN KEY (admID) REFERENCES Admin(admID),
    FOREIGN KEY (projID) REFERENCES Project(projID)
);

CREATE TABLE ProjectAssign (
    assignID INT NOT NULL PRIMARY KEY,
    projID INT NULL,
    teamID INT NULL,
    empID INT NULL,
    crtDate DATE NULL,
    updDate DATE NULL,
    FOREIGN KEY (projID) REFERENCES Project(projID),
    FOREIGN KEY (empID) REFERENCES Employee(empID),
    FOREIGN KEY (teamID) REFERENCES Team(teamID)
);

CREATE TABLE Tracking (
    trackID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bugID INT NULL,
    assignBY INT NOT NULL,
    assignTo INT NULL,
    assignTS TIMESTAMP NOT NULL,
    dueDate DATE NULL,
    dueTime TIME NOT NULL,
    compDate DATE NOT NULL,
    comptime TIME NOT NULL,
    status VARCHAR(30) NOT NULL,
    crtDate DATE NOT NULL,
    updDate DATE NOT NULL,
    FOREIGN KEY (bugID) REFERENCES Bug(bugID),
    FOREIGN KEY (assignBY) REFERENCES Admin(admID),
    FOREIGN KEY (assignTo) REFERENCES Employee(empID)
);


CREATE TABLE EmpProfile (
    empID INT NOT NULL,
    userName VARCHAR(30) NULL,
    password VARCHAR(50) NULL,
    FOREIGN KEY (empID) REFERENCES Employee(empID)
);

show tables;