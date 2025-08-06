const db = require("../config/db");

// In-memory storage for search analytics (replace with Redis/Database in production)
let searchHistory = [];
let popularSearches = new Map();
let trendingSearches = new Map();

// 🔍 Auto Suggest Function - Enhanced for better search results
exports.getAutoSuggest = async (keyword) => {
  try {
    console.log("DAO: getAutoSuggest called with keyword:", keyword);
    
    // Track search for analytics
    this.trackSearch(keyword);
    
    // Mock data for demonstration - replace with actual DB query when database is ready
    const mockData = [
      { property_id: 1, property_name: 'Taj Lands End', city_name: 'Mumbai', state_name: 'Maharashtra', country_name: 'India', category: 'property', popularity: 95 },
      { property_id: 2, property_name: 'The Taj Mahal Palace Mumbai', city_name: 'Mumbai', state_name: 'Maharashtra', country_name: 'India', category: 'property', popularity: 98 },
      { property_id: 3, property_name: 'Taj Santacruz', city_name: 'Mumbai', state_name: 'Maharashtra', country_name: 'India', category: 'property', popularity: 85 },
      { property_id: 4, property_name: 'Taj Mahal Tower, Mumbai', city_name: 'Mumbai', state_name: 'Maharashtra', country_name: 'India', category: 'property', popularity: 92 },
      { property_id: 5, property_name: 'Oberoi Mumbai', city_name: 'Mumbai', state_name: 'Maharashtra', country_name: 'India', category: 'property', popularity: 88 },
      { property_id: 6, property_name: 'ITC Grand Central', city_name: 'Mumbai', state_name: 'Maharashtra', country_name: 'India', category: 'property', popularity: 82 },
      { property_id: 7, property_name: 'Hotel Delhi Palace', city_name: 'Delhi', state_name: 'Delhi', country_name: 'India', category: 'property', popularity: 87 },
      { property_id: 8, property_name: 'The Leela Ambience', city_name: 'Delhi', state_name: 'Delhi', country_name: 'India', category: 'property', popularity: 90 },
      { property_id: 9, property_name: 'Taj Bengal', city_name: 'Bengaluru', state_name: 'Karnataka', country_name: 'India', category: 'property', popularity: 86 },
      { property_id: 10, property_name: 'ITC Windsor', city_name: 'Bengaluru', state_name: 'Karnataka', country_name: 'India', category: 'property', popularity: 84 },
      { property_id: 11, property_name: 'Taj Exotica Resort', city_name: 'Goa', state_name: 'Goa', country_name: 'India', category: 'property', popularity: 96 },
      { property_id: 12, property_name: 'Grand Hyatt Goa', city_name: 'Goa', state_name: 'Goa', country_name: 'India', category: 'property', popularity: 91 },
      { property_id: 13, property_name: 'The Leela Palace Chennai', city_name: 'Chennai', state_name: 'Tamil Nadu', country_name: 'India', category: 'property', popularity: 89 },
      { property_id: 14, property_name: 'ITC Grand Chola', city_name: 'Chennai', state_name: 'Tamil Nadu', country_name: 'India', category: 'property', popularity: 87 },
      // Add location-based suggestions
      { city_name: 'Mumbai', state_name: 'Maharashtra', country_name: 'India', category: 'city', popularity: 99 },
      { city_name: 'Delhi', state_name: 'Delhi', country_name: 'India', category: 'city', popularity: 97 },
      { city_name: 'Bengaluru', state_name: 'Karnataka', country_name: 'India', category: 'city', popularity: 93 },
      { city_name: 'Goa', state_name: 'Goa', country_name: 'India', category: 'city', popularity: 95 },
      { city_name: 'Chennai', state_name: 'Tamil Nadu', country_name: 'India', category: 'city', popularity: 90 },
      { city_name: 'Jaipur', state_name: 'Rajasthan', country_name: 'India', category: 'city', popularity: 88 },
      { city_name: 'Kochi', state_name: 'Kerala', country_name: 'India', category: 'city', popularity: 85 },
      { city_name: 'Pune', state_name: 'Maharashtra', country_name: 'India', category: 'city', popularity: 82 }
    ];

    // Filter based on keyword (case insensitive)
    const keyword_lower = keyword.toLowerCase();
    const filteredData = mockData.filter(item => 
      (item.property_name && item.property_name.toLowerCase().includes(keyword_lower)) ||
      (item.city_name && item.city_name.toLowerCase().includes(keyword_lower)) ||
      (item.state_name && item.state_name.toLowerCase().includes(keyword_lower)) ||
      (item.country_name && item.country_name.toLowerCase().includes(keyword_lower))
    );

    // Enhanced sorting with multiple criteria
    filteredData.sort((a, b) => {
      // Priority 1: Exact start matches
      const aPropStartMatch = a.property_name?.toLowerCase().startsWith(keyword_lower) ? 1 : 0;
      const bPropStartMatch = b.property_name?.toLowerCase().startsWith(keyword_lower) ? 1 : 0;
      const aCityStartMatch = a.city_name?.toLowerCase().startsWith(keyword_lower) ? 1 : 0;
      const bCityStartMatch = b.city_name?.toLowerCase().startsWith(keyword_lower) ? 1 : 0;
      
      // Priority 2: Category preference (properties > cities > states > countries)
      const getCategoryPriority = (item) => {
        if (item.property_name && item.property_name.toLowerCase().includes(keyword_lower)) return 1;
        if (item.city_name && item.city_name.toLowerCase().includes(keyword_lower)) return 2;
        if (item.state_name && item.state_name.toLowerCase().includes(keyword_lower)) return 3;
        return 4;
      };
      
      const aCategoryPriority = getCategoryPriority(a);
      const bCategoryPriority = getCategoryPriority(b);
      
      // Sort logic
      if (aPropStartMatch !== bPropStartMatch) return bPropStartMatch - aPropStartMatch;
      if (aCityStartMatch !== bCityStartMatch) return bCityStartMatch - aCityStartMatch;
      if (aCategoryPriority !== bCategoryPriority) return aCategoryPriority - bCategoryPriority;
      
      // Priority 3: Popularity score
      return (b.popularity || 0) - (a.popularity || 0);
    });

    const result = filteredData.slice(0, 8); // Increased to 8 results for better suggestions
    console.log("DAO: Mock query result rows count:", result.length);
    return result;

    // TODO: Replace with actual database query when database is configured
    /*
    const sql = `
      SELECT DISTINCT
        p.property_id,
        p.property_name,
        c.city_name,
        s.state_name,
        co.country_name,
        CASE 
          WHEN p.property_name LIKE CONCAT(?, '%') THEN 1
          WHEN c.city_name LIKE CONCAT(?, '%') THEN 2
          WHEN s.state_name LIKE CONCAT(?, '%') THEN 3
          WHEN co.country_name LIKE CONCAT(?, '%') THEN 4
          ELSE 5
        END as priority
      FROM property p
      JOIN city c ON p.city_id = c.city_id
      JOIN state s ON p.state_id = s.state_id
      JOIN country co ON p.country_id = co.country_id
      WHERE 
        p.property_name LIKE CONCAT('%', ?, '%')
        OR c.city_name LIKE CONCAT('%', ?, '%')
        OR s.state_name LIKE CONCAT('%', ?, '%')
        OR co.country_name LIKE CONCAT('%', ?, '%')
      ORDER BY priority, p.property_name
      LIMIT 5;
    `;
    
    console.log("DAO: Executing SQL query");
    const [rows] = await db.query(sql, [keyword, keyword, keyword, keyword, keyword, keyword, keyword, keyword]);
    console.log("DAO: Query result rows count:", rows.length);
    return rows;
    */
  } catch (error) {
    console.error("DAO Error in getAutoSuggest:", error);
    throw error;
  }
};

exports.searchByPropertyName = async (search_term) => {
  try {
    console.log("DAO: searchByPropertyName called with term:", search_term);
    
    // Track search for analytics
    this.trackSearch(search_term);
    
    // Mock data for search results - comprehensive hotel data for different locations
    const mockHotels = [
      {
        property_id: 1,
        property_name: 'Taj Lands End',
        star_category: 5,
        city_name: 'Mumbai',
        state_name: 'Maharashtra',
        image_name: 'taj_lands_end.jpg',
        room_type: 'Deluxe Room',
        max_adult: 2,
        total_rooms: 356,
        old_price: 25000,
        price: 20000,
        currency: 'INR',
        rate_name: 'Best Available Rate',
        booking_type: 'Standard',
        extra_beds: 1,
        max_occupancy: 3,
        amenities: 'Gym,Swimming Pool,Wifi,Spa,Bar,Conference Hall',
        inclusion_names: 'Breakfast,Airport Transfer,Welcome Drink'
      },
      {
        property_id: 2,
        property_name: 'The Taj Mahal Palace Mumbai',
        star_category: 5,
        city_name: 'Mumbai',
        state_name: 'Maharashtra',
        image_name: 'taj_mahal_palace.jpg',
        room_type: 'Palace Room',
        max_adult: 2,
        total_rooms: 565,
        old_price: 30000,
        price: 25000,
        currency: 'INR',
        rate_name: 'Heritage Package',
        booking_type: 'Premium',
        extra_beds: 1,
        max_occupancy: 3,
        amenities: 'Gym,Swimming Pool,Wifi,Spa,Bar,Conference Hall,Washer and dryer',
        inclusion_names: 'Breakfast,Dinner,Airport Transfer,Welcome Drink,City Tour'
      },
      {
        property_id: 3,
        property_name: 'Oberoi Mumbai',
        star_category: 5,
        city_name: 'Mumbai',
        state_name: 'Maharashtra',
        image_name: 'oberoi_mumbai.jpg',
        room_type: 'Premier Room',
        max_adult: 2,
        total_rooms: 287,
        old_price: 22000,
        price: 18000,
        currency: 'INR',
        rate_name: 'Luxury Stay',
        booking_type: 'Standard',
        extra_beds: 1,
        max_occupancy: 3,
        amenities: 'Gym,Swimming Pool,Wifi,Spa,Bar',
        inclusion_names: 'Breakfast,Airport Transfer'
      },
      {
        property_id: 4,
        property_name: 'Hotel Delhi Palace',
        star_category: 4,
        city_name: 'Delhi',
        state_name: 'Delhi',
        image_name: 'delhi_palace.jpg',
        room_type: 'Executive Room',
        max_adult: 2,
        total_rooms: 150,
        old_price: 15000,
        price: 12000,
        currency: 'INR',
        rate_name: 'Business Rate',
        booking_type: 'Standard',
        extra_beds: 1,
        max_occupancy: 3,
        amenities: 'Gym,Wifi,Conference Hall',
        inclusion_names: 'Breakfast'
      },
      {
        property_id: 5,
        property_name: 'The Leela Ambience Delhi',
        star_category: 5,
        city_name: 'Delhi',
        state_name: 'Delhi',
        image_name: 'leela_delhi.jpg',
        room_type: 'Grand Room',
        max_adult: 2,
        total_rooms: 450,
        old_price: 28000,
        price: 22000,
        currency: 'INR',
        rate_name: 'Grand Package',
        booking_type: 'Premium',
        extra_beds: 1,
        max_occupancy: 3,
        amenities: 'Gym,Swimming Pool,Wifi,Spa,Bar,Conference Hall',
        inclusion_names: 'Breakfast,Dinner,Airport Transfer,Welcome Drink'
      },
      {
        property_id: 6,
        property_name: 'Taj Exotica Resort',
        star_category: 5,
        city_name: 'Goa',
        state_name: 'Goa',
        image_name: 'taj_exotica_goa.jpg',
        room_type: 'Beach Villa',
        max_adult: 2,
        total_rooms: 140,
        old_price: 35000,
        price: 28000,
        currency: 'INR',
        rate_name: 'Beach Resort Package',
        booking_type: 'Premium',
        extra_beds: 1,
        max_occupancy: 3,
        amenities: 'Swimming Pool,Wifi,Spa,Bar',
        inclusion_names: 'Breakfast,Dinner,Water Sports,Airport Transfer'
      },
      {
        property_id: 7,
        property_name: 'Grand Hyatt Goa',
        star_category: 5,
        city_name: 'Goa',
        state_name: 'Goa',
        image_name: 'grand_hyatt_goa.jpg',
        room_type: 'Ocean View Room',
        max_adult: 2,
        total_rooms: 314,
        old_price: 32000,
        price: 25000,
        currency: 'INR',
        rate_name: 'Ocean Package',
        booking_type: 'Standard',
        extra_beds: 1,
        max_occupancy: 3,
        amenities: 'Swimming Pool,Wifi,Spa,Bar,Conference Hall',
        inclusion_names: 'Breakfast,Welcome Drink,Airport Transfer'
      },
      {
        property_id: 8,
        property_name: 'ITC Windsor Bengaluru',
        star_category: 5,
        city_name: 'Bengaluru',
        state_name: 'Karnataka',
        image_name: 'itc_windsor.jpg',
        room_type: 'Luxury Room',
        max_adult: 2,
        total_rooms: 237,
        old_price: 18000,
        price: 15000,
        currency: 'INR',
        rate_name: 'Corporate Rate',
        booking_type: 'Standard',
        extra_beds: 1,
        max_occupancy: 3,
        amenities: 'Gym,Swimming Pool,Wifi,Spa,Conference Hall',
        inclusion_names: 'Breakfast,Airport Transfer'
      },
      {
        property_id: 9,
        property_name: 'The Leela Palace Chennai',
        star_category: 5,
        city_name: 'Chennai',
        state_name: 'Tamil Nadu',
        image_name: 'leela_chennai.jpg',
        room_type: 'Palace Room',
        max_adult: 2,
        total_rooms: 326,
        old_price: 20000,
        price: 16000,
        currency: 'INR',
        rate_name: 'Palace Package',
        booking_type: 'Premium',
        extra_beds: 1,
        max_occupancy: 3,
        amenities: 'Gym,Swimming Pool,Wifi,Spa,Bar',
        inclusion_names: 'Breakfast,Dinner,Airport Transfer,Welcome Drink'
      },
      {
        property_id: 10,
        property_name: 'Fairmont Jaipur',
        star_category: 5,
        city_name: 'Jaipur',
        state_name: 'Rajasthan',
        image_name: 'fairmont_jaipur.jpg',
        room_type: 'Royal Room',
        max_adult: 2,
        total_rooms: 245,
        old_price: 24000,
        price: 19000,
        currency: 'INR',
        rate_name: 'Royal Package',
        booking_type: 'Premium',
        extra_beds: 1,
        max_occupancy: 3,
        amenities: 'Gym,Swimming Pool,Wifi,Spa,Bar,Conference Hall',
        inclusion_names: 'Breakfast,Dinner,Cultural Show,Airport Transfer'
      }
    ];

    // Filter based on search term (case insensitive)
    const searchTermLower = search_term.toLowerCase();
    const filteredHotels = mockHotels.filter(hotel => 
      hotel.property_name.toLowerCase().includes(searchTermLower) ||
      hotel.city_name.toLowerCase().includes(searchTermLower) ||
      hotel.state_name.toLowerCase().includes(searchTermLower)
    );

    // Sort by relevance - exact property name matches first, then city matches, then state matches
    filteredHotels.sort((a, b) => {
      const aNameMatch = a.property_name.toLowerCase().includes(searchTermLower) ? 1 : 0;
      const bNameMatch = b.property_name.toLowerCase().includes(searchTermLower) ? 1 : 0;
      const aCityMatch = a.city_name.toLowerCase().includes(searchTermLower) ? 1 : 0;
      const bCityMatch = b.city_name.toLowerCase().includes(searchTermLower) ? 1 : 0;
      
      if (aNameMatch !== bNameMatch) return bNameMatch - aNameMatch;
      if (aCityMatch !== bCityMatch) return bCityMatch - aCityMatch;
      return a.property_name.localeCompare(b.property_name);
    });

    const result = filteredHotels.slice(0, 20);
    console.log("DAO: Mock search result rows count:", result.length);
    return result;
    
  } catch (error) {
    console.error("DAO Error in searchByPropertyName:", error);
    throw error;
  }
};

exports.searchHotelsByOffers = async (offer) => {
  if (!offer) {
    return [];
  }

  const sql = `
    SELECT
      p.property_id,
      p.property_name,
      p.star_category,
      c.city_name,
      s.state_name,
      MIN(pp.image_name) AS image_name,
      MIN(r.room_type) AS room_type,
      MIN(r.max_adult) AS max_adult,
      MIN(r.total_rooms) AS total_rooms,
      MIN(rp.base_price) AS old_price,
      MIN(rp.total_price) AS price,
      MIN(rp.currency) AS currency,
      MIN(rp.rate_name) AS rate_name,
      MIN(rp.booking_type) AS booking_type,
      MIN(r.extra_beds) AS extra_beds,
      MIN(r.max_occupancy) AS max_occupancy,
      GROUP_CONCAT(DISTINCT f.facility_name) AS amenities,
      GROUP_CONCAT(DISTINCT i2.inclusion_name) AS inclusion_names

    FROM property p
    LEFT JOIN property_photos pp ON pp.property_id = p.property_id
    LEFT JOIN city c ON c.city_id = p.city_id
    LEFT JOIN state s ON s.state_id = p.state_id
    LEFT JOIN rooms r ON r.property_id = p.property_id
    LEFT JOIN rate_plan rp ON rp.property_id = p.property_id AND rp.room_id = r.room_id
    LEFT JOIN property_facilities pf ON pf.property_id = p.property_id
    LEFT JOIN facilities f ON f.facility_id = pf.facility_id
    -- Join for filtering
    INNER JOIN property_inclusions pi ON pi.property_id = p.property_id
    INNER JOIN inclusions i ON i.inclusion_id = pi.inclusion_id
    -- Join again for GROUP_CONCAT
    LEFT JOIN property_inclusions pi2 ON pi2.property_id = p.property_id
    LEFT JOIN inclusions i2 ON i2.inclusion_id = pi2.inclusion_id
    WHERE i.inclusion_name = ?
    GROUP BY p.property_id
    LIMIT 20;
  `;

  const [rows] = await db.execute(sql, [offer]);
  return rows;
};

exports.isInclusionPresent = async (inclusionName) => {
  const sql = `
    SELECT COUNT(*) AS count
    FROM property_inclusions pi
    JOIN inclusions i ON i.inclusion_id = pi.inclusion_id
    WHERE i.inclusion_name = ?
  `;
  const [rows] = await db.execute(sql, [inclusionName]);
  return rows[0].count > 0;
};

exports.getPropertyById = async (property_id) => {
  const [rows] = await db.execute(`
    SELECT
      p.property_id,
      p.property_name,
      p.star_category,
      c.city_name,
      s.state_name,
      MIN(pp.image_name) AS image_name,
      MIN(r.room_type) AS room_type,
      MIN(r.max_adult) AS max_adult,
      MIN(r.total_rooms) AS total_rooms,
      MIN(rp.base_price) AS old_price,
      MIN(rp.total_price) AS price,
      MIN(rp.currency) AS currency,
      MIN(rp.rate_name) AS rate_name,
      MIN(rp.booking_type) AS booking_type,
      MIN(r.extra_beds) AS extra_beds,
      MIN(r.max_occupancy) AS max_occupancy,
      GROUP_CONCAT(DISTINCT f.facility_name) AS amenities,
      GROUP_CONCAT(DISTINCT i.inclusion_name) AS inclusion_names

    FROM property p
    LEFT JOIN property_photos pp ON pp.property_id = p.property_id
    LEFT JOIN city c ON c.city_id = p.city_id
    LEFT JOIN state s ON s.state_id = p.state_id
    LEFT JOIN rooms r ON r.property_id = p.property_id
    LEFT JOIN rate_plan rp ON rp.property_id = p.property_id AND rp.room_id = r.room_id
    LEFT JOIN property_facilities pf ON pf.property_id = p.property_id
    LEFT JOIN facilities f ON f.facility_id = pf.facility_id
    LEFT JOIN property_inclusions pi ON pi.property_id = p.property_id
    LEFT JOIN inclusions i ON i.inclusion_id = pi.inclusion_id

    WHERE p.property_id = ?
    GROUP BY p.property_id
    LIMIT 1;
  `, [property_id]);

  return rows[0] || null;
};

// 📊 Search Analytics Functions
exports.trackSearch = function(keyword) {
  try {
    if (!keyword || keyword.trim().length < 3) return;
    
    const normalizedKeyword = keyword.toLowerCase().trim();
    const timestamp = new Date();
    
    // Add to search history
    searchHistory.push({
      keyword: normalizedKeyword,
      timestamp: timestamp
    });
    
    // Keep only last 1000 searches to prevent memory issues
    if (searchHistory.length > 1000) {
      searchHistory = searchHistory.slice(-1000);
    }
    
    // Update popular searches count
    const currentCount = popularSearches.get(normalizedKeyword) || 0;
    popularSearches.set(normalizedKeyword, currentCount + 1);
    
    // Update trending searches (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentSearches = searchHistory.filter(s => s.timestamp > oneDayAgo);
    
    trendingSearches.clear();
    recentSearches.forEach(search => {
      const count = trendingSearches.get(search.keyword) || 0;
      trendingSearches.set(search.keyword, count + 1);
    });
    
    console.log(`Tracked search: ${normalizedKeyword} (Total: ${currentCount + 1})`);
  } catch (error) {
    console.error('Error tracking search:', error);
  }
};

// 🎯 Get Recommended Searches
exports.getRecommendedSearches = async (limit = 6) => {
  try {
    const recommendations = [];
    
    // Get top popular searches
    const popularList = Array.from(popularSearches.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([keyword, count]) => ({
        keyword,
        type: 'popular',
        score: count,
        description: `${count} searches`
      }));
    
    // Get trending searches (last 24 hours)
    const trendingList = Array.from(trendingSearches.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([keyword, count]) => ({
        keyword,
        type: 'trending',
        score: count,
        description: 'Trending now'
      }));
    
    // Add default popular destinations if not enough data
    const defaultRecommendations = [
      { keyword: 'mumbai', type: 'destination', score: 100, description: 'Financial Capital' },
      { keyword: 'delhi', type: 'destination', score: 95, description: 'Capital City' },
      { keyword: 'goa', type: 'destination', score: 90, description: 'Beach Paradise' },
      { keyword: 'bengaluru', type: 'destination', score: 85, description: 'Silicon Valley of India' },
      { keyword: 'chennai', type: 'destination', score: 80, description: 'Gateway to South India' },
      { keyword: 'jaipur', type: 'destination', score: 75, description: 'Pink City' }
    ];
    
    // Combine and deduplicate
    const combined = [...popularList, ...trendingList];
    const seen = new Set(combined.map(item => item.keyword));
    
    // Add default recommendations if we need more
    defaultRecommendations.forEach(item => {
      if (!seen.has(item.keyword) && recommendations.length < limit) {
        recommendations.push(item);
        seen.add(item.keyword);
      }
    });
    
    // Add from combined list
    combined.forEach(item => {
      if (!seen.has(item.keyword) && recommendations.length < limit) {
        recommendations.push(item);
        seen.add(item.keyword);
      }
    });
    
    // Fill remaining slots with defaults
    defaultRecommendations.forEach(item => {
      if (recommendations.length < limit && !recommendations.find(r => r.keyword === item.keyword)) {
        recommendations.push(item);
      }
    });
    
    return recommendations.slice(0, limit);
  } catch (error) {
    console.error('Error getting recommended searches:', error);
    // Return default recommendations on error
    return [
      { keyword: 'mumbai', type: 'destination', score: 100, description: 'Financial Capital' },
      { keyword: 'delhi', type: 'destination', score: 95, description: 'Capital City' },
      { keyword: 'goa', type: 'destination', score: 90, description: 'Beach Paradise' },
      { keyword: 'bengaluru', type: 'destination', score: 85, description: 'Silicon Valley of India' },
      { keyword: 'chennai', type: 'destination', score: 80, description: 'Gateway to South India' },
      { keyword: 'jaipur', type: 'destination', score: 75, description: 'Pink City' }
    ].slice(0, limit);
  }
};

// 📈 Get Search Analytics
exports.getSearchAnalytics = async () => {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const last24Hours = searchHistory.filter(s => s.timestamp > oneDayAgo).length;
    const lastWeek = searchHistory.filter(s => s.timestamp > oneWeekAgo).length;
    
    const topPopular = Array.from(popularSearches.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    const topTrending = Array.from(trendingSearches.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    return {
      totalSearches: searchHistory.length,
      last24Hours,
      lastWeek,
      topPopular,
      topTrending,
      uniqueSearches: popularSearches.size
    };
  } catch (error) {
    console.error('Error getting search analytics:', error);
    return {
      totalSearches: 0,
      last24Hours: 0,
      lastWeek: 0,
      topPopular: [],
      topTrending: [],
      uniqueSearches: 0
    };
  }
};
