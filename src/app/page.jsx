"use client"; // İstemci bileşeni olduğunu belirt

import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import HomeSlider from '../components/HomeSlider';
import './globals.css';

export default function Home() {

  const { theme} = useTheme()
  const bgColor1 = theme === 'dark' ? 'bg-[#111435]' : 'bg-light-primary';

  return (
    <div className={`min-h-screen w-full ${bgColor1}`}>
      <Navbar />
      <HomeSlider />
    </div>
  );
}
