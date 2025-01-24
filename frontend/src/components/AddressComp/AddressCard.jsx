import React, { useState } from "react";

const AddressCard = () => {
  const [formData, setFormData] = useState({
    city: "",
    country: "",
    address1: "",
    address2: "",
    zipcode: "",
    addressType: "home",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // You can add form submission logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">Enter Your Address</h2>

      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium mb-1">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
          placeholder="Enter your city"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium mb-1">
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
          placeholder="Enter your country"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address1" className="block text-sm font-medium mb-1">
          Address 1
        </label>
        <input
          type="text"
          id="address1"
          name="address1"
          value={formData.address1}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
          placeholder="Enter your address"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address2" className="block text-sm font-medium mb-1">
          Address 2
        </label>
        <input
          type="text"
          id="address2"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
          placeholder="Enter additional address details"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="zipcode" className="block text-sm font-medium mb-1">
          Zipcode
        </label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
          placeholder="Enter your zipcode"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="addressType" className="block text-sm font-medium mb-1">
          Address Type
        </label>
        <select
          id="addressType"
          name="addressType"
          value={formData.addressType}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
          required
        >
          <option value="home">Home</option>
          <option value="office">Office</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300"
      >
        Submit
      </button>
    </form>
  );
};

export default AddressCard;
