use BTS;

INSERT INTO admin (fName, lName, email, password)
VALUES ("Alia", "Kapoor", "alia@gmail.com", "1234@abc");

insert into role(roleName)
values("Admin"),("Developer"),("Tester");

insert into employee(fName, lName, email, roleID)
values("Sachin","Patidar","sachin@gmail.com",2),("Anushka","Bajpai","anushka@gmail.com",3),("Veena","Dubey","veena@gmail.com", 3),("Rohan","Patinge","rohan@gmail.coom",2),("Zainab","Firdous","zainab@gmail.com",2);

insert into empprofile
values(100,"sachin","1234@a"),(101,"anushka","1234@ab"),(102,"veena","1234@abc"),(103,"rohan","1234@A"),(104,"zainab","1234@AB");

insert into project(projName, status, startDate, endDate)
values("Smart Home Security","Active","2024-03-15","2024-07-31"),("Recommendation Engine","Completed","2024-01-05","2024-02-02"),
("E-commerce App","Active","2024-02-12","2024-04-11"), ("Inventory Management System","Inactive","2023-12-20","2024-03-15"),
("Customer Feedback Portal","Active","2024-01-10","2024-06-30");
    
insert into team(teamName, admID, projID)
values("Development Team",1000,200),("Quality Assurance Team",1000,200),("Mobile Development Team",1000,202),("Front End Development",1000,204);

insert into projectassign(projID, teamID, empID)
values(200, 500, 100),(200, 501, 102),(202, 502, 104),(204, 503, 103),(202, 502, 101),(204, 503, 101);

insert into bug(bugName, priority, bugDesc, projID, regBy)
values("Login Page Error","Critical","Users unable to login due to server error.",200, 102),
("Database Connection Issue","Medium","Application intermittently loses connection with the database.",200, 102),
("Search Functionality Not Working","High","Users unable to search for products on the platform.",202,101),
("Homepage Layout Broken in Safari Browser","Low","Layout of homepage elements distorted in Safari browser.",204,101),
("Crash on iOS Devices","Critical","App crashes frequently on iPhones running iOS 15.",202,101);

insert into tracking(bugID, status)
values(400,"New"),(401,"New"),(402,"New"),(403,"New"),(404,"New");