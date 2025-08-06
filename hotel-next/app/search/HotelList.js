import styles from "./search.module.css"
import HotelCard from "./HotelCard"

export default function HotelList({ hotels = [], startDate, endDate, rooms }) {
  if (hotels.length === 0) {
    return (
      <div className={styles.hotelList}>
        <p>No matching hotels found.</p>
      </div>
    )
  }
  return (
    <div className={styles.hotelList}>
      {hotels.map((hotel, idx) => (
        <HotelCard hotel={hotel} key={idx} startDate={startDate} endDate={endDate} rooms={rooms} />
      ))}
    </div>
  )
}
