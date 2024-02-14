create database BTS;
use BTS;

create table admin(
admID int NOT NULL auto_increment,
fName varchar(100) NOT NULL,
lName varchar(100) NOT NULL,
email varchar(100) NOT NULL,
password varchar(100) NOT NULL,
primary key(admID),
unique(email)
)auto_increment=1000;

create table role(
roleID int not null auto_increment,
roleName varchar(100) not null,
primary key(roleID)
);

create table employee(
empID int NOT NULL auto_increment,
fName varchar(100) not null,
lName varchar(100) not null,
email varchar(100) not null,
roleID int not null,
crtDate Date DEFAULT (CURRENT_DATE()),
updDate Date DEFAULT NULL,
primary key(empID),
foreign key(roleID) references role(roleID)
)auto_increment=100;

create table empprofile(
empID int not null,
username varchar(100) not null unique,
password varchar(100) not null,
foreign key(empID) references employee(empID)
);

create table project(
projID int not null auto_increment,
projName varchar(100)  not null unique,
status varchar(50) not null,
startDate Date not null,
endDate Date not null,
crtDate Date DEFAULT (CURRENT_DATE()),
updDate Date DEFAULT NULL,
primary key(projID)
) auto_increment=200;

create table team(
teamID int not null auto_increment,
teamName varchar(100) not null unique,
admID int not null,
projID int,
crtDate Date DEFAULT (CURRENT_DATE()),
updDate Date DEFAULT NULL,
primary key(teamID),
foreign key(admID) references admin(admID),
foreign key(projID) references project(projID)
)auto_increment=500;

create table projectassign(
assignID int not null auto_increment,
projID int not null,
teamID int not null,
empID int not null,
crtDate Date DEFAULT (CURRENT_DATE()),
updDate Date DEFAULT NULL,
foreign key(projID) references project(projID),
foreign key(teamID) references team(teamID),
foreign key(empID) references employee(empID),
primary key(assignID)
);

create table bug(
bugID int not null auto_increment,
bugName varchar(100) not null,
priority varchar(50) not null,
bugDesc mediumtext not null,
projID int not null,
regBy int not null,
crtTime Time DEFAULT (Current_Time()),
crtDate Date DEFAULT (CURRENT_DATE()),
updDate Date DEFAULT NULL,
foreign key(projID) references project(projID),
foreign key(regBy) references employee(empID),
primary key(bugID)
)auto_increment=400;

create table tracking(
trackID int not null auto_increment,
bugID int not null,
status varchar(50) not null,
assignBy int DEFAULT NULL,
assignTo int DEFAULT NULL,
assignDate Date default null,
assignTime Time default null,
dueDate Date default null,
dueTime time default null,
compDate Date default null,
compTime time default null,
crtDate Date DEFAULT (CURRENT_DATE()),
updDate Date DEFAULT NULL,
foreign key(assignTo) references employee(empID),
foreign key(assignBy) references admin(admID),
foreign key(bugID) references bug(bugID),
primary key(trackID)
);