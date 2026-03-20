export default function Dashboard() {
  return (
    <div className="page active">
      <div className="hero">
        <h1>Soil Health Score</h1>
        <p>📍 Survey 47/2, Nashik</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2>Score: 72/100</h2>
          <p>pH: 6.8</p>
          <p>Organic Carbon: 0.68%</p>
        </div>

        <div className="card">
          <h2>Action Plan</h2>
          <ul>
            <li>Apply Urea (Nitrogen low)</li>
            <li>Use Zinc Sulphate</li>
            <li>Add FYM</li>
          </ul>
        </div>
      </div>
    </div>
  );
}