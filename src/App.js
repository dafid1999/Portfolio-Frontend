import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './custom.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Home from './components/pages/Home';
import UserMainPage from "./components/pages/UserMainPage";
import AdminMainPage from "./components/pages/AdminMainPage";
import VipMainPage from "./components/pages/VipMainPage";
import UserPortfolios from "./components/pages/UserPortfolios";
import Portfolio from "./components/pages/Portfolio";
import PortfolioEditor from "./components/pages/PortfolioEditor";
import Information from "./components/pages/Information";
import Instructions from "./components/pages/Instructions";
import Pricing from "./components/pages/Pricing";



function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/Information" exact element={<Information />} />
            <Route path="/Instructions" exact element={<Instructions />} />
            <Route path="/Pricing" exact element={<Pricing />} />
            <Route path="/:portfolio" exact element={<Portfolio />} />
            <Route path="/UserMainPage" exact element={<UserMainPage />} />
            <Route path="/VipMainPage" exact element={<VipMainPage />} />
            <Route path="/AdminMainPage" exact element={<AdminMainPage />} />
            <Route path="/UserPortfolios" exact element={<UserPortfolios />} />
            <Route path="/PortfolioEditor/:portfolio" exact element={<PortfolioEditor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

