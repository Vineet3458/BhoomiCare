import { SCHEMES } from "../data/soilData";

export default function Schemes() {
  return (
    <div className="page">
      <h1>Government Schemes</h1>

      <div className="grid-3">
        {SCHEMES.map((s) => (
          <div key={s.id} className="card">
            <h3>{s.name}</h3>
            <p>{s.full}</p>
            <p>💰 {s.benefit}</p>
            <a href={s.link} target="_blank" rel="noreferrer" className="scheme-link">
  Apply
</a>
          </div>
        ))}
      </div>
    </div>
  );
}