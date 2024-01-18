INSERT INTO Role (roleID, roleName) VALUES
(1, 'Admin'),
(2, 'Developer'),
(3, 'Tester');

-- Inserting fake data into the Employee table
INSERT INTO Employee (empID, fName, lName, email, roleID, crtDate, updDate) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', 2, '2022-01-01', '2022-01-05'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', 2, '2022-02-01', '2022-02-10'),
(3, 'Bob', 'Johnson', 'bob.johnson@example.com', 3, '2022-03-01', '2022-03-15'),
(4, 'Alice', 'Brown', 'alice.brown@example.com', 3, '2022-04-01', '2022-04-10');


-- Inserting fake data into the Project table
INSERT INTO Project (projID, projName, startDate, endDate, status, crtDate, updDate) VALUES
(1, 'Project A', '2022-01-01', 1641417600, 'Active', '2022-01-01', '2022-01-10'),
(2, 'Project B', '2022-02-01', 1644096000, 'Inactive', '2022-02-01', '2022-02-15'),
(3, 'Project C', '2022-03-01', 1646435200, 'Active', '2022-03-01', '2022-03-10'),
(4, 'Project D', '2022-04-01', 1648761600, 'Active', '2022-04-01', '2022-04-15'),
(5, 'Project E', '2022-05-01', 1651088000, 'Active', '2022-05-01', '2022-05-10');

-- Inserting fake data into the AdminTbl table
INSERT INTO Admin (admID, fName, lName, email, password) VALUES
(1,'Khusha','K', 'james@gmail.com','admin123');

-- Inserting fake data into the Team table
INSERT INTO Team (teamID, admID, teamName, projID, crtDate, updDate) VALUES
(1, 1, 'Team A', 1, '2022-01-01', '2022-01-05'),
(2, 1, 'Team B', 2, '2022-02-01', '2022-02-10'),
(3, 1, 'Team C', 3, '2022-03-01', '2022-03-05'),
(4, 1, 'Team D', 4, '2022-04-01', '2022-04-10'),
(5, 1, 'Team E', 5, '2022-05-01', '2022-05-05');

-- Inserting fake data into the ProjectAssign table
INSERT INTO ProjectAssign (assignID, projID, teamID, empID, crtDate, updDate) VALUES
(1, 1, 1, 1, '2022-01-02', '2022-01-03'),
(2, 1, 1, 2, '2022-01-02', '2022-01-03'),
(3, 2, 2, 3, '2022-02-05', '2022-02-07'),
(4, 3, 3, 4, '2022-03-10', '2022-03-12');
-- Inserting fake data into the Bug table
INSERT INTO Bug (bugID, bugName, priority, bugDesc, projID, regBy, crtDate, updDate) VALUES
(1, 'UI Issue', 1, 'Buttons not aligned', 1, 4, '2022-01-05', '2022-01-08'),
(2, 'Database Error', 2, 'Data not saving', 2, 3, '2022-02-10', '2022-02-12'),
(3, 'Security Flaw', 3, 'Vulnerability in authentication', 3, 4, '2022-03-15', '2022-03-18'),
(4, 'Performance Bug', 1, 'Slow application response', 4, 3, '2022-04-20', '2022-04-22'),
(5, 'Functional Bug', 2, 'Incorrect calculation', 5, 4, '2022-05-05', '2022-05-08');

-- Inserting fake data into the Tracking table
INSERT INTO Tracking (trackID, bugID, assignBY, assignTo, assignTS, dueDate, dueTime, compDate, comptime, status, crtDate, updDate) VALUES
(1, 1, 1, 2, '2022-01-03 10:00:00', '2022-01-10', '12:00:00', '2022-01-08', '14:30:00', 'Completed', '2022-01-03', '2022-01-09'),
(2, 2, 1, 1, '2022-02-08 14:00:00', '2022-02-15', '16:00:00', '2022-02-14', '15:45:00', 'In Progress', '2022-02-08', '2022-02-13'),
(3, 3, 1, 2, '2022-03-18 11:30:00', '2022-03-25', '14:00:00', '2022-03-22', '12:45:00', 'Pending', '2022-03-18', '2022-03-21'),
(4, 4, 1, 2, '2022-04-22 09:00:00', '2022-04-30', '11:30:00', '2022-04-28', '10:15:00', 'Resolved', '2022-04-22', '2022-04-27'),
(5, 5, 1, 1, '2022-05-08 13:45:00', '2022-05-15', '15:30:00', '2022-05-12', '14:00:00', 'Open', '2022-05-08', '2022-05-11');

-- Inserting fake data into the EmpProfile table
INSERT INTO EmpProfile (empID, userName, password) VALUES
(1, 'john_doe', 'password123'),
(2, 'jane_smith', 'securepass'),
(3, 'bob_johnson', 'pass1234'),
(4, 'alice_brown', 'abcd@5678');