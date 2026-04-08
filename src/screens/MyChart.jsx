import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ZODIAC_SYMBOLS, TRAIT_TAGS, getPersonalityNarrative } from '../data/mockData';

// South Indian style Kundali grid layout
const SOUTH_HOUSE_POSITIONS = [
  { house: 12, row: 0, col: 0 }, { house: 1,  row: 0, col: 1 }, { house: 2,  row: 0, col: 2 }, { house: 3,  row: 0, col: 3 },
  { house: 11, row: 1, col: 0 },                                                                   { house: 4,  row: 1, col: 3 },
  { house: 10, row: 2, col: 0 },                                                                   { house: 5,  row: 2, col: 3 },
  { house: 9,  row: 3, col: 0 }, { house: 8,  row: 3, col: 1 }, { house: 7,  row: 3, col: 2 }, { house: 6,  row: 3, col: 3 },
];

const PLANET_COLORS = {
  Su: '#F7B731', Mo: '#C8C2E6', Ma: '#FF6B6B', Me: '#27AE60',
  Ju: '#F7B731', Ve: '#FF6B6B', Sa: '#6C5CE7', Ra: '#6B6B8D', Ke: '#00D2D3'
};

function KundaliChart({ houses }) {
  const [chartStyle, setChartStyle] = useState('north');

  return (
    <div className="flex flex-col items-center">
      {/* Style Toggle */}
      <div className="flex bg-black/40 p-1 rounded-full mb-4 border border-[var(--color-border)]">
        <button 
          onClick={() => setChartStyle('north')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${chartStyle === 'north' ? 'bg-[var(--color-purple)] text-white' : 'text-[var(--color-text-muted)]'}`}
        >North Style</button>
        <button 
          onClick={() => setChartStyle('south')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${chartStyle === 'south' ? 'bg-[var(--color-purple)] text-white' : 'text-[var(--color-text-muted)]'}`}
        >South Style</button>
      </div>

      <motion.div
        key={chartStyle}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto"
        style={{ width: '100%', maxWidth: 320, aspectRatio: '1' }}
      >
        {/* Outer border glow */}
        <div className="absolute inset-0 rounded-2xl animate-border-glow"
          style={{
            background: 'linear-gradient(135deg, rgba(108,92,231,0.2), rgba(247,183,49,0.05))',
            border: '1px solid rgba(108,92,231,0.3)',
          }}
        />

        {chartStyle === 'south' ? (
          /* SOUTHERN CHART GRID */
          <div className="relative grid grid-cols-4 grid-rows-4 w-full h-full p-1 gap-0.5 z-10">
            {SOUTH_HOUSE_POSITIONS.map(({ house, row, col }) => {
              const houseData = houses?.[house - 1];
              return (
                <div
                  key={house}
                  className="flex flex-col items-center justify-center rounded-lg relative transition-colors hover:bg-[rgba(108,92,231,0.2)]"
                  style={{
                    gridRow: row + 1,
                    gridColumn: col + 1,
                    background: 'rgba(21,14,53,0.8)',
                    border: '1px solid rgba(45,37,102,0.5)',
                  }}
                >
                  <span className="text-[9px] font-bold absolute top-1 left-1.5" style={{ color: 'var(--color-text-muted)' }}>{house}</span>
                  <div className="flex flex-wrap gap-0.5 justify-center items-center px-1">
                    {houseData?.planets.map((planet, pi) => (
                      <span key={pi} className="text-[11px] font-bold px-0.5" style={{ color: PLANET_COLORS[planet] || '#C8C2E6' }}>{planet}</span>
                    ))}
                  </div>
                  <span className="text-[8px] absolute bottom-0.5 text-white/30">{houseData?.sign?.slice(0, 3)}</span>
                </div>
              );
            })}
            <div className="flex flex-col items-center justify-center rounded-lg col-span-2 row-span-2"
              style={{ gridRow: '2 / 4', gridColumn: '2 / 4', background: 'linear-gradient(135deg, rgba(108,92,231,0.1), rgba(247,183,49,0.05))', border: '1px solid rgba(108,92,231,0.2)' }}
            >
              <span className="text-lg text-[var(--color-gold)] mb-1">✦</span>
              <span className="text-[11px] font-bold text-[var(--color-text-secondary)]">Rashi Chart</span>
            </div>
          </div>
        ) : (
          /* NORTHERN CHART (DIAMOND) */
          <div className="relative w-full h-full p-2 z-10">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-30" style={{ padding: 8 }}>
              <rect x="0" y="0" width="100" height="100" fill="none" stroke="var(--color-purple)" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="100" y2="100" stroke="var(--color-purple)" strokeWidth="0.5" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="var(--color-purple)" strokeWidth="0.5" />
              <line x1="50" y1="0" x2="100" y2="50" stroke="var(--color-purple)" strokeWidth="0.5" />
              <line x1="100" y1="50" x2="50" y2="100" stroke="var(--color-purple)" strokeWidth="0.5" />
              <line x1="50" y1="100" x2="0" y2="50" stroke="var(--color-purple)" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="50" y2="0" stroke="var(--color-purple)" strokeWidth="0.5" />
            </svg>
            
            {/* North House Overlays. The array maps [house index 0-11] to spatial coordinates percentages [left, top, w, h] */}
            {[
              { id: 1, pos: [25, 0, 50, 50] },    // 1: Top diamond
              { id: 2, pos: [0, 0, 50, 25] },     // 2: Top left
              { id: 3, pos: [0, 25, 25, 50] },    // 3: Mid left
              { id: 4, pos: [0, 25, 50, 50] },    // 4: Left diamond
              { id: 5, pos: [0, 75, 25, 50] },    // 5: Bot left
              { id: 6, pos: [0, 75, 50, 25] },    // 6: Bot mid left
              { id: 7, pos: [25, 50, 50, 50] },   // 7: Bot diamond
              { id: 8, pos: [50, 75, 50, 25] },   // 8: Bot mid right
              { id: 9, pos: [75, 75, 25, 50] },   // 9: Bot right
              { id: 10, pos: [50, 25, 50, 50] },  // 10: Right diamond
              { id: 11, pos: [75, 25, 25, 50] },  // 11: Mid right
              { id: 12, pos: [50, 0, 50, 25] }    // 12: Top right
            ].map(h => {
              // Note: North Indian chart houses are fixed physically. House 1 is always top diamond.
              // We need to fetch the Ascendant's house data. In our mock data, houses[0] is Ascendant (House 1).
              const houseData = houses?.[h.id - 1];
              return (
                <div key={h.id} className="absolute flex flex-col items-center justify-center pointer-events-none"
                  style={{
                    left: `${h.pos[0]}%`, top: `${h.pos[1]}%`, width: `${h.pos[2]}%`, height: `${h.pos[3]}%`
                  }}
                >
                  <span className="text-[9px] font-bold text-white/20 mb-0.5">{h.id}</span>
                  <div className="flex flex-wrap gap-0.5 justify-center">
                    {houseData?.planets?.map((planet, pi) => (
                      <span key={pi} className="text-[11px] font-bold" style={{ color: PLANET_COLORS[planet] || '#C8C2E6' }}>{planet}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function MyChart() {
  const navigate = useNavigate();
  const { userChart, userProfile } = useApp();
  const [showNarrative, setShowNarrative] = useState(false);

  useEffect(() => {
    if (!userChart) {
      navigate('/birth-input');
      return;
    }
    const timer = setTimeout(() => setShowNarrative(true), 1500);
    return () => clearTimeout(timer);
  }, [userChart, navigate]);

  if (!userChart) return null;

  const narrative = getPersonalityNarrative(userChart);
  const traits = TRAIT_TAGS[userChart.sunSign] || TRAIT_TAGS.Aries;
  const paragraphs = narrative.split('\n\n');

  const statCards = [
    { label: 'Sun', value: userChart.sunSign, icon: '☀️', symbol: ZODIAC_SYMBOLS[userChart.sunSign], color: '#F7B731' },
    { label: 'Moon', value: userChart.moonSign, icon: '☽', symbol: ZODIAC_SYMBOLS[userChart.moonSign], color: '#C8C2E6' },
    { label: 'Ascendant', value: userChart.ascendant, icon: '↑', symbol: ZODIAC_SYMBOLS[userChart.ascendant], color: '#00D2D3' },
    { label: 'Nakshatra', value: userChart.nakshatra, icon: '✦', symbol: '⭐', color: '#F7B731' },
    { label: 'Venus', value: userChart.venusSign, icon: '♀', symbol: ZODIAC_SYMBOLS[userChart.venusSign], color: '#FF6B6B' },
    { label: 'Mars', value: userChart.marsSign, icon: '♂', symbol: ZODIAC_SYMBOLS[userChart.marsSign], color: '#FF6B6B' },
  ];

  const handleShare = async () => {
    const shareData = {
      title: 'My Cosmic Identity — Date App',
      text: `✦ I'm a ${userChart.sunSign} Sun, ${userChart.moonSign} Moon, ${userChart.nakshatra} Nakshatra. Discover your cosmic identity on Date!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareData.text);
        alert('Copied to clipboard! 📋');
      }
    } catch { /* cancelled */ }
  };

  return (
    <div className="phone-frame min-h-screen pb-24 noise-overlay"
      style={{ background: 'linear-gradient(180deg, #0B0620 0%, #120A2E 20%, #150E35 40%, #120A2E 70%, #0B0620 100%)' }}
    >
      {/* Header */}
      <div className="sticky top-0 z-20 px-5 pt-4 pb-3 flex items-center justify-between"
        style={{ background: 'rgba(11,6,32,0.9)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-2">
          <span className="text-xl" style={{ color: '#F7B731' }}>✧</span>
          <span className="text-lg font-extrabold"
            style={{ background: 'linear-gradient(135deg, #F7B731, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Date
          </span>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: 'rgba(108,92,231,0.2)', color: '#8B5CF6', border: '1px solid rgba(108,92,231,0.3)' }}>
          Your Chart
        </span>
      </div>

      <div className="px-5 pt-4">
        {/* Section 1: Kundali Chart */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="font-heading text-xl font-bold text-white mb-1">Your Vedic Birth Chart</h2>
          <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>Rashi chart based on your birth details</p>
          <KundaliChart houses={userChart.houses} />
        </motion.div>

        {/* Manglik badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 flex justify-center"
        >
          <span className="chip-interactive text-xs font-semibold px-4 py-1.5 rounded-full"
            style={{
              background: userChart.isManglik ? 'rgba(255,107,107,0.15)' : 'rgba(39,174,96,0.15)',
              color: userChart.isManglik ? '#FF6B6B' : '#27AE60',
              border: `1px solid ${userChart.isManglik ? 'rgba(255,107,107,0.3)' : 'rgba(39,174,96,0.3)'}`,
            }}>
            {userChart.isManglik ? '⚠ Manglik' : '✓ Non-Manglik'}
          </span>
        </motion.div>

        {/* Section 2: Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-6"
        >
          <h3 className="text-sm font-bold text-white mb-3">Your Cosmic Blueprint</h3>
          <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
            {statCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex-shrink-0 w-24 rounded-2xl p-3 text-center card-interactive"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="text-2xl mb-1">{card.icon}</div>
                <div className="text-xs font-bold text-white truncate">{card.value}</div>
                <div className="text-[10px] mt-0.5" style={{ color: card.color }}>{card.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section 3: AI Personality Narrative */}
        {showNarrative && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                style={{ background: 'linear-gradient(135deg, #F7B731, #FF9F43)' }}>🤖</span>
              <h3 className="text-sm font-bold text-white">AI Personality Reading</h3>
            </div>

            <div className="rounded-2xl p-4 glass-card-gold">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.3 }}
                  className="text-xs leading-relaxed mb-3 last:mb-0"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Trait Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {traits.map((trait, i) => (
                <motion.span
                  key={trait}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="chip-interactive text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(108,92,231,0.15)',
                    color: '#8B5CF6',
                    border: '1px solid rgba(108,92,231,0.3)',
                  }}
                >
                  {trait}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Section 4: Shareable Zodiac Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-6"
        >
          <h3 className="text-sm font-bold text-white mb-3">Your Zodiac Identity Card</h3>
          <div className="rounded-2xl overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, #1A0F3C 0%, #0B0620 40%, #150E35 100%)',
              border: '1px solid rgba(108,92,231,0.3)',
              aspectRatio: '9/10',
            }}
          >
            {/* Decorative elements */}
            <div className="absolute inset-0">
              <div className="absolute top-4 right-4 w-32 h-32 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(108,92,231,0.5), transparent)' }} />
              <div className="absolute bottom-8 left-4 w-24 h-24 rounded-full opacity-15"
                style={{ background: 'radial-gradient(circle, rgba(247,183,49,0.5), transparent)' }} />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-5xl mb-3">{ZODIAC_SYMBOLS[userChart.sunSign]}</motion.span>
              <h4 className="font-heading text-2xl font-bold text-white mb-1">
                {userProfile.name || 'Star Child'}
              </h4>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs" style={{ color: '#F7B731' }}>☀️ {userChart.sunSign}</span>
                <span style={{ color: 'var(--color-text-muted)' }}>•</span>
                <span className="text-xs" style={{ color: '#C8C2E6' }}>☽ {userChart.moonSign}</span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full mb-4"
                style={{ background: 'rgba(247,183,49,0.15)', color: '#F7B731', border: '1px solid rgba(247,183,49,0.3)' }}>
                ✦ {userChart.nakshatra}
              </span>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {traits.slice(0, 3).map(t => (
                  <span key={t} className="text-[10px] px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(108,92,231,0.2)', color: '#8B5CF6' }}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 mt-auto">
                <span className="text-sm" style={{ color: '#F7B731' }}>✧</span>
                <span className="text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg, #F7B731, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Date
                </span>
              </div>
            </div>
          </div>

          {/* Share buttons */}
          <div className="flex gap-3 mt-3">
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShare}
              className="btn-ghost flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              style={{ background: 'rgba(39,174,96,0.15)', color: '#27AE60', border: '1px solid rgba(39,174,96,0.3)' }}>
              📱 Share on WhatsApp
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShare}
              className="btn-ghost flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              style={{ background: 'rgba(108,92,231,0.15)', color: '#8B5CF6', border: '1px solid rgba(108,92,231,0.3)' }}>
              📸 Share on Instagram
            </motion.button>
          </div>
        </motion.div>

        {/* Section 5: CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/profile-setup')}
          className="btn-primary w-full py-4 mt-8 mb-6 rounded-2xl font-bold text-sm animate-pulse-glow"
          style={{
            background: 'linear-gradient(135deg, #F7B731, #FF9F43)',
            color: '#0B0620',
            boxShadow: '0 4px 20px rgba(247,183,49,0.4)',
            border: 'none',
            letterSpacing: '0.02em',
          }}
        >
          See Who the Stars Align You With →
        </motion.button>
      </div>
    </div>
  );
}
