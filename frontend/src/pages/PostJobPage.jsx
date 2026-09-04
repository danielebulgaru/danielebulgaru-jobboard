import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

export default function PostJobPage() {
  const [form, setForm] = useState({
    title: '', description: '', requirements: '', location: '',
    jobType: 'FULL_TIME', experienceLevel: 'JUNIOR',
    salaryMin: '', salaryMax: '', isRemote: false, skills: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, skills: form.skills.split(',').map(s => s.trim()), salaryMin: Number(form.salaryMin), salaryMax: Number(form.salaryMax) };
    try {
      await api.post('/jobs', data);
      alert('Offerta pubblicata!');
      navigate('/dashboard');
    } catch (err) {
      alert('Errore: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Pubblica Offerta</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Titolo</label>
              <input className="form-control" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div className="mb-3">
              <label className="form-label">Descrizione</label>
              <textarea className="form-control" rows="4" required value={form.description} onChange={e => setForm({...form, description: e.target.value})}></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Requisiti</label>
              <textarea className="form-control" rows="3" required value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})}></textarea>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Location</label>
                <input className="form-control" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Tipo</label>
                <select className="form-select" value={form.jobType} onChange={e => setForm({...form, jobType: e.target.value})}>
                  <option>FULL_TIME</option><option>PART_TIME</option><option>CONTRACT</option><option>FREELANCE</option><option>INTERNSHIP</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Livello</label>
                <select className="form-select" value={form.experienceLevel} onChange={e => setForm({...form, experienceLevel: e.target.value})}>
                  <option>JUNIOR</option><option>MID</option><option>SENIOR</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">Stipendio Min</label>
                <input type="number" className="form-control" value={form.salaryMin} onChange={e => setForm({...form, salaryMin: e.target.value})} />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Stipendio Max</label>
                <input type="number" className="form-control" value={form.salaryMax} onChange={e => setForm({...form, salaryMax: e.target.value})} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Skill (separate da virgola)</label>
                <input className="form-control" placeholder="Java, Spring, React" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} />
              </div>
            </div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="remote" checked={form.isRemote} onChange={e => setForm({...form, isRemote: e.target.checked})} />
              <label className="form-check-label" htmlFor="remote">Remote</label>
            </div>
            <button type="submit" className="btn btn-success">Pubblica</button>
          </form>
        </div>
      </div>
    </div>
  );
}