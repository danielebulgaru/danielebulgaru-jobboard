import { useState } from 'react';

export default function JobFilters({ onFilter }) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ keyword, location, remote });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Cerca ruolo..." 
                value={keyword} onChange={e => setKeyword(e.target.value)} />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Città..." 
                value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <div className="col-md-3">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" id="remote" 
                  checked={remote} onChange={e => setRemote(e.target.checked)} />
                <label className="form-check-label" htmlFor="remote">Solo Remote</label>
              </div>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">Cerca</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}