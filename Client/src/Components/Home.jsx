// src/App.js
import React from 'react';
import HeroCarousel from './courasel/HeroCourasel';
import Courasel1 from "../assets/Couraselpics/Courasel1.jpg"
import Courasel2 from "../assets/Couraselpics/Courasel2.jpg"
import Courasel3 from "../assets/Couraselpics/Courasel3.jpg"
const App = () => {
  const slides = [
    {
      image: Courasel1,
      title: 'Explore the Wonders of the World',
      subtitle: 'Join us on an unforgettable journey as we explore the most breathtaking destinations across the globe. Whether you seek adventure, relaxation, or cultural immersion, our tours are designed to cater to all your desires. Embark on a journey of a lifetime and create memories that will last forever.',
      buttonText: 'Discover More',
      link: '#',
    },
    {
      image:  Courasel3,
      title: 'Experience the Beauty of Nature',
      subtitle: 'Reconnect with nature in the most pristine and awe-inspiring landscapes. From majestic mountains to serene beaches, our tours offer an escape from the hustle and bustle of everyday life. Experience the tranquility and beauty of nature with our expertly crafted itineraries.',
      buttonText: 'Explore Tours',
      link: '#',
    },
    {
      image:   Courasel2,
      title: 'Discover Cultural Treasures',
      subtitle: 'Immerse yourself in the rich and diverse cultures of the world. Our cultural tours are designed to give you an in-depth understanding of the history, traditions, and people that make each destination unique. Discover hidden gems and iconic landmarks with our knowledgeable guides.',
      buttonText: 'Book Now',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroCarousel slides={slides} />
    </div>
  );
};

export default App;
