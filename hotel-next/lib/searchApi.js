const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export const searchApi = {
  async getAutoSuggest(keyword) {
    if (!keyword || keyword.trim().length < 3) {
      return [];
    }

    try {
      const response = await fetch(`${API_BASE_URL}/searchproperty/search/${encodeURIComponent(keyword)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }
      
      return [];
    } catch (error) {
      console.error('Auto suggest API error:', error);
      return [];
    }
  },

  formatSuggestion(item) {
    if (!item) return null;
    
    // Format the suggestion based on what type of match it is
    let name = item.property_name || '';
    let description = '';
    
    if (item.city_name) {
      description += item.city_name;
    }
    if (item.state_name) {
      description += description ? `, ${item.state_name}` : item.state_name;
    }
    if (item.country_name) {
      description += description ? `, ${item.country_name}` : item.country_name;
    }
    
    // If it's a city/state/country match rather than property, use that as the name
    if (!name || name.trim() === '') {
      if (item.city_name) {
        name = item.city_name;
        description = description.replace(item.city_name, '').replace(/^,\s*/, '');
      } else if (item.state_name) {
        name = item.state_name;
        description = description.replace(item.state_name, '').replace(/^,\s*/, '');
      } else if (item.country_name) {
        name = item.country_name;
        description = '';
      }
    }
    
    return {
      id: item.property_id || `${item.city_name}_${item.state_name}_${item.country_name}`,
      name: name.trim(),
      description: description.trim(),
      isProperty: !!item.property_name,
      city: item.city_name,
      state: item.state_name,
      country: item.country_name
    };
  },

  // 🎯 Get Recommended Searches
  async getRecommendedSearches(limit = 6) {
    try {
      const response = await fetch(`${API_BASE_URL}/searchproperty/recommendations?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }
      
      return [];
    } catch (error) {
      console.error('Recommended searches API error:', error);
      // Return fallback recommendations
      return [
        { keyword: 'mumbai', type: 'destination', description: 'Financial Capital' },
        { keyword: 'delhi', type: 'destination', description: 'Capital City' },
        { keyword: 'goa', type: 'destination', description: 'Beach Paradise' },
        { keyword: 'bengaluru', type: 'destination', description: 'Silicon Valley of India' },
        { keyword: 'chennai', type: 'destination', description: 'Gateway to South India' },
        { keyword: 'jaipur', type: 'destination', description: 'Pink City' }
      ].slice(0, limit);
    }
  },

  // 📊 Get Search Analytics
  async getSearchAnalytics() {
    try {
      const response = await fetch(`${API_BASE_URL}/searchproperty/analytics`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      }
      
      return null;
    } catch (error) {
      console.error('Search analytics API error:', error);
      return null;
    }
  }
};