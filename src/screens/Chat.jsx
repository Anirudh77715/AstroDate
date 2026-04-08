import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { MOCK_MATCHES, calculateGunaScore, getTotalGunaScore, WINGMAN_ICEBREAKERS } from '../data/mockData';

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userChart } = useApp();
  const messagesEndRef = useRef(null);
  const [showWingman, setShowWingman] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const match = MOCK_MATCHES.find(m => m.id === parseInt(id)) || MOCK_MATCHES[0];
  const totalScore = userChart ? getTotalGunaScore(calculateGunaScore(userChart, match)) : 32;

  const [messages, setMessages] = useState([
    { from: 'me', text: `Hey! The stars say we're ${totalScore}/36 compatible 🌟`, time: '2:30 PM' },
    { from: 'them', text: 'Haha no pressure then! What caught your eye?', time: '2:31 PM' },
    { from: 'me', text: 'Honestly? The AI said our Moon signs mean we\'ll never run out of things to talk about. Let\'s test that theory 😄', time: '2:33 PM' },
    { from: 'them', text: 'Ok I love that approach 😂 Your chart says you\'re creative — what do you create?', time: '2:35 PM' },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    setMessages(prev => [...prev, { from: 'me', text: text.trim(), time: timeStr }]);
    setInput('');
    setShowWingman(false);

    // Show typing indicator
    setIsTyping(true);

    // Simulate reply
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        "That's such a good question! Let me think about it... 🤔",
        "Omg yes!! I was literally thinking the same thing 😄",
        "Haha this AI really does know us well doesn't it? 😂",
        "Ok I'm impressed - your chart reading was spot on!",
        "I love how deep this conversation is getting already ✨",
        "Can I just say, your opening move was 🔥",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = new Date();
      setMessages(prev => [...prev, {
        from: 'them',
        text: reply,
        time: replyTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      }]);
    }, 1500 + Math.random() * 2000);
  };

  const getIcebreaker = () => {
    return WINGMAN_ICEBREAKERS[Math.floor(Math.random() * WINGMAN_ICEBREAKERS.length)].msg;
  };

  return (
    <div className="phone-frame min-h-screen flex flex-col relative"
      style={{ background: '#0B0620' }}
    >
      {/* Chat Header */}
      <div className="sticky top-0 z-20 px-4 py-3 flex items-center gap-3"
        style={{ background: 'rgba(21,14,53,0.95)', borderBottom: '1px solid var(--color-border)', backdropFilter: 'blur(12px)' }}>
        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/matches')}
          className="btn-ghost text-sm bg-transparent border-none cursor-pointer px-2 py-1 rounded-lg"
          style={{ color: 'var(--color-text-muted)' }}>←</motion.button>
        <div className="relative">
          <div className="w-9 h-9 rounded-full overflow-hidden"
            style={{ border: '1px solid rgba(108,92,231,0.3)' }}>
            <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border"
            style={{ background: '#27AE60', borderColor: 'rgba(21,14,53,0.95)' }} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-white">{match.name.split(' ')[0]}</div>
          <div className="text-[10px]" style={{ color: '#27AE60' }}>Active now</div>
        </div>
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="chip-interactive text-xs font-bold px-2.5 py-1 rounded-full cursor-pointer"
          onClick={() => navigate(`/match/${match.id}`)}
          style={{ background: 'linear-gradient(135deg, #F7B731, #FF9F43)', color: '#0B0620' }}>
          {totalScore}/36 ✦
        </motion.span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-40" style={{ scrollbarWidth: 'none' }}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
            className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'} mb-3`}
          >
            <div className="max-w-[75%]">
              <div className="rounded-2xl px-3.5 py-2.5"
                style={{
                  background: msg.from === 'me'
                    ? 'linear-gradient(135deg, #6C5CE7, #8B5CF6)'
                    : 'rgba(21, 14, 53, 0.6)',
                  borderBottomRightRadius: msg.from === 'me' ? 4 : 16,
                  borderBottomLeftRadius: msg.from === 'me' ? 16 : 4,
                  border: msg.from === 'me' ? 'none' : '1px solid var(--color-border)',
                  backdropFilter: msg.from === 'me' ? 'none' : 'blur(8px)',
                  boxShadow: msg.from === 'me' ? '0 2px 10px rgba(108,92,231,0.3)' : 'none',
                }}>
                <p className="text-xs leading-relaxed" style={{ color: msg.from === 'me' ? 'white' : 'var(--color-text-secondary)' }}>
                  {msg.text}
                </p>
              </div>
              <p className={`text-[9px] mt-0.5 ${msg.from === 'me' ? 'text-right' : 'text-left'}`}
                style={{ color: 'var(--color-text-muted)' }}>{msg.time}</p>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-start mb-3"
            >
              <div className="rounded-2xl px-4 py-3 flex gap-1"
                style={{ background: 'rgba(21, 14, 53, 0.6)', border: '1px solid var(--color-border)', backdropFilter: 'blur(8px)' }}>
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--color-text-muted)' }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Wingman Suggestion */}
      <AnimatePresence>
        {showWingman && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[398px] px-4 z-30"
          >
            <div className="rounded-2xl p-3 glass-card-gold"
              style={{ backdropFilter: 'blur(16px)' }}>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                  style={{ background: 'linear-gradient(135deg, #F7B731, #FF9F43)' }}>💡</span>
                <span className="text-[10px] font-bold" style={{ color: '#F7B731' }}>Astro Wingman suggests:</span>
              </div>
              <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                {getIcebreaker()}
              </p>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage(getIcebreaker())}
                  className="btn-primary flex-1 py-2 rounded-xl text-xs font-bold border-none cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #F7B731, #FF9F43)', color: '#0B0620' }}>
                  Use This ✦
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowWingman(false)}
                  className="btn-ghost py-2 px-4 rounded-xl text-xs font-bold border-none cursor-pointer"
                  style={{ background: 'rgba(108,92,231,0.15)', color: '#8B5CF6' }}>
                  Dismiss
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30 px-4 pb-4 pt-2"
        style={{ background: 'linear-gradient(transparent, #0B0620 20%)' }}>
        <div className="flex gap-2 items-center">
          {/* Wingman FAB */}
          <motion.button
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => setShowWingman(!showWingman)}
            className="btn-action-circle w-10 h-10 rounded-full flex items-center justify-center border-none cursor-pointer flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #F7B731, #FF9F43)',
              boxShadow: '0 2px 10px rgba(247,183,49,0.3)',
            }}>
            <span className="text-sm">🤖</span>
          </motion.button>

          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Type a message..."
            className="flex-1 py-3 px-4 rounded-2xl text-sm text-white outline-none"
            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
          />

          <motion.button
            whileHover={input.trim() ? { scale: 1.15 } : {}}
            whileTap={input.trim() ? { scale: 0.85 } : {}}
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="btn-action-circle w-10 h-10 rounded-full flex items-center justify-center border-none cursor-pointer flex-shrink-0"
            style={{
              background: input.trim() ? 'linear-gradient(135deg, #6C5CE7, #8B5CF6)' : 'rgba(45,37,102,0.5)',
              color: input.trim() ? 'white' : '#6B6B8D',
              boxShadow: input.trim() ? '0 2px 10px rgba(108,92,231,0.3)' : 'none',
              transition: 'all 0.2s ease',
            }}>
            ↑
          </motion.button>
        </div>
      </div>
    </div>
  );
}
