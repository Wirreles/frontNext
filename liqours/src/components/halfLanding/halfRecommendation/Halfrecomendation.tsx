"use client";
import { IRecommendation } from "@/interfaces/interfaz";
import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';

const HalfRecommendation = ({
  recommendation,
}: {
  recommendation: IRecommendation;
}) => {
  const { title, imageB, imageF, imageP, description, color, link } =
    recommendation;
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-1/3 h-full flex flex-col items-center justify-center overflow-hidden mt-20 ${
        isVisible ? "opacity-100 transition-opacity duration-1000" : "opacity-0"
      }`}
    >
      <div
        className="absolute object-contain w-full h-[105%] z-0 opacity-95"
        style={{ transform: `translateY(-${scrollY * 0.1}px)` }}
      >
        <Image
          src={imageB}
          alt=""
          layout="fill"
          objectFit="contain"
          quality={100}
        />
      </div>
      <div
        className="absolute object-contain w-full h-[105%] z-0 opacity-95"
        style={{
          transform: `translateY(-${scrollY * 0.3}px)`,
          transition: "transform 3s ease",
        }}
      >
        <Image
          src={imageP}
          alt=""
          layout="fill"
          objectFit="contain"
          quality={100}
        />
      </div>
      <div
        className="absolute object-contain w-full h-[105%] z-0 opacity-95"
        style={{
          transform: `translateY(-${scrollY * 0.5}px)`,
          transition: "transform 1s ease",
        }}
      >
        <Image
          src={imageF}
          alt=""
          layout="fill"
          objectFit="contain"
          quality={100}
        />
      </div>
      <div className="relative z-10 text-base">
        <h1
          className="text-4xl mb-96 font-bold text-center"
          style={{ color: color }}
        >
          {title}
        </h1>
        <b>
          <p className="mt-10 text-lg text-center" style={{ color: color }}>
            {description}
          </p>
        </b>
      </div>
    </div>
  );
};

export default HalfRecommendation;
