import styles from "./PoliciesSection.module.css";

export default function PoliciesSection({ hotel }) {
  return (
    <div className={styles.policiesContainer}>
      <h2 className={styles.sectionTitle}>Policies</h2>
      
      <div className={styles.policiesGrid}>
        {/* Check-in Policy */}
        <div className={styles.policyCard}>
          <h3 className={styles.policyTitle}>Check-in</h3>
          <div className={styles.policyDetails}>
            <div className={styles.policyItem}>
              <span className={styles.policyLabel}>Start time:</span>
              <span className={styles.policyValue}>3:00 PM</span>
            </div>
            <div className={styles.policyItem}>
              <span className={styles.policyLabel}>End time:</span>
              <span className={styles.policyValue}>anytime</span>
            </div>
            <div className={styles.policyNote}>
              Early check-in subject to availability (and for a fee)
            </div>
            <div className={styles.policyFeatures}>
              <span className={styles.feature}>Contactless check-in and check-out available</span>
              <span className={styles.feature}>Express check-in available</span>
              <span className={styles.feature}>Minimum check-in age: 18</span>
            </div>
          </div>
        </div>

        {/* Check-out Policy */}
        <div className={styles.policyCard}>
          <h3 className={styles.policyTitle}>Check-out</h3>
          <div className={styles.policyDetails}>
            <div className={styles.policyItem}>
              <span className={styles.policyLabel}>Time:</span>
              <span className={styles.policyValue}>Before noon</span>
            </div>
            <div className={styles.policyFeatures}>
              <span className={styles.feature}>Contactless check-out</span>
              <span className={styles.feature}>Late check-out subject to availability</span>
              <span className={styles.feature}>Express check-out available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className={styles.importantInfo}>
        <h3 className={styles.importantTitle}>Important Information</h3>
        
        <div className={styles.optionalExtras}>
          <h4 className={styles.extrasTitle}>Optional Extras:</h4>
          <div className={styles.extrasList}>
            <div className={styles.extraItem}>
              <span className={styles.extraLabel}>Buffet breakfast:</span>
              <span className={styles.extraValue}>from approx. INR 1400 per person</span>
            </div>
            <div className={styles.extraItem}>
              <span className={styles.extraLabel}>Airport shuttle fee:</span>
              <span className={styles.extraValue}>INR 2156 per person (one-way)</span>
            </div>
            <div className={styles.extraItem}>
              <span className={styles.extraLabel}>Airport shuttle fee per child:</span>
              <span className={styles.extraValue}>INR 2156 (one-way), (up to 18 years old)</span>
            </div>
            <div className={styles.extraItem}>
              <span className={styles.extraLabel}>Early check-in:</span>
              <span className={styles.extraValue}>available for a fee (subject to availability)</span>
            </div>
            <div className={styles.extraItem}>
              <span className={styles.extraLabel}>Rollaway bed fee:</span>
              <span className={styles.extraValue}>INR 1500.0 per day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className={styles.reviewsSection}>
        <div className={styles.reviewsHeader}>
          <h3 className={styles.reviewsTitle}>Customer Reviews</h3>
          <div className={styles.overallRating}>
            <span className={styles.ratingScore}>9.2/10</span>
            <span className={styles.ratingText}>Excellent</span>
            <span className={styles.reviewCount}>(287 verified reviews)</span>
          </div>
        </div>

        <div className={styles.reviewCards}>
          {[1, 2, 3].map((review) => (
            <div key={review} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewRating}>
                  <span className={styles.reviewScore}>10/10</span>
                  <span className={styles.reviewRatingText}>Excellent</span>
                </div>
                <div className={styles.reviewerInfo}>
                  <span className={styles.reviewerName}>Sophia</span>
                  <span className={styles.reviewDate}>May 7, 2024</span>
                </div>
              </div>
              <p className={styles.reviewComment}>
                Buffet spread is good Swimming pool is good Overall good property but they should work on providing more in house sports/activities for kids.
              </p>
            </div>
          ))}
        </div>

        <button className={styles.seeAllReviewsBtn}>See all 570 reviews</button>
      </div>
    </div>
  );
} 