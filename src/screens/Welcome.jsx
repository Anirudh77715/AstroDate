import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarsBackground from '../components/StarsBackground';

export default function Welcome() {
  const navigate = useNavigate();

  const features = [
    { icon: '✦', text: 'AI-Powered Vedic Compatibility', gradient: 'linear-gradient(135deg, #F7B731, #FF9F43)' },
    { icon: '☽', text: 'Know WHY You Match, Not Just Who', gradient: 'linear-gradient(135deg, #6C5CE7, #8B5CF6)' },
    { icon: '♡', text: 'Share Your Cosmic Identity', gradient: 'linear-gradient(135deg, #FF6B6B, #FF9F43)' },
  ];

  return (
    <div className="phone-frame relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay"
      style={{ background: 'linear-gradient(180deg, #0B0620 0%, #120A2E 30%, #1A0F3C 55%, #150E35 75%, #0B0620 100%)' }}
    >
      <StarsBackground />

      {/* Multi-layered cosmic orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full opacity-25 animate-cosmic-bg"
        style={{ background: 'radial-gradient(circle, rgba(108,92,231,0.5) 0%, rgba(247,183,49,0.15) 35%, transparent 65%)' }}
      />
      <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full opacity-15 animate-cosmic-bg"
        style={{ background: 'radial-gradient(circle, rgba(255,107,107,0.35) 0%, transparent 55%)', animationDelay: '-7s' }}
      />
      <div className="absolute top-1/2 right-0 w-[200px] h-[200px] rounded-full opacity-10 animate-cosmic-bg"
        style={{ background: 'radial-gradient(circle, rgba(0,210,211,0.4) 0%, transparent 60%)', animationDelay: '-12s' }}
      />

      <div className="relative z-10 flex flex-col items-center px-8 text-center">

        {/* Logo with cosmic ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 relative"
        >
          {/* Orbiting ring */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ top: '-20px' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-[140px] h-[140px] rounded-full"
              style={{
                border: '1px solid rgba(108,92,231,0.15)',
                position: 'relative',
              }}
            >
              {/* Orbiting dots */}
              {[0, 120, 240].map((deg, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: ['#F7B731', '#6C5CE7', '#FF6B6B'][i],
                    boxShadow: `0 0 8px ${['rgba(247,183,49,0.6)', 'rgba(108,92,231,0.6)', 'rgba(255,107,107,0.6)'][i]}`,
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${deg}deg) translateX(70px) translateY(-50%)`,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Star icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl mb-3 relative z-10"
            style={{ filter: 'drop-shadow(0 0 25px rgba(247,183,49,0.5))' }}
          >
            ✧
          </motion.div>

          {/* Title with shimmer */}
          <h1 className="font-heading text-7xl font-extrabold relative z-10"
            style={{
              background: 'linear-gradient(135deg, #F7B731 0%, #FF6B6B 40%, #6C5CE7 70%, #F7B731 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'text-shimmer 4s linear infinite',
            }}
          >
            Date
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-heading text-xl italic mb-10"
          style={{ color: 'var(--color-text-secondary)', textShadow: '0 0 30px rgba(108,92,231,0.2)' }}
        >
          Where the Stars Align Your Heart
        </motion.p>

        {/* Feature bullets with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col gap-3 mb-10 w-full max-w-xs"
        >
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.15, duration: 0.5, type: 'spring' }}
              whileHover={{ scale: 1.03, x: 4 }}
              className="flex items-center gap-3 text-left rounded-2xl px-4 py-3.5 glass-card card-interactive"
              style={{ borderColor: 'rgba(45, 37, 102, 0.4)' }}
            >
              <span className="w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: item.gradient, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
              >
                {item.icon}
              </span>
              <span className="text-[13px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Cosmic divider */}
        <div className="cosmic-divider w-full max-w-xs mb-8" />

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/birth-input')}
          className="btn-primary w-full max-w-xs py-4.5 px-8 rounded-2xl font-bold text-base animate-pulse-glow"
          style={{
            background: 'linear-gradient(135deg, #F7B731, #FF9F43, #F7B731)',
            backgroundSize: '200% auto',
            color: '#0B0620',
            boxShadow: '0 4px 25px rgba(247,183,49,0.4)',
            letterSpacing: '0.03em',
            fontSize: '15px',
          }}
        >
          Begin Your Cosmic Journey →
        </motion.button>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 flex flex-col items-center gap-2.5"
        >
          <div className="flex -space-x-2.5">
            {['👩', '🧑', '👩‍🎨', '👨‍💻', '👧'].map((emoji, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.1, type: 'spring', stiffness: 300 }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
                style={{
                  background: 'linear-gradient(135deg, rgba(21,14,53,0.9), rgba(26,15,60,0.9))',
                  border: '2px solid rgba(108,92,231,0.3)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
          <p className="text-[11px] font-medium flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#27AE60', boxShadow: '0 0 6px rgba(39,174,96,0.6)' }} />
            2,400+ finding their cosmic match
          </p>
        </motion.div>
      </div>
    </div>
  );
}
