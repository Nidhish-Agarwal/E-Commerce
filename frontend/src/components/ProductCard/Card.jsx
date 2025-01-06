import React from 'react'
 
function Card({product}) {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        className="rounded-t-lg w-full h-48 object-cover"
        src={product.images[0]}
        alt={product.title}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
        <h2 className="text-lg font-semibold text-gray-800">{product.rating}</h2>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-800">${product.discountedPrice}</span>
          <span className="text-xl font-bold text-gray-800 line-through">${product.originalPrice}</span>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
