import { useMemo } from 'react';

export default function StarsBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => {
      const size = Math.random();
      const isAccent = i < 8; // some colored stars
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: size < 0.7 ? Math.random() * 1.5 + 0.5 : Math.random() * 3 + 2,
        duration: `${Math.random() * 4 + 2}s`,
        delay: `${Math.random() * 5}s`,
        opacity: size < 0.7 ? Math.random() * 0.4 + 0.15 : Math.random() * 0.6 + 0.3,
        color: isAccent
          ? ['#F7B731', '#6C5CE7', '#00D2D3', '#FF6B6B', '#8B5CF6', '#F7B731', '#C8C2E6', '#27AE60'][i]
          : 'white',
        glow: size > 0.85,
      };
    });
  }, []);

  const shootingStars = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      top: `${15 + Math.random() * 40}%`,
      delay: `${i * 7 + Math.random() * 4}s`,
      duration: `${1.5 + Math.random()}s`,
    }));
  }, []);

  return (
    <div className="stars-bg">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            background: star.color,
            '--duration': star.duration,
            '--delay': star.delay,
            boxShadow: star.glow
              ? `0 0 ${star.size * 3}px ${star.color === 'white' ? 'rgba(255,255,255,0.4)' : star.color + '60'}`
              : 'none',
          }}
        />
      ))}
      {/* Shooting stars */}
      {shootingStars.map(s => (
        <div
          key={`shoot-${s.id}`}
          className="shooting-star"
          style={{
            top: s.top,
            '--shoot-delay': s.delay,
            '--shoot-duration': s.duration,
          }}
        />
      ))}
    </div>
  );
}
