CREATE DATABASE IF NOT EXISTS gig_app;

USE gig_app;


CREATE TABLE IF NOT EXISTS `apps` (
  `id` INTEGER AUTO_INCREMENT UNIQUE,
  `app_id` VARCHAR(255) NOT NULL UNIQUE,
  `access_key` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE IF NOT EXISTS `users` (
  `id` INTEGER AUTO_INCREMENT UNIQUE,
  `app_id` VARCHAR(255),
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `first_name` VARCHAR(40),
  `last_name` VARCHAR(40),
  `profile_pic_url` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (app_id) REFERENCES apps(app_id)
);


CREATE TABLE IF NOT EXISTS `posted` (
  `id` INTEGER AUTO_INCREMENT UNIQUE,
  `posted_id` VARCHAR(255) UNIQUE,
  `app_id` VARCHAR(255),
  `username` VARCHAR(255),
  `date_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `price_range` VARCHAR(255),
  `skills` VARCHAR(255),
  `description` VARCHAR(1028),
  `price_per` VARCHAR(255),
  `payment_type` VARCHAR(255),
  `type` VARCHAR(255),
   PRIMARY KEY (`id`),
   FOREIGN KEY (app_id) REFERENCES apps(app_id),
   FOREIGN KEY (username) REFERENCES users(username)
);


CREATE TABLE IF NOT EXISTS `bids` (
  `id` INTEGER AUTO_INCREMENT UNIQUE,
  `app_id` VARCHAR(255),
  `posted_id` VARCHAR(255),
  `username` VARCHAR(255),
  `price` VARCHAR(255),
  `date_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   FOREIGN KEY (app_id) REFERENCES apps(app_id),
   FOREIGN KEY (posted_id) REFERENCES posted(posted_id),
   FOREIGN KEY (username) REFERENCES users(username),
   UNIQUE KEY (`username`, `posted_id`)
);


CREATE TABLE IF NOT EXISTS `gigs` (
  `id` INTEGER AUTO_INCREMENT UNIQUE,
  `app_id` VARCHAR(255),
  `freelancer` VARCHAR(255),
  `customer` VARCHAR(255),
  `price` INTEGER,
  `complete` BOOLEAN,
  `final_price` INTEGER,
  `freelancer_rating` INTEGER,
  `customer_rating` INTEGER,
   PRIMARY KEY (`id`),
   FOREIGN KEY (app_id) REFERENCES apps(app_id),
   FOREIGN KEY (freelancer) REFERENCES users(username),
   FOREIGN KEY (customer) REFERENCES users(username)
);
