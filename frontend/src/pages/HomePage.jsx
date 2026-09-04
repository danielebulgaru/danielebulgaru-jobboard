import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container py-5">
      <div className="p-5 mb-4 bg-light rounded-3 border">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Trova il lavoro dei tuoi sogni</h1>
          <p className="col-md-8 fs-4">Piattaforma per candidati e aziende. Pubblica offerte, candidati, gestisci il tuo profilo.</p>
          <Link to="/jobs" className="btn btn-primary btn-lg me-2">Cerca Offerte</Link>
          <Link to="/register" className="btn btn-outline-primary btn-lg">Registrati</Link>
        </div>
      </div>
      <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <div className="h-100 p-5 text-white bg-primary rounded-3">
            <h2>Sei un Candidato?</h2>
            <p>Crea il tuo profilo, carica il CV e candidati alle migliori offerte di lavoro.</p>
            <Link to="/register" className="btn btn-outline-light">Inizia ora</Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 p-5 bg-light border rounded-3">
            <h2>Sei un Recruiter?</h2>
            <p>Pubblica le offerte della tua azienda e gestisci le candidature ricevute.</p>
            <Link to="/register" className="btn btn-outline-secondary">Pubblica offerta</Link>
          </div>
        </div>
      </div>
    </div>
  );
}