import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import SmallSliderData from '../../public/data/homeSmallSlider.json';
import BigSliderData from '../../public/data/homeBigSlider.json';

const products = SmallSliderData;

const HomeSlider = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(products[currentProductIndex].timeRemaining);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const currentProduct = products[currentProductIndex];
  const slides = BigSliderData;

  // Küçük Slider için ürün değişimi
  const changeProduct = (direction) => {
    setCurrentProductIndex((prevIndex) =>
      direction === 'prev'
        ? (prevIndex - 1 + products.length) % products.length
        : (prevIndex + 1) % products.length
    );
  };

  // Büyük Slider için slide değişimi
  const changeSlide = (direction) => {
    setCurrentSlideIndex((prevIndex) =>
      direction === 'prev'
        ? (prevIndex - 1 + slides.length) % slides.length
        : (prevIndex + 1) % slides.length
    );
  };

  useEffect(() => {
    setTimeLeft(currentProduct.timeRemaining);
  }, [currentProductIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { days, hours, minutes, secs };
  };

  const { days, hours, minutes, secs } = formatTime(timeLeft);

  return (
    <div className='flex flex-col md:flex-row max-w-[1440px] mx-auto p-2'>
      {/* Büyük Slider */}
      <div className='relative w-full h-[450px] bg-black  md:p-0'>
        <div className='flex justify-between items-center absolute top-0 left-0 right-0 h-full p-4 '>
            <button 
            onClick={() => changeSlide('prev')} 
            className='bg-white rounded-full p-2 z-30' // z-index artırıldı
            >
            <IoChevronBack className='text-gray-500 text-lg' />
            </button>
            
            <button 
            onClick={() => changeSlide('next')} 
            className='bg-white rounded-full p-2 z-30' // z-index artırıldı
            >
            <IoChevronForward className='text-gray-500 text-lg' />
            </button>
        </div>

        <div className='flex justify-center items-center h-full overflow-hidden relative'>
            {slides.map((slide, index) => (
            <Link href={slide.link} key={slide.id} className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0'}`}>
                <Image 
                src={slide.image} 
                alt={`Slide ${slide.id}`} 
                layout='fill' 
                objectFit='cover' 
                />
            </Link>
            ))}
        </div>
        
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10'>
            {slides.map((_, index) => (
            <div 
                key={index} 
                className={`h-2 w-2 rounded-full ${index === currentSlideIndex ? 'bg-white' : 'bg-gray-500'}`} 
            />
            ))}
        </div>
    </div>


      {/* Küçük Slider */}
      <div className='flex flex-row w-full pt-2 md:pt-0 sm:w-[400px] mx-auto h-[450px] gap-4 mb-10 sm:ml-4'>
        <div className='flex flex-col w-full bg-black h-full border border-1 border-gray-300'>
          <div className='w-full bg-gray-200 flex justify-between items-center p-4' style={{ height: '10%' }}>
            <p className='text-black font-bold'>Yeni Fırsatlar</p>
            <div className='flex space-x-2'>
              <button onClick={() => changeProduct('prev')} className='w-7 h-7 rounded-full bg-white flex justify-center items-center'>
                <IoChevronBack className='text-gray-500 text-lg' />
              </button>
              <button onClick={() => changeProduct('next')} className='w-7 h-7 rounded-full bg-white flex justify-center items-center'>
                <IoChevronForward className='text-gray-500 text-lg' />
              </button>
            </div>
          </div>

          <div className='flex justify-center items-center overflow-hidden' style={{ height: '50%' }}>
            <Image src={currentProduct.image} alt={currentProduct.name} height={600} width={600} />
          </div>

          <div className='flex flex-col items-center text-black bg-white p-4' style={{ height: '30%' }}>
            <h2 className='text-xl font-bold'>{currentProduct.name}</h2>
            <p className='text-lg'>{currentProduct.price}</p>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`h-5 w-5 ${i < currentProduct.stars ? 'text-yellow-400' : 'text-gray-500'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className='w-full flex justify-around items-center bg-gray-300 p-2 text-black text-sm' style={{ height: '10%' }}>
            <div className='flex flex-col items-center'>
              <p>{days}</p>
              <p>Gün</p>
            </div>
            <div className='flex flex-col items-center'>
              <p>{hours}</p>
              <p>Saat</p>
            </div>
            <div className='flex flex-col items-center'>
              <p>{minutes}</p>
              <p>Dakika</p>
            </div>
            <div className='flex flex-col items-center'>
              <p>{secs}</p>
              <p>Saniye</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
