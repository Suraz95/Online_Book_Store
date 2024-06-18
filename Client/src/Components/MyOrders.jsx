import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import OrderCard from './OrderCard';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/my-orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };

  const fetchBooksFromDatabase = async () => {
    try {
      const response = await axios.get('http://localhost:8000/books');
      const publishers = response.data;

      // Flatten the books array from all publishers and publications and include publisher name and publication details in each book object
      const books = publishers.reduce((acc, publisher) => {
        publisher.publications.forEach(publication => {
          const booksWithDetails = publication.publishedBooks.map(book => ({
            ...book,
            publisher: publisher.publisherName, // Add publisher name to each book
            author: publication.author, // Add author name to each book
            genre: publication.genre // Add genre to each book
          }));
          acc = acc.concat(booksWithDetails);
        });
        return acc;
      }, []);

      return books;
    } catch (error) {
      console.error('Error fetching books from database:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await fetchOrders();
        const booksData = await fetchBooksFromDatabase();

        // Filter out orders from booksData based on ordersData
        const booksInOrders = ordersData.map(orderTitle => {
          return booksData.find(book => book.title === orderTitle);
        });

        setOrders(booksInOrders.filter(Boolean));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
        <div className='flex justify-center'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 text-center">Loading...</div>
          ) : error ? (
            <div className="col-span-3 text-center text-red-600">{error}</div>
          ) : orders.length > 0 ? (
            orders.map(order => (
              <OrderCard key={order._id} order={order} />
            ))
          ) : (
            <p className="text-gray-700 col-span-3 text-center">No orders found</p>
          )}
        </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
