"use client"

import React from "react"

import { useSearchParams, useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronRight, Info, CheckCircle, SquareDot, Check } from "lucide-react"

import "./review-booking.css"

const Button = React.forwardRef(({ className, variant = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? "span" : "button"
  let buttonClasses = "custom-button"
  if (variant === "link") {
    buttonClasses += " variant-link"
  }
  return <Comp className={`${buttonClasses} ${className || ""}`} ref={ref} {...props} />
})
Button.displayName = "Button"

// Card Components
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`custom-card ${className || ""}`} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`custom-card-header ${className || ""}`} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={`custom-card-title ${className || ""}`} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`custom-card-content ${className || ""}`} {...props} />
))
CardContent.displayName = "CardContent"

// Input Component
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return <input type={type} className={`custom-input ${className || ""}`} ref={ref} {...props} />
})
Input.displayName = "Input"

// Label Component
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={`custom-label ${className || ""}`} {...props} />
))
Label.displayName = "Label"

// Checkbox Component
const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <label className={`custom-checkbox-container ${className || ""}`}>
    <input type="checkbox" ref={ref} className="custom-checkbox-input" {...props} />
    <span className="custom-checkbox-checkmark">
      <Check />
    </span>
  </label>
))
Checkbox.displayName = "Checkbox"

// Select Components (Simplified HTML Select)
const Select = ({ children, defaultValue, onValueChange }) => {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (event) => {
    setValue(event.target.value)
    if (onValueChange) {
      onValueChange(event.target.value)
    }
  }

  return (
    <select className="custom-select" value={value} onChange={handleChange}>
      {children}
    </select>
  )
}

const SelectValue = ({ placeholder }) => (
  <option value="" disabled>
    {placeholder}
  </option>
)

const SelectTrigger = ({ children, className }) => (
  // In a pure HTML select, the trigger is the select itself.
  // This component is mostly a placeholder for API compatibility.
  <div className={className}>{children}</div>
)

const SelectContent = ({ children }) => <>{children}</>

const SelectItem = ({ children, value }) => <option value={value}>{children}</option>

// Separator Component
const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <div
    ref={ref}
    className={`custom-separator ${orientation === "vertical" ? "vertical" : "horizontal"} ${className || ""}`}
    {...props}
  />
))
Separator.displayName = "Separator"

// Tooltip Components (Simplified HTML Title attribute + basic CSS)
const TooltipProvider = ({ children }) => <>{children}</>

const Tooltip = ({ children }) => <>{children}</>

const TooltipTrigger = ({ children, asChild, ...props }) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      className: `${children.props.className || ""} custom-tooltip-trigger`,
    })
  }
  return (
    <span className="custom-tooltip-trigger" {...props}>
      {children}
    </span>
  )
}

const TooltipContent = ({ children, className, ...props }) => (
  <div className={`custom-tooltip-content ${className || ""}`} {...props}>
    {children}
  </div>
)

// --- CommonHeader Component (Integrated) ---
const CommonHeader = () => {
  return (
    <header className="common-header">
      <div className="common-header-content">
        <h1 className="common-header-title">Hotel Booking</h1>
      </div>
    </header>
  )
}

// --- Main ReviewBookingPage Component ---
export default function ReviewBookingPage() {
  const searchParams = useSearchParams()
  const params = useParams()
  const router = useRouter()

  const roomType = searchParams.get("roomType")
  const ratePlanId = searchParams.get("ratePlanId")
  const hotelId = params.id

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

  const [hotel, setHotel] = useState(null)
  const [ratePlan, setRatePlan] = useState(null)

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/searchproperty/PropertyById/${hotelId}`)
        const data = await response.json()
        setHotel(data)
      } catch (error) {
        console.error("Failed to fetch hotel details:", error)
        setHotel(null)
      }
    }

    if (hotelId) fetchHotelDetails()

    if (ratePlanId) {
      const plan = ratePlans.find((p) => String(p.id) === String(ratePlanId))
      setRatePlan(plan)
    }
  }, [hotelId, ratePlanId])

  const displayHotel = hotel || {
    name: "Rixos Premium Dubai",
    address: "East Crescent Road, Palm Jumeirah, P O B, 566737, Dubai",
    rating: 8.0,
    reviews: 4,
    image: "/placeholder.svg?height=180&width=240",
  }

  const displayRatePlan = ratePlan || {
    cancellation: "Free Cancellation till 24 Dec 2024, 02:00 hr",
    boardBasis: "Half Board (Includes breakfast and lunch)",
    price: 8000,
    taxes: 750,
    isRefundable: true,
  }

  const totalAmount = displayRatePlan.price + displayRatePlan.taxes

  return (
    <>
      <CommonHeader />
      <div className="review-booking-page">
        <div className="main-content-card">
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Review your booking */}
            <section>
              <h2 className="section-title">
                <ChevronRight className="w-5 h-5" />
                Review your booking
              </h2>
              <p style={{ fontSize: "14px", color: "#666", marginBottom: "16px" }}>
                Fully refundable before May 13 2024, 11:59pm{" "}
                <span style={{ color: "#a0a0a0" }}>(property local time)</span>
              </p>
              <Card className="hotel-info-card">
                <CardContent className="hotel-info-content">
                  <div className="hotel-image-container">
                    <Image
                      src={displayHotel.image || "/placeholder.svg"}
                      alt="Hotel Image"
                      width={240}
                      height={180}
                      className="hotel-image"
                    />
                    <div className="rating-badge-container">
                      <div className="rating-badge">{displayHotel.rating}</div>
                      <div style={{ fontSize: "14px", fontWeight: "500" }}>Excellent</div>
                      <div style={{ fontSize: "12px", color: "#888" }}>{displayHotel.reviews} Reviews</div>
                    </div>
                  </div>
                  <div className="hotel-details-content">
                    <h3 className="hotel-name">
                      {displayHotel.name} <span style={{ color: "#f1c40f" }}>★★★★★</span>
                    </h3>
                    <p className="hotel-address">{displayHotel.address}</p>
                    <p className="room-type">Room: {roomType || "Classic Room, 1 King Bed"}</p>
                    <div className="cancellation-info">
                      <CheckCircle className="w-4 h-4" />
                      {displayRatePlan.cancellation}
                    </div>
                    <div className="board-basis-info">
                      <CheckCircle className="w-4 h-4" />
                      Breakfast Included
                    </div>
                    <p className="review-cancellation-text">Review cancellation</p>
                    <p className="check-in-out-text">Check-In: May 10 2024 | Check-Out: May 13 2024</p>
                    <p className="guests-text">3-Nights stay,</p>
                    <p className="guests-text">2 Rooms, 5 Adults, 2 Childs (Age 2, 5)</p>
                    <div className="room-amenities">
                      <div className="room-amenity-item">
                        <SquareDot className="w-4 h-4" />
                        33 sq m
                      </div>
                      <div className="room-amenity-item">
                        <SquareDot className="w-4 h-4" />3 King Bed
                      </div>
                    </div>
                    <Button variant="link" className="view-amenities-button">
                      View Room Amenities
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Guest Details */}
            <section>
              <h3 className="section-title">
                <ChevronRight className="w-5 h-5" />
                Who&apos;s checking in?
              </h3>
              <div className="guest-details-warning">
                <Info className="w-4 h-4" />
                To prevent boarding issues or extra fees, ensure that names match exactly with government-issued IDs.
              </div>

              <div style={{ display: "grid", gap: "24px" }}>
                {/* Room 1 */}
                <div className="guest-room-section">
                  <h4 className="guest-room-title">Room 1: 3 Adults, 1 Child</h4>
                  <div className="guest-input-grid">
                    <div className="guest-input-group">
                      <Select defaultValue="Mr.">
                        <SelectTrigger style={{ width: "80px" }}>
                          <SelectValue placeholder="Title" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mr.">Mr.</SelectItem>
                          <SelectItem value="Ms.">Ms.</SelectItem>
                          <SelectItem value="Mrs.">Mrs.</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="First Name *" style={{ flex: 1 }} />
                    </div>
                    <Input placeholder="Last Name *" />
                  </div>
                  <div className="guest-input-grid">
                    <Input placeholder="Enter email address *" />
                    <div className="guest-input-group">
                      <Select defaultValue="+91">
                        <SelectTrigger style={{ width: "80px" }}>
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+91">+91</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="Enter Mobile number *" style={{ flex: 1 }} />
                    </div>
                  </div>
                  <Input placeholder="PAN card number" style={{ marginBottom: "16px" }} />
                  <div className="save-details-checkbox">
                    <Checkbox id="save-details-1" />
                    <Label htmlFor="save-details-1">Save adult details</Label>
                  </div>
                </div>

                {/* Room 2 */}
                <div className="guest-room-section">
                  <h4 className="guest-room-title">Room 2: 3 Adults, 1 Child</h4>
                  <div className="guest-input-grid">
                    <div className="guest-input-group">
                      <Select defaultValue="Mr.">
                        <SelectTrigger style={{ width: "80px" }}>
                          <SelectValue placeholder="Title" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mr.">Mr.</SelectItem>
                          <SelectItem value="Ms.">Ms.</SelectItem>
                          <SelectItem value="Mrs.">Mrs.</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="First Name *" style={{ flex: 1 }} />
                    </div>
                    <Input placeholder="Last Name *" />
                  </div>
                  <div className="guest-input-grid">
                    <Input placeholder="Enter email address *" />
                    <div className="guest-input-group">
                      <Select defaultValue="+91">
                        <SelectTrigger style={{ width: "80px" }}>
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+91">+91</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="Enter Mobile number *" style={{ flex: 1 }} />
                    </div>
                  </div>
                  <Input placeholder="PAN card number" style={{ marginBottom: "16px" }} />
                  <div className="save-details-checkbox">
                    <Checkbox id="save-details-2" />
                    <Label htmlFor="save-details-2">Save adult details</Label>
                  </div>
                </div>
              </div>
            </section>

            {/* Special Requests */}
            <section>
              <h3 className="section-title">
                <ChevronRight className="w-5 h-5" />
                Special Requests (Options)
              </h3>
              <div className="special-requests-options">
                <div className="special-request-item">
                  <Checkbox id="early-check-in" />
                  <Label htmlFor="early-check-in">Early Check In</Label>
                </div>
                <div className="special-request-item">
                  <Checkbox id="late-check-out" />
                  <Label htmlFor="late-check-out">Late Check-Out</Label>
                </div>
                <div className="special-request-item">
                  <Checkbox id="additional-bed" />
                  <Label htmlFor="additional-bed">Additional Bed</Label>
                </div>
                <div className="special-request-item">
                  <Checkbox id="anniversary-birthday" />
                  <Label htmlFor="anniversary-birthday">Anniversary / Birthday support</Label>
                </div>
              </div>
              <textarea
                placeholder="Type your request here, we will share them with the property."
                className="request-textarea"
              />
              <p className="special-requests-note">*Please Note: All Special Requests are subject to availability.</p>
            </section>

            {/* Continue Button */}
            <div className="continue-button-container">
              <Button className="continue-button">Continue</Button>
            </div>

            {/* Important Information */}
            <section className="important-info-section">
              <h4 className="important-info-title">
                <ChevronRight className="w-5 h-5" />
                Important information
              </h4>
              <p className="important-info-text">
                An adult over the age of 18 must take responsibility for the booking. Guests will be greeted by the
                front desk staff upon arrival.
              </p>
              <div className="check-times-container">
                <div>
                  Check-in: <span className="check-time-item">May 10 2024 | 4:00 PM</span>
                </div>
                <div>
                  Check-out: <span className="check-time-item">May 13 2024 | 11:00 AM</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="right-column-content">
            {/* Price Summary */}
            <Card className="price-summary-card">
              <CardHeader style={{ padding: "0", marginBottom: "16px" }}>
                <CardTitle className="price-summary-title">Price summary</CardTitle>
              </CardHeader>
              <CardContent style={{ padding: "0", display: "grid", gap: "12px", fontSize: "14px" }}>
                <div className="price-item">
                  <span>Base Fare</span>
                  <span>₹{displayRatePlan.price.toLocaleString()}</span>
                </div>
                <div className="price-item" style={{ alignItems: "center" }}>
                  <span>
                    Taxes & fees{" "}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info
                            className="taxes-info-icon"
                            title="The taxes are tax recovery charges paid to vendors (e.g. hotels); for details, please see our Terms of Use . Service fees are retained as compensation in servicing your booking and may include fees charged by vendors"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          The taxes are tax recovery charges paid to vendors (e.g. hotels); for details, please see our
                          Terms of Use . Service fees are retained as compensation in servicing your booking and may
                          include fees charged by vendors
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                  <span>₹{displayRatePlan.taxes.toLocaleString()}</span>
                </div>
                <div className="price-item">
                  <span>Local Taxes (if applicable)</span>
                  <span>₹00</span>
                </div>
                <Separator className="custom-separator" style={{ margin: "12px 0" }} />
                <div className="total-amount-row">
                  <span>Total amount</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                <p className="rates-quoted-text">Rates are quoted in ₹</p>
              </CardContent>
              <div className="tax-disclaimer">
                This property will collect any additional mandatory tax at check-in or check out
              </div>
              <div className="terms-checkbox-container">
                <Checkbox id="terms-conditions" className="terms-checkbox" />
                <Label htmlFor="terms-conditions" className="terms-label">
                  By clicking you acknowledge that you have read and agreed to the{" "}
                  <a href="#" className="terms-link">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="terms-link">
                    Privacy Policy
                  </a>
                </Label>
              </div>
              <Button onClick={() => router.push(`/booking-confirmation/page.js`)} className="book-button">
                Book
              </Button>
            </Card>

            {/* Need Assistance */}
            <section className="need-assistance-section">
              <h3 className="need-assistance-title">Need Assistance ?</h3>
              <p className="contact-info">info@vernost.com</p>
              <p className="contact-info">999999998</p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
