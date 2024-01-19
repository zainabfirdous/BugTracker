
ALTER TABLE project
Drop COLUMN endDate;

ALTER TABLE project
ADD COLUMN endDate DATE NOT NULL DEFAULT '2024-01-20';

update project set endDate = "2023-01-01" where projID=5; -->use this command to insert endDate for all projects