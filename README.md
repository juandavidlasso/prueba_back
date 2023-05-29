# Steps to test the JSON RESTful API

The JSON API RESTful was developed in NodeJS, express, Postgres database and ORM Sequelize.

# Steps to create database

1. In my case I use the Postgres client pgAdmin4.

2. To create the database from pgAdmi4, in the left panel, where it says Servers -> PostgreSQL 15 -> Databases right click, create -> Database...

3. Write database name prueba_back.
(The password must be JUAN123 or change the password with your current password in config/config.js)

4. With these steps the database will be created, if you want to create it by console, attached are the creation scripts.

# Steps to test the JSON RESTful API

1. Clone the repository, open a terminal inside the project, and run the `npm i` command to install the dependencies.

2. Inside the src folder of the project, I run the following command to migrate the tables to the database `npx sequelize-cli db:migrate`

3. Inside the src folder of the project, I run the following command to migrate the rider records `npx sequelize-cli db:seed --seed 20230528180411-riders-data.js`

4. Inside the src folder of the project, I run the following command to migrate the driver registrations `npx sequelize-cli db:seed --seed 20230528184846-drivers-data.js`

5. With these steps the tables will be left with test records.


# Steps to test the WOMPI API

1. Inside the src folder, run the `npm run dev` command to initialize the server, by default it should start on port 3000.

2. With postman, make a POST request to the following url http://localhost:3000/rider/payment-method

3. In the raw type body tab, send the data in this format
{
    "name": "Diego",
    "document": "909090",
    "email": "diego@gmail.com",
    "typePayment": "CARD" | "NEQUI",
    "phone": "3105305169"
}

4. When executing the request, first the pre-signed acceptance token will be obtained, in this case with my personal data, second the token of the card or Nequi payment method will be generated, third if the payment type is CARD, the source will be created payment with CARD, otherwise if it is NEQUI it will be created with the type of payment NEQUI.

5. In the database, in the Riders table, the rider's record will be created with the information provided and in the Payments table, the payment method associated with the rider will be created.

# Steps to request a ride

1. With postman, make a POST request to the following url http://localhost:3000/rider/ride

2. In the raw type body tab, send the data in this format
{
    "document": "909090",
    "latitude": 1530,
    "longitude": 1620
}
(The request validates if the user exists, otherwise it informs him that he does not exist.)

3. When executing the request, the race will be created for the user and a random driver will be assigned.

5. In the database in the Rides table, the record of the race will be inserted associating the driver and the user.


# Steps to complete a ride

1. With postman, make a POST request to the following url http://localhost:3000/driver

2. In the raw type body tab, send the data in this format
{
    "idRide": "1"
}
(The id of the race must be some record that is already created in the database in the Rides Table, otherwise it indicates that the race does not exist.)

3. Please, wait some minutes to create difference between the start time of the ride an the finish time the ride.

4. When executing the request, the total to be paid is calculated taking into account the km, time and fee, a record is created in the database in the Rides table with the same information of the user with the status completed, and the transaction is created.


# These are all the steps
