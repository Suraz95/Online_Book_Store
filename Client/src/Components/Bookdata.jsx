import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const BookDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);
axios.defaults.withCredentials = true;
  const fetchBooks = () => {
    setTimeout(() => {
      axios
        .get("https://online-book-store-ten.vercel.app/books", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setBooks(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
          setError("Failed to fetch data");
          setLoading(false);
        });
    }, 1500);
  };

  const handleDelete = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios
        .delete(`https://online-book-store-ten.vercel.app/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          setBooks((prevBooks) =>
            prevBooks.map((publisher) => ({
              ...publisher,
              publications: publisher.publications.map((publication) => ({
                ...publication,
                publishedBooks: publication.publishedBooks.filter((book) => book._id !== bookId),
              })),
            }))
          );
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
          setError("Failed to delete book. Please try again later."); // Update error state or display a notification
        });
    }
  };
  

  const handleEdit = (book) => {
    setEditBook(book);
  };

  const handleSaveEdit = (updatedBook) => {
    axios
      .put(`https://online-book-store-ten.vercel.app/books/${updatedBook._id}`, updatedBook, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        fetchBooks(); // Refresh books list after edit
        setEditBook(null); // Hide edit form
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  const handleCancelEdit = () => {
    setEditBook(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader animate-bounce"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto ml-48 md:ml-64 p-8 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Book Dashboard
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b">Publisher</th>
                <th className="py-2 px-4 border-b">Author</th>
                <th className="py-2 px-4 border-b">Genre</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Total Copies</th>
                <th className="py-2 px-4 border-b">Available Copies</th>
                <th className="py-2 px-4 border-b">Sold Copies</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((publisher) =>
                publisher.publications.map((publication) =>
                  publication.publishedBooks.map((book, index) => (
                    <tr
                      key={book._id}
                      className={index % 2 === 0 ? "bg-gray-50" : ""}
                    >
                      {index === 0 && (
                        <>
                          <td
                            className="py-2 px-4 border-b"
                            rowSpan={publication.publishedBooks.length}
                          >
                            {publisher.publisherName}
                          </td>
                          <td
                            className="py-2 px-4 border-b"
                            rowSpan={publication.publishedBooks.length}
                          >
                            {publication.author}
                          </td>
                          <td
                            className="py-2 px-4 border-b"
                            rowSpan={publication.publishedBooks.length}
                          >
                            {publication.genre}
                          </td>
                        </>
                      )}
                      <td className="py-2 px-4 border-b">{book.title}</td>
                      <td className="py-2 px-4 border-b">{book.price}</td>
                      <td className="py-2 px-4 border-b">{book.totalCopies}</td>
                      <td className="py-2 px-4 border-b">
                        {book.copiesAvailable}
                      </td>
                      <td className="py-2 px-4 border-b">{book.soldCopies}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleEdit(book)}
                          className="bg-[#243137] text-yellow-600 py-1 px-3 mr-2 mb-2 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="bg-[#243137] text-yellow-600 py-1 px-3 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      {editBook && (
        <EditBookForm
          book={editBook}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

const EditBookForm = ({ book, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...book });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-1/2">
        <h2 className="text-2xl mb-4">Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total Copies</label>
            <input
              type="number"
              name="totalCopies"
              value={formData.totalCopies}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Available Copies</label>
            <input
              type="number"
              name="copiesAvailable"
              value={formData.copiesAvailable}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Sold Copies</label>
            <input
              type="number"
              name="soldCopies"
              value={formData.soldCopies}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookDashboard;
