import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './SearchOptions.module.css';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useDebounce } from '../../lib/useDebounce';
import { searchApi } from '../../lib/searchApi';

export default function SearchOptions({
  initialDestination = '',
  initialDates = null, // {startDate, endDate}
  initialRooms = null, // [{adults, children, childrenAges}]
  onSearch // function(destination, dates, rooms)
}) {
  const [openCard, setOpenCard] = useState(null); // 'destination', 'dates', 'guests', or null
  const [destinationInput, setDestinationInput] = useState(initialDestination);
  const cardRef = useRef(null);
  const [error, setError] = useState('');

  // Add validation states
  const [destinationError, setDestinationError] = useState('');
  const [datesError, setDatesError] = useState('');
  const [guestsError, setGuestsError] = useState('');

  // Auto-suggest states
  const [apiSuggestions, setApiSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const debouncedSearchTerm = useDebounce(destinationInput, 500); // 500ms debounce

  // Recommended searches state
  const [recommendedSearches, setRecommendedSearches] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  // Static data for popular searches (keeping this for fallback)
  const popularSearches = ['Delhi', 'Mumbai', 'Bengaluru', 'Goa', 'Chennai'];

  // Add these states at the top of your component
  const [dateRange, setDateRange] = useState([
    initialDates && initialDates.startDate && initialDates.endDate ? {
      startDate: new Date(initialDates.startDate),
      endDate: new Date(initialDates.endDate),
      key: 'selection',
    } : {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
  ]);
  const [datesInput, setDatesInput] = useState(
    initialDates && initialDates.startDate && initialDates.endDate
      ? `${new Date(initialDates.startDate).toLocaleDateString()} - ${new Date(initialDates.endDate).toLocaleDateString()}`
      : ''
  );
  

  // --- Rooms & Guests State ---
  const [rooms, setRooms] = useState(
    initialRooms && Array.isArray(initialRooms) && initialRooms.length > 0
      ? initialRooms
      : [{ adults: 2, children: 0, childrenAges: [] }]
  );

  // Helper for updating a room
  const updateRoom = (idx, newRoom) => {
    setRooms(rooms => rooms.map((room, i) => i === idx ? { ...room, ...newRoom } : room));
  };

  // Handler for adults/children increment/decrement
  const handleAdultsChange = (roomIdx, delta) => {
    setRooms(rooms => rooms.map((room, i) =>
      i === roomIdx ? { ...room, adults: Math.max(1, room.adults + delta) } : room
    ));
  };
  const handleChildrenChange = (roomIdx, delta) => {
    setRooms(rooms => rooms.map((room, i) => {
      if (i !== roomIdx) return room;
      let newChildren = Math.max(0, Math.min(6, room.children + delta));
      let newAges = [...room.childrenAges];
      if (newChildren > room.children) {
        // Add default age 0 for new child
        newAges.push(0);
      } else if (newChildren < room.children) {
        // Remove last age
        newAges.pop();
      }
      return { ...room, children: newChildren, childrenAges: newAges };
    }));
  };
  const handleChildAgeChange = (roomIdx, childIdx, age) => {
    setRooms(rooms => rooms.map((room, i) => {
      if (i !== roomIdx) return room;
      let newAges = [...room.childrenAges];
      newAges[childIdx] = parseInt(age);
      return { ...room, childrenAges: newAges };
    }));
  };
  const handleAddRoom = () => {
    setRooms([...rooms, { adults: 2, children: 0, childrenAges: [] }]);
  };
  const handleDone = () => {
    setOpenCard(null);
  };

  // Add this handler in your component
  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
    const start = ranges.selection.startDate;
    const end = ranges.selection.endDate;
    if (start && end) {
      setDatesInput(
        `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
      );
      setDatesError('');
    } else {
      setDatesError('Please select check-in and check-out dates.');
    }
  };

  // Add a function to summarize rooms, adults, and children
  const getGuestsSummary = () => {
    const totalRooms = rooms.length;
    const totalAdults = rooms.reduce((sum, r) => sum + (r.adults || 0), 0);
    const totalChildren = rooms.reduce((sum, r) => sum + (r.children || 0), 0);
    let summary = `${totalRooms} Room${totalRooms > 1 ? 's' : ''}, ${totalAdults} Adult${totalAdults > 1 ? 's' : ''}`;
    if (totalChildren > 0) summary += `, ${totalChildren} Child${totalChildren > 1 ? 'ren' : ''}`;
    return summary;
  };

  // Auto-suggest API call with debouncing
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchTerm.trim().length >= 3) {
        setIsLoadingSuggestions(true);
        try {
          const results = await searchApi.getAutoSuggest(debouncedSearchTerm);
          const formattedSuggestions = results.map(searchApi.formatSuggestion).filter(Boolean);
          setApiSuggestions(formattedSuggestions);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setApiSuggestions([]);
        } finally {
          setIsLoadingSuggestions(false);
        }
      } else {
        setApiSuggestions([]);
        setIsLoadingSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchTerm]);

  // Fetch recommended searches on component mount
  useEffect(() => {
    const fetchRecommendedSearches = async () => {
      setIsLoadingRecommendations(true);
      try {
        const recommendations = await searchApi.getRecommendedSearches(6);
        setRecommendedSearches(recommendations);
      } catch (error) {
        console.error('Error fetching recommended searches:', error);
        setRecommendedSearches([]);
      } finally {
        setIsLoadingRecommendations(false);
      }
    };

    fetchRecommendedSearches();
  }, []);

  // Close card when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setOpenCard(null);
      }
    }
    if (openCard) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openCard]);

  // Handle selecting a suggestion or popular search
  const handleSelectDestination = (name) => {
    setDestinationInput(name);
    setDestinationError('');
    setOpenCard(null);
    
    // Automatically trigger search if onSearch callback is provided
    if (onSearch && dateRange[0].startDate && dateRange[0].endDate) {
      const dates = {
        startDate: dateRange[0].startDate.toISOString(),
        endDate: dateRange[0].endDate.toISOString()
      };
      onSearch(name, dates, rooms);
    }
  };

  // Validate guests on change
  useEffect(() => {
    let hasError = false;
    rooms.forEach((room, idx) => {
      if (room.adults < 1) {
        setGuestsError(`Room ${idx + 1} must have at least 1 adult.`);
        hasError = true;
      }
      if (room.children > 0 && room.childrenAges.some(age => age === undefined || age === null || isNaN(age))) {
        setGuestsError(`Please set age for all children in Room ${idx + 1}.`);
        hasError = true;
      }
    });
    if (!hasError) setGuestsError('');
  }, [rooms]);

  // Define handleDestinationInput for real-time validation
  const handleDestinationInput = (e) => {
    const value = e.target.value;
    setDestinationInput(value);
    if (!value.trim()) {
      setDestinationError('Please enter a destination.');
    } else {
      setDestinationError('');
    }
  };

  return (
    <div className={styles.searchOptions}>
      <div className={`${styles.searchOption} ${styles.destination} ${destinationError ? styles.inputError : ''}`} style={{position: 'relative'}}>
        <Image src="/images/destination.svg" alt="destination" width={24} height={24} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Destination / Hotel Name"
          value={destinationInput}
          onFocus={() => setOpenCard('destination')}
          onClick={() => setOpenCard('destination')}
          onChange={handleDestinationInput}
        />
        {openCard === 'destination' && (
          <div ref={cardRef} className={styles.cardPopup} style={{width: 400, padding: 16, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', position: 'absolute', zIndex: 10, top: 48, left: 0}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{fontWeight: 600}}>Where</span>
              <button onClick={() => setOpenCard(null)} style={{background: 'none', border: 'none', fontSize: 20, cursor: 'pointer'}}>×</button>
            </div>
            <div style={{margin: '16px 0', textAlign: 'center', color: '#888'}}>
              <Image src="/images/search1.svg" alt="search" width={32} height={32} />
              <div>Look up destinations, places to stay, or landmarks</div>
            </div>
            
            {/* API Suggestions */}
            <div>
              {destinationInput.trim().length >= 3 && (
                <div>
                  {isLoadingSuggestions && (
                    <div style={{padding: '8px 0', textAlign: 'center', color: '#888', fontSize: 14}}>
                      Searching...
                    </div>
                  )}
                  
                  {!isLoadingSuggestions && apiSuggestions.length > 0 && (
                    <div>
                      <div style={{fontWeight: 500, marginBottom: 8, color: '#000', fontSize: 14}}>Suggestions</div>
                      {apiSuggestions.map((suggestion, i) => (
                        <div 
                          key={suggestion.id || i} 
                          style={{
                            display: 'flex', 
                            alignItems: 'center', 
                            padding: '8px 0', 
                            cursor: 'pointer',
                            borderRadius: 4,
                            transition: 'background-color 0.2s'
                          }} 
                          onClick={() => handleSelectDestination(suggestion.name)}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <Image 
                            src={suggestion.isProperty ? '/images/hotellogo.svg' : '/images/goto.svg'} 
                            alt="icon" 
                            width={suggestion.isProperty ? 36 : 24} 
                            height={suggestion.isProperty ? 36 : 24} 
                            style={{marginRight: 8}} 
                          />
                          <div>
                            <div style={{fontWeight: 700, color: '#000', fontSize: 14}}>{suggestion.name}</div>
                            {suggestion.description && (
                              <div style={{fontSize: 12, color: '#888'}}>{suggestion.description}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {!isLoadingSuggestions && destinationInput.trim().length >= 3 && apiSuggestions.length === 0 && (
                    <div style={{padding: '8px 0', textAlign: 'center', color: '#888', fontSize: 14}}>
                      No suggestions found for "{destinationInput}"
                    </div>
                  )}
                </div>
              )}
              
              {destinationInput.trim().length < 3 && destinationInput.trim().length > 0 && (
                <div style={{padding: '8px 0', textAlign: 'center', color: '#888', fontSize: 14}}>
                  Type at least 3 characters to search
                </div>
              )}
            </div>
            <div style={{borderTop: '1px solid #eee', margin: '12px 0'}}></div>
            
            {/* Recommended Searches Section */}
            <div style={{fontWeight: 500, marginBottom: 8, color: '#000', display: 'flex', alignItems: 'center', gap: 8}}>
              <span>Recommended for you</span>
              {isLoadingRecommendations && (
                <div style={{
                  width: 12, 
                  height: 12, 
                  border: '2px solid #ddd', 
                  borderTop: '2px solid #007bff', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite'
                }}></div>
              )}
            </div>
            
            <div>
              {recommendedSearches.length > 0 ? (
                recommendedSearches.map((recommendation, i) => (
                  <div 
                    key={i} 
                    style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      padding: '8px 0', 
                      cursor: 'pointer', 
                      color: '#000',
                      borderRadius: 4,
                      transition: 'background-color 0.2s'
                    }} 
                    onClick={() => handleSelectDestination(recommendation.keyword)}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <Image 
                        src={
                          recommendation.type === 'trending' ? '/images/trending.svg' :
                          recommendation.type === 'popular' ? '/images/fire.svg' : 
                          '/images/goto.svg'
                        } 
                        alt="search" 
                        width={18} 
                        height={18} 
                        style={{marginRight: 8}} 
                      />
                      <span style={{color: '#000', fontWeight: 500}}>{recommendation.keyword}</span>
                    </div>
                    <div style={{fontSize: 11, color: '#666', display: 'flex', alignItems: 'center', gap: 4}}>
                      {recommendation.type === 'trending' && (
                        <span style={{
                          background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', 
                          color: 'white', 
                          padding: '2px 6px', 
                          borderRadius: 8, 
                          fontSize: 10
                        }}>
                          🔥 TRENDING
                        </span>
                      )}
                      {recommendation.type === 'popular' && (
                        <span style={{
                          background: 'linear-gradient(135deg, #3742fa, #5f27cd)', 
                          color: 'white', 
                          padding: '2px 6px', 
                          borderRadius: 8, 
                          fontSize: 10
                        }}>
                          ⭐ POPULAR
                        </span>
                      )}
                      {recommendation.type === 'destination' && (
                        <span style={{color: '#888', fontSize: 10}}>{recommendation.description}</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                // Fallback to static popular searches
                popularSearches.map((city, i) => (
                  <div key={i} style={{display: 'flex', alignItems: 'center', padding: '6px 0', cursor: 'pointer', color: '#000'}} onClick={() => handleSelectDestination(city)}>
                    <Image src="/images/goto.svg" alt="search" width={18} height={18} style={{marginRight: 8}} />
                    <span style={{color: '#000'}}>{city}</span>
                  </div>
                ))
              )}
            </div>
            {destinationError && (
              <div style={{ color: 'red', margin: '8px 0', fontWeight: 500, fontSize: 14 }}>{destinationError}</div>
            )}
          </div>
        )}
      </div>
      {/* Dates card with same style */}
      <div className={`${styles.searchOption} ${styles.dates}`} style={{position: 'relative'}}>
        <Image src="/images/calendar.svg" alt="calendar" width={24} height={24} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Check-In / Check-Out"
          value={datesInput}
          readOnly
          onFocus={() => setOpenCard('dates')}
          onClick={() => setOpenCard('dates')}
        />
        {openCard === 'dates' && (
          <div ref={cardRef} className={styles.cardPopup} style={{width: 400, padding: 16, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', position: 'absolute', zIndex: 10, top: 48, left: 0}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
              <span style={{fontWeight: 600}}>Select Dates</span>
              <button onClick={() => setOpenCard(null)} style={{background: 'none', border: 'none', fontSize: 20, cursor: 'pointer'}}>×</button>
            </div>
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              months={2}
              direction="horizontal"
              minDate={new Date()}
            />
            {datesError && (
              <div style={{ color: 'red', margin: '8px 0', fontWeight: 500, fontSize: 14 }}>{datesError}</div>
            )}
          </div>
        )}
      </div>
      {/* Guests card with same style */}
      <div className={`${styles.searchOption} ${styles.guests}`} style={{position: 'relative'}}>
        <Image src="/images/user.svg" alt="user" width={24} height={24} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Rooms & Guests"
          value={getGuestsSummary()}
          readOnly
          onFocus={() => setOpenCard('guests')}
          onClick={() => setOpenCard('guests')}
        />
        {openCard === 'guests' && (
          <div ref={cardRef} className={styles.cardPopup} style={{width: 400, padding: 16, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', position: 'absolute', zIndex: 10, top: 48, left: 0}}>
            {rooms.map((room, roomIdx) => (
              <div key={roomIdx} style={{marginBottom: roomIdx < rooms.length - 1 ? 24 : 0}}>
                <div style={{fontWeight: 600, marginBottom: 8}}>Room {roomIdx + 1}</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
                  <div>
                    <div style={{fontSize: 14, fontWeight: 500,color:'#000'}}>Adults</div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      <button onClick={() => handleAdultsChange(roomIdx, -1)} style={{width: 32, height: 32, borderRadius: 8, border: '1px solid #ccc', background: '#fafafa', fontSize: 20, fontWeight: 600, cursor: 'pointer'}} disabled={room.adults <= 1}>-</button>
                      <span style={{minWidth: 24, textAlign: 'center', fontWeight: 600, fontSize: 18,color:'#000'}}>{room.adults.toString().padStart(1, '0')}</span>
                      <button onClick={() => handleAdultsChange(roomIdx, 1)} style={{width: 32, height: 32, borderRadius: 8, border: '1px solid #ccc', background: '#fafafa', fontSize: 20, fontWeight: 600, cursor: 'pointer'}}>+</button>
                    </div>
                  </div>
                  <div>
                    <div style={{fontSize: 14, fontWeight: 500,color:'#000'}}>Children</div>
                    <div style={{fontSize: 11, color: '#888', marginBottom: 2}}>(Ages 0 to 11)</div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      <button onClick={() => handleChildrenChange(roomIdx, -1)} style={{width: 32, height: 32, borderRadius: 8, border: '1px solid #ccc', background: '#fafafa', fontSize: 20, fontWeight: 600, cursor: 'pointer'}} disabled={room.children <= 0}>-</button>
                      <span style={{minWidth: 24, textAlign: 'center', fontWeight: 600, fontSize: 18,color:'#000'}}>{room.children.toString().padStart(2, '0')}</span>
                      <button onClick={() => handleChildrenChange(roomIdx, 1)} style={{width: 32, height: 32, borderRadius: 8, border: '1px solid #ccc', background: '#fafafa', fontSize: 20, fontWeight: 600, cursor: room.children >= 6 ? 'not-allowed' : 'pointer'}} disabled={room.children >= 6}>+</button>
                    </div>
                  </div>
                </div>
                {/* Divider line */}
                <div style={{borderTop: '1px solid #eee', margin: '16px 0 12px 0'}}></div>
                {room.children > 0 && (
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 8}}>
                    {room.childrenAges.map((age, childIdx) => (
                      <div key={childIdx} style={{flex: '1 0 30%', minWidth: 80}}>
                        <div style={{fontSize: 13, fontWeight: 500, marginBottom: 2,color:'#000'}}>Child {childIdx + 1} Age<span style={{color: 'red'}}>*</span></div>
                        <select
                          value={age}
                          onChange={e => handleChildAgeChange(roomIdx, childIdx, e.target.value)}
                          style={{width: '100%', padding: '6px 8px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, fontWeight: 600, background: '#fafafa'}}
                        >
                          {[...Array(12).keys()].map(n => (
                            <option key={n} value={n}>{n.toString().padStart(2, '0')}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {rooms.length < 6 && (
              <div style={{color: '#0072ff', fontWeight: 600, cursor: 'pointer', marginBottom: 16}} onClick={handleAddRoom}>+ Add New Room</div>
            )}
            <button onClick={handleDone} style={{width: '100%', background: '#0072ff', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 600, fontSize: 18, marginTop: 8, cursor: 'pointer'}}>Done</button>
            {guestsError && (
              <div style={{ color: 'red', margin: '8px 0', fontWeight: 500, fontSize: 14 }}>{guestsError}</div>
            )}
          </div>
        )}
      </div>
      <button
        className={styles.searchSubmit}
        onClick={() => {
          // Validation
          if (!destinationInput.trim()) {
            setDestinationError('Please enter a destination.');
            return;
          }
          if (!dateRange[0].startDate || !dateRange[0].endDate) {
            setDatesError('Please select check-in and check-out dates.');
            return;
          }
          setError('');
          if (onSearch) {
            const dates = {
              startDate: dateRange[0].startDate.toISOString(),
              endDate: dateRange[0].endDate.toISOString()
            };
            onSearch(destinationInput, dates, rooms);
          } else {
            const params = new URLSearchParams();
            params.append('destination', destinationInput);
            params.append('startDate', dateRange[0].startDate.toISOString());
            params.append('endDate', dateRange[0].endDate.toISOString());
            params.append('rooms', JSON.stringify(rooms));
            window.location.href = `/search?${params.toString()}`;
          }
        }}
        type="button"
      >
        <Image src="/images/search.svg" alt="search" width={24} height={24} className={styles.searchSubmitIcon} />
      </button>
      {error && (
        <div style={{ color: 'red', marginTop: 8, fontWeight: 500, fontSize: 14 }}>{error}</div>
      )}
    </div>
  );
} 