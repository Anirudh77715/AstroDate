import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  MOCK_MATCHES, calculateGunaScore, getTotalGunaScore,
  ZODIAC_SYMBOLS, ZODIAC_ELEMENTS, ELEMENT_EMOJIS,
  COMPATIBILITY_NARRATIVES, GUNA_EXPLANATIONS, WINGMAN_ICEBREAKERS
} from '../data/mockData';

export default function MatchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userChart, userProfile } = useApp();
  const [expanded, setExpanded] = useState(null);
  const [activeTab, setActiveTab] = useState('kundali');
  const [showWingman, setShowWingman] = useState(false);

  const match = MOCK_MATCHES.find(m => m.id === parseInt(id));

  const gunaScores = useMemo(() => {
    if (!userChart || !match) return null;
    return calculateGunaScore(userChart, match);
  }, [userChart, match]);

  const totalScore = gunaScores ? getTotalGunaScore(gunaScores) : 0;

  if (!match || !userChart) {
    return (
      <div className="phone-frame min-h-screen flex items-center justify-center" style={{ background: '#0B0620' }}>
        <div className="text-center">
          <p className="text-white mb-4">Match not found</p>
          <button onClick={() => navigate('/matches')}
            className="btn-secondary text-sm px-6 py-2.5 rounded-xl"
            style={{ background: 'linear-gradient(135deg, #6C5CE7, #8B5CF6)', color: 'white' }}>
            Go to Matches
          </button>
        </div>
      </div>
    );
  }

  const myElement = ZODIAC_ELEMENTS[userChart.sunSign];
  const matchElement = ZODIAC_ELEMENTS[match.sunSign];

  const getIcebreaker = () => {
    const icebreaker = WINGMAN_ICEBREAKERS[Math.floor(Math.random() * WINGMAN_ICEBREAKERS.length)];
    return icebreaker.msg;
  };

  const tabs = [
    { id: 'kundali', label: 'Kundali', icon: '✦' },
    { id: 'rashi', label: 'Rashi', icon: '☽' },
    { id: 'about', label: 'About', icon: '♡' },
  ];

  return (
    <div className="phone-frame min-h-screen relative noise-overlay" style={{ background: 'linear-gradient(135deg, #0a0618 0%, #1a0f3c 50%, #0d1b2a 100%)', fontFamily: "'Segoe UI', system-ui, sans-serif", overflow: 'hidden' }}>
      
      {/* Wingman Modal */}
      <AnimatePresence>
        {showWingman && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowWingman(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-[430px] rounded-t-3xl p-6 glass-card"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: 'var(--color-border)' }} />
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{ background: 'linear-gradient(135deg, #F7B731, #FF9F43)' }}>🤖</span>
                <span className="text-sm font-bold text-white">Astro Wingman</span>
              </div>
              <div className="rounded-xl p-4 mb-4 glass-card-gold">
                <p className="text-xs mb-1 font-semibold" style={{ color: '#F7B731' }}>💡 Based on your charts:</p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {getIcebreaker()}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setShowWingman(false); navigate(`/chat/${match.id}`); }}
                className="btn-primary w-full py-3.5 rounded-xl text-sm font-bold"
                style={{ background: 'linear-gradient(135deg, #F7B731, #FF9F43)', color: '#0B0620', border: 'none' }}>
                Send This ✦
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* App Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22, color: '#F7B731' }}>✧</span>
          <span style={{ fontSize: 20, fontWeight: 800, background: 'linear-gradient(135deg, #F7B731, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Date</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={{ height: 'calc(100vh - 140px)', overflowY: 'auto', paddingBottom: 100, scrollbarWidth: 'none' }}>
        
        {/* Profile Card Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'relative', margin: '0 16px', borderRadius: 24, overflow: 'hidden' }}>
          <div style={{ height: 320, background: 'linear-gradient(180deg, #2a1854 0%, #1a0f3c 50%, #0d0826 100%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 160, height: 160, borderRadius: '50%', background: 'linear-gradient(135deg, #6C5CE7, #F7B731)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(108,92,231,0.4), 0 0 80px rgba(247,183,49,0.15)' }}>
              <div style={{ width: 152, height: 152, borderRadius: '50%', background: '#1a1045', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={match.photo} alt={match.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            {/* Floating Guna Score */}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} style={{ position: 'absolute', top: 16, right: 16, background: 'linear-gradient(135deg, #F7B731, #FF9F43)', borderRadius: 16, padding: '8px 14px', boxShadow: '0 4px 20px rgba(247,183,49,0.4)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#0B0620', textAlign: 'center', letterSpacing: 1, textTransform: 'uppercase' }}>Guna</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#0B0620', textAlign: 'center', lineHeight: 1 }}>{totalScore}<span style={{ fontSize: 14, fontWeight: 600 }}>/36</span></div>
            </motion.div>
            {/* Manglik Badge */}
            <div style={{ position: 'absolute', top: 16, left: 16, background: match.isManglik ? 'rgba(255,107,107,0.2)' : 'rgba(39,174,96,0.2)', border: `1px solid ${match.isManglik ? '#FF6B6B' : '#27AE60'}`, borderRadius: 20, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 10, color: match.isManglik ? '#FF6B6B' : '#27AE60' }}>{match.isManglik ? '⚠' : '●'}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: match.isManglik ? '#FF6B6B' : '#27AE60' }}>{match.isManglik ? 'Manglik' : 'Non-Manglik'}</span>
            </div>
            {/* Name Overlay */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(11,6,32,0.95))', padding: '40px 20px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: 'white' }}>{match.name.split(' ')[0]}</span>
                <span style={{ fontSize: 16, color: '#C8C2E6' }}>{match.age}</span>
                <span style={{ fontSize: 12, color: '#6C5CE7', background: 'rgba(108,92,231,0.15)', padding: '2px 8px', borderRadius: 8 }}>{ZODIAC_SYMBOLS[match.sunSign]} {match.sunSign}</span>
              </div>
              <div style={{ fontSize: 12, color: '#9B93C9', marginTop: 2 }}>📍 {match.city}, {match.distance}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <span style={{ fontSize: 10, color: '#F7B731', background: 'rgba(247,183,49,0.1)', padding: '3px 8px', borderRadius: 6, border: '1px solid rgba(247,183,49,0.2)' }}>☽ Moon: {match.moonSign}</span>
                <span style={{ fontSize: 10, color: '#00D2D3', background: 'rgba(0,210,211,0.1)', padding: '3px 8px', borderRadius: 6, border: '1px solid rgba(0,210,211,0.2)' }}>♀ Venus: {match.venusSign}</span>
                <span style={{ fontSize: 10, color: '#FF6B6B', background: 'rgba(255,107,107,0.1)', padding: '3px 8px', borderRadius: 6, border: '1px solid rgba(255,107,107,0.2)' }}>↑ Asc: {match.ascendant}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Opening Move */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} style={{ margin: '12px 16px', background: 'linear-gradient(135deg, rgba(108,92,231,0.15), rgba(247,183,49,0.08))', borderRadius: 16, padding: '12px 16px', border: '1px solid rgba(108,92,231,0.2)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#F7B731', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>✦ Her Opening Move</div>
          <div style={{ fontSize: 13, color: '#E8E0FF', lineHeight: 1.4, fontStyle: 'italic' }}>"{match.openingMove}"</div>
        </motion.div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', margin: '8px 16px', background: '#150E35', borderRadius: 14, padding: 3 }}>
          {tabs.map(t => (
            <motion.button key={t.id} onClick={() => setActiveTab(t.id)} 
              whileTap={{ scale: 0.95 }}
              style={{ flex: 1, padding: '10px 0', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, transition: 'all 0.2s', background: activeTab === t.id ? 'linear-gradient(135deg, #6C5CE7, #8B5CF6)' : 'transparent', color: activeTab === t.id ? 'white' : '#6B6B8D' }}>
              {t.icon} {t.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ margin: '0 16px', paddingBottom: 20 }}>
          
          <AnimatePresence mode="wait">
            {activeTab === 'kundali' && (
              <motion.div key="kundali" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {/* AI Compatibility Narrative */}
                <div style={{ background: 'linear-gradient(135deg, rgba(247,183,49,0.08), rgba(255,107,107,0.05))', borderRadius: 16, padding: 14, marginTop: 8, border: '1px solid rgba(247,183,49,0.15)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#F7B731', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>🤖 AI Compatibility Insight</div>
                  <div style={{ fontSize: 12, color: '#C8C2E6', lineHeight: 1.5 }}>
                    "{totalScore >= 28 ? 'Your charts align perfectly. Expect deep emotional understanding and a powerful connection. Your Moon and ascendant harmony creates a solid foundation for long-term growth.' : totalScore >= 18 ? 'You have a balanced connection with good potential. While some areas require compromise, your basic elements complement each other nicely.' : 'This connection requires work. You may have differing emotional needs due to your Nakshatra placements, but shared values can bridge the gap.'}"
                  </div>
                </div>

                {/* Guna Milan Breakdown */}
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 8 }}>Ashta Koota (8-Factor Match)</div>
                  {gunaScores?.map((g, i) => (
                    <div key={i} onClick={() => setExpanded(expanded === i ? null : i)} style={{ background: '#150E35', borderRadius: 12, padding: '10px 12px', marginBottom: 4, cursor: 'pointer', border: '1px solid rgba(108,92,231,0.1)', transition: 'all 0.2s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#E8E0FF' }}>{g.koota}</span>
                          <span style={{ fontSize: 9, color: '#6B6B8D', marginLeft: 6 }}>{g.what}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 800, color: g.score === g.max ? '#27AE60' : g.score >= g.max * 0.5 ? '#F7B731' : '#FF6B6B' }}>{g.score}/{g.max}</span>
                          <span style={{ fontSize: 10, color: '#6B6B8D', transform: expanded === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div style={{ height: 3, background: '#0B0620', borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(g.score / g.max) * 100}%`, background: g.score === g.max ? '#27AE60' : g.score >= g.max * 0.5 ? '#F7B731' : '#FF6B6B', borderRadius: 2, transition: 'width 0.5s ease' }} />
                      </div>
                      {expanded === i && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginTop: 8, fontSize: 10, color: '#9B93C9', lineHeight: 1.5, padding: '6px 0', borderTop: '1px solid rgba(108,92,231,0.1)' }}>
                          {GUNA_EXPLANATIONS[g.koota]?.[g.score === g.max ? 'high' : g.score > 0 ? 'medium' : 'low'] || `AI explains: Your ${g.koota} compatibility describes your mutual ${g.what.toLowerCase()}.`}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'rashi' && (
              <motion.div key="rashi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ marginTop: 8 }}>
                {/* Rashi Compatibility */}
                <div style={{ background: '#150E35', borderRadius: 16, padding: 14, border: '1px solid rgba(108,92,231,0.15)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 8 }}>{ZODIAC_SYMBOLS[match.sunSign]} {match.sunSign} × {ZODIAC_SYMBOLS[userChart.sunSign]} {userChart.sunSign}</div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                    <div style={{ flex: 1, textAlign: 'center', background: 'rgba(255,107,107,0.1)', borderRadius: 10, padding: 8 }}>
                      <div style={{ fontSize: 18 }}>{ELEMENT_EMOJIS[matchElement]}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#FF6B6B' }}>{matchElement}</div>
                      <div style={{ fontSize: 9, color: '#6B6B8D' }}>Her Element</div>
                    </div>
                    <div style={{ flex: 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 16, color: '#F7B731' }}>⚡</span>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', background: 'rgba(0,210,211,0.1)', borderRadius: 10, padding: 8 }}>
                      <div style={{ fontSize: 18 }}>{ELEMENT_EMOJIS[myElement]}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#00D2D3' }}>{myElement}</div>
                      <div style={{ fontSize: 9, color: '#6B6B8D' }}>Your Element</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: '#C8C2E6', lineHeight: 1.5, background: 'rgba(247,183,49,0.05)', borderRadius: 10, padding: 10 }}>
                    🤖 <b style={{ color: '#F7B731' }}>AI Says:</b> "Cosmic energies are at play. {matchElement} meets {myElement}. {myElement === matchElement ? 'You share the same elemental nature, making mutual understanding effortless.' : 'There is a balance of differing elements, offering a chance for growth and complementary strengths.'}"
                  </div>
                </div>

                {/* Big Three */}
                <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginTop: 14, marginBottom: 8 }}>Her "Big Three"</div>
                {[
                  { label: '☀️ Sun', sign: match.sunSign, color: '#F7B731', desc: 'Core personality & ego' },
                  { label: '☽ Moon', sign: match.moonSign, color: '#C8C2E6', desc: 'Emotional landscape' },
                  { label: '↑ Asc', sign: match.ascendant, color: '#00D2D3', desc: 'Outward behavior' },
                ].map((b, i) => (
                  <div key={i} style={{ background: '#150E35', borderRadius: 12, padding: '10px 12px', marginBottom: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#E8E0FF' }}>{b.label}: {b.sign}</span>
                      <div style={{ fontSize: 9, color: '#6B6B8D', marginTop: 2 }}>{b.desc}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'about' && (
              <motion.div key="about" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ marginTop: 8 }}>
                {/* Interests */}
                <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 8 }}>Interests</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                  {match.interests.map((t, i) => (
                    <span key={i} style={{ fontSize: 11, color: '#C8C2E6', background: 'rgba(108,92,231,0.12)', padding: '6px 12px', borderRadius: 20, border: '1px solid rgba(108,92,231,0.2)' }}>{t}</span>
                  ))}
                </div>

                {/* Passions */}
                <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 8 }}>Passions</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                  {match.passions.map((p, i) => (
                    <span key={i} style={{ fontSize: 11, color: '#F7B731', background: 'rgba(247,183,49,0.1)', padding: '6px 12px', borderRadius: 20, border: '1px solid rgba(247,183,49,0.2)', fontWeight: 600 }}>{p}</span>
                  ))}
                </div>

                {/* Hobbies */}
                <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 8 }}>Hobbies</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                  {match.hobbies.map((h, i) => (
                    <span key={i} style={{ fontSize: 11, color: '#00D2D3', background: 'rgba(0,210,211,0.1)', padding: '6px 12px', borderRadius: 20, border: '1px solid rgba(0,210,211,0.2)' }}>{h}</span>
                  ))}
                </div>

                {/* About Me */}
                <div style={{ background: '#150E35', borderRadius: 14, padding: 14, border: '1px solid rgba(108,92,231,0.1)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 6 }}>About Me</div>
                  <div style={{ fontSize: 11, color: '#9B93C9', lineHeight: 1.6 }}>
                    {match.bio}
                  </div>
                </div>

                {/* Relationship Goals */}
                <div style={{ background: 'rgba(39,174,96,0.08)', borderRadius: 14, padding: 12, marginTop: 8, border: '1px solid rgba(39,174,96,0.15)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#27AE60', marginBottom: 4 }}>💍 Looking For</div>
                  <div style={{ fontSize: 11, color: '#C8C2E6' }}>{match.lookingFor}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(11,6,32,0.95) 40%)', padding: '40px 20px 30px', display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'center', pointerEvents: 'none' }}>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => navigate('/matches')} style={{ width: 50, height: 50, borderRadius: '50%', border: '2px solid #FF6B6B', background: 'rgba(255,107,107,0.15)', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF6B6B', pointerEvents: 'auto', backdropFilter: 'blur(8px)' }}>✕</motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowWingman(true)} style={{ width: 56, height: 56, borderRadius: '50%', border: 'none', background: 'linear-gradient(135deg, #6C5CE7, #8B5CF6)', cursor: 'pointer', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(108,92,231,0.5)', color: 'white', pointerEvents: 'auto' }}>✦</motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => navigate('/chat/' + match.id)} style={{ width: 50, height: 50, borderRadius: '50%', border: '2px solid #27AE60', background: 'rgba(39,174,96,0.15)', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#27AE60', pointerEvents: 'auto', backdropFilter: 'blur(8px)' }}>♡</motion.button>
      </div>

      {/* Astro Wingman Floating Button (Optional, triggers same as ✦) */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowWingman(true)} style={{ position: 'absolute', bottom: 110, right: 16, background: 'linear-gradient(135deg, #F7B731, #FF9F43)', borderRadius: 24, padding: '8px 14px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(247,183,49,0.4)', display: 'flex', alignItems: 'center', gap: 6, zIndex: 10 }}>
        <span style={{ fontSize: 14 }}>🤖</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#0B0620' }}>Astro Wingman</span>
      </motion.div>
    </div>
  );
}
