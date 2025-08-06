"use client";
import { useState } from "react";
import styles from "./ImageGallery.module.css";

export default function ImageGallery({ hotel }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Sample images - in real app, these would come from hotel.image_name or property_photos
  const images = [
    "/images/image1.svg",
    "/images/image2.svg", 
    "/images/image 3.svg",
    "/images/room1i1.svg",
    "/images/room1i2.svg",
    "/images/room1i3.svg",
    "/images/room1i4.svg",
    "/images/room1i5.svg"
  ];

  // For the right grid, show up to 4 images after the main image
  const gridImages = images.slice(1, 5);
  const hasMoreImages = images.length > 5;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className={styles.galleryGrid}>
      {/* Main Image (Left) */}
      <div className={styles.mainImageWrapper}>
        <img 
          src={images[currentImageIndex]} 
          alt={`Hotel ${hotel?.property_name} - Image ${currentImageIndex + 1}`}
          className={styles.mainImage}
        />
        {/* Navigation Arrows */}
        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={prevImage}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={nextImage}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      {/* 2x2 Grid (Right) */}
      <div className={styles.gridWrapper}>
        {gridImages.map((img, idx) => (
          <div key={idx} className={styles.gridImageWrapper}>
            <img src={img} alt={`Grid ${idx + 2}`} className={styles.gridImage} />
            {/* Overlay badge on last grid image if more images exist */}
            {hasMoreImages && idx === gridImages.length - 1 && (
              <div className={styles.overlayBadge}>
                <span className={styles.overlayText}>{images.length}+</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 