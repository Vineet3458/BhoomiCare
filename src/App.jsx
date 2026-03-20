import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Nutrients from "./components/Nutrients";
import Schemes from "./components/Schemes";
import AIChat from "./components/AIChat";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <Dashboard />;
      case "nutrients":
        return <Nutrients />;
      case "schemes":
        return <Schemes />;
      case "ai":
        return <AIChat />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderPage()}
    </>
  );
}

export default App;