import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

const BookCard = ({ book, token, isExpanded, onExpand, onRemove }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [copiesAvailable, setCopiesAvailable] = useState(book.copiesAvailable);

  const userName = jwtDecode(token).username;

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const response = await axios.get("http://localhost:8000/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const wishlist = response.data.wishlist;
        if (wishlist.includes(book.title)) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    checkIfFavorite();
  }, [book.title, token]);

  const handleFavoriteClick = async () => {
    try {
      if (!isFavorite) {
        await axios.put(
          "http://localhost:8000/wishlist",
          { bookTitle: book.title },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.delete("http://localhost:8000/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { bookTitle: book.title },
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleBuyNowClick = () => {
    setIsModalOpen(true);
  };

  const handleBuyConfirm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/purchase",
        {
          bookTitle: book.title,
          username: userName,
          updateOrders: true, // Add this flag to update orders in a single request
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Order updated:", response.data);
      if (onRemove) {
        onRemove(book.title);
      }
    } catch (error) {
      console.error("Error completing purchase:", error);
    } finally {
      setIsModalOpen(false);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };
  
  return (
    <>
      <motion.div
        className={`max-w-xs rounded overflow-hidden shadow-lg bg-white ${
          isExpanded ? "w-full flex" : "w-full"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={`relative ${isExpanded ? "w-1/3" : ""}`}
          initial={false}
          animate={{ flexBasis: isExpanded ? "33%" : "100%" }}
          transition={{ duration: 0.3 }}
        >
          <img
            className="w-full h-56 object-cover"
            src={book.imageUrl}
            alt={book.title}
          />
          <button
            className="absolute top-2 right-2"
            onClick={handleFavoriteClick}
          >
            <FaHeart
              className={`h-6 w-6 ${
                isFavorite ? "text-red-500" : "text-white"
              }`}
            />
          </button>
          {!isExpanded && (
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
                onClick={handleBuyNowClick}
              >
                Buy Now
              </button>
              <button
                className="bg-gray-700 text-white py-1 px-3 rounded"
                onClick={onExpand}
              >
                View More
              </button>
            </div>
          )}
        </motion.div>
        <motion.div
          className={`px-6 py-4 ${isExpanded ? "w-2/3" : "hidden"}`}
          initial={false}
          animate={{ flexBasis: isExpanded ? "67%" : "0%" }}
          transition={{ duration: 0.3 }}
        >
          <div className="font-bold text-lg mb-2">{book.title}</div>
          <p className="text-gray-700 text-sm">by {book.author}</p>
          {isExpanded && (
            <>
              <p className="text-gray-700 text-sm mt-4 mb-2">
                {book.description}
              </p>
              <p className="text-gray-700 text-sm mb-2">Genre: {book.genre}</p>
              <p className="text-gray-700 text-sm mb-2">
                Published by: {book.publisher}
              </p>
              <p className="text-gray-700 text-sm mb-2">
                Copies Available: {copiesAvailable}
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={handleBuyNowClick}
                >
                  Buy Now
                </button>
                <button
                  className="bg-gray-700 text-white py-2 px-4 rounded-full"
                  onClick={onExpand}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </motion.div>
        {!isExpanded && (
          <div className="px-6 py-4">
            <div className="font-bold text-lg mb-2">{book.title}</div>
            <p className="text-gray-700 text-sm">by {book.author}</p>
          </div>
        )}
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4">Confirm Purchase</h2>
            <p>Are you sure you want to buy this book?</p>
            <div className="mt-4 flex space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={handleBuyConfirm}
              >
                Buy
              </button>

              <button
                className="bg-gray-700 text-white py-2 px-4 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessMessage && (
        <div className="fixed bottom-4 right-4 flex items-center bg-green-500 text-white p-4 rounded shadow-lg">
          <FaCheckCircle className="mr-2" />
          <span>Purchase successful!</span>
        </div>
      )}
    </>
  );
};

export default BookCard;
