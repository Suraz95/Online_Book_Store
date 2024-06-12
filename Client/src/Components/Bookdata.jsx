import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const BookDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch books data from the server
    axios.get('http://localhost:8000/books', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
      }
    })
    .then(response => {
      // Flatten the books data from the nested publishers structure
      const allBooks = response.data.reduce((acc, publisher) => {
        return acc.concat(publisher.books.map(book => ({ ...book, publisher: publisher.publisher })));
      }, []);
      setBooks(allBooks);
      setLoading(false);
    })
    .catch(error => {
      console.error("There was an error fetching the books data!", error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto ml-48 md:ml-64 p-8 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Book Dashboard</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Publisher</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Author</th>
                <th className="py-2 px-4 border-b">Genre</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Total Copies</th>
                <th className="py-2 px-4 border-b">Available Copies</th>
                <th className="py-2 px-4 border-b">Sold Copies</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{book.publisher}</td>
                  <td className="py-2 px-4 border-b">{book.title}</td>
                  <td className="py-2 px-4 border-b">{book.author}</td>
                  <td className="py-2 px-4 border-b">{book.genre}</td>
                  <td className="py-2 px-4 border-b">{book.description}</td>
                  <td className="py-2 px-4 border-b">
                    <img src={book.imageUrl} alt={book.title} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="py-2 px-4 border-b">{book.totalCopies}</td>
                  <td className="py-2 px-4 border-b">{book.copiesAvailable}</td>
                  <td className="py-2 px-4 border-b">{book.SoldCopies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookDashboard;
