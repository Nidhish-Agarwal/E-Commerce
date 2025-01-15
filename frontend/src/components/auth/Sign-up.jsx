// SignupPage.js
import React, { useState } from 'react';
import validationObject from '../../validation.js';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



function SignupPage() {
  const [error, setError] = useState('');
  const navigateUser = useNavigate();
  const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        file: '',
    })

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        setData({
            ...data,
            [name]: name === 'file' ? files[0] : value,
        });
        console.log(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nameV = validationObject.validateName(data.name);
        const emailV = validationObject.validateEmail(data.email);
        const passV = validationObject.validatePass(data.password);

        if(typeof nameV == 'string' && nameV.length > 1){
            console.log(error)
            return  setError(nameV);
        }
        if(typeof emailV == 'string' && emailV.length > 2){
          console.log(error)
            return  setError(emailV);
        }
        if(typeof passV == 'string' && passV.length > 2){
          console.log(error)
            return  setError(passV);
        }

        setError("");
        console.log(error);

        const formDataBody = new FormData();
        
        formDataBody.append('Name' , data.name);
        formDataBody.append('password', data.password);
        formDataBody.append('email', data.email);
        formDataBody.append('file', data.file);

        try{
          await axios.post('http://localhost:8080/user/signup', formDataBody,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          navigateUser('/');
        }catch(er){
          console.log('Some error occured'+ er.message);
        }

        // axios request
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
          <input
            type="text"
            id="username"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700 font-medium mb-2">Upload File</label>
          <input
            type="file"
            id="file"
            name="file"
            accept='.jpg , .jpeg , .png'
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
        <p className="text-red-600 text-center">{error}</p>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
        >
          Sign Up
        </button>
        <p className="text-center">
            Already have an Account? <Link to={'/login'}>Login In</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
