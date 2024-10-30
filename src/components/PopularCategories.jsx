import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import languagesData from '../../public/data/languages.json';
import categoriesData from '../../public/data/populerCategories.json';

const PopularCategories = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();

    const boxColor = theme === 'dark' ? 'bg-[#0E68Ae]' : 'bg-gray-100';
    const [translations, setTranslations] = useState({});
    const [smallCategories, setSmallCategories] = useState([]);
    const [largeCategories, setLargeCategories] = useState([]);

    useEffect(() => {
        setTranslations(languagesData[language] || {}); 
    }, [language]);

    useEffect(() => {
        setSmallCategories(categoriesData.smallCategories || []);
        setLargeCategories(categoriesData.largeCategories || []);
    }, []);

    return (
        <div className='max-w-[1440px] mx-auto pb-10 px-4 py-10'>
            <div className='flex items-center pb-4'>
                <div className='w-[30px] h-[30px] bg-blue-600 rounded-full mr-4'></div>
                <div className='text-2xl font-bold text-blue-600'>{translations.popularCategories || 'Popüler Kategoriler'}</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
                {smallCategories.map((category) => (
                    <Link href={category.link} key={category.id} className={`flex justify-center items-center ${boxColor} p-4 rounded-lg`}>
                        <Image src={category.image} alt={category.name[language]} width={80} height={80} />
                    </Link>
                ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4 lg:gap-6 py-4">
                {largeCategories.map((category) => (
                    <div
                        key={category.id}
                        className={`h-[210px] flex flex-col justify-end relative ${boxColor} p-4 rounded-lg overflow-hidden`}
                    >
                        <Image src={category.image} alt={category.name[language]} fill className="object-cover absolute inset-0 z-0" />
                        <div className='absolute bottom-0 mb-4 z-10 p-4 text-left'>
                            <h1 className='text-2xl md:text-3xl font-extrabold text-white'>{category.name[language]}</h1>
                            <h2 className='text-base md:text-xl font-bold text-white mt-1 w-[250px]'>{category.description[language]}</h2>
                            <Link href={category.link}>
                                <button className='bg-[#FF6C00] text-white font-bold px-4 py-2 rounded-lg mt-4'>HEMEN AL</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PopularCategories;
