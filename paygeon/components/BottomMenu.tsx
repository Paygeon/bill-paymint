"use client"
import React, { useState } from 'react';
import BottomSheet from './BottomSheet';

interface NavigationItemProps {
  src: string;
  alt: string;
  label: string;
  href?: string; // Make href optional
  onClick?: () => void; // Add onClick prop
}

const NavigationItem: React.FC<NavigationItemProps> = ({ src, alt, label, href, onClick }) => (
  <a href={href} onClick={onClick} className="flex flex-col flex-1 px-4 pt-5 pb-4 bg-stone-950 cursor-pointer">
    <img loading="lazy" src={src} alt={alt} className="self-center aspect-square w-[30px]" />
    <div className="border border-solid border-zinc-500">{label}</div>
  </a>
);

const BottomMenu: React.FC = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const navItems = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/35bc7862a141b7a9815252b2991ae9872c90f7d3a911591606d7beddc4f6a755?apiKey=aa19eef6d1f1473ba394866de3aadd86&", alt: "Home icon", label: "Home", href: "/" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a72357b1dfe185150e1833ec059e11f844771bfbe3f916197fd898b27da90a78?apiKey=aa19eef6d1f1473ba394866de3aadd86&", alt: "Cards icon", label: "Cards", href: "/cards" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/761c3de704fc6fd6e0693caf27b269ab6081ef377a0df09c2c43ec1809367d95?apiKey=aa19eef6d1f1473ba394866de3aadd86&", alt: "Pay icon", label: "Pay", href: "/pay" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/03ce8cf002c526da51a31d94c94b4b0fc2747886e2964d315845c9243a0a533e?apiKey=aa19eef6d1f1473ba394866de3aadd86&", alt: "Rewards icon", label: "Rewards", href: "/rewards" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea74078dc8716dd9573dd4d321082b2686988e19c2e002d5d1f5d8e964e8dced?apiKey=aa19eef6d1f1473ba394866de3aadd86&", alt: "Shop icon", label: "Shop", href: "/shop" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/83217c72cabc5ccb6132806cefcd2c18a93479ebb67c9e6e611c9235058f66dd?apiKey=aa19eef6d1f1473ba394866de3aadd86&", alt: "More icon", label: "More", onClick: toggleBottomSheet },
  ];

  return (
    <>
      <nav className="flex gap-0 justify-center mx-none text-xs font-medium tracking-wide leading-4 whitespace-nowrap border-solid bg-stone-950 border-[0.5px] border-black border-opacity-0 fixed bottom-0 w-full">
        {navItems.map((item, index) => (
          <NavigationItem key={index} {...item} />
        ))}
      </nav>
      <BottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} content={<div className="relative w-full max-w-md mx-auto"><p>This is the bottom sheet content.</p></div>} />

    </>
  );
};

export default BottomMenu;
