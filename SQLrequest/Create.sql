CREATE TABLE users (
  user_id SERIAL , 
  lastname VARCHAR(50) NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(300) NOT NULL,
  PRIMARY KEY(user_id)
);

CREATE TABLE wine_designation (
  designation_id SERIAL , 
  designation_name VARCHAR(60) NOT NULL,
  PRIMARY KEY(designation_id)
);

CREATE TABLE bottle_size (
  bottle_size_id SERIAL , 
  bottle_name VARCHAR(50)  NOT NULL,
  size Numeric  NOT NULL,
  PRIMARY KEY(bottle_size_id)
);

CREATE TABLE designation_user (
  designation_id INT NOT NULL, 
  user_id INT NOT NULL,
  FOREIGN KEY(designation_id) 
	REFERENCES wine_designation(designation_id)
	ON DELETE CASCADE,
  FOREIGN KEY(user_id) 
	REFERENCES users(user_id)
	ON DELETE CASCADE
);

CREATE TABLE bottle_size_user (
  bottle_size_id INT NOT NULL, 
  user_id INT NOT NULL,
  FOREIGN KEY(bottle_size_id) 
	REFERENCES bottle_size(bottle_size_id)
	ON DELETE CASCADE,
  FOREIGN KEY(user_id) 
	REFERENCES users(user_id)
	ON DELETE CASCADE
);

