import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { INTERESTS_LIST, HOBBIES_LIST, AVATARS } from '../data/mockData';

const LOOKING_FOR = ['Long-term Relationship', 'Marriage', 'Serious Dating', 'Open to Anything'];

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { userProfile, setUserProfile, userChart } = useApp();
  const [name, setName] = useState(userProfile.name);
  const [age, setAge] = useState(userProfile.age);
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const [interests, setInterests] = useState(userProfile.interests);
  const [passionInput, setPassionInput] = useState('');
  const [passions, setPassions] = useState(userProfile.passions);
  const [hobbies, setHobbies] = useState(userProfile.hobbies);
  const [openingMove, setOpeningMove] = useState(userProfile.openingMove);
  const [lookingFor, setLookingFor] = useState(userProfile.lookingFor);

  const toggleInterest = (label) => {
    setInterests(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : prev.length < 8 ? [...prev, label] : prev
    );
  };

  const toggleHobby = (h) => {
    setHobbies(prev =>
      prev.includes(h) ? prev.filter(x => x !== h) : prev.length < 5 ? [...prev, h] : prev
    );
  };

  const addPassion = () => {
    if (passionInput.trim() && passions.length < 3) {
      setPassions([...passions, passionInput.trim()]);
      setPassionInput('');
    }
  };

  const handleSubmit = () => {
    setUserProfile({ name, age, avatar, interests, passions, hobbies, openingMove, lookingFor });
    navigate('/matches');
  };

  const isValid = name && age && interests.length >= 3;

  // Progress
  const steps = [name, age, interests.length >= 3, openingMove];
  const progress = steps.filter(Boolean).length;

  return (
    <div className="phone-frame min-h-screen pb-24 noise-overlay"
      style={{ background: 'linear-gradient(180deg, #0B0620 0%, #120A2E 25%, #150E35 50%, #120A2E 75%, #0B0620 100%)' }}
    >
      <div className="px-5 pt-8 pb-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(userChart ? '/my-chart' : '/')}
            className="btn-ghost text-sm font-medium bg-transparent mb-4 px-3 py-1.5 rounded-lg"
            style={{ color: 'var(--color-text-muted)', border: '1px solid transparent' }}>
            ← Back
          </motion.button>
          <h1 className="font-heading text-2xl font-bold text-white mb-1">Almost There ✦</h1>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Tell matches a bit about you</p>
        </motion.div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-6">
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              animate={{ background: i < progress ? 'linear-gradient(135deg, #F7B731, #FF9F43)' : 'rgba(45,37,102,0.5)' }}
              className="h-1 rounded-full flex-1"
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Name */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-5">
          <label className="block text-xs font-bold mb-2 tracking-wider uppercase" style={{ color: '#F7B731' }}>Your Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name"
            className="w-full py-3.5 px-4 rounded-2xl text-sm text-white outline-none"
            style={{
              background: 'var(--color-bg-card)',
              border: name ? '1px solid rgba(247,183,49,0.3)' : '1px solid var(--color-border)',
              transition: 'border-color 0.3s ease',
            }} />
        </motion.div>

        {/* Age */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-5">
          <label className="block text-xs font-bold mb-2 tracking-wider uppercase" style={{ color: '#F7B731' }}>Age</label>
          <input type="number" min={18} max={45} value={age} onChange={e => setAge(e.target.value)} placeholder="25"
            className="w-full py-3.5 px-4 rounded-2xl text-sm text-white outline-none"
            style={{
              background: 'var(--color-bg-card)',
              border: age ? '1px solid rgba(247,183,49,0.3)' : '1px solid var(--color-border)',
              transition: 'border-color 0.3s ease',
            }} />
        </motion.div>

        {/* Avatar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-5">
          <label className="block text-xs font-bold mb-2 tracking-wider uppercase" style={{ color: '#F7B731' }}>Your Photo</label>
          <div className="flex gap-3 flex-wrap">
            {AVATARS.map(a => (
              <motion.button
                key={a}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setAvatar(a)}
                className="w-14 h-14 rounded-2xl text-2xl border-none cursor-pointer flex items-center justify-center"
                style={{
                  background: avatar === a ? 'linear-gradient(135deg, #6C5CE7, #8B5CF6)' : 'var(--color-bg-card)',
                  border: avatar === a ? '2px solid #F7B731' : '1px solid var(--color-border)',
                  boxShadow: avatar === a ? '0 0 20px rgba(108,92,231,0.4)' : 'none',
                  transform: avatar === a ? 'scale(1.1)' : undefined,
                  transition: 'all 0.2s ease',
                }}>
                {a}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-5">
          <label className="block text-xs font-bold mb-2 tracking-wider uppercase" style={{ color: '#F7B731' }}>
            Interests <span className="font-normal" style={{ color: 'var(--color-text-muted)' }}>(pick 3-8)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS_LIST.map(({ emoji, label }) => {
              const selected = interests.includes(label);
              return (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => toggleInterest(label)}
                  className="chip-interactive text-xs font-medium px-3 py-2 rounded-full border-none cursor-pointer"
                  style={{
                    background: selected ? 'rgba(247,183,49,0.15)' : 'var(--color-bg-card)',
                    color: selected ? '#F7B731' : 'var(--color-text-secondary)',
                    border: selected ? '1px solid rgba(247,183,49,0.4)' : '1px solid var(--color-border)',
                    boxShadow: selected ? '0 0 10px rgba(247,183,49,0.15)' : 'none',
                  }}>
                  {emoji} {label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Passions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-5">
          <label className="block text-xs font-bold mb-2 tracking-wider uppercase" style={{ color: '#F7B731' }}>
            Passions <span className="font-normal" style={{ color: 'var(--color-text-muted)' }}>(up to 3)</span>
          </label>
          <div className="flex gap-2">
            <input type="text" value={passionInput} onChange={e => setPassionInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addPassion()}
              placeholder="e.g., Sustainable Living"
              className="flex-1 py-3 px-4 rounded-2xl text-sm text-white outline-none"
              style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }} />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={addPassion}
              className="btn-secondary px-4 rounded-2xl text-sm font-bold border-none cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #6C5CE7, #8B5CF6)', color: 'white' }}>+</motion.button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {passions.map(p => (
              <motion.span
                key={p}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="chip-interactive text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1"
                style={{ background: 'rgba(108,92,231,0.15)', color: '#8B5CF6', border: '1px solid rgba(108,92,231,0.3)' }}>
                {p}
                <button onClick={() => setPassions(passions.filter(x => x !== p))}
                  className="bg-transparent border-none cursor-pointer text-xs ml-1 hover:opacity-70 transition-opacity" style={{ color: '#FF6B6B' }}>×</button>
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Hobbies */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-5">
          <label className="block text-xs font-bold mb-2 tracking-wider uppercase" style={{ color: '#F7B731' }}>
            Hobbies <span className="font-normal" style={{ color: 'var(--color-text-muted)' }}>(pick 2-5)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {HOBBIES_LIST.map(h => {
              const selected = hobbies.includes(h);
              return (
                <motion.button
                  key={h}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => toggleHobby(h)}
                  className="chip-interactive text-xs font-medium px-3 py-2 rounded-full border-none cursor-pointer"
                  style={{
                    background: selected ? 'rgba(0,210,211,0.15)' : 'var(--color-bg-card)',
                    color: selected ? '#00D2D3' : 'var(--color-text-secondary)',
                    border: selected ? '1px solid rgba(0,210,211,0.4)' : '1px solid var(--color-border)',
                    boxShadow: selected ? '0 0 10px rgba(0,210,211,0.15)' : 'none',
                  }}>
                  {h}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Opening Move */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-5">
          <label className="block text-xs font-bold mb-1 tracking-wider uppercase" style={{ color: '#F7B731' }}>Your Opening Move ✦</label>
          <p className="text-[10px] mb-2" style={{ color: 'var(--color-text-muted)' }}>Write something fun that makes someone want to reply</p>
          <input type="text" value={openingMove} onChange={e => setOpeningMove(e.target.value.slice(0, 150))}
            placeholder="Tell me your most controversial food opinion 🍕"
            className="w-full py-3.5 px-4 rounded-2xl text-sm text-white outline-none"
            style={{
              background: 'var(--color-bg-card)',
              border: openingMove ? '1px solid rgba(247,183,49,0.3)' : '1px solid var(--color-border)',
              transition: 'border-color 0.3s ease',
            }} />
          <p className="text-[10px] text-right mt-1" style={{ color: openingMove.length > 120 ? '#FF6B6B' : 'var(--color-text-muted)' }}>{openingMove.length}/150</p>
        </motion.div>

        {/* Looking For */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
          <label className="block text-xs font-bold mb-2 tracking-wider uppercase" style={{ color: '#F7B731' }}>Looking For</label>
          <div className="flex flex-wrap gap-2">
            {LOOKING_FOR.map(lf => (
              <motion.button
                key={lf}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setLookingFor(lf)}
                className="chip-interactive text-xs font-medium px-4 py-2.5 rounded-full border-none cursor-pointer"
                style={{
                  background: lookingFor === lf ? 'linear-gradient(135deg, #6C5CE7, #8B5CF6)' : 'var(--color-bg-card)',
                  color: lookingFor === lf ? 'white' : 'var(--color-text-secondary)',
                  border: lookingFor === lf ? '1px solid rgba(108,92,231,0.5)' : '1px solid var(--color-border)',
                  boxShadow: lookingFor === lf ? '0 4px 15px rgba(108,92,231,0.3)' : 'none',
                }}>
                {lf}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Submit */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          whileHover={isValid ? { scale: 1.03, y: -2 } : {}}
          whileTap={isValid ? { scale: 0.96 } : {}}
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full py-4 rounded-2xl font-bold text-sm ${isValid ? 'btn-primary animate-pulse-glow' : ''}`}
          style={{
            background: isValid ? 'linear-gradient(135deg, #F7B731, #FF9F43)' : 'rgba(45,37,102,0.5)',
            color: isValid ? '#0B0620' : '#6B6B8D',
            boxShadow: isValid ? '0 4px 20px rgba(247,183,49,0.4)' : 'none',
            opacity: isValid ? 1 : 0.6,
            border: 'none',
            cursor: isValid ? 'pointer' : 'not-allowed',
            letterSpacing: '0.02em',
          }}>
          Find My Star Matches ✦
        </motion.button>
      </div>
    </div>
  );
}
