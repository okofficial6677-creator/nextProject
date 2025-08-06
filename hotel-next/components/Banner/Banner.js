"use client";
import Image from 'next/image';
import styles from './Banner.module.css';
import bannerData from './bannerData.json';
import SearchOptions from '../SearchOptions/SearchOptions';
import { useRouter } from 'next/navigation';

export default function Banner() {
  const router = useRouter();
  // Handler to be passed to SearchOptions
  const handleSearch = (destination, dates, rooms) => {
    // Build query string
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (dates && dates.startDate && dates.endDate) {
      params.append('startDate', dates.startDate);
      params.append('endDate', dates.endDate);
    }
    if (rooms && rooms.length > 0) {
      params.append('rooms', JSON.stringify(rooms));
    }
    router.push(`/search?${params.toString()}`);
  };
  return (
    <section className={styles.banner}>
      <div className={styles.bannerContent}>
        <h3 className={styles.bannerTitle}>{bannerData.title}</h3>
        <p className={styles.bannerSubtitle}>{bannerData.subtitle1}</p>
        <p className={styles.bannerSubtitle}>{bannerData.subtitle2}</p>
      </div>
      <div className={styles.search}>
        <div className={styles.searchTitle}>
          <Image src="/images/Hotels.svg" alt="hotel_icon" width={32} height={32} />
          <span className={styles.searchTitleName}>Hotels</span>
        </div>
        <SearchOptions onSearch={handleSearch} />
      </div>
    </section>
  );
}
