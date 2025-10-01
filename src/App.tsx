import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Layout/Navbar';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { DashboardPage } from './pages/DashboardPage';

import { WalletProvider, useWallet } from "./components/Wallet/WalletContext";
import { WalletModal } from "./components/Wallet/WalletModal";


const AppContent: React.FC<{ onOpenWalletModal: () => void }> = ({ onOpenWalletModal }) => {
  const [favorites, setFavorites] = useState(['1', '4']);
  const { account } = useWallet();
  const navigate = useNavigate();

  const handleToggleFavorite = (propertyId: string) => {
    setFavorites(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <>
      <Navbar 
        onConnectWallet={onOpenWalletModal}
        walletConnected={!!account}
      />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          } 
        />
        <Route 
          path="/listings" 
          element={
            <ListingsPage 
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          } 
        />
        <Route 
          path="/property/:id" 
          element={<PropertyDetailPage onToggleFavorite={handleToggleFavorite} />} 
        />
        <Route 
          path="/favorites" 
          element={
            <FavoritesPage 
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <DashboardPage 
              walletConnected={!!account}
              onConnectWallet={onOpenWalletModal}
            />
          } 
        />
      </Routes>
    </>
  );
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <WalletProvider>
        <div className="p-8">
          <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

          <AppContent onOpenWalletModal={() => setIsModalOpen(true)} />
        </div>
      </WalletProvider>
    </Router>
  );
}

export default App;
