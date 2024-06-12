import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../Sidebar";

const Book = () => {
  const [publication, setPublication] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [copiesAvailable, setCopiesAvailable] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      publisher: publication, // Ensure this matches your server schema
      title,
      author,
      genre,
      description,
      imageUrl,
      totalCopies,
      copiesAvailable,
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/dashboard/book', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Book added successfully!');
      setPublication('');
      setTitle('');
      setAuthor('');
      setGenre('');
      setDescription('');
      setImageUrl('');
      setTotalCopies('');
      setCopiesAvailable(0);
    } catch (error) {
      console.error('Error adding book:', error.response ? error.response.data : error.message);
      toast.error('Error adding book');
    }
  };

  return (
    <>
    <Sidebar/>
    <div className="flex justify-center items-center h-screen m-20">
      <div className="w-full max-w-xl">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold mb-6 text-center">
            Add Book Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="publication"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Publication:
              </label>
              <input
                type="text"
                id="publication"
                value={publication}
                onChange={(e) => setPublication(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
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
                Total no.of  copies:
              </label>
              <input
                type="number"
                id="copiesAvailable"
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
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              >
                Add Book
              </button>
              <Link
                to="/dashboard"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Dashboard
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Book;
