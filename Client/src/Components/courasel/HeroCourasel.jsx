// src/HeroCarousel.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroCarousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Timer for auto-sliding
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh]">
      <div className="absolute inset-0">
        <img
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4 sm:px-6 md:px-12">
            <motion.h2
              key={currentIndex}
              initial={{ width: 0 }}
              animate={{ width: 'fit-content' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="inline-block overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {slides[currentIndex].title}
            </motion.h2>
            <motion.p
              key={`subtitle-${currentIndex}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={textVariants}
              transition={{ duration: 1, delay: 2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8"
            >
              {slides[currentIndex].subtitle}
            </motion.p>
            {/* <a
              href={slides[currentIndex].link}
              className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 hover:from-orange-500 hover:via-pink-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              {slides[currentIndex].buttonText}
            </a> */}
          </div>
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-1 sm:p-2 rounded-full hover:bg-gray-900 transition duration-300"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-1 sm:p-2 rounded-full hover:bg-gray-900 transition duration-300"
      >
        &#10095;
      </button>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
