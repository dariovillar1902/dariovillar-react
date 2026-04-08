import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeComponent } from '../components/HomeComponent';
import { NavbarComponent } from '../components/NavbarComponent';
import { PortfolioComponent } from '../components/PortfolioComponent';
import { SobreMiComponent } from '../components/SobreMiComponent';
import CVComponent from '../components/CVComponent';
import JobBoardComponent from '../components/JobBoardComponent';
import InterviewComponent from '../components/InterviewComponent';
import { DarkModeProvider } from '../components/darkModeContext';
import { LanguageProvider } from '../components/languageContext';
import { ContactoComponent } from '../components/ContactoComponent';

export const DashboardRoutes = () => {

  return <DarkModeProvider>
    <LanguageProvider>
      <NavbarComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/sobremi" element={<SobreMiComponent />} />
          <Route path="/portfolio" element={<PortfolioComponent />} />
          <Route path="/cv" element={<CVComponent />} />
          <Route path='/contacto' element={<ContactoComponent />} />
          <Route path='/jobs' element={<JobBoardComponent />} />
          <Route path='/interviews' element={<InterviewComponent />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </DarkModeProvider>;
};
