# Ecommerce-Follow-Along

## Milestone - 1

This is a full-stack e-commerce project built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It features REST API creation, user authentication, and product management.

### Key Features:

- Secure login and registration system.
- Product and order management with MongoDB.
- Backend built with Node.js and Express, and a React-based frontend.

This project focuses on scalable, real-world development concepts to enhance hands-on skills.

## Milestone - 2

In this milestone we have added the correct folder structure of the project, added required configuring tools and made a login page

### Key Features:

- Project Folder Structure: We learned to make the correct folder strucure of for backend and frontend as per the convention.
- React Setup: Initialised a react application to make the frontend
- Node.js Setup: added express, mongoose, nodemon and cors dependencies to make the backend
- Tailwind CSS: Added Tailwind CSS to enable modern, responsive and utility-based styling
- Login Page: Created the first user interface of the application with appropriate functioning and styling

## Milestone - 3

In this milestone we have set up dedicated folders for organizing backend code effectively and connected to MongoDB

### Key Features:

- Created correct folder structure for handling backend code
- Used Node.js and Express to create backend server
- Integrated MongoDB for data storage.
- Connected the server and MongoDB.
- Provided Clear Error messages for Debugging.

## Milestone - 4

In this Milestone we have created a User Model for our database, set up controller to handle user-realted data, and enabled filed uploads using Multer

### Key Features:

- Created a User Model which is like a blueprint of how our user's data will be stored in the database;
- Created a User Controller to manage what happens with user data
- Enabled and configured Multer to allow to accept and store files uploaded by users

## Milestone - 5

In this milestone we have properly set up the login and signup pages with proper validation and have also added routing in react

### Kye Features:

- Created a signup page with Name, Email, Password, and file upload.
- Added proper form validation is RegEx
- Integrated that form validatin in login and signup forms.
- Used react-router-dom for routing through multiple pages

## Milestonee - 6

In this Milestone we have set up sendmail.js file to send verifcation mails to user with jasonwebtokens

### Key Features:

- Used nodemailer to send mails to users
- used JWT to encrypt the data
- learned how to use postman to get data and store it in database

## Milestone - 7

In this Milestone we have set up functions to authenticate user during login and signup and encrypt their password

### Key Features:

- Created two routes signup and login
- For Signup:

  - Take the data which is sent by the user.
  - If the user is already present in DB then throw error
  - If not then create a new user and encrypt their password and store it.

- For login:
  - Take the data which is sent by the user.
  - If the user is present in the DB then check if the credentials are correct.
  - If the user is not present then throw an error.
