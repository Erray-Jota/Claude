import { useState, useRef, useEffect } from 'react';
import { searchCities } from '../data/usCities';
import { findNearestRaapCity } from '../data/raapCities';

/**
 * LocationInput Component
 * Provides autocomplete for US cities and zip codes
 * Calculates nearest RaaP city for cost factors without displaying it to user
 */
const LocationInput = ({ value, onChange, label, placeholder = 'Enter city or zip code' }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update input value when prop changes
  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value || '');
    }
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue.length >= 2) {
      const results = searchCities(newValue);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (city) => {
    const displayValue = city.display;
    setInputValue(displayValue);
    setShowSuggestions(false);
    setSuggestions([]);

    // Find nearest RaaP city to calculate cost factor
    const nearestRaapCity = findNearestRaapCity(city.lat, city.lng);

    // Call onChange with both display location and calculated factor
    onChange({
      displayLocation: displayValue,
      factor: nearestRaapCity.factor,
      coordinates: { lat: city.lat, lng: city.lng },
      nearestRaapCity: nearestRaapCity.name, // For internal use only, never displayed
    });
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSuggestions([]);
        break;
    }
  };

  const handleBlur = () => {
    // Delay to allow click on suggestion to register
    setTimeout(() => {
      if (inputValue && suggestions.length === 0) {
        // User typed something but didn't select from suggestions
        // Try to find a match or keep the raw input
        const results = searchCities(inputValue);
        if (results.length > 0) {
          handleSelectSuggestion(results[0]);
        }
      }
    }, 200);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }} ref={wrapperRef}>
      {label && (
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#374151' }}>
          {label}
        </label>
      )}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => {
          if (suggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontSize: '14px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = '#9ca3af';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = '#d1d5db';
        }}
      />

      {showSuggestions && suggestions.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            background: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000,
          }}
        >
          {suggestions.map((city, index) => (
            <div
              key={`${city.city}-${city.state}-${city.zip}`}
              onClick={() => handleSelectSuggestion(city)}
              onMouseEnter={() => setSelectedIndex(index)}
              style={{
                padding: '10px 12px',
                cursor: 'pointer',
                background: selectedIndex === index ? '#f3f4f6' : 'white',
                borderBottom: index < suggestions.length - 1 ? '1px solid #e5e7eb' : 'none',
                transition: 'background-color 0.15s',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>
                {city.display}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
