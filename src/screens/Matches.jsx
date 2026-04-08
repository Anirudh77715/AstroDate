import { useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { MOCK_MATCHES, calculateGunaScore, getTotalGunaScore, ZODIAC_SYMBOLS } from '../data/mockData';

function SwipeCard({ match, onSwipe, isTop }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 80], [0, 1]);
  const nopeOpacity = useTransform(x, [-80, 0], [1, 0]);
  const scale = isTop ? 1 : 0.95;
  const y = isTop ? 0 : 8;

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      onSwipe('right', match);
    } else if (info.offset.x < -100) {
      onSwipe('left', match);
    }
  };

  return (
    <motion.div
      initial={{ scale: scale, y: y, opacity: isTop ? 1 : 0.8 }}
      animate={{ scale: scale, y: y, opacity: isTop ? 1 : 0.8 }}
      exit={{ x: 300, opacity: 0, rotate: 20, transition: { duration: 0.3 } }}
      style={{ x, rotate, position: 'absolute', width: '100%', zIndex: isTop ? 10 : 5 }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      className="cursor-grab active:cursor-grabbing"
    >
      <div className="relative rounded-3xl overflow-hidden mx-2"
        style={{ height: '70vh', maxHeight: 560, boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
      >
        {/* Profile Photo */}
        <img
          src={match.photo}
          alt={match.name}
          className="w-full h-full object-cover"
          draggable={false}
          style={{ pointerEvents: 'none' }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 30%, rgba(11,6,32,0.85) 70%, rgba(11,6,32,0.98) 100%)',
          }}
        />

        {/* LIKE stamp */}
        <motion.div
          className="absolute top-8 left-6 rounded-xl px-5 py-2"
          style={{
            opacity: likeOpacity,
            border: '3px solid #27AE60',
            transform: 'rotate(-15deg)',
          }}
        >
          <span className="text-2xl font-black tracking-wider" style={{ color: '#27AE60' }}>LIKE</span>
        </motion.div>

        {/* NOPE stamp */}
        <motion.div
          className="absolute top-8 right-6 rounded-xl px-5 py-2"
          style={{
            opacity: nopeOpacity,
            border: '3px solid #FF6B6B',
            transform: 'rotate(15deg)',
          }}
        >
          <span className="text-2xl font-black tracking-wider" style={{ color: '#FF6B6B' }}>NOPE</span>
        </motion.div>

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex gap-1.5">
            {match.verified && (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(39,174,96,0.9)', color: 'white' }}>
                ✓ Verified
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(247,183,49,0.9)', color: '#0B0620' }}>
            {match.totalScore}/36 ✦
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {/* Name & age */}
          <div className="flex items-end gap-2 mb-1">
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {match.name.split(' ')[0]}
            </h2>
            <span className="text-xl font-light text-white/80 mb-0.5">{match.age}</span>
          </div>

          {/* Job & location */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-white/70">💼 {match.job}</span>
            <span className="text-white/30">•</span>
            <span className="text-sm text-white/70">📍 {match.city}</span>
          </div>

          {/* Bio */}
          <p className="text-sm leading-relaxed text-white/80 mb-3 line-clamp-2">
            {match.bio}
          </p>

          {/* Zodiac + interests row */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(247,183,49,0.2)', color: '#F7B731', backdropFilter: 'blur(8px)' }}>
              {ZODIAC_SYMBOLS[match.sunSign]} {match.sunSign}
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(200,194,230,0.15)', color: '#C8C2E6', backdropFilter: 'blur(8px)' }}>
              ☽ {match.moonSign}
            </span>
            {match.interests.slice(0, 2).map(i => (
              <span key={i} className="text-[11px] px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white/80', backdropFilter: 'blur(8px)' }}>
                {i}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PremiumModal({ onClose, onUnlock }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="w-full max-w-sm rounded-3xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ background: 'linear-gradient(180deg, #1A0F3C, #0B0620)' }}
      >
        {/* Decorative top */}
        <div className="relative h-32 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #F7B731, #FF9F43, #FF6B6B)' }}
        >
          <div className="absolute inset-0 opacity-20"
            style={{ background: 'radial-gradient(circle at 50% 120%, rgba(0,0,0,0.4), transparent)' }} />
          <div className="text-center relative z-10">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl mb-1">👑</motion.div>
            <h3 className="text-xl font-black" style={{ color: '#0B0620' }}>Date Premium</h3>
          </div>
        </div>

        <div className="p-6">
          <h4 className="text-lg font-bold text-white text-center mb-4">
            Unlock Full Compatibility Analysis
          </h4>

          {/* Features */}
          <div className="flex flex-col gap-3 mb-6">
            {[
              { icon: '✦', text: 'See detailed 36-point Guna matching' },
              { icon: '🤖', text: 'AI-powered compatibility insights' },
              { icon: '💬', text: 'Unlimited chat with matches' },
              { icon: '☽', text: 'Nakshatra & Navamsha deep analysis' },
              { icon: '🔮', text: 'Weekly cosmic forecasts for couples' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: 'rgba(247,183,49,0.15)', border: '1px solid rgba(247,183,49,0.2)' }}>
                  {f.icon}
                </span>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{f.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Price */}
          <div className="text-center mb-4">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-black text-white">₹99</span>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>/month</span>
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Cancel anytime • No hidden charges
            </p>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onUnlock}
            className="btn-primary w-full py-4 rounded-2xl font-bold text-base animate-pulse-glow"
            style={{
              background: 'linear-gradient(135deg, #F7B731, #FF9F43)',
              color: '#0B0620',
              boxShadow: '0 4px 25px rgba(247,183,49,0.4)',
              border: 'none',
              letterSpacing: '0.03em',
            }}
          >
            Upgrade to Premium ✦
          </motion.button>

          <button
            onClick={onClose}
            className="w-full py-3 mt-2 text-sm font-medium bg-transparent border-none cursor-pointer"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Maybe later
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Matches() {
  const navigate = useNavigate();
  const { userChart } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPremium, setShowPremium] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [likedMatches, setLikedMatches] = useState([]);
  const [swipeAction, setSwipeAction] = useState(null);

  const matchesWithScores = useMemo(() => {
    if (!userChart) return [];
    return MOCK_MATCHES.map(m => {
      const gunaScores = calculateGunaScore(userChart, m);
      const total = getTotalGunaScore(gunaScores);
      return { ...m, gunaScores, totalScore: total };
    }).sort((a, b) => b.totalScore - a.totalScore);
  }, [userChart]);

  const handleSwipe = useCallback((direction, match) => {
    setSwipeAction(direction);
    
    if (direction === 'right') {
      setLikedMatches(prev => [...prev, match]);
      // Check if user should see premium modal (after 2 likes)
      if (!isPremium && likedMatches.length >= 1) {
        setTimeout(() => setShowPremium(true), 500);
      }
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSwipeAction(null);
    }, 300);
  }, [isPremium, likedMatches]);

  const handleViewProfile = () => {
    const match = matchesWithScores[currentIndex];
    if (!match) return;
    if (!isPremium) {
      setShowPremium(true);
    } else {
      navigate(`/match/${match.id}`);
    }
  };

  if (!userChart) {
    navigate('/birth-input');
    return null;
  }

  const currentCards = matchesWithScores.slice(currentIndex, currentIndex + 2);
  const noMoreCards = currentIndex >= matchesWithScores.length;

  return (
    <div className="phone-frame min-h-screen pb-24 noise-overlay relative overflow-hidden"
      style={{ background: '#0B0620' }}
    >
      {/* Premium Modal */}
      <AnimatePresence>
        {showPremium && (
          <PremiumModal
            onClose={() => setShowPremium(false)}
            onUnlock={() => {
              setIsPremium(true);
              setShowPremium(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-0 z-20 px-5 pt-4 pb-3"
        style={{ background: 'rgba(11,6,32,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl" style={{ color: '#F7B731' }}>✧</span>
            <span className="text-xl font-extrabold"
              style={{ background: 'linear-gradient(135deg, #F7B731, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Date
            </span>
          </div>
          <div className="flex items-center gap-3">
            {!isPremium && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPremium(true)}
                className="text-[11px] font-bold px-3 py-1.5 rounded-full border-none cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #F7B731, #FF9F43)', color: '#0B0620' }}>
                👑 Premium
              </motion.button>
            )}
            {isPremium && (
              <span className="text-[11px] font-bold px-3 py-1.5 rounded-full"
                style={{ background: 'linear-gradient(135deg, #F7B731, #FF9F43)', color: '#0B0620' }}>
                👑 Premium
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Stack */}
      <div className="relative flex items-center justify-center" style={{ height: 'calc(100vh - 180px)', minHeight: 400 }}>
        {noMoreCards ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center px-8"
          >
            <div className="text-6xl mb-4 animate-float">✦</div>
            <h3 className="text-xl font-bold text-white mb-2">You've seen everyone!</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              New matches appear as the stars align. Check back soon.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCurrentIndex(0)}
              className="btn-primary px-8 py-3 rounded-2xl font-bold text-sm"
              style={{
                background: 'linear-gradient(135deg, #6C5CE7, #8B5CF6)',
                color: 'white',
                border: 'none',
              }}>
              Start Over
            </motion.button>
          </motion.div>
        ) : (
          <AnimatePresence>
            {currentCards.map((match, i) => (
              <SwipeCard
                key={match.id}
                match={match}
                isTop={i === 0}
                onSwipe={handleSwipe}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Bottom Actions */}
      {!noMoreCards && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30 px-8">
          <div className="flex justify-center items-center gap-6">
            {/* Nope */}
            <motion.button
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => handleSwipe('left', matchesWithScores[currentIndex])}
              className="btn-action-circle w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              style={{
                border: '2px solid #FF6B6B',
                background: 'rgba(255,107,107,0.1)',
                color: '#FF6B6B',
                boxShadow: '0 4px 20px rgba(255,107,107,0.2)',
              }}>✕</motion.button>

            {/* View Profile */}
            <motion.button
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.85 }}
              onClick={handleViewProfile}
              className="btn-action-circle w-12 h-12 rounded-full flex items-center justify-center text-lg"
              style={{
                background: 'linear-gradient(135deg, #6C5CE7, #8B5CF6)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(108,92,231,0.4)',
                border: 'none',
              }}>
              {isPremium ? '✦' : '🔒'}
            </motion.button>

            {/* Like */}
            <motion.button
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => handleSwipe('right', matchesWithScores[currentIndex])}
              className="btn-action-circle w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              style={{
                border: '2px solid #27AE60',
                background: 'rgba(39,174,96,0.1)',
                color: '#27AE60',
                boxShadow: '0 4px 20px rgba(39,174,96,0.2)',
              }}>♡</motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
