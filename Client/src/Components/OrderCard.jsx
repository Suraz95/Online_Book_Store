import React from 'react';

const OrderCard = ({ order }) => {
  return (
    <div className="max-w-xs bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <img src={order.imageUrl} alt={order.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{order.title}</h2>
        <p className="text-gray-700 mb-2">Author: {order.author}</p>
        <p className="text-gray-700 mb-2">Genre: {order.genre}</p>
        <p className="text-gray-700 mb-2">Price: ${order.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderCard;
