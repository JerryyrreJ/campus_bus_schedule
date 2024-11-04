import React from 'react';
import { Location } from '../types';
import { Bus } from 'lucide-react';

interface LocationToggleProps {
  location: Location;
  onLocationChange: (location: Location) => void;
}

export default function LocationToggle({ location, onLocationChange }: LocationToggleProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Select Your Location</h2>
      <div className="flex space-x-4">
        <button
          onClick={() => onLocationChange('Ph II New Campus')}
          className={`flex items-center px-6 py-3 rounded-lg transition-all ${
            location === 'Ph II New Campus'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Bus className={`w-5 h-5 mr-2 ${
            location === 'Ph II New Campus' ? 'text-white' : 'text-green-600'
          }`} />
          Ph II New Campus
        </button>
        <button
          onClick={() => onLocationChange('Ph I Parking Lot')}
          className={`flex items-center px-6 py-3 rounded-lg transition-all ${
            location === 'Ph I Parking Lot'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Bus className={`w-5 h-5 mr-2 ${
            location === 'Ph I Parking Lot' ? 'text-white' : 'text-blue-600'
          }`} />
          Ph I Parking Lot
        </button>
      </div>
    </div>
  );
}