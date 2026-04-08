import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [userChart, setUserChart] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: '',
    age: '',
    avatar: '👨',
    interests: [],
    passions: [],
    hobbies: [],
    openingMove: '',
    lookingFor: '',
  });
  const [birthDetails, setBirthDetails] = useState({
    date: '',
    time: '',
    approximateTime: '',
    unknownTime: false,
    place: '',
  });
  const [likedMatches, setLikedMatches] = useState([]);
  const [starredMatches, setStarredMatches] = useState([]);

  const value = {
    userChart, setUserChart,
    userProfile, setUserProfile,
    birthDetails, setBirthDetails,
    likedMatches, setLikedMatches,
    starredMatches, setStarredMatches,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
