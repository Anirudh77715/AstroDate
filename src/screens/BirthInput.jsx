import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CITIES, generateMockChart } from '../data/mockData';

const TIME_RANGES = [
  "Early Morning (4-8 AM)",
  "Morning (8 AM-12 PM)",
  "Afternoon (12-4 PM)",
  "Evening (4-8 PM)",
  "Night (8 PM-12 AM)",
  "Late Night (12-4 AM)",
];

const TIME_MAP = {
  "Early Morning (4-8 AM)": "06:00",
  "Morning (8 AM-12 PM)": "10:00",
  "Afternoon (12-4 PM)": "14:00",
  "Evening (4-8 PM)": "18:00",
  "Night (8 PM-12 AM)": "22:00",
  "Late Night (12-4 AM)": "02:00",
};

export default function BirthInput() {
  const navigate = useNavigate();
  const { setBirthDetails, setUserChart } = useApp();
  const [date, setDate] = useState('');
  const [timePart, setTimePart] = useState('');
  const [ampm, setAmpm] = useState('AM');
  const [unknownTime, setUnknownTime] = useState(false);
  const [approxTime, setApproxTime] = useState('');
  const [place, setPlace] = useState('');
  const [showCities, setShowCities] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredCities = useMemo(() => {
    if (!place) return CITIES;
    return CITIES.filter(c => c.name.toLowerCase().includes(place.toLowerCase()));
  }, [place]);

  const handleSubmit = () => {
    if (!date || !place) return;
    setLoading(true);

    let effectiveTime = '12:00';
    if (unknownTime) {
      effectiveTime = TIME_MAP[approxTime] || '12:00';
    } else if (timePart) {
      let [hours, minutes] = timePart.split(':');
      hours = parseInt(hours || '12', 10);
      if (ampm === 'PM' && hours !== 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      effectiveTime = `${String(hours).padStart(2, '0')}:${minutes || '00'}`;
    }

    setBirthDetails({ date, time: effectiveTime, approximateTime: approxTime, unknownTime, place });

    const chart = generateMockChart(new Date(date), effectiveTime, place);
    setUserChart(chart);

    setTimeout(() => {
      navigate('/my-chart');
    }, 2500);
  };

  const isValid = date && place && (unknownTime ? !!approxTime : !!timePart);

  // Calculate progress
  const progress = [date, (timePart || unknownTime), place].filter(Boolean).length;

  return (
    <div className="phone-frame min-h-screen relative noise-overlay"
      style={{ background: 'linear-gradient(180deg, #0B0620 0%, #120A2E 25%, #150E35 50%, #120A2E 75%, #0B0620 100%)' }}
    >
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: 'rgba(11,6,32,0.95)', backdropFilter: 'blur(10px)' }}
          >
            {/* Animated cosmic ring */}
            <div className="relative w-24 h-24 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-full h-full rounded-full"
                style={{
                  border: '3px solid rgba(108,92,231,0.2)',
                  borderTop: '3px solid #F7B731',
                  borderRight: '3px solid #6C5CE7',
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-3 rounded-full"
                style={{
                  border: '2px solid transparent',
                  borderTop: '2px solid #FF6B6B',
                  borderBottom: '2px solid #00D2D3',
                }}
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center text-2xl"
              >
                ✦
              </motion.div>
            </div>
            <h2 className="text-xl font-bold text-white mb-2 tracking-wide font-heading">
              Aligning the Stars
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Calculating your planetary positions...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 pt-12 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="text-3xl font-black mb-3 font-heading"
            style={{ background: 'linear-gradient(135deg, #F7B731 0%, #FF9F43 50%, #FF6B6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Let's Map Your Stars ✦
          </h1>
          <p className="text-base font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            Enter your exact birth details for the most accurate cosmic reading.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="flex gap-2 mb-10">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{
                background: i < progress ? 'linear-gradient(135deg, #F7B731, #FF9F43)' : 'rgba(45,37,102,0.5)',
              }}
              className="h-1.5 rounded-full flex-1"
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>

        {/* Date of Birth */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 border-b border-[var(--color-border)] pb-6 relative z-10">
          <label className="block text-[11px] font-black mb-3 tracking-widest uppercase flex items-center gap-2" style={{ color: '#F7B731' }}>
            <span className="w-6 h-6 rounded flex items-center justify-center text-xs text-white" style={{ background: date ? 'linear-gradient(135deg, #F7B731, #FF9F43)' : 'rgba(45,37,102,0.5)' }}>
              {date ? '✓' : '1'}
            </span>
            Date of Birth
          </label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full py-4 px-5 rounded-xl text-lg font-bold text-white border-none outline-none focus:ring-2 focus:ring-[#F7B731] transition-all"
            style={{
              background: '#150E35',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
              colorScheme: 'dark',
            }}
          />
        </motion.div>

        {/* Time of Birth */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6 border-b border-[var(--color-border)] pb-6 relative z-10">
          <label className="block text-[11px] font-black mb-3 tracking-widest uppercase flex items-center gap-2" style={{ color: '#F7B731' }}>
            <span className="w-6 h-6 rounded flex items-center justify-center text-xs text-white" style={{ background: (timePart || unknownTime) ? 'linear-gradient(135deg, #F7B731, #FF9F43)' : 'rgba(45,37,102,0.5)' }}>
              {(timePart || unknownTime) ? '✓' : '2'}
            </span>
            Time of Birth
          </label>

          {!unknownTime && (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="12:30"
                value={timePart}
                onChange={e => {
                  let v = e.target.value.replace(/[^\d:]/g, '');
                  if (v.length === 2 && !v.includes(':') && timePart.length < v.length) v += ':';
                  setTimePart(v.slice(0, 5));
                }}
                className="w-full py-4 px-5 rounded-xl text-lg font-bold text-white border-none outline-none focus:ring-2 focus:ring-[#F7B731] transition-all tracking-widest placeholder:opacity-30"
                style={{
                  background: '#150E35',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                }}
              />
              <div className="flex rounded-xl overflow-hidden shadow-inner p-1 sm:max-w-[140px] w-full" style={{ background: '#150E35', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}>
                <button
                  onClick={() => setAmpm('AM')}
                  className={`flex-1 py-3 px-2 rounded-lg text-sm font-bold transition-colors ${ampm === 'AM' ? 'bg-[#27AE60] text-white shadow' : 'text-gray-400 bg-transparent'}`}
                >
                  AM
                </button>
                <button
                  onClick={() => setAmpm('PM')}
                  className={`flex-1 py-3 px-2 rounded-lg text-sm font-bold transition-colors ${ampm === 'PM' ? 'bg-[#6C5CE7] text-white shadow' : 'text-gray-400 bg-transparent'}`}
                >
                  PM
                </button>
              </div>
            </div>
          )}

          {/* Toggle */}
          <div className="flex items-center gap-3 mt-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => { setUnknownTime(!unknownTime); setApproxTime(''); }}
              className="min-w-12 w-12 h-6 rounded-full border-none cursor-pointer relative transition-colors duration-200"
              style={{
                background: unknownTime ? 'linear-gradient(135deg, #6C5CE7, #8B5CF6)' : 'rgba(45,37,102,0.5)',
              }}
            >
              <motion.div
                animate={{ left: unknownTime ? 26 : 2 }}
                className="absolute top-0.5 w-5 h-5 rounded-full"
                style={{
                  background: unknownTime ? '#F7B731' : '#6B6B8D',
                  boxShadow: unknownTime ? '0 0 8px rgba(247,183,49,0.4)' : 'none',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>
              I don't know my exact time
            </span>
          </div>

          {/* Approximate time dropdown */}
          <AnimatePresence>
            {unknownTime && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <select
                  value={approxTime}
                  onChange={e => setApproxTime(e.target.value)}
                  className="w-full py-4 px-5 rounded-xl text-lg font-bold text-white border-none outline-none appearance-none focus:ring-2 focus:ring-[#F7B731]"
                  style={{
                    background: '#150E35',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  <option value="" disabled>Select approximate time...</option>
                  {TIME_RANGES.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Place of Birth */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-10 relative">
          <label className="block text-[11px] font-black mb-3 tracking-widest uppercase flex items-center gap-2" style={{ color: '#F7B731' }}>
            <span className="w-6 h-6 rounded flex items-center justify-center text-xs text-white" style={{ background: place ? 'linear-gradient(135deg, #F7B731, #FF9F43)' : 'rgba(45,37,102,0.5)' }}>
              {place ? '✓' : '3'}
            </span>
            Place of Birth
          </label>
          <input
            type="text"
            placeholder="Search your city... (e.g. Mumbai)"
            value={place}
            onChange={e => {
              setPlace(e.target.value);
              setShowCities(e.target.value.length > 0);
            }}
            onFocus={() => {
              if (place.length > 0) setShowCities(true);
            }}
            className="w-full py-4 px-5 rounded-xl text-lg font-bold text-white border-none outline-none focus:ring-2 focus:ring-[#F7B731] transition-all placeholder:font-normal placeholder:opacity-30"
            style={{
              background: '#150E35',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
            }}
          />

          {/* City suggestions */}
          <AnimatePresence>
            {showCities && filteredCities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-30 max-h-48 overflow-y-auto glass-card border border-[var(--color-border)] shadow-2xl"
              >
                {filteredCities.map(city => (
                  <button
                    key={city.name}
                    onClick={() => {
                      setPlace(city.name);
                      setShowCities(false);
                    }}
                    className="w-full py-3.5 px-5 text-left text-base font-medium border-none cursor-pointer flex items-center gap-3 transition-colors bg-transparent hover:bg-white/10 text-[var(--color-text-secondary)]"
                  >
                    <span className="text-xl">📍</span>
                    {city.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={isValid ? { scale: 1.02 } : {}}
          whileTap={isValid ? { scale: 0.98, y: 4, boxShadow: '0 0 0 rgba(0,0,0,0)' } : {}}
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full py-5 rounded-xl font-black text-xl flex items-center justify-center gap-3 cursor-pointer outline-none relative"
          style={{
            background: isValid ? 'linear-gradient(to bottom, #F7B731, #D4982A)' : '#2D2566',
            color: isValid ? '#0B0620' : 'rgba(255,255,255,0.3)',
            border: 'none',
            boxShadow: isValid ? '0 6px 0 #A87000, 0 15px 25px rgba(247,183,49,0.4)' : 'none',
            transform: 'translateY(0)',
            transition: 'all 0.15s ease',
            opacity: isValid ? 1 : 0.6,
          }}
        >
          Generate My Birth Chart ✦
        </motion.button>
        
        {/* Trust Badges */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex justify-center gap-6 mt-8">
          <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: 'var(--color-text-muted)' }}>
            <span className="text-sm">🔒</span> Private
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: 'var(--color-text-muted)' }}>
            <span className="text-sm">⚡</span> Instant
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: 'var(--color-text-muted)' }}>
            <span className="text-sm">🎯</span> Accurate
          </div>
        </motion.div>
      </div>
    </div>
  );
}
