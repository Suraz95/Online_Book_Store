import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import Navbar from './Navbar';


const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.wishlist;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return [];
    }
  };

  const fetchBooksFromDatabase = async () => {
    try {
      const response = await axios.get('http://localhost:8000/books');
      const publishers = response.data;

      // Flatten the books array from all publishers and include publisher name in each book object
      const books = publishers.reduce((acc, publisher) => {
        const booksWithPublisher = publisher.books.map(book => ({
          ...book,
          publisher: publisher.name // Add publisher name to each book
        }));
        return acc.concat(booksWithPublisher);
      }, []);
      
      return books;
    } catch (error) {
      console.error('Error fetching books from database:', error);
      return [];
    }
  };

  useEffect(() => {
    const populateWishlist = async () => {
      const wishlistData = await fetchWishlist();
      const booksData = await fetchBooksFromDatabase();
      const booksInWishlist = wishlistData.map(bookTitle => {
        return booksData.find(book => book.title === bookTitle);
      });
      setWishlist(booksInWishlist.filter(Boolean));
    };

    populateWishlist();
  }, []);

  const handleExpand = (book) => {
    setExpandedBook(expandedBook === book ? null : book);
  };

  const handleRemoveFromWishlist = (bookTitle) => {
    setWishlist(wishlist.filter(book => book.title !== bookTitle));
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.length > 0 ? (
          wishlist.map((book, index) => (
            <BookCard
              key={index}
              book={book}
              token={localStorage.getItem('token')}
              isExpanded={expandedBook === book}
              onExpand={() => handleExpand(book)}
              onRemove={handleRemoveFromWishlist} // Pass the onRemove prop
            />
          ))
        ) : (
          <p className="text-gray-700">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  
    </>
  );
};

export default Wishlist;
