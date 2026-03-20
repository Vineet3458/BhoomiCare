import React, { useState } from 'react'
import { LangProvider } from './context/LangContext.jsx'
import Navbar  from './components/layout/Navbar.jsx'
import Footer  from './components/layout/Footer.jsx'
import Dashboard   from './components/dashboard/Dashboard.jsx'
import NutrientViz from './components/nutrients/NutrientViz.jsx'
import GovtSchemes from './components/schemes/GovtSchemes.jsx'
import AIAssistant from './components/assistant/AIAssistant.jsx'

function Inner() {
  const [tab, setTab] = useState('home')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={tab} setTab={setTab} />

      <main className="flex-1 pb-16">
        {tab === 'home'      && <Dashboard   setTab={setTab} />}
        {tab === 'nutrients' && <NutrientViz />}
        {tab === 'schemes'   && <GovtSchemes />}
        {tab === 'ai'        && <AIAssistant />}
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Inner />
    </LangProvider>
  )
}