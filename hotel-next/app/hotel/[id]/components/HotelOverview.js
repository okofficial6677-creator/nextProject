import styles from "./HotelOverview.module.css";

export default function HotelOverview({ hotel }) {
  const description = hotel?.description || 
    "Luxury family-friendly hotel near Sanjay Gandhi National Park Located close to R City Mall, The Westin Mumbai Powai Lake provides a terrace, shopping on-site and a coffee shop/cafe. Treat yourself to a body treatment, reflexology or a massage at Heavenly Spa by Westin, the on-site spa. At the 3 on-site restaurants, enjoy breakfast, brunch, lunch, dinner and Asian cuisine. Stay connected with free WiFi in public areas, and guests can find other amenities, such as a garden and a playground.";

  const languages = ["English", "Hindi"];

  return (
    <div className={styles.overviewContainer}>
      <h2 className={styles.sectionTitle}>Overview</h2>
      
      <div className={styles.descriptionContainer}>
        <p className={styles.description}>
          {description}
        </p>
        <button className={styles.readMoreBtn}>Read More</button>
      </div>

      <div className={styles.languagesSection}>
        <h3 className={styles.languagesTitle}>Languages</h3>
        <div className={styles.languagesList}>
          {languages.map((language, index) => (
            <span key={index} className={styles.languageTag}>
              {language}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 