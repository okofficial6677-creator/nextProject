"use client"
import { useState } from "react"
import styles from "./RoomTypesSection.module.css"
import { useRouter, useParams } from "next/navigation"

export default function RoomTypesSection({
  hotel,
  selectedRoomType,
  setSelectedRoomType,
  priceDisplay,
  setPriceDisplay,
  showEarnings,
  setShowEarnings,
}) {
  const [selectedFilters, setSelectedFilters] = useState(["All Rooms"])
  const router = useRouter()
  const params = useParams() // Add this to get current route params

  // Get hotel ID from URL params instead of hotel prop
  const hotelId = params.id || hotel?.id

  const roomTypes = ["Superior Room", "Luxury Room", "Deluxe Room", "Standard Room"]
  const filters = [
    "All Rooms",
    "1 Bed",
    "2 Beds",
    "Free Cancellation",
    "Breakfast Included",
    "Half Board",
    "Full Board",
  ]

  // Sample rate plans for Superior Room
  const ratePlans = [
    {
      id: 1,
      cancellation: "Free Cancellation till 24 Dec 2024, 02:00 hr",
      boardBasis: "Half Board (Includes breakfast and lunch)",
      accommodates: 8,
      price: 12000,
      taxes: 800,
      earnings: 80,
      isRefundable: true,
      label: "Package Rate",
    },
    {
      id: 2,
      cancellation: "Non Refundable",
      boardBasis: "Full Board (Includes breakfast, lunch, and dinner)",
      accommodates: 8,
      price: 11880,
      taxes: 60,
      earnings: 100,
      isRefundable: false,
    },
    {
      id: 3,
      cancellation: "Free Cancellation till 10 Dec 2024, 02:00 hr",
      boardBasis: "All-Inclusive (Includes all meals and drinks)",
      accommodates: 8,
      price: 8977,
      taxes: 800,
      earnings: 80,
      isRefundable: true,
    },
    {
      id: 4,
      cancellation: "Free Cancellation till 24 Dec 2024, 02:00 hr",
      boardBasis: "Standard Room (Room only)",
      accommodates: 8,
      price: 8000,
      taxes: 800,
      earnings: 80,
      isRefundable: true,
    },
    {
      id: 5,
      cancellation: "Free Cancellation till 10 Feb 2025, 02:00 hr",
      boardBasis: "Deluxe Suite (Includes breakfast and dinner)",
      accommodates: 8,
      price: 8000,
      taxes: 290,
      earnings: 200,
      isRefundable: true,
    },
  ]

  const roomAmenities = [
    "Housekeeping",
    "Parking",
    "Room Only",
    "Free Wi-Fi",
    "Multilingual Staff",
    "Air Conditioning",
    "Ironing Service",
    "Fire Extinguisher",
  ]

  const handleFilterChange = (filter) => {
    if (filter === "All Rooms") {
      setSelectedFilters(["All Rooms"])
    } else {
      setSelectedFilters((prev) => {
        const newFilters = prev.filter((f) => f !== "All Rooms")
        if (newFilters.includes(filter)) {
          return newFilters.filter((f) => f !== filter)
        } else {
          return [...newFilters, filter]
        }
      })
    }
  }

  // Handler for selecting a rate plan and navigating to review page with params in URL
  const handleSelectRatePlan = (planId) => {
    // Add error checking and debugging
    console.log("Hotel ID:", hotelId)
    console.log("Hotel object:", hotel)
    console.log("Params:", params)

    if (!hotelId) {
      console.error("Hotel ID is missing!")
      alert("Hotel ID is missing. Please try again.")
      return
    }

    // Go to review-booking page with roomType and ratePlanId in URL
    router.push(
      `/hotel/${hotelId}/review-booking?roomType=${encodeURIComponent(selectedRoomType)}&ratePlanId=${planId}`,
    )
  }

  return (
    <div className={styles.roomTypesContainer}>
      <h2 className={styles.sectionTitle}>Choose your room</h2>

      {/* Debug info - remove this after fixing */}
      <div style={{ background: "#f0f0f0", padding: "10px", margin: "10px 0", fontSize: "12px" }}>
        <strong>Debug Info:</strong>
        <br />
        Hotel ID from params: {params.id}
        <br />
        Hotel ID from prop: {hotel?.id}
        <br />
        Using Hotel ID: {hotelId}
      </div>

      {/* Price Display Options */}
      <div className={styles.priceDisplaySection}>
        <div className={styles.priceDisplayOptions}>
          <span className={styles.priceDisplayLabel}>Show Prices As:</span>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="priceDisplay"
                value="perNight"
                checked={priceDisplay === "perNight"}
                onChange={(e) => setPriceDisplay(e.target.value)}
              />
              <span>Per Night</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="priceDisplay"
                value="totalStay"
                checked={priceDisplay === "totalStay"}
                onChange={(e) => setPriceDisplay(e.target.value)}
              />
              <span>Total Stay</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="priceDisplay"
                value="earnings"
                checked={priceDisplay === "earnings"}
                onChange={(e) => setPriceDisplay(e.target.value)}
              />
              <span>Earnings</span>
            </label>
          </div>
        </div>
        <div className={styles.earningsToggle}>
          <button
            className={`${styles.toggleBtn} ${showEarnings ? styles.active : ""}`}
            onClick={() => setShowEarnings(!showEarnings)}
          >
            {showEarnings ? "Hide" : "Show"} Earnings
          </button>
        </div>
      </div>

      {/* Check-in/Check-out and Rooms & Guests */}
      <div className={styles.bookingInfo}>
        <div className={styles.bookingField}>
          <span className={styles.bookingLabel}>Check-In/Check-Out:</span>
          <span className={styles.bookingValue}>May 10 - May 10</span>
        </div>
        <div className={styles.bookingField}>
          <span className={styles.bookingLabel}>Rooms & Guests:</span>
          <span className={styles.bookingValue}>1 Room, 2 Guests</span>
        </div>
      </div>

      {/* Room Type Tabs */}
      <div className={styles.roomTypeTabs}>
        {roomTypes.map((roomType) => (
          <button
            key={roomType}
            className={`${styles.roomTypeTab} ${selectedRoomType === roomType ? styles.activeRoomTab : ""}`}
            onClick={() => setSelectedRoomType(roomType)}
          >
            {roomType}
          </button>
        ))}
      </div>

      {/* Filter Options */}
      <div className={styles.filterSection}>
        {filters.map((filter) => (
          <label key={filter} className={styles.filterCheckbox}>
            <input
              type="checkbox"
              checked={selectedFilters.includes(filter)}
              onChange={() => handleFilterChange(filter)}
            />
            <span>{filter}</span>
          </label>
        ))}
      </div>

      {/* Room Details */}
      <div className={styles.roomDetails}>
        <div className={styles.roomInfo}>
          <h3 className={styles.roomTypeTitle}>{selectedRoomType}</h3>
          <p className={styles.roomDescription}>5 Twin Bunk Bed - Beach view</p>
          <p className={styles.roomCapacity}>Sleep 10</p>
          <p className={styles.roomSize}>55 m² / 592 sq.ft</p>
          <div className={styles.roomAmenitiesList}>
            <h4>Room Amenities:</h4>
            <div className={styles.amenitiesGrid}>
              {roomAmenities.map((amenity, index) => (
                <span key={index} className={styles.roomAmenity}>
                  {amenity}
                </span>
              ))}
            </div>
            <button className={styles.viewAllAmenitiesBtn}>View All</button>
          </div>
        </div>

        {/* Rate Plans */}
        <div className={styles.ratePlansContainer}>
          {ratePlans.map((plan) => (
            <div key={plan.id} className={styles.ratePlanCard}>
              <div className={styles.ratePlanHeader}>
                <div className={styles.cancellationInfo}>
                  <span className={`${styles.cancellationStatus} ${!plan.isRefundable ? styles.nonRefundable : ""}`}>
                    {plan.isRefundable ? "✓" : "✗"} {plan.cancellation}
                  </span>
                </div>
                {plan.label && <span className={styles.ratePlanLabel}>{plan.label}</span>}
              </div>
              <div className={styles.ratePlanDetails}>
                <div className={styles.boardBasis}>{plan.boardBasis}</div>
                <div className={styles.accommodates}>Accommodates {plan.accommodates}</div>
              </div>
              <div className={styles.ratePlanPricing}>
                <div className={styles.priceInfo}>
                  <span className={styles.price}>₹{plan.price}</span>
                  <span className={styles.taxes}>+₹{plan.taxes} taxes/per night</span>
                </div>
                {showEarnings && <div className={styles.earningsInfo}>Your Earnings: INR {plan.earnings}</div>}
              </div>
              <div className={styles.ratePlanActions}>
                <button className={styles.selectBtn} onClick={() => handleSelectRatePlan(plan.id)}>
                  Select
                </button>
                <label className={styles.compareCheckbox}>
                  <input type="checkbox" />
                  <span>Compare</span>
                </label>
              </div>
              <div className={styles.ratePlanLinks}>
                <button className={styles.linkBtn}>View Room Amenities</button>
                <button className={styles.linkBtn}>View Cancellation Policy</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
