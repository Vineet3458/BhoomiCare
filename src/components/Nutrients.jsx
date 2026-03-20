import { SOIL } from "../data/soilData";

export default function Nutrients() {
  return (
    <div className="page">
      <h1>Nutrient Profile</h1>

      <div className="grid-2">
        {SOIL.macro.map((n, i) => (
          <div key={i} className="card">
            <h3>{n.name}</h3>
            <p>{n.val} {n.unit}</p>
            <p>Status: {n.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}