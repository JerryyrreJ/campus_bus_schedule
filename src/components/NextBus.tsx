import React, { useEffect, useState } from 'react';
import { Clock, Timer, HelpCircle } from 'lucide-react';
import { Location, DayType } from '../types';
import { busSchedule } from '../data/schedule';

interface NextBusProps {
  location: Location;
  dayType: DayType;
}

export default function NextBus({ location, dayType }: NextBusProps) {
  const [nextDeparture, setNextDeparture] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string>('');
  const [minutesUntil, setMinutesUntil] = useState<number>(0);
  const [isReturnImmediately, setIsReturnImmediately] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    const findNextBus = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      const schedule = busSchedule[dayType];
      
      // Check for "Return Immediately" status only for Ph I Parking Lot
      if (location === 'Ph I Parking Lot') {
        // Find the current time slot in the schedule
        const currentTimeSlot = schedule.find((time, index) => {
          const [currentHours, currentMinutes] = time.phII.split(':').map(Number);
          const currentBusTime = currentHours * 60 + currentMinutes;
          
          // Get next bus time or end of day if this is the last bus
          const nextTime = schedule[index + 1];
          const nextBusTime = nextTime 
            ? (() => {
                const [nextHours, nextMinutes] = nextTime.phII.split(':').map(Number);
                return nextHours * 60 + nextMinutes;
              })()
            : 24 * 60; // End of day
          
          // Check if current time falls between this bus and the next
          return currentTime >= currentBusTime && currentTime < nextBusTime;
        });

        if (currentTimeSlot?.phI === 'Return Immediately') {
          setIsReturnImmediately(true);
          setNextDeparture('Return Immediately');
          setCountdown('');
          setMinutesUntil(0);
          return;
        }
      }

      setIsReturnImmediately(false);

      // Find next scheduled departure
      const times = schedule.map(time => {
        const timeStr = location === 'Ph II New Campus' ? time.phII : time.phI;
        if (timeStr === 'Return Immediately') return null;
        const [hours, minutes] = timeStr.split(':').map(Number);
        return { ...time, totalMinutes: hours * 60 + minutes };
      }).filter(Boolean);

      const nextBus = times.find(time => time && time.totalMinutes > currentTime);
      
      if (nextBus) {
        setNextDeparture(location === 'Ph II New Campus' ? nextBus.phII : nextBus.phI);
        const minsUntil = nextBus.totalMinutes - currentTime;
        setMinutesUntil(minsUntil);
      } else {
        setNextDeparture('No more buses today');
        setCountdown('');
        setMinutesUntil(0);
      }
    };

    findNextBus();
    const interval = setInterval(findNextBus, 60000);
    
    return () => clearInterval(interval);
  }, [location, dayType]);

  useEffect(() => {
    if (minutesUntil <= 0) return;

    const updateCountdown = () => {
      const now = new Date();
      const currentSeconds = now.getSeconds();
      
      let remainingMinutes = minutesUntil;
      let remainingSeconds = 60 - currentSeconds;

      if (remainingMinutes < 60) {
        setCountdown(`${remainingMinutes}m ${remainingSeconds}s`);
        return 1000;
      } else {
        const hours = Math.floor(remainingMinutes / 60);
        const minutes = remainingMinutes % 60;
        setCountdown(`${hours}h ${minutes}m`);
        return 60000;
      }
    };

    const initialDelay = updateCountdown();
    const interval = setInterval(updateCountdown, initialDelay);
    
    return () => clearInterval(interval);
  }, [minutesUntil]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-700">Next Departure</h3>
          </div>
          <div className="flex items-center">
            {isReturnImmediately ? (
              <div className="relative flex items-center">
                <span className="text-2xl font-bold text-green-600">Return Immediately</span>
                <button
                  className="ml-2 focus:outline-none"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  aria-label="Help"
                >
                  <HelpCircle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
                {showTooltip && (
                  <div className="absolute right-0 top-8 w-64 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-10">
                    A bus is continuously available. After dropping off passengers at Phase 1, it returns directly to Phase 2 campus for pickup.
                  </div>
                )}
              </div>
            ) : (
              <span className="text-2xl font-bold text-blue-600">
                {nextDeparture}
              </span>
            )}
          </div>
        </div>
        
        {countdown && !isReturnImmediately && (
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center space-x-2">
              <Timer className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-medium text-gray-700">Time Until Next Bus</h3>
            </div>
            <span className="text-2xl font-bold text-green-600">
              {countdown}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}