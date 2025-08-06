"use client"
import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Image from "next/image"
import styles from "./search.module.css"

export default function FilterSidebar({ onSearchSelect, allHotels }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [selectedOffers, setSelectedOffers] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(200000)
  const [selectedStars, setSelectedStars] = useState([])

  // Search by property name (unchanged)
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([])
      if (selectedOffers.length === 0 && minPrice === 0 && maxPrice === 200000) onSearchSelect(allHotels)
      return
    }
    const filtered = allHotels.filter((hotel) => hotel.property_name.toLowerCase().includes(searchTerm.toLowerCase()))
    setSearchResults(filtered)
  }, [searchTerm, allHotels, selectedOffers, minPrice, maxPrice])

  // Auto-select first result as user types (if not filtering by offers or price)
  useEffect(() => {
    if (
      searchTerm &&
      searchResults.length > 0 &&
      selectedOffers.length === 0 &&
      minPrice === 0 &&
      maxPrice === 200000
    ) {
      onSearchSelect([searchResults[0]])
    } else if (searchTerm === "" && selectedOffers.length === 0 && minPrice === 0 && maxPrice === 200000) {
      onSearchSelect(allHotels)
    } // eslint-disable-next-line
  }, [searchResults, searchTerm, selectedOffers, minPrice, maxPrice, allHotels])

  // Filter hotels by selected offers and price (frontend)
  useEffect(() => {
    let filtered = allHotels

    // Filter by offers
    if (selectedOffers.length > 0) {
      filtered = filtered.filter((hotel) =>
        selectedOffers.every(
          (offer) => hotel.offers && hotel.offers.some((o) => (o.text || o).toLowerCase() === offer.toLowerCase()),
        ),
      )
    }

    // Filter by price using newprice (number)
    filtered = filtered.filter((hotel) => {
      const priceNum =
        typeof hotel.newprice === "number"
          ? hotel.newprice
          : Number(String(hotel.newprice || hotel.price || "").replace(/[^\d]/g, ""))
      return priceNum >= minPrice && priceNum <= maxPrice
    })

    // Filter by stars
    if (selectedStars.length > 0) {
      filtered = filtered.filter((hotel) => selectedStars.includes(Number(hotel.stars)))
    }

    onSearchSelect(filtered)
  }, [selectedOffers, minPrice, maxPrice, selectedStars, allHotels, onSearchSelect])

  const handleSelect = (property) => {
    onSearchSelect([property])
    setSearchTerm(property.property_name)
    setSearchResults([])
  }

  const handleReset = () => {
    setSearchTerm("")
    setSearchResults([])
    setSelectedOffers([])
    setMinPrice(0)
    setMaxPrice(200000)
    setSelectedStars([])
    onSearchSelect(allHotels)
  }

  const handleOfferChange = (offer) => {
    setSelectedOffers((prev) => (prev.includes(offer) ? prev.filter((o) => o !== offer) : [...prev, offer]))
  }

  const prices = allHotels.map((hotel) =>
    typeof hotel.newprice === "number"
      ? hotel.newprice
      : Number(String(hotel.newprice || hotel.price || "").replace(/[^\d]/g, "")),
  )
  const minAvailablePrice = Math.min(...prices)
  const maxAvailablePrice = Math.max(...prices)

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filters}>
        <div className={`${styles.filterSection} ${styles.searchBox}`}>
          <label htmlFor="search" className={styles.filterLabel}>
            Search by property name
          </label>
          <div className={styles.filterInput}>
            <Image src="/images/search1.svg" alt="search_icon" width={16} height={16} />
            <input
              type="text"
              id="search"
              placeholder="e.g. Incredible Costa Del..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchResults.length > 0 && (
            <ul className={styles.searchResults}>
              {searchResults.map((item, idx) => (
                <li key={idx} className={styles.searchResultItem} onClick={() => handleSelect(item)}>
                  {item.property_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.filterLabelRow}>
          <h4 className={styles.filterLabel}>Filter by</h4>
          <button className={styles.resetBtn} onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterLabel}>Popular offers</h5>
          <label>
            <input
              type="checkbox"
              checked={selectedOffers.includes("Breakfast Included")}
              onChange={() => handleOfferChange("Breakfast Included")}
            />{" "}
            Breakfast Included
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOffers.includes("Free Cancellation")}
              onChange={() => handleOfferChange("Free Cancellation")}
            />{" "}
            Free Cancellation
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOffers.includes("Andheri")}
              onChange={() => handleOfferChange("Andheri")}
            />{" "}
            Andheri
          </label>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterLabel}>Price (Per night)</h5>
          <div className={styles.priceRow}>
            <input
              type="number"
              value={minPrice}
              min={minAvailablePrice}
              max={maxPrice}
              className={styles.priceInput}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <input
              type="number"
              value={maxPrice}
              min={minPrice}
              max={maxAvailablePrice}
              className={styles.priceInput}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
          <input
            type="range"
            min={minAvailablePrice}
            max={maxAvailablePrice}
            value={maxPrice}
            className={styles.priceSlider}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
          <div className={styles.priceValue}>
            <span>₹{minPrice}</span>
            <span>₹{maxPrice}</span>
          </div>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterLabel}>Guest Rating</h5>
          <div className={styles.ratingRow}>
            <button className={styles.ratingBtn}>ANY</button>
            <button className={styles.ratingBtn}>Unrated</button>
            <button className={styles.ratingBtn}>Poor</button>
            <button className={styles.ratingBtn}>Fair</button>
            <button className={styles.ratingBtn}>Average</button>
            <button className={styles.ratingBtn}>Good</button>
            <button className={styles.ratingBtn}>Excellent</button>
          </div>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterLabel}>Star Rating</h5>
          <div className={styles.starRow}>
            {[5, 4, 3, 2].map((star) => (
              <button
                key={star}
                className={`${styles.starBtn} ${selectedStars.includes(star) ? styles.active : ""}`}
                onClick={() => {
                  setSelectedStars((prev) => (prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]))
                }}
                type="button"
              >
                {star} Star
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

FilterSidebar.propTypes = {
  onSearchSelect: PropTypes.func.isRequired,
  allHotels: PropTypes.array.isRequired,
}
