import React, { useEffect } from 'react';
import Navbar from '../../components/landing/Navbar';
import HeroSection from '../../components/landing/HeroSection';
import StatsSection from '../../components/landing/StatsSection';
import UnifiedPlatform from '../../components/landing/UnifiedPlatform';
import ModeShowcase from '../../components/landing/ModeShowcase';
import IntegratedApps from '../../components/landing/IntegratedApps';
import ReverseProxy from '../../components/landing/ReverseProxy';
import EnterpriseFeatures from '../../components/landing/EnterpriseFeatures';
import Testimonials from '../../components/landing/Testimonials';
import Footer from '../../components/landing/Footer';
import BackgroundTheme from '../../components/common/BackgroundTheme';

const FuncLexaLanding = () => {
  useEffect(() => {
    document.title = 'FuncLexa - Unified AI Workspace';
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden relative" style={{ color: '#e2e8f0' }}>
      <BackgroundTheme variant="workspace" />
      <Navbar />

      <main className="nebula-core-content">
        <HeroSection />
        <StatsSection />
        <UnifiedPlatform />
        <ModeShowcase />
        <IntegratedApps />
        <ReverseProxy />
        <EnterpriseFeatures />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default FuncLexaLanding;

