import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { WEEKLY_FORECAST, MOCK_MATCHES } from '../data/mockData';

export default function Forecast() {
  const navigate = useNavigate();
  const { userChart } = useApp();
  const topMatch = MOCK_MATCHES[0];

  if (!userChart) {
    navigate('/birth-input');
    return null;
  }

  const getDayColor = (emoji) => {
    if (emoji === '🌟') return '#F7B731';
    if (emoji === '☀️') return '#27AE60';
    if (emoji === '⛅') return '#FF6B6B';
    return '#00D2D3';
  };

  return (
    <div className="phone-frame min-h-screen pb-24 noise-overlay"
      style={{ background: 'linear-gradient(180deg, #0B0620 0%, #120A2E 25%, #150E35 50%, #120A2E 75%, #0B0620 100%)' }}
    >
      {/* Header */}
      <div className="sticky top-0 z-20 px-5 pt-4 pb-3"
        style={{ background: 'rgba(11,6,32,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl" style={{ color: '#F7B731' }}>✧</span>
            <span className="text-lg font-extrabold"
              style={{ background: 'linear-gradient(135deg, #F7B731, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Date
            </span>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: 'rgba(108,92,231,0.2)', color: '#8B5CF6', border: '1px solid rgba(108,92,231,0.3)' }}>
            Forecast
          </span>
        </div>
      </div>

      <div className="px-5 pt-4">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-2xl font-bold text-white mb-1">This Week's Cosmic Weather ✦</h1>
          <p className="text-xs mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            For you & {topMatch.name} ({userChart ? '✦' : ''})
          </p>
        </motion.div>

        {/* Overall Mood */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl p-5 mb-4 text-center glass-card-gold"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-5xl mb-2">{WEEKLY_FORECAST.overall.mood}</motion.div>
          <div className="text-base font-bold text-white">{WEEKLY_FORECAST.overall.label}</div>
        </motion.div>

        {/* AI Forecast Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-4 mb-4 glass-card"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
              style={{ background: 'linear-gradient(135deg, #F7B731, #FF9F43)' }}>🤖</span>
            <span className="text-xs font-bold" style={{ color: '#F7B731' }}>AI Forecast</span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {WEEKLY_FORECAST.narrative}
          </p>
        </motion.div>

        {/* Daily Mini-Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-bold text-white mb-3">Daily Outlook</h3>
          <div className="flex flex-col gap-2">
            {WEEKLY_FORECAST.days.map((day, i) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="card-interactive flex items-center gap-3 rounded-xl p-3"
                style={{
                  background: 'var(--color-bg-card)',
                  border: `1px solid ${i === 4 ? 'rgba(247,183,49,0.3)' : 'rgba(45,37,102,0.3)'}`,
                  boxShadow: i === 4 ? '0 0 15px rgba(247,183,49,0.1)' : 'none',
                }}
              >
                <span className="text-sm font-bold w-8 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                  {day.day}
                </span>
                <span className="text-xl flex-shrink-0">{day.emoji}</span>
                <span className="text-xs flex-1" style={{ color: getDayColor(day.emoji) }}>
                  {day.note}
                </span>
                {i === 4 && (
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[9px] px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(247,183,49,0.15)', color: '#F7B731' }}>
                    ★ Best
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pro Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="rounded-2xl p-4 mt-4 mb-6 glass-card"
          style={{
            borderColor: 'rgba(39,174,96,0.2)',
          }}
        >
          <div className="text-[10px] font-bold tracking-wider uppercase mb-2 flex items-center gap-1.5" style={{ color: '#27AE60' }}>
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[8px]"
              style={{ background: 'rgba(39,174,96,0.2)' }}>✦</span>
            Pro Tip
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Friday evening is your cosmic sweet spot this week. Plan something creative — your chart shows heightened Venus energy perfect for romance. 💫
          </p>
        </motion.div>
      </div>
    </div>
  );
}
