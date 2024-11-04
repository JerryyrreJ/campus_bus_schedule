import React, { useState, useEffect } from 'react';
import { Bus } from 'lucide-react';
import LocationToggle from './components/LocationToggle';
import NextBus from './components/NextBus';
import { Location, DayType } from './types';

function App() {
  const [location, setLocation] = useState<Location>('Ph II New Campus');
  const [dayType, setDayType] = useState<DayType>('weekday');

  useEffect(() => {
    // Set initial day type based on current day
    const today = new Date().getDay();
    setDayType(today === 0 || today === 6 ? 'weekend' : 'weekday');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Bus className={`w-12 h-12 ${location === 'Ph II New Campus' ? 'text-green-600' : 'text-blue-600'}`} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Shuttle Schedule</h1>
          <p className="text-gray-600">Real-time bus departure information between campuses</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <LocationToggle location={location} onLocationChange={setLocation} />
          
          <div className="flex justify-center">
            <NextBus location={location} dayType={dayType} />
          </div>

          {/* Day Type Toggle */}
          <div className="flex justify-center mt-8">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setDayType('weekday')}
                className={`px-4 py-2 rounded-md transition-all ${
                  dayType === 'weekday'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Weekday
              </button>
              <button
                onClick={() => setDayType('weekend')}
                className={`px-4 py-2 rounded-md transition-all ${
                  dayType === 'weekend'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Weekend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;