# Grocery Booking System
Grocery Booking API's to order grocery with following requirements.
1. Create User with username, password and role(Admin/User).
    - storing password in encypted manner
    - JWT token is used for authorization and authentication
2. Admin can add new grocery items to the system
3. View existing grocery items (Both user and admin)
4. Admin can remove grocery items from the system
5. Admin can update details of existing grocery items
6. User can book multiple grocery items in a single order
7. Manage inventory levels of grocery items
    - when user is ordering with specified quantity we are checking if inventory is available then only allowing to order.
    - when user is ordering tracking record in inventory too.
8. Error Handling


### Technology Stack
Environment :- NodeJS
Framework :- ExpressJS
Database :- PostgeSQL
ORM :- sequelize
Swagger is used to build, document, test and consume API's 

### Prerequisites

Run the following command to install dependencies:

```shell
npm install
```

### Environment variables

This project depends on some environment variables.
If you are running this project locally, create a `.env` file at the root for these variables.
Your host provider should included a feature to set them there directly to avoid exposing them.

Here are the required ones:

```

PORT = 

DB_HOST = ''
USERNAME = ''
PASSWORD = ''
DB_NAME = ''

DIALECT = ''

```

### Run the project

Run the following command to run the project in development:

```shell
npm run start:dev
```

To test the API following methods we can use :-
1. On postman
2. On Swagger :- localhost:PORT/api-docs

Steps to authorize API's

 - create user with role user or admin
 - execute login API with username and password 
 - copy generated token and pass it for bearer authorization e.g. on swagger :- Bearer {TOKEN}, postman :- can select type as bearer token and pass token
 - execute groceries and order other API's
