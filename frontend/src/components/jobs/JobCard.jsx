import { Link } from 'react-router-dom';
import { getUser } from '../../auth';
import api from '../../api/axiosConfig';

export default function JobCard({ job }) {
  const user = getUser();

  const handleSave = async () => {
    try {
      await api.post(`/saved-jobs/${job.id}`);
      alert('Offerta salvata!');
    } catch (err) {
      alert('Errore: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title">{job.title}</h5>
          {job.isRemote && <span className="badge bg-success">Remote</span>}
        </div>
        <h6 className="card-subtitle mb-2 text-muted">
          Azienda - {job.location}
        </h6>
        <p className="card-text text-truncate">{job.description}</p>
        <div className="mb-2">
          {job.skills?.map((s, i) => (
            <span key={i} className="badge bg-secondary me-1">{s}</span>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/jobs/${job.id}`} className="btn btn-primary btn-sm">Dettagli</Link>
          <div>
            {job.salaryMin && <small className="text-muted me-2">€{job.salaryMin}-{job.salaryMax}</small>}
            {user?.role === 'CANDIDATE' && (
              <button className="btn btn-outline-secondary btn-sm" onClick={handleSave}>
                <i className="bi bi-bookmark"></i>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="card-footer text-muted small">
        <i className="bi bi-eye me-1"></i>{job.viewsCount} views | {job.applicationsCount} candidature
      </div>
    </div>
  );
}