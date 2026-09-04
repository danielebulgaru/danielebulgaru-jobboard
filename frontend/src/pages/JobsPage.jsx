import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/jobs').then(res => {
      setJobs(res.data);
      setLoading(false);
    }).catch(e => {
      console.error(e);
      setLoading(false);
    });
  }, []);

  const handleFilter = (filters) => {
    api.get('/jobs').then(res => {
      let data = res.data;
      if (filters.keyword) {
        data = data.filter(j => j.title.toLowerCase().includes(filters.keyword.toLowerCase()));
      }
      if (filters.location) {
        data = data.filter(j => j.location?.toLowerCase().includes(filters.location.toLowerCase()));
      }
      if (filters.remote) {
        data = data.filter(j => j.isRemote);
      }
      setJobs(data);
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Offerte di Lavoro</h2>
      <JobFilters onFilter={handleFilter} />
      <div className="row g-4">
        {jobs.map(job => (
          <div className="col-md-6 col-lg-4" key={job.id}>
            <JobCard job={job} />
          </div>
        ))}
      </div>
      {jobs.length === 0 && <p className="text-center text-muted">Nessuna offerta trovata.</p>}
    </div>
  );
}