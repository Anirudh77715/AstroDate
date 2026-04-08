import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import BottomNav from './components/BottomNav';
import Welcome from './screens/Welcome';
import BirthInput from './screens/BirthInput';
import MyChart from './screens/MyChart';
import ProfileSetup from './screens/ProfileSetup';
import Matches from './screens/Matches';
import MatchDetail from './screens/MatchDetail';
import Chat from './screens/Chat';
import Forecast from './screens/Forecast';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen relative" style={{ background: '#050312' }}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/birth-input" element={<BirthInput />} />
            <Route path="/my-chart" element={<MyChart />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/match/:id" element={<MatchDetail />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/forecast" element={<Forecast />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
