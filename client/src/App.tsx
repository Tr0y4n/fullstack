import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '@shared/index';
import { Auth, NotFound } from './pages';

const App: React.FC = () => {
  return (
    <div style={{ height: '100%' }}>
      <Header />
      <div style={{ height: 'calc(100% - 60px)', padding: 20, backgroundColor: '#f4f6f8' }}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
