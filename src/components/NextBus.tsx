import React, { useEffect, useState } from 'react';
import { Clock, Timer } from 'lucide-react';
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

  useEffect(() => {
    const findNextBus = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      const schedule = busSchedule[dayType];
      const times = schedule.map(time => {
        const [hours, minutes] = (location === 'Ph II New Campus' ? time.phII : time.phI)
          .split(':')
          .map(Number);
        return { ...time, totalMinutes: hours * 60 + minutes };
      });

      const nextBus = times.find(time => time.totalMinutes > currentTime);
      
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
    const interval = setInterval(findNextBus, 60000); // Update next bus every minute
    
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
        // Less than 1 hour: show minutes and seconds
        setCountdown(`${remainingMinutes}m ${remainingSeconds}s`);
        return 1000; // Update every second
      } else {
        // 1 hour or more: show hours and minutes
        const hours = Math.floor(remainingMinutes / 60);
        const minutes = remainingMinutes % 60;
        setCountdown(`${hours}h ${minutes}m`);
        return 60000; // Update every minute
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
          <span className="text-2xl font-bold text-blue-600">
            {nextDeparture}
          </span>
        </div>
        
        {countdown && (
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