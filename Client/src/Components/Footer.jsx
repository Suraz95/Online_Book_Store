import React from 'react';
import footerimg from "../assets/footer/footer.jpg";

const Footer = () => {
  return (
    <footer className="relative bg-gray-800 text-gray-300 py-8">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={footerimg}
          alt="Footer Background"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm">
              Welcome to our online bookstore. We offer a wide range of books from various genres, catering to all book lovers. Join us on a journey through the world of literature.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Popular Categories</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/categories/fiction" className="hover:text-white transition duration-300 ease-in-out">Fiction</a></li>
              <li><a href="/categories/non-fiction" className="hover:text-white transition duration-300 ease-in-out">Non-Fiction</a></li>
              <li><a href="/categories/science" className="hover:text-white transition duration-300 ease-in-out">Science</a></li>
              <li><a href="/categories/romance" className="hover:text-white transition duration-300 ease-in-out">Romance</a></li>
              <li><a href="/categories/children" className="hover:text-white transition duration-300 ease-in-out">Children's Books</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Support</h3>
            <p className="text-sm">
              <strong>Phone:</strong> (123) 456-7890
            </p>
            <p className="text-sm">
              <strong>Email:</strong> support@bookstore.com
            </p>
            <p className="text-sm">
              <strong>Address:</strong> 123 Book Street, Literature City, BK 45678
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" className="hover:text-white transition duration-300 ease-in-out">
                Facebook
              </a>
              <a href="https://www.twitter.com" className="hover:text-white transition duration-300 ease-in-out">
                Twitter
              </a>
              <a href="https://www.instagram.com" className="hover:text-white transition duration-300 ease-in-out">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} Online Bookstore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
