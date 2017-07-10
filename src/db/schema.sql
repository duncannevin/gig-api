CREATE DATABASE IF NOT EXISTS gig_app;

USE gig_app;


CREATE TABLE IF NOT EXISTS `apps` (
  `id` INTEGER AUTO_INCREMENT UNIQUE,
  `app_id` VARCHAR(100) NOT NULL UNIQUE,
  `access_key` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE IF NOT EXISTS `users` (
  `id` INTEGER AUTO_INCREMENT UNIQUE,
  `app_id` VARCHAR(100) NOT NULL,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `first_name` VARCHAR(40),
  `last_name` VARCHAR(40),
  `profile_pic_url` VARCHAR(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (app_id) REFERENCES apps(app_id)
);


CREATE TABLE IF NOT EXISTS `posted` (
  `id` INTEGER AUTO_INCREMENT UNIQUE,
  `app_id` VARCHAR(100) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `date_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `price_range` VARCHAR(40),
  `skills` VARCHAR(100),
  `project` VARCHAR(100),
   PRIMARY KEY (`id`),
   FOREIGN KEY (`app_id`) REFERENCES apps(app_id),
   FOREIGN KEY (`username`) REFERENCES users(username)
);


CREATE TABLE IF NOT EXISTS `bids` (
  `id` INTEGER AUTO_INCREMENT UNIQUE,
  `app_id` VARCHAR(100) NOT NULL,
  `posted_id` INTEGER NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `price` INTEGER,
  `date_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`app_id`) REFERENCES apps(app_id),
   FOREIGN KEY (`posted_id`) REFERENCES posted(id),
   FOREIGN KEY (`username`) REFERENCES users(username)
);


CREATE TABLE IF NOT EXISTS `gigs` (
  `id` INTEGER AUTO_INCREMENT UNIQUE,
  `app_id` VARCHAR(100) NOT NULL,
  `freelancer` VARCHAR(100) NOT NULL,
  `customer` VARCHAR(100) NOT NULL,
  `price` INTEGER NOT NULL,
  `complete` BOOLEAN,
  `final_price` INTEGER,
  `freelancer_rating` INTEGER,
  `customer_rating` INTEGER,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`app_id`) REFERENCES apps(app_id),
   FOREIGN KEY (`freelancer`) REFERENCES users(username),
   FOREIGN KEY (`customer`) REFERENCES users(username)
);
