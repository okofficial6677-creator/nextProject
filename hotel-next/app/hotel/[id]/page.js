"use client";
import { useEffect, useState } from "react";
import { useRouter,useParams } from "next/navigation";
import CommonHeader from "@/components/CommonHeader/CommonHeader";
import Footer from "@/components/Footer/Footer";
import ImageGallery from "./components/ImageGallery";
import HotelOverview from "./components/HotelOverview";
import AmenitiesSection from "./components/AmenitiesSection";
import RoomTypesSection from "./components/RoomTypesSection";
import PoliciesSection from "./components/PoliciesSection";
import styles from "./page.module.css";


export default function HotelDetailsPage() {
  const params = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRoomType, setSelectedRoomType] = useState("Superior Room");
  const [priceDisplay, setPriceDisplay] = useState("perNight");
  const [showEarnings, setShowEarnings] = useState(false);
  const router=useRouter();
const hotelId=params.id;
const planId=1;


useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/searchproperty/PropertyById/${params.id}`);
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchHotelDetails();
    }
  }, [params.id]);

  if (loading) {
    return (
      <>
        <CommonHeader />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!hotel) {
    return (
      <>
        <CommonHeader />
        <div className={styles.errorContainer}>
          <h2>Hotel not found</h2>
        </div>
        <Footer />
      </>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "amenities", label: "Amenities" },
    { id: "rooms", label: "Rooms" },
    { id: "policies", label: "Policies" },
  ];

  return (
    <>
      <CommonHeader />
      <div className={styles.container}>
        {/* Hotel Header Section */}
        <div className={styles.hotelHeader}>
          <div className={styles.hotelInfo}>
            <h1 className={styles.hotelName}>{hotel.property_name}</h1>
            <p className={styles.hotelLocation}>{hotel.city_name}, {hotel.state_name}</p>
            <div className={styles.ratingSection}>
              <span className={styles.rating}>9.1 Exceptional</span>
              <span className={styles.reviewCount}>(320 reviews)</span>
            </div>
          </div>
          <div className={styles.priceSection}>
            <div className={styles.cancellationPolicy}>
              Free Cancellation til 750 Nov 2024, 12:00 hr
            </div>
            <div className={styles.priceInfo}>
              <span className={styles.oldPrice}>₹{hotel.old_price || hotel.price}</span>
              <span className={styles.currentPrice}>₹{hotel.price}</span>
              <span className={styles.taxes}>+₹750 Taxes & Fees / Per Night</span>
            </div>
            <div className={styles.availability}>
              We have {hotel.total_rooms || 5} left at ₹{hotel.price}
            </div>
            <button onClick={()=> router.push(
      `/hotel/${hotelId}/review-booking?roomType=${encodeURIComponent(selectedRoomType)}&ratePlanId=${planId}`,
    )}className={styles.selectRoomBtn}>Select Room</button>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery hotel={hotel} />

        {/* Navigation Tabs */}
        <div className={styles.tabNavigation}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === "overview" && <HotelOverview hotel={hotel} />}
          {activeTab === "amenities" && <AmenitiesSection hotel={hotel} />}
          {activeTab === "rooms" && (
            <RoomTypesSection 
              hotel={hotel}
              selectedRoomType={selectedRoomType}
              setSelectedRoomType={setSelectedRoomType}
              priceDisplay={priceDisplay}
              setPriceDisplay={setPriceDisplay}
              showEarnings={showEarnings}
              setShowEarnings={setShowEarnings}
            />

          )}
            {activeTab === "policies" && <PoliciesSection hotel={hotel} />}
        </div>
      </div>
      <Footer />
    </>
  );
} 