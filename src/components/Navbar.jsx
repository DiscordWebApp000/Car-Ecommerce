// components/Navbar.js
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { IoMenu } from "react-icons/io5";
import Link from 'next/link';
import Image from 'next/image';
import data1 from '../../public/data/navbarLinks.json';
import data2 from '../../public/data/navbarLinks2.json';
import '../app/globals.css';

const Navbar = () => {
    const { language, changeLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    
    // Theme colors
    const bgColor1 = theme === 'dark' ? 'bg-[#111435]' : 'bg-light-primary';
    const textColor = theme === 'dark' ? 'text-white' : 'text-black';

    const navbarLinks1 = data1[language]?.navbar.links || [];
    const navbarLinks2 = data2[language]?.navbar.links || [];


    // State for the custom dropdown
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleLanguageChange = (lang) => {
        changeLanguage(lang);
        setDropdownOpen(false); // Close dropdown after selection
    };

    // Translated texts
    const loginText = language === 'en' ? 'Login' : 'Giriş Yap';
    const cartText = language === 'en' ? 'My Cart' : 'Sepetim';
    const placeholderText = language === 'en' ? 'Car Valve Cap' : 'Araba Sibop Kapagi';
    const AllCateqories = language === 'en' ? 'All Cateqories' : 'Tüm Kategoriler';
    const opportunityProducts = language === 'en' ? 'Opportunity Products' : 'Fırsat Urunleri';



    return (
        <nav className={`flex flex-col items-center justify-between p-4 ${bgColor1} max-w-[1440px] mx-auto`}>
            {/* Top Navigation Links and Language Dropdown */}
            <div className='flex items-center justify-end w-full space-x-4'>
                <div className="flex space-x-4 mr-4">
                    {navbarLinks1.map(({ key, text }) => (
                        <Link key={key} href={`#${key}`} className={`text-sm ${textColor}`}>
                            {text}
                        </Link>
                    ))}
                </div>

                {/* Language Dropdown */}
                <div className="relative">
                    <button 
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        className={`flex items-center space-x-2 ${bgColor1} border border-gray-400 ${textColor} p-2 rounded ${isDropdownOpen ? 'bg-gray-600' : ''}`}
                    >
                        <Image 
                            src={language === 'en' ? "/images/project-images/ABD_flag.png" : "/images/project-images/TR_flag.png"}
                            alt={language === 'en' ? "English" : "Turkish"}
                            width={20} 
                            height={20} 
                        />
                        <span>{language === 'en' ? 'En' : 'Tr'}</span>
                        <span className="ml-1">▼</span>
                    </button>

                    {/* Dropdown Options */}
                    {isDropdownOpen && (
                        <div className={`absolute right-0 mt-2 ${bgColor1} rounded shadow-lg ${textColor}`}>
                            <button
                                onClick={() => handleLanguageChange('en')}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-200"
                            >
                                <Image src="/images/project-images/ABD_flag.png" alt="English" width={20} height={20} />
                                <span>En</span>
                            </button>
                            <button
                                onClick={() => handleLanguageChange('tr')}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-200"
                            >
                                <Image src="/images/project-images/TR_flag.png" alt="Turkish" width={20} height={20} />
                                <span>Tr</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`relative flex items-center w-16 h-8 rounded-full transition-colors duration-300 ${
                        theme === 'dark' ? 'bg-[#3B3961]' : 'bg-gray-300 pl-1'
                    }`}
                >
                    <span
                        className={`absolute w-6 h-6 bg-white rounded-full flex items-center justify-center transform transition-transform duration-300 ease-in-out ${
                            theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
                        }`}
                    >
                        {theme === 'dark' ? '🌙' : '☀️'}
                    </span>
                </button>
            </div>

            {/* Logo and Search Bar */}
            <div className='flex justify-between items-center w-full h-[70px] '>
                <div className='h-full mx-4 flex justify-center items-center'>
                    <Image src="/images/project-images/Navbar-Logo.png" alt="Logo" width={200} height={100} />
                </div>

                <div className={`w-1/3 flex items-center bg-transparent rounded-[20px] border border-2 border-blue-500 overflow-hidden ${textColor}`}>
                    <input
                        type="text"
                        placeholder={placeholderText} // Placeholder with language support
                        className="flex-grow p-2 rounded-l-lg bg-transparent focus:outline-none"
                    />
                    <button className="w-14 h-10 bg-blue-600 flex items-center justify-center rounded-r-lg">
                        <FaSearch className="text-white" />
                    </button>
                </div>

                {/* User and Cart Buttons */}
                <div className="flex space-x-4 p-4">
                    <button className={`flex items-center bg-transparent ${textColor} rounded-lg p-2 ${theme === 'dark' ? ' hover:bg-[#3B3961]' : ' hover:bg-gray-200'}`}>
                        <FaUser className="mr-2" />
                        {loginText} {/* Login button text with language support */}
                    </button>
                    <button className="flex items-center bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700">
                        <FaShoppingCart className="mr-2" />
                        {cartText} {/* Cart button text with language support */}
                    </button>
                </div>
            </div>

            <div className='flex justify-between items-center w-full h-[60px] border-y-2 border-gray-200 mt-4'>
                <div className='flex justify-between items-center w-full mx-auto h-[100px]'>
                    <div className='h-full mx-4 flex justify-center items-center'>
                        <button className='flex flex-row space-x-2 items-center bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600'>
                            <IoMenu className='text-3xl text-white' />
                            <p className='text-white'>{AllCateqories}</p>
                        </button>
                    </div>

                    <div className={`flex items-center bg-transparent border-blue-500 overflow-hidden ${textColor}`}>
                        <div className="flex space-x-4 w-auto">
                            {navbarLinks2.map(({ key, text }) => (
                                <Link 
                                    key={key} 
                                    href={`#${key}`} 
                                    className="text-lg border-r-2 px-4 pl-2 py-1 text-gray-400 hover:text-gray-600 hover:border-blue-500 whitespace-nowrap"
                                >
                                    {text}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* User and Cart Buttons */}
                    <div className="flex space-x-4 p-4">
                        <Link 
                            href="#firsat-urunleri" 
                            className='text-[#EAA560] hover:text-[#FFB76B]'
                        >
                            {opportunityProducts}
                        </Link>
                    </div>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
