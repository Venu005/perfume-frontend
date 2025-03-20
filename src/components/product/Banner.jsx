import React from "react";

const Banner = ({ images }) => {
  return (
    <div className="relative w-screen overflow-hidden">
      {/* Scrolling images */}
      <div className="flex animate-scroll">
        {images.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-screen h-64">
            <img
              src={src}
              alt={`Banner ${index}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      {/* Text overlay */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
        <h2 className="text-2xl font-bold">Explore the Latest Collections</h2>
        <p className="text-sm">
          Discover our special offers and newest products today.
        </p>
      </div>
    </div>
  );
};

export default Banner;
