#------------------------------------------------------------
# Table: governorate
#------------------------------------------------------------
CREATE TABLE governorate(
    id_governorate INT AUTO_INCREMENT NOT NULL,
    name_governorate VARCHAR(50) NOT NULL,
    CONSTRAINT governorate_PK PRIMARY KEY (id_governorate)
) ENGINE=InnoDB;

#------------------------------------------------------------
# Table: city
#------------------------------------------------------------
CREATE TABLE city(
    id_city INT AUTO_INCREMENT NOT NULL,
    name_city VARCHAR(50) NOT NULL,
    id_governorate INT NOT NULL,
    CONSTRAINT city_PK PRIMARY KEY (id_city),
    CONSTRAINT city_governorate_FK FOREIGN KEY (id_governorate) REFERENCES governorate(id_governorate)
) ENGINE=InnoDB;

#------------------------------------------------------------
# Table: property
#------------------------------------------------------------
CREATE TABLE property(
    id_property INT AUTO_INCREMENT NOT NULL,
    name_property VARCHAR(50) NOT NULL,
    type_property VARCHAR(50) NOT NULL,
    price_property DECIMAL(15,3) NOT NULL,
    surface_property FLOAT NOT NULL,
    id_governorate INT NOT NULL,
    id_city INT NOT NULL,
    legal_property VARCHAR(50) NOT NULL,
    construction_permit_property VARCHAR(50) NOT NULL,
    description_property TEXT,
    gmaps_link_property TEXT,
    photo_property TEXT,
    CONSTRAINT property_PK PRIMARY KEY (id_property),
    CONSTRAINT property_governorate_FK FOREIGN KEY (id_governorate) REFERENCES governorate(id_governorate),
    CONSTRAINT property_city_FK FOREIGN KEY (id_city) REFERENCES city(id_city)
) ENGINE=InnoDB;

#------------------------------------------------------------
# Table: statistic
#------------------------------------------------------------
CREATE TABLE statistic(
    id_statistic INT AUTO_INCREMENT NOT NULL,
    id_city INT NOT NULL,
    date_statistic DATE NOT NULL,
    average_price_statistic DECIMAL(15,3) NOT NULL,
    quantity_property_statistic FLOAT NOT NULL,
    CONSTRAINT statistic_PK PRIMARY KEY (id_statistic),
    CONSTRAINT statistic_city_FK FOREIGN KEY (id_city) REFERENCES city(id_city)
) ENGINE=InnoDB;

#------------------------------------------------------------
# Table: ticket
#------------------------------------------------------------
CREATE TABLE ticket(
    id_ticket INT AUTO_INCREMENT NOT NULL,
    name_user_ticket VARCHAR(50) NOT NULL,
    surname_user_ticket VARCHAR(50) NOT NULL,
    mail_user_ticket VARCHAR(255) NOT NULL,
    phone_user_ticket VARCHAR(10) NOT NULL,
    object_ticket VARCHAR(255) NOT NULL,
    content_ticket TEXT NOT NULL,
    date_ticket DATETIME NOT NULL,
    CONSTRAINT ticket_PK PRIMARY KEY (id_ticket)
) ENGINE=InnoDB;



INSERT INTO governorate (id_governorate, name_governorate) VALUES (1, 'Ariana');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (2, 'Beja');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (3, 'Ben Arous');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (4, 'Bizerte');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (5, 'Gabes');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (6, 'Gafsa');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (7, 'Jendouba');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (8, 'Kairouan');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (9, 'Kasserine');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (10, 'Kebili');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (11, 'Kef');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (12, 'Mahdia');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (13, 'Manouba');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (14, 'Medenine');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (15, 'Monastir');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (16, 'Nabeul');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (17, 'Sfax');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (18, 'Sidi Bouzid');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (19, 'Siliana');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (20, 'Sousse');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (21, 'Tataouine');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (22, 'Tozeur');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (23, 'Tunis');
INSERT INTO governorate (id_governorate, name_governorate) VALUES (24, 'Zaghouan');

INSERT INTO city (id_city, name_city, id_governorate) VALUES (1, 'Ariana Ville', 1);
INSERT INTO city (id_city, name_city, id_governorate) VALUES (2, 'La Soukra', 1);
INSERT INTO city (id_city, name_city, id_governorate) VALUES (3, 'Raoued', 1);
INSERT INTO city (id_city, name_city, id_governorate) VALUES (4, 'Ettadhamen', 1);
INSERT INTO city (id_city, name_city, id_governorate) VALUES (5, 'Kalaat el-Andalous', 1);
INSERT INTO city (id_city, name_city, id_governorate) VALUES (6, 'Beja Nord', 2);
INSERT INTO city (id_city, name_city, id_governorate) VALUES (7, 'Beja Sud', 2);
INSERT INTO city (id_city, name_city, id_governorate) VALUES (8, 'Nefza', 2);
INSERT INTO city (id_city, name_city, id_governorate) VALUES (9, 'Teboursouk', 2);
INSERT INTO city (id_city, name_city, id_governorate) VALUES (10, 'Testour', 2);