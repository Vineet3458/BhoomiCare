import React, { useState } from 'react'
import { LangProvider }  from './context/LangContext.jsx'
import { AuthProvider }  from './context/AuthContext.jsx'
import Navbar            from './components/layout/Navbar.jsx'
import Footer            from './components/layout/Footer.jsx'
import Dashboard         from './components/dashboard/Dashboard.jsx'
import NutrientViz       from './components/nutrients/NutrientViz.jsx'
import GovtSchemes       from './components/schemes/GovtSchemes.jsx'
import AIAssistant       from './components/assistant/AIAssistant.jsx'
import WeatherPage       from './components/weather/WeatherPage.jsx'
import CommunityPage     from './components/community/CommunityPage.jsx'
import Marketplace       from './components/marketplace/Marketplace.jsx'
import AuthPage          from './components/auth/AuthPage.jsx'

function Inner() {
  const [tab, setTab] = useState('home')

  // Redirect to auth then come back
  const [postAuthTab, setPostAuthTab] = useState(null)
  function requireLogin() {
    setPostAuthTab(tab)
    setTab('auth')
  }
  function onAuthSuccess() {
    setTab(postAuthTab ?? 'home')
    setPostAuthTab(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={tab} setTab={setTab} />
      <main className="flex-1 pb-16">
        {tab === 'home'      && <Dashboard   setTab={setTab} />}
        {tab === 'nutrients' && <NutrientViz />}
        {tab === 'schemes'   && <GovtSchemes />}
        {tab === 'weather'   && <WeatherPage />}
        {tab === 'community' && <CommunityPage />}
        {tab === 'market'    && <Marketplace onLoginRequired={requireLogin} />}
        {tab === 'ai'        && <AIAssistant />}
        {tab === 'auth'      && <AuthPage onSuccess={onAuthSuccess} />}
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <LangProvider>
        <Inner />
      </LangProvider>
    </AuthProvider>
  )
}
