import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser } from '../auth';
import api from '../api/axiosConfig';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function JobDetailPage() {
  const { id } = useParams();
  const user = getUser();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/jobs/${id}`).then(res => {
      setJob(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleApply = async () => {
    try {
      await api.post('/applications', { jobId: job.id, coverLetter });
      alert('Candidatura inviata!');
      navigate('/applications');
    } catch (e) {
      alert(e.response?.data?.message || 'Errore');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!job) return <div className="container py-5">Offerta non trovata</div>;

  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h2>{job.title}</h2>
              <h5 className="text-muted">Azienda - {job.location}</h5>
            </div>
            {job.isRemote && <span className="badge bg-success fs-6">Remote</span>}
          </div>
          <div className="mb-3">
            <span className="badge bg-primary me-2">{job.jobType}</span>
            <span className="badge bg-secondary me-2">{job.experienceLevel}</span>
            {job.salaryMin && <span className="badge bg-info">€{job.salaryMin}-{job.salaryMax}</span>}
          </div>
          <hr />
          <h5>Descrizione</h5>
          <p>{job.description}</p>
          <h5>Requisiti</h5>
          <p>{job.requirements}</p>
          <div className="mb-3">
            {job.skills?.map((s, i) => <span key={i} className="badge bg-dark me-1">{s}</span>)}
          </div>
          {user?.role === 'CANDIDATE' && (
            <div className="mt-4">
              <h5>Candidati ora</h5>
              <textarea className="form-control mb-2" rows="3" placeholder="Lettera di presentazione..."
                value={coverLetter} onChange={e => setCoverLetter(e.target.value)}></textarea>
              <button className="btn btn-success" onClick={handleApply}>Invia Candidatura</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}