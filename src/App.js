import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
import ImageDetails from './pages/ImageDetails';
import theme from './theme/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<ImageDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
