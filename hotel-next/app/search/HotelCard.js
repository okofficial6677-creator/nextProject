import styles from "./search.module.css"
import Image from "next/image"

export default function HotelCard({ hotel, startDate, endDate, rooms }) {
  const detailsUrl = `/hotel/${hotel.property_id || hotel.id}`
  const params = new URLSearchParams()
  if (startDate) params.set("startDate", startDate)
  if (endDate) params.set("endDate", endDate)
  if (rooms) params.set("rooms", rooms) // rooms is already a stringified JSON
  const queryString = params.toString()
  const finalUrl = queryString ? `${detailsUrl}?${queryString}` : detailsUrl

  return (
    <div className={styles.hotelCard}>
      <div className={styles.hotelImgWrap}>
        <Image
          src={hotel.image || "/images/default_hotel.jpg"}
          alt={hotel.name || "Hotel"}
          width={213}
          height={380}
          className={styles.hotelImg}
        />
        <span className={styles.ratingBadge}>{hotel.rating || "N/A"}</span>
      </div>
      {/* Hotel Info */}
      <div className={styles.hotelInfo}>
        {/* Name */}
        <div className={styles.hotelName}>{hotel.name}</div>
        {/* Location */}
        <div className={styles.hotelLocation}>
          <Image src="/images/location.svg" alt="Location Icon" width={14} height={14} />
          {hotel.location}
        </div>
        {/* Star Ratings */}
        <div className={styles.stars}>{"★".repeat(hotel.stars || 0) + "☆".repeat(5 - (hotel.stars || 0))}</div>
        {/* Amenities */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className={styles.amenitiesRow}>
            {hotel.amenities.map((a, i) => (
              <span className={styles.amenity} key={i}>
                {a.label !== "+0 Amenities" && a.icon && (
                  <Image
                    src={a.icon || "/placeholder.svg"}
                    alt={a.label}
                    width={16}
                    height={16}
                    style={{
                      marginRight: "6px",
                      filter:
                        a.color === "green"
                          ? "brightness(0) saturate(100%) sepia(1) hue-rotate(80deg) brightness(1.2)"
                          : "grayscale(100%) brightness(0.5)",
                    }}
                  />
                )}
                {a.label}
              </span>
            ))}
          </div>
        )}
        {/* Offers */}
        {hotel.offers && hotel.offers.length > 0 && (
          <ul className={styles.cancellation}>
            {hotel.offers.map((offer, i) => (
              <li
                key={i}
                style={{
                  color: offer.color === "green" ? "#27a644" : "#6c757d",
                  fontWeight: 500,
                }}
              >
                <Image src={offer.icon || "/placeholder.svg"} alt="Offer Icon" width={14} height={14} /> {offer.text}
              </li>
            ))}
          </ul>
        )}
        {/* Room Info */}
        <div className={styles.roomRow}>
          <span className={styles.roomType}>
            <Image
              src="/images/delux.svg"
              alt="Deluxe Room Icon"
              width={18}
              height={18}
              className={styles.roomTypeIcon}
            />
            {hotel.room}
          </span>
          <span className={styles.accommodates}>
            <Image src="/images/acc.svg" alt="Capacity Icon" width={16} height={16} />
            Accommodates {hotel.accommodates}
          </span>
        </div>
      </div>
      {/* Price & Availability */}
      <div className={styles.hotelPriceWrap}>
        <div className={styles.leftCount}>✅ {hotel.availability}</div>
        <div className={styles.price}>{hotel.oldPrice && <del>{hotel.oldPrice}</del>}</div>
        <div className={styles.price}>{hotel.newpriceDisplay || hotel.newprice || hotel.price}</div>
        <div className={styles.taxes}>{hotel.taxes}</div>
        <div className={styles.points}>
          You Earn: <strong>{hotel.points}</strong>
        </div>
        <a href={finalUrl}>
          <button className={styles.detailsBtn}>Details</button>
        </a>
      </div>
    </div>
  )
}
