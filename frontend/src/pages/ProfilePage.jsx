import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { getUser } from '../auth';

export default function ProfilePage() {
  const user = getUser();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    api.get('/profile').then(res => {
      setProfile(res.data);
      setForm(res.data);
    });
  }, []);

  const handleUpdate = async (ev) => {
    ev.preventDefault();
    try {
      const res = await api.put('/profile', form);
      setProfile(res.data);
      alert('Profilo aggiornato!');
    } catch {
      alert('Errore');
    }
  };

  const handleCvUpload = async () => {
    if (!cvFile) return;
    const data = new FormData();
    data.append('file', cvFile);
    try {
      await api.post('/profile/cv', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('CV caricato!');
      window.location.reload();
    } catch {
      alert('Errore upload');
    }
  };

  if (!profile || !user) return <div className="container py-5">Caricamento...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Il mio Profilo</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label">Headline</label>
                  <input className="form-control" value={form.headline || ''} onChange={ev => setForm({...form, headline: ev.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Bio</label>
                  <textarea className="form-control" rows="3" value={form.summary || ''} onChange={ev => setForm({...form, summary: ev.target.value})}></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input className="form-control" value={form.location || ''} onChange={ev => setForm({...form, location: ev.target.value})} />
                </div>
                {user.role === 'CANDIDATE' && (
                  <div className="mb-3">
                    <label className="form-label">Anni di esperienza</label>
                    <input type="number" className="form-control" value={form.yearsOfExperience || ''} onChange={ev => setForm({...form, yearsOfExperience: ev.target.value})} />
                  </div>
                )}
                {user.role === 'RECRUITER' && (
                  <div className="mb-3">
                    <label className="form-label">Nome Azienda</label>
                    <input className="form-control" value={form.companyName || ''} onChange={ev => setForm({...form, companyName: ev.target.value})} />
                  </div>
                )}
                <button type="submit" className="btn btn-primary">Salva</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>CV / Documenti</h5>
              {profile.cvUrl && <p><a href={profile.cvUrl} target="_blank" rel="noreferrer">Visualizza CV</a></p>}
              <input type="file" className="form-control mb-2" onChange={ev => setCvFile(ev.target.files[0])} />
              <button className="btn btn-outline-primary btn-sm w-100" onClick={handleCvUpload}>Carica CV</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}