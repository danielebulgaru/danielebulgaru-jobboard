import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';

export default function MyApplicationsPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get('/applications/mine').then(res => setApps(res.data));
  }, []);

  const getBadgeColor = (status) => {
    switch(status) {
      case 'PENDING': return 'bg-warning text-dark';
      case 'REVIEWING': return 'bg-info';
      case 'SHORTLISTED': return 'bg-primary';
      case 'HIRED': return 'bg-success';
      case 'REJECTED': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Le mie Candidature</h2>
      <div className="list-group">
        {apps.map(app => (
          <div key={app.id} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">
                <Link to={`/jobs/${app.job?.id}`}>{app.job?.title}</Link>
              </h5>
              <span className={`badge ${getBadgeColor(app.status)}`}>{app.status}</span>
            </div>
            <p className="mb-1 text-muted">{app.job?.companyName} - {app.appliedAt?.substring(0, 10)}</p>
          </div>
        ))}
      </div>
      {apps.length === 0 && <p className="text-center text-muted mt-4">Nessuna candidatura inviata.</p>}
    </div>
  );
}