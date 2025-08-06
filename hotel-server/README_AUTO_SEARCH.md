# Auto-Search API Implementation

## Overview

This implementation provides a debounced auto-search API for the hotel booking system that suggests properties, cities, states, and countries based on user input.

## Features

✅ **Debouncing**: API calls are triggered only after 500ms of user inactivity  
✅ **Minimum Character Requirement**: Search starts after 3 characters  
✅ **Real-time Suggestions**: Dynamic suggestions as user types  
✅ **Prioritized Results**: Property names ranked higher than city/state matches  
✅ **Limited Results**: Maximum 5 suggestions to avoid overwhelming UI  
✅ **Error Handling**: Graceful fallback and error management  

## API Endpoint

```
GET /searchproperty/search/:keyword
```

**Response Format:**
```json
{
  "success": true,
  "data": [
    {
      "property_id": 1,
      "property_name": "Taj Lands End",
      "city_name": "Mumbai",
      "state_name": "Maharashtra",
      "country_name": "India"
    }
  ]
}
```

## Frontend Implementation

### Components Updated
- `SearchOptions.js`: Main search component with debounced auto-suggest
- `useDebounce.js`: Custom hook for debouncing input
- `searchApi.js`: API utility for making search requests

### Key Features
- **Debounced Input**: 500ms delay before API call
- **Loading States**: Shows "Searching..." while API call is in progress
- **Smart Formatting**: Distinguishes between property and location matches
- **Hover Effects**: Interactive suggestion items
- **Error Handling**: Graceful error display and fallback

## Database Integration

### Current State: Mock Data
The implementation currently uses mock data for demonstration. To switch to real database queries:

1. **Update the DAO function** in `/src/dao/searchPropertyDao.js`:

```javascript
// Replace the mock data section with:
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

const [rows] = await db.query(sql, [keyword, keyword, keyword, keyword, keyword, keyword, keyword, keyword]);
return rows;
```

2. **Database Requirements**:
   - Tables: `property`, `city`, `state`, `country`
   - Proper foreign key relationships
   - Indexed columns for better performance

### Database Optimization

For better performance with large datasets:

```sql
-- Add indexes for faster search
CREATE INDEX idx_property_name ON property(property_name);
CREATE INDEX idx_city_name ON city(city_name);
CREATE INDEX idx_state_name ON state(state_name);
CREATE INDEX idx_country_name ON country(country_name);

-- Full-text search indexes (MySQL 5.6+)
ALTER TABLE property ADD FULLTEXT(property_name);
ALTER TABLE city ADD FULLTEXT(city_name);
```

## Testing

### API Testing
```bash
# Test different search terms
curl "http://localhost:5000/searchproperty/search/mumbai"
curl "http://localhost:5000/searchproperty/search/taj"
curl "http://localhost:5000/searchproperty/search/delhi"
```

### Frontend Testing
1. Start both servers:
   ```bash
   # Backend
   cd /workspace/hotel-server && npm start
   
   # Frontend
   cd /workspace/hotel-next && npm run dev
   ```

2. Open http://localhost:3000
3. Click on the destination input field
4. Type at least 3 characters to see suggestions

## Configuration

### Environment Variables
Frontend (`.env.local`):
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### Debounce Settings
Adjust debounce delay in `SearchOptions.js`:
```javascript
const debouncedSearchTerm = useDebounce(destinationInput, 500); // Change 500ms as needed
```

## Performance Considerations

1. **Database Indexing**: Add proper indexes on searchable columns
2. **Caching**: Implement Redis caching for frequent searches
3. **Connection Pooling**: Ensure proper database connection pooling
4. **Rate Limiting**: Add rate limiting to prevent API abuse

## Future Enhancements

- [ ] **Fuzzy Search**: Implement fuzzy matching for typos
- [ ] **Search History**: Cache user's recent searches
- [ ] **Geolocation**: Prioritize nearby locations
- [ ] **Analytics**: Track popular search terms
- [ ] **Image Previews**: Add property images to suggestions

## Troubleshooting

### Common Issues

1. **No suggestions appearing**:
   - Check browser console for API errors
   - Verify backend server is running on port 5000
   - Check network tab for failed requests

2. **Database connection errors**:
   - Verify database credentials in `/src/config/db.js`
   - Ensure MySQL service is running
   - Check database exists and tables are created

3. **CORS issues**:
   - Verify CORS configuration in `index.js`
   - Check frontend URL matches CORS origin

### Debug Mode
Enable detailed logging by checking browser console and server logs for:
- API request/response data
- Database query execution
- Error stack traces