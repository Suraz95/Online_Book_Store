import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import HeroCarousel from './courasel/HeroCourasel';
import Navbar from "./Navbar"
import BookCard from './BookCard';
import Footer from "./Footer"
const App = () => {
  const [booksByGenre, setBooksByGenre] = useState({});
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [expandedBook, setExpandedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
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

        const groupedBooks = books.reduce((acc, book) => {
          const { genre } = book;
          if (!acc[genre]) {
            acc[genre] = [];
          }
          acc[genre].push(book);
          return acc;
        }, {});

        setBooksByGenre(groupedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    const fetchUserInfo = async () => {
      if (!token) return;

      try {
        const response = await axios.get('http://localhost:8000/user/token', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { userId, email } = response.data;
        setUserId(userId);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchBooks();
    fetchUserInfo();
  }, [token]);

  const handleExpand = (bookId) => {
    setExpandedBook(expandedBook === bookId ? null : bookId);
  };

  const slides = [
    {
      image: "https://wallpaperaccess.com/full/464334.jpg",
      title: 'Explore New Arrivals',
      subtitle: 'Discover the latest additions to our collection. Stay ahead with the newest releases in fiction, non-fiction, and more. Find your next great read among our curated selection of new books.',
      buttonText: 'Browse New Arrivals',
      link: '/new-arrivals',
    },
    {
      image:"https://wallpaperaccess.com/full/9457868.jpg",
      title: 'Top Bestsellers',
      subtitle: 'Check out the books everyone is talking about. Our bestsellers section features the most popular and highly acclaimed titles in various genres. Don\'t miss out on these must-read books.',
      buttonText: 'Shop Bestsellers',
      link: '/bestsellers',
    },
    {
      image: "https://wallpaperaccess.com/full/464143.jpg",
      title: 'Exclusive Discounts',
      subtitle: 'Save big on your favorite books with our exclusive offers and discounts. From special promotions to seasonal sales, find great deals on a wide range of titles.',
      buttonText: 'View Offers',
      link: '/offers',
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen">
      <HeroCarousel slides={slides} />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Featured Books by Genre</h2>
        {Object.keys(booksByGenre).map(genre => (
          <div key={genre} className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-center">{genre}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
              {booksByGenre[genre].map(book => (
                <motion.div
                  key={book._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <BookCard
                    key={book._id}
                    book={book}
                    token={token}
                    isExpanded={expandedBook === book._id}
                    onExpand={() => handleExpand(book._id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default App;
