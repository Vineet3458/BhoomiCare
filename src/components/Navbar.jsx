export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand">
          <div className="brand-icon">🌱</div>
          <div>
            <div className="brand-name">Bhoomi Care</div>
            <div className="brand-sub">Soil Intelligence</div>
          </div>
        </div>

        <div className="nav-tabs">
          <button
            className={activeTab === "home" ? "nav-tab active" : "nav-tab"}
            onClick={() => setActiveTab("home")}
          >
            🌱 Dashboard
          </button>

          <button
            className={activeTab === "nutrients" ? "nav-tab active" : "nav-tab"}
            onClick={() => setActiveTab("nutrients")}
          >
            🧪 Nutrients
          </button>

          <button
            className={activeTab === "schemes" ? "nav-tab active" : "nav-tab"}
            onClick={() => setActiveTab("schemes")}
          >
            📋 Schemes
          </button>

          <button
            className={activeTab === "ai" ? "nav-tab active" : "nav-tab"}
            onClick={() => setActiveTab("ai")}
          >
            🤖 AI Chat
          </button>
        </div>
      </div>
    </nav>
  );
}