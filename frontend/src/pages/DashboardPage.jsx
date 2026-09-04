import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get('/jobs/my-jobs').then(res => setJobs(res.data));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Le mie Offerte</h2>
      <Link to="/post-job" className="btn btn-primary mb-3">+ Nuova Offerta</Link>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Titolo</th>
              <th>Status</th>
              <th>Views</th>
              <th>Candidature</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td><span className={`badge ${job.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>{job.status}</span></td>
                <td>{job.viewsCount}</td>
                <td>{job.applicationsCount}</td>
                <td>
                  <Link to={`/jobs/${job.id}`} className="btn btn-sm btn-outline-primary">Vedi</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}