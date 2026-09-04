import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../auth';

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'CANDIDATE',
    companyName: '',
    headline: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    
    if (!form.firstName.trim()) newErrors.firstName = 'Il nome è obbligatorio';
    if (!form.lastName.trim()) newErrors.lastName = 'Il cognome è obbligatorio';
    
    if (!form.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }
    
    if (!form.password) {
      newErrors.password = 'La password è obbligatoria';
    } else if (form.password.length < 6) {
      newErrors.password = 'La password deve avere almeno 6 caratteri';
    }
    
    if (form.role === 'RECRUITER' && !form.companyName.trim()) {
      newErrors.companyName = 'Il nome azienda è obbligatorio per i recruiter';
    }
    
    if (form.role === 'CANDIDATE' && !form.headline.trim()) {
      newErrors.headline = 'Inserisci il tuo titolo professionale';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    
    if (!validate()) return;
    
    setLoading(true);
    try {
      const res = await register(form);
      if (res.message && res.message.includes('Error')) {
        setServerError(res.message);
      } else {
        alert('Registrazione completata! Ora fai il login.');
        navigate('/login');
      }
    } catch (err) {
      console.error('ERRORE COMPLETO:', err);
      const msg = err.response?.data?.message || err.message || 'Errore sconosciuto';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Cancella l'errore quando l'utente scrive
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4 fw-bold">Crea il tuo account</h3>
              
              {serverError && (
                <div className="alert alert-danger d-flex align-items-center">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Nome *</label>
                    <input 
                      name="firstName"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      value={form.firstName} 
                      onChange={handleChange}
                      placeholder="Mario"
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Cognome *</label>
                    <input 
                      name="lastName"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      value={form.lastName} 
                      onChange={handleChange}
                      placeholder="Rossi"
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email *</label>
                  <input 
                    name="email"
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={form.email} 
                    onChange={handleChange}
                    placeholder="mario@esempio.com"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password *</label>
                  <input 
                    name="password"
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    value={form.password} 
                    onChange={handleChange}
                    placeholder="Minimo 6 caratteri"
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Tipo di account *</label>
                  <select 
                    name="role"
                    className="form-select"
                    value={form.role} 
                    onChange={handleChange}
                  >
                    <option value="CANDIDATE">Candidato (cerco lavoro)</option>
                    <option value="RECRUITER">Recruiter (offro lavoro)</option>
                  </select>
                </div>

                {form.role === 'RECRUITER' ? (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Nome Azienda *</label>
                    <input 
                      name="companyName"
                      className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                      value={form.companyName} 
                      onChange={handleChange}
                      placeholder="Es. Tech Solutions Srl"
                    />
                    {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
                  </div>
                ) : (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Titolo Professionale *</label>
                    <input 
                      name="headline"
                      className={`form-control ${errors.headline ? 'is-invalid' : ''}`}
                      value={form.headline} 
                      onChange={handleChange}
                      placeholder="Es. Java Developer, UX Designer..."
                    />
                    {errors.headline && <div className="invalid-feedback">{errors.headline}</div>}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2 fw-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Registrazione in corso...
                    </>
                  ) : (
                    'Registrati'
                  )}
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                Hai già un account? <Link to="/login" className="text-decoration-none fw-bold">Fai il login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}