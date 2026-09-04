import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import JobCard from '../components/jobs/JobCard';

export default function SavedJobsPage() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    api.get('/saved-jobs').then(res => {
      setSaved(res.data.map(s => s.job));
    });
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Offerte Salvate</h2>
      <div className="row g-4">
        {saved.map(job => (
          <div className="col-md-6 col-lg-4" key={job.id}>
            <JobCard job={job} />
          </div>
        ))}
      </div>
      {saved.length === 0 && <p className="text-center text-muted">Nessuna offerta salvata.</p>}
    </div>
  );
}