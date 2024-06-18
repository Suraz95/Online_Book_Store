import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import {jwtDecode} from "jwt-decode";

const BookCard = ({ book, token, isExpanded, onExpand, onRemove }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [copiesAvailable, setCopiesAvailable] = useState(book.copiesAvailable);

  const userName = jwtDecode(token).username;

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const response = await axios.get("https://online-book-store-ten.vercel.app/wishlist", {
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
          "https://online-book-store-ten.vercel.app/wishlist",
          { bookTitle: book.title },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.delete("https://online-book-store-ten.vercel.app/wishlist", {
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
        "https://online-book-store-ten.vercel.app/purchase",
        {
          bookTitle: book.title,
          username: userName,
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

      // Update the local state to reflect the reduced copies available
      setCopiesAvailable(copiesAvailable - 1);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Error completing purchase:", error);
    } finally {
      setIsModalOpen(false);
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
          className={`relative ${isExpanded ? "w-1/3" : "w-full"}`}
          onClick={onExpand}
        >
          <img
            className="w-full h-48 z-10 object-cover"
            src={book.imageUrl}
            alt={book.title}
          />
        </motion.div>
        <motion.div className={`px-4 py-2 ${isExpanded ? "w-2/3" : "w-full"}`}>
          <div className="font-bold text-lg mb-1">{book.title}</div>
          <p className="text-gray-700 text-sm">Author: {book.author}</p>
          <p className="text-gray-700 text-sm mt-1">
            Price: ${book.price.toFixed(2)}
          </p>
          {isExpanded && (
            <>
              <p className="text-gray-700 text-sm mt-1">
                Description: {book.description}
              </p>
              <p className="text-gray-700 text-sm">Genre: {book.genre}</p>
              <p className="text-gray-700 text-sm">
                Publisher: {book.publisherName}
              </p>
              <p className="text-gray-700 text-sm mt-1">
                Copies Available: {copiesAvailable}
              </p>
              <button
                onClick={onExpand}
                className="ml-auto text-red-500 focus:outline-none text-sm"
              >
                Show Less
              </button>
            </>
          )}
          <div className="flex items-center mt-2">
            <button
              onClick={handleBuyNowClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Buy Now
            </button>
            <button
              onClick={handleFavoriteClick}
              className={`ml-2 ${
                isFavorite ? "text-red-500" : "text-gray-500"
              }`}
            >
              <FaHeart className="h-5 w-5" />
            </button>
            {!isExpanded && (
              <button
                onClick={onExpand}
                className="ml-auto text-gray-500 focus:outline-none text-sm"
              >
                View More
              </button>
            )}
          </div>
          {showSuccessMessage && (
            <div className="flex items-center mt-2">
              <FaCheckCircle className="text-green-500 h-5 w-5 mr-1" />
              <p className="text-green-500 text-sm">Purchase Successful!</p>
            </div>
          )}
        </motion.div>
      </motion.div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2">Confirm Purchase</h2>
            <p className="text-gray-700 text-sm mb-2">
              Are you sure you want to buy "{book.title}" for ${book.price.toFixed(2)}?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded mr-1 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleBuyConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
