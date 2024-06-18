
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import Sidebar from "../Sidebar";

const Book = () => {
  const [publisherName, setPublisherName] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [copiesAvailable, setCopiesAvailable] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      publisherName: publisherName,
      publications: [
        {
          author: author,
          genre: genre,
          publishedBooks: [
            {
              title: title,
              description: description,
              imageUrl: imageUrl,
              price: parseFloat(price), // Ensure it's parsed as a float number
              totalCopies: parseInt(totalCopies), // Ensure it's parsed as an integer number
              copiesAvailable: parseInt(copiesAvailable)
            }
          ]
        }
      ]
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/dashboard/book', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Book added successfully!');
      // Clear form inputs after successful submission
      setPublisherName('');
      setTitle('');
      setAuthor('');
      setGenre('');
      setDescription('');
      setImageUrl('');
      setTotalCopies('');
      setCopiesAvailable('');
      setPrice('');
    } catch (error) {
      console.error('Error adding book:', error.response ? error.response.data : error.message);
      toast.error('Error adding book');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-grow flex justify-center items-center m-6 md:m-20">
        <motion.div 
          className="w-full max-w-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Add Book Details
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="publisherName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Publisher Name:
                </label>
                <input
                  type="text"
                  id="publisherName"
                  value={publisherName}
                  onChange={(e) => setPublisherName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="author"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Author:
                </label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="genre"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Genre:
                </label>
                <select
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select Genre</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-fiction">Non-fiction</option>
                  <option value="Romance">Romance</option>
                  <option value="Mystery/Thriller">Mystery/Thriller</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Horror">Horror</option>
                  <option value="Novel">Novel</option>
                  <option value="Historical Fiction">Historical Fiction</option>
                  <option value="Biography/Memoir">Biography/Memoir</option>
                  <option value="Self-help/Personal Development">
                    Self-help/Personal Development
                  </option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="imageUrl"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Image URL:
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="totalCopies"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Total no. of copies:
                </label>
                <input
                  type="number"
                  id="totalCopies"
                  value={totalCopies}
                  onChange={(e) => setTotalCopies(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="copiesAvailable"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  No of copies available:
                </label>
                <input
                  type="number"
                  id="copiesAvailable"
                  value={copiesAvailable}
                  onChange={(e) => setCopiesAvailable(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                >
                  Add Book
                </motion.button>
                <Link
                  to="/dashboard"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Dashboard
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Book;
