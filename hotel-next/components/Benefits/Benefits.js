
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Benefits.module.css';

const sliderImages = [
  '/images/Promotion Banner.svg',
  '/images/Promotion Banner.svg',
  '/images/Promotion Banner.svg',
  '/images/Promotion Banner.svg',
];

const cards = [
  {
    img: '/images/Frame1.svg',
    title: 'Competitive Edge in the Market',
    subtitle: 'Enhances customer experience and satisfaction with user-friendly travel technology.'
  },
  {
    img: '/images/Frame2.svg',
    title: 'Access to Global Inventory',
    subtitle: 'Offers travel services from multiple suppliers worldwide with competitive pricing and better deals.'
  },
  {
    img: '/images/Frame3.svg',
    title: 'Automated Booking System',
    subtitle: 'Real-time availability, instant bookings, and easy cancellations.'
  },
  {
    img: '/images/Frame4.svg',
    title: '24/7 Customer Support',
    subtitle: 'Dedicated support for troubleshooting and assistance ensures seamless operations for travel agents.'
  },
  {
    img: '/images/Frame5.svg',
    title: 'Time-Saving & Efficiency',
    subtitle: 'Instant confirmations and invoice generation streamline workflow.'
  },
  {
    img: '/images/Frame6.svg',
    title: 'Reliable Partnerships & Networking',
    subtitle: 'Connects travel businesses with global suppliers and service providers.'
  }
];

export default function Benefits() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (sliderImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.benefits}>
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          {sliderImages.length > 0 && (
            <Image
              src={sliderImages[current]}
              alt={`Slider ${current + 1}`}
              className={styles.sliderImage}
              width={800}
              height={200}
              priority
            />
          )}
        </div>
        <div className={styles.dots}>
          {sliderImages.map((_, idx) => (
            <div
              key={idx}
              className={`${styles.dot} ${current === idx ? styles.active : ''}`}
              onClick={() => setCurrent(idx)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
      <div className={styles.cards}>
        <h2 className={styles.cardsTitle}>Why book with VERNOST</h2>
        <div className={styles.cardsList}>
          {cards.map((card, idx) => (
            <div className={styles.card} key={idx}>
              <div className={styles.cardInner}>
                <Image src={card.img} alt="" className={styles.cardImage} width={64} height={64} />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardSubtitle}>{card.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
