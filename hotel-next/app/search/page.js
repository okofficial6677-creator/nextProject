"use client"
import { useEffect, useState, useCallback } from "react"
import CommonHeader from "@/components/CommonHeader/CommonHeader"
import Footer from "@/components/Footer/Footer"
import styles from "./search.module.css"
import SearchOptions from "@/components/SearchOptions/SearchOptions"
import FilterSidebar from "./FilterSidebar"
import HotelList from "./HotelList"
import { useSearchParams, useRouter } from "next/navigation"
import { searchApi } from "@/lib/searchApi"

const sortOptions = [
  { label: "Recommended", value: "recommended" },
  { label: "User Rating (Highest First)", value: "userRating" },
  { label: "Price (Highest First)", value: "priceHigh" },
  { label: "Price (Lowest First)", value: "priceLow" },
]

function formatHotel(hotel, index = 0) {
  const offerColor = index % 2 === 0 ? "green" : "gray"
  const amenityIconMap = {
    Gym: "/images/fire_ext.svg",
    "Swimming Pool": "/images/swim.svg",
    "Washer and dryer": "/images/Washer Icon.svg",
    Pool: "/images/Pool Icon.svg",
    Wifi: "/images/wifi.svg",
    Spa: "/images/bed.svg",
    Bar: "/images/smoking.svg",
    "Conference Hall": "/images/area.svg",
  }
  
  const defaultOfferIcon = "/images/right.svg"
  const staticImages = [
    "/images/image1.svg",
    "/images/image2.svg",
    "/images/image 3.svg",
    "/images/room1i1.svg",
    "/images/Image 2.png",
  ]
  const inclusionList = Array.isArray(hotel.offers)
    ? hotel.offers.map((offer) => ({
        icon: offer.icon || defaultOfferIcon,
        text: offer.text,
        color: offerColor,
      })) 
    : typeof hotel.inclusion_names === "string"
      ? hotel.inclusion_names.split(",").map((text) => ({
          icon: defaultOfferIcon,
          text: text.trim(),
          color: offerColor,
        }))
      : []
  const rawAmenities =
    typeof hotel.amenities === "string"
      ? hotel.amenities.split(",").map((a) => a.trim())
      : Array.isArray(hotel.amenities)
        ? hotel.amenities
        : []
  const updatedAmenities = rawAmenities.map((a) => ({
    icon: amenityIconMap[a.label || a] || "/images/default.svg",
    label: a.label || a,
    color: offerColor,
  }))
  // Use database image if available, otherwise fall back to static images
  const imageSource = hotel.image_name ? `/uploads/${hotel.image_name}` : staticImages[index % staticImages.length]
  return {
    ...hotel,
    name: hotel.property_name,
    image: imageSource,
    offers: inclusionList,
    amenities: updatedAmenities,
    newprice: Number(hotel.price), // numeric for filtering
    newpriceDisplay: `₹${hotel.price}`,
    oldPrice: hotel.old_price ? `₹${hotel.old_price}` : "",
    taxes: "Included", // Since commission_percentage was removed from queries
    points: hotel.points ? `Points ${hotel.points}` : "Points 0",
    rating: hotel.rating || "9.0 Exceptional (320)",
    location: `${hotel.city_name}, ${hotel.state_name}`,
    room: hotel.room_type,
    stars: hotel.star_category || 0,
    availability: hotel.total_rooms ? `We have left ${hotel.total_rooms} rooms ` : "Rooms info not available",
  }
}

export default function SearchPage() {
  const [hotels, setHotels] = useState([])
  const [searchedHotels, setSearchedHotels] = useState([])
  const [recommendedSearches, setRecommendedSearches] = useState([])
  const [showRecommendedSection, setShowRecommendedSection] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  const destination = searchParams.get("destination") || ""
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")
  const rooms = searchParams.get("rooms")

  const [sort, setSort] = useState("recommended")

  useEffect(() => {
    const sortParam = searchParams.get("sort") || "recommended"
    setSort(sortParam)
  }, [searchParams])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = []
        if (sort === "priceLow") {
          const response = await fetch("http://localhost:5000/sort/sortByAsc")
          const result = await response.json()
          data = Array.isArray(result) ? result : []
        } else if (sort === "priceHigh") {
          const response = await fetch("http://localhost:5000/sort/sortByDes")
          const result = await response.json()
          data = Array.isArray(result) ? result : []
        } else if (sort === "userRating") {
          const response = await fetch("http://localhost:5000/sort/sortByRating")
          const result = await response.json()
          data = Array.isArray(result) ? result : []
        } else {
          if (destination) {
            const response = await fetch(`http://localhost:5000/searchproperty/searchByName/${destination}`)
            const result = await response.json()
            data = Array.isArray(result) ? result : []
          } else {
            const response = await fetch("http://localhost:5000/hotelinfo/card")
            const result = await response.json()
            data = Array.isArray(result) ? result : []
          }
        }
        const formatted = data.map((hotel, index) => formatHotel(hotel, index))
        setHotels(formatted)
        setSearchedHotels(formatted) // Show all hotels by default after fetch
      } catch (err) {
        console.error("Failed to fetch hotel card data:", err)
        setHotels([])
        setSearchedHotels([])
      }
    }
    fetchData()
  }, [sort, destination])

  // Fetch recommended searches
  useEffect(() => {
    const fetchRecommendedSearches = async () => {
      try {
        const recommendations = await searchApi.getRecommendedSearches(8);
        setRecommendedSearches(recommendations);
      } catch (error) {
        console.error('Error fetching recommended searches:', error);
        setRecommendedSearches([]);
      }
    };

    fetchRecommendedSearches();
  }, [])

  const handleSortChange = (value) => {
    setSort(value)
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    router.replace(`/search?${params.toString()}`)
  }

  // Add this handler for search bar
  const handleSearch = useCallback(
    (destinationInput, dates, rooms) => {
      if (!destinationInput) {
        setSearchedHotels(hotels) // Show all cards if no search
        return
      }
      // Filter by hotel name (case-insensitive)
      const filtered = hotels.filter((hotel) => hotel.name.toLowerCase() === destinationInput.toLowerCase())
      setSearchedHotels(filtered)
    },
    [hotels],
  )

  const handleSearchSelect = useCallback((hotelsToShow) => {
    setSearchedHotels(hotelsToShow)
  }, [])

  const handleRecommendedSearch = useCallback((keyword) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("destination", keyword)
    router.push(`/search?${params.toString()}`)
  }, [searchParams, router])

  return (
    <>
      <CommonHeader />
      <div className={styles.wrapper}>
        <div className={styles.searchRow}>
          <SearchOptions
            initialDestination={destination}
            initialDates={startDate && endDate ? { startDate, endDate } : null}
            initialRooms={rooms ? JSON.parse(rooms) : null}
            onSearch={handleSearch}
          />
        </div>

        {/* Recommended Searches Section */}
        {showRecommendedSection && recommendedSearches.length > 0 && (
          <div className={styles.recommendedSection}>
            <div className={styles.recommendedHeader}>
              <h3 className={styles.recommendedTitle}>
                {destination ? `More destinations like ${destination}` : 'Recommended destinations for you'}
              </h3>
              <button 
                className={styles.closeRecommended}
                onClick={() => setShowRecommendedSection(false)}
                title="Hide recommendations"
              >
                ×
              </button>
            </div>
            <div className={styles.recommendedGrid}>
              {recommendedSearches.map((recommendation, index) => (
                <div
                  key={index}
                  className={styles.recommendedCard}
                  onClick={() => handleRecommendedSearch(recommendation.keyword)}
                >
                  <div className={styles.recommendedCardContent}>
                    <div className={styles.recommendedKeyword}>
                      {recommendation.keyword}
                    </div>
                    <div className={styles.recommendedDescription}>
                      {recommendation.description}
                    </div>
                    {recommendation.type === 'trending' && (
                      <div className={styles.trendingBadge}>
                        🔥 TRENDING
                      </div>
                    )}
                    {recommendation.type === 'popular' && (
                      <div className={styles.popularBadge}>
                        ⭐ POPULAR
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.contentRow}>
          <FilterSidebar onSearchSelect={handleSearchSelect} allHotels={hotels} />
          <main className={styles.mainContent}>
            <div className={styles.propertyHeader}>
              <div className={styles.propertyHeaderCount}>
                {hotels.length} Properties in {destination || "All Locations"}
              </div>
              <div className={styles.propertyHeaderSortOptions}>
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={sort === opt.value ? styles.tabActive : styles.tab}
                    onClick={() => handleSortChange(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Show searchedHotels if present, otherwise show all hotels */}
            <HotelList
              hotels={searchedHotels.length > 0 ? searchedHotels : hotels}
              startDate={startDate}
              endDate={endDate}
              rooms={rooms}
            />
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}
