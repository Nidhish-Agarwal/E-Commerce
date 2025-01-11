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

## Milestone - 8

In this milestone we have created the card component

### Key Features:

- Created the dynamic card component
- loaded information of each card using props passed to it

## Milestone - 9

In this milestone we have created the products entry page

### Key Features:

- Created a react file for product entry page
- Added basic funtionality to add images and handle change
- Added the functionality to check the contents while submitting the data
- when the data is correct it gets saved in the database

## Milestone - 10

In this milestone we have written the product schema

### Key Features:

- We have made the prodeuct schmea to define the structure using Mongoose
- Built a POST endpoint to receive product data and validate and save the details to MongoDB
- We have used cloudinary to efficiently store and manage photos and video uploads

## Milestone - 11

In this milestone we have added the functionality to fetch all the product details from the database

### Key Features:

- Have added function to fetch the product deatils in product.controller.js
- Added a new route to product.route.js
- Tested this function using Postman get request

## Milestone - 12

In this milestone we are displaying all the products in front end in an organized manner

### Key Features:

- Have added getProducts funtion in HomePage.jsx to fetch all the products using our API endpoint
- After sucessfully fetching the products we have stroed it in a variable
- after stroing the data we have sent each product to the card component to display it in the frontend

## Milestone - 13

In this milestone we have added a update option to our site

### Key Features:

- Have created a update-product API endpoint in the backend
- Have created a frontend form to update the product
- Have learned how to connect the frontend to backend to update the product
- Have used useNavigate hook to go back to the home page after successfully updating the product.
