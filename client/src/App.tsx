import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '@shared/index';
import { Admin, Auth, NotFound } from './pages';

const App: React.FC = () => {
  return (
    <div style={{ height: '100%' }}>
      <Header />
      <div style={{ height: 'calc(100% - 60px)', padding: 10, backgroundColor: '#f4f6f8' }}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
