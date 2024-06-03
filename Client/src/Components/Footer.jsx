import React from 'react';
import footerimg from "../assets/footer/footer.jpg"
const Footer = () => {
  return (
    <footer className="relative bg-gray-800 text-gray-300 py-6">
      {/* Image Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={footerimg}
          alt="Footer Background"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <a href="/" className="hover:text-white transition duration-600 ease-in-out">Home</a>
            <a href="/about" className="hover:text-white transition duration-600 ease-in-out">About</a>
            <a href="/services" className="hover:text-white transition duration-600 ease-in-out">Services</a>
            <a href="/contact" className="hover:text-white transition duration-600 ease-in-out">Contact</a>
            <a href="/login" className="hover:text-white">Login</a>
          </div>
          <div className="text-sm mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} My Company. All rights reserved.
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="https://www.facebook.com" className="hover:text-white" aria-label="Facebook">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5.024 3.678 9.166 8.437 9.877v-6.988H7.898v-2.89h2.539V9.797c0-2.507 1.492-3.89 3.777-3.89 1.096 0 2.238.196 2.238.196v2.459h-1.261c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.322 21.166 22 17.024 22 12z" />
            </svg>
          </a>
          <a href="https://www.twitter.com" className="hover:text-white" aria-label="Twitter">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.954 4.569c-.885.39-1.83.654-2.825.775 1.014-.61 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.957-2.178-1.554-3.594-1.554-2.724 0-4.928 2.205-4.928 4.928 0 .386.045.762.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.422.722-.664 1.561-.664 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.229-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.113-.849.173-1.296.173-.317 0-.626-.03-.927-.086.627 1.956 2.445 3.379 4.6 3.418-1.685 1.32-3.808 2.105-6.115 2.105-.398 0-.79-.023-1.175-.068 2.179 1.397 4.768 2.214 7.557 2.214 9.054 0 14.002-7.503 14.002-14.002 0-.213-.005-.426-.014-.637.962-.693 1.797-1.56 2.457-2.548l-.047-.02z" />
            </svg>
          </a>
          <a href="https://www.instagram.com" className="hover:text-white" aria-label="Instagram">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.333 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.265-.058 1.645-.07 4.849-.07zm0-2.163C8.73 0 8.332.012 7.052.07 5.749.128 4.602.4 3.682 1.319 2.763 2.238 2.49 3.385 2.432 4.688 2.373 5.968 2.361 6.366 2.361 12c0 5.634.012 6.032.07 7.312.058 1.303.331 2.45 1.25 3.369.919.919 2.066 1.191 3.369 1.25 1.28.058 1.678.07 7.312.07 5.634 0 6.032-.012 7.312-.07 1.303-.058 2.45-.331 3.369-1.25.919-.919 1.191-2.066 1.25-3.369.058-1.28.07-1.678.07-7.312 0-5.634-.012-6.032-.07-7.312-.058-1.303-.331-2.45-1.25-3.369-.919-.919-2.066-1.191-3.369-1.25-1.28-.058-1.678-.07-7.312-.07zM12 5.838a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
