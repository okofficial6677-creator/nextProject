import styles from "./AmenitiesSection.module.css";

export default function AmenitiesSection({ hotel }) {
  const amenities = [
    { name: "Housekeeping", icon: "/images/housekeeping.svg" },
    { name: "Free Wi-Fi", icon: "/images/wifi.svg" },
    { name: "Swimming Pool", icon: "/images/swim.svg" },
    { name: "Smoking Rooms", icon: "/images/smoking.svg" },
    { name: "Parking", icon: "/images/parking.svg" },
    { name: "Air Conditioning", icon: "/images/air.svg" },
    { name: "Room Service", icon: "/images/romservice.svg" },
    { name: "Security Guard", icon: "/images/gaurd.svg" },
    { name: "Elevator/Lift", icon: "/images/elevator.svg" },
    { name: "Ironing Service", icon: "/images/iron.svg" },
    { name: "Fire Extinguisher", icon: "/images/fire_ext.svg" },
    { name: "Multi Language", icon: "/images/multi_lang.svg" }
  ];

  return (
    <div className={styles.amenitiesContainer}>
      <h2 className={styles.sectionTitle}>Amenities</h2>
      
      <div className={styles.amenitiesGrid}>
        {amenities.map((amenity, index) => (
          <div key={index} className={styles.amenityItem}>
            <div className={styles.amenityIcon}>
              <img src={amenity.icon} alt={amenity.name} />
            </div>
            <span className={styles.amenityName}>{amenity.name}</span>
          </div>
        ))}
      </div>

      <button className={styles.viewAllBtn}>View all Amenities</button>
    </div>
  );
} 