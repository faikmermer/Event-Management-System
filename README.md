# Event-Management-System

This project is a RESTful API project to manage events and participants using Authentication and Authorisation techniques and Asynchronous Programming in Node.js. The API allows users to register for events, organize events, manage event details, and perform asynchronous tasks such as sending confirmation emails or generating event reports.

## Installation
1. Make sure you have Node.js installed. (To download Node.js: [Node.js Official Site](https://nodejs.org))
2. Make sure you have MongoDB installed. (To dowload MySQL : [MongoDB](https://www.mongodb.com/try/download/community))
3. Install the dependencies:  
   ```bash
   npm install  
4. Development Mode:
   ```bash
    npm run dev
5. Complier and Run
   ```bash
    npm run build
    npm start

## Table of Content
- [Installation](#Installation)
- [Usage](#Usage)
- [Endpoints](#Endpoints)
- [Contributing](#Contributing)
- [License](#License)



## Installation
1. Make sure you have Node.js installed. (To download Node.js: [Node.js Official Site](https://nodejs.org))
2. Make sure you have MongoDB installed. (To dowload MySQL : [MongoDB](https://www.mongodb.com/try/download/community))
3. Install the dependencies:  
   ```bash
   npm install  
4. Development Mode:
   ```bash
    npm run dev
5. Complier and Run
   ```bash
    npm run build
    npm start



## Usage

To use the API, send HTTP requests to the provided endpoints. You can use tools like Postman or cURL to interact with the API.

## Endpoints

### 1. POST /auth/register
* Request Body:
```
{
   "name": "Alice",
   "email": "alice@example.com",
   "password": "password123"
}
```
* Response:
```
{
   "id": "610a4c543f1d2f001e234567",
   "name": "Alice",
   "email": "alice@example.com",
   "role": "User"
}
```
### 2- POST /auth/login
 * Request Body:
```
{
   "email": "alice@example.com",
   "password": "password123"
}
```
* Response:
```
{
   "accessToken": "jwt-token",
   "expiresIn": 3600
}
```

### 3- POST /auth/refresh
* Request Body:
```
{
   "refreshToken": "refresh-token"
}
```
* Response:
```
{
   "accessToken": "new-jwt-token",
   "expiresIn": 3600
}
```

### 4- POST /events [Admin Only]
* Request Body:
```
{
   "title": "Tech Conference 2024",
   "description": "A conference for tech enthusiasts.",
   "date": "2024-11-15",
   "location": "Online",
   "capacity": 100
}
```
* Response:
```
{
   "id": "610a4c543f1d2f001e234568",
   "title": "Tech Conference 2024",
   "description": "A conference for tech enthusiasts.",
   "date": "2024-11-15",
   "location": "Online",
   "capacity": 100,
   "remainingCapacity": 100
}
```
### 5- PUT /events/:id [Admin Only]

* Request Body:
```
{
   "title": "Tech Conference 2024 - Updated",
   "description": "An updated conference for tech enthusiasts.",
   "date": "2024-11-20",
   "location": "Online",
   "capacity": 150
}
```
* Response:
```
{
   "id": "610a4c543f1d2f001e234568",
   "title": "Tech Conference 2024 - Updated",
   "description": "An updated conference for tech enthusiasts.",
   "date": "2024-11-20",
   "location": "Online",
   "capacity": 150,
   "remainingCapacity": 150
}
```
### 6- DELETE /events/:id [Admin Only]
* Response:
```
{
   "message": "Event deleted successfully"
}
```
### 7- POST /events/:id/register
* Response:
```
{
   "message": "You have successfully registered for the event."
}
```

### 8- DELETE /events/:id/unregister
* Response:
```
{
   "message": "You have successfully unregistered from the event."
}
```
### 9- POST /events/:id/report [Admin Only]
* Response:
```
{ "message": "Event report is being generated. You will receive an email once it's }
```
### 10- GET /events/:id/attendees [Admin Only]
* Response:
```
[
  {
    "id": "610a4c543f1d2f001e234569",
    "name": "Alice",
    "email": "alice@example.com"
  },
  {
    "id": "610a4c543f1d2f001e234570",
    "name": "Bob",
    "email": "bob@example.com"
   }
]
```

## Contributing
Contributions are welcome! To contribute to the project, follow these steps:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature-name`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature-name`)
5.  Open a Pull Request

## License
Distributed under the Unlicense License.
