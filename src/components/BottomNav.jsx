import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabs = [
  { path: '/my-chart', icon: '✦', label: 'Chart' },
  { path: '/matches', icon: '♡', label: 'Matches' },
  { path: '/chat/1', icon: '💬', label: 'Chat' },
  { path: '/forecast', icon: '🌟', label: 'Forecast' },
  { path: '/profile-setup', icon: '👤', label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();

  // Hide on welcome and birth-input screens
  const hideOn = ['/', '/birth-input'];
  if (hideOn.includes(location.pathname)) return null;

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(11,6,32,0.95) 20%, #0B0620 100%)',
        paddingTop: '20px',
      }}
    >
      <div
        className="flex justify-around items-center px-4 pb-4 pt-2"
        style={{
          background: 'rgba(21, 14, 53, 0.9)',
          borderTop: '1px solid rgba(45, 37, 102, 0.5)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path ||
            (tab.path === '/chat/1' && location.pathname.startsWith('/chat')) ||
            (tab.path === '/matches' && location.pathname.startsWith('/match/'));
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center gap-1 no-underline relative"
              style={{ minWidth: 56 }}
            >
              <motion.div
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.85 }}
                className="relative"
              >
                <span
                  className="text-xl block transition-all duration-200"
                  style={{
                    filter: isActive ? 'drop-shadow(0 0 8px rgba(247,183,49,0.6))' : 'none',
                    transform: isActive ? 'scale(1.2)' : 'scale(1)',
                  }}
                >
                  {tab.icon}
                </span>
                {/* Active glow dot */}
                {isActive && (
                  <motion.div
                    layoutId="navGlow"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#F7B731', boxShadow: '0 0 6px rgba(247,183,49,0.6)' }}
                  />
                )}
              </motion.div>
              <span
                className="text-[10px] font-semibold transition-colors duration-200"
                style={{
                  color: isActive ? '#F7B731' : '#6B6B8D',
                }}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 w-8 h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #F7B731, #FF9F43)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
}
