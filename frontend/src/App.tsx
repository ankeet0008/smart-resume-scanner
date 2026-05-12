import './App.css'

function App() {
  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <span className="brand-dot" aria-hidden="true"></span>
          Smart Resume Scanner
        </div>
        <nav className="nav-links">
          <button type="button" className="link">Product</button>
          <button type="button" className="link">Insights</button>
          <button type="button" className="link">Pricing</button>
          <button type="button" className="link">Contact</button>
        </nav>
        <button type="button" className="ghost">Request demo</button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">AI Resume Intelligence</p>
            <h1>Turn resumes into hiring-ready intelligence.</h1>
            <p className="lead">
              Upload a PDF, extract skills, and generate an instant scorecard with
              targeted recommendations. Built for recruiters and candidates who
              want clarity fast.
            </p>
            <div className="hero-actions">
              <button type="button" className="primary">Start scanning</button>
              <button type="button" className="secondary">View sample report</button>
            </div>
            <div className="chip-row">
              <span className="chip">PDF parsing</span>
              <span className="chip">Skill clustering</span>
              <span className="chip">Score confidence</span>
              <span className="chip">Role fit</span>
            </div>
          </div>

          <div className="hero-card" aria-label="Resume scan upload">
            <div className="card-header">
              <div>
                <p className="card-title">Resume scan</p>
                <p className="card-sub">Drop a PDF or choose a file to preview insights.</p>
              </div>
              <span className="badge">Live preview</span>
            </div>
            <label className="dropzone" htmlFor="resumeUpload">
              <input id="resumeUpload" type="file" accept="application/pdf" />
              <div>
                <p className="drop-title">Upload resume PDF</p>
                <p className="drop-sub">Max 10MB. We never store files without consent.</p>
              </div>
              <button type="button" className="upload-btn">Choose file</button>
            </label>
            <div className="insight-preview">
              <div>
                <p className="preview-label">Detected roles</p>
                <p className="preview-value">UI/UX Designer, Product Design</p>
              </div>
              <div>
                <p className="preview-label">Top skills</p>
                <p className="preview-value">Figma, Prototyping, Design Systems</p>
              </div>
              <div className="score-pill">
                <span>Resume score</span>
                <strong>84</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="metrics">
          <div className="metric-card">
            <p className="metric-label">Average scan time</p>
            <p className="metric-value">12s</p>
            <p className="metric-sub">From upload to report-ready highlights.</p>
          </div>
          <div className="metric-card">
            <p className="metric-label">Skills mapped</p>
            <p className="metric-value">120+</p>
            <p className="metric-sub">Technical + soft skill taxonomy built-in.</p>
          </div>
          <div className="metric-card">
            <p className="metric-label">Confidence signal</p>
            <p className="metric-value">0.92</p>
            <p className="metric-sub">Consistency score for extracted data.</p>
          </div>
        </section>

        <section className="flow">
          <div className="section-head">
            <h2>How the scan works</h2>
            <p>Three stages that turn raw PDFs into actionable signals.</p>
          </div>
          <div className="flow-grid">
            <div className="flow-step">
              <span className="step-number">01</span>
              <h3>Extract</h3>
              <p>Parse resume layout, sections, and entities with NLP.</p>
            </div>
            <div className="flow-step">
              <span className="step-number">02</span>
              <h3>Cluster</h3>
              <p>Group skills into role tracks and experience bands.</p>
            </div>
            <div className="flow-step">
              <span className="step-number">03</span>
              <h3>Recommend</h3>
              <p>Generate gaps, tailored courses, and resume tips.</p>
            </div>
          </div>
        </section>

        <section className="insights">
          <div className="section-head">
            <h2>Insights recruiters can act on</h2>
            <p>Keep hiring fast with clean visuals and structured data.</p>
          </div>
          <div className="insight-grid">
            <div className="insight-card">
              <h3>Role fit</h3>
              <p>Match candidates to job families with weighted signals.</p>
            </div>
            <div className="insight-card">
              <h3>Missing essentials</h3>
              <p>Surface missing sections like achievements or certifications.</p>
            </div>
            <div className="insight-card">
              <h3>Portfolio highlights</h3>
              <p>Auto-detect projects and impact statements in seconds.</p>
            </div>
            <div className="insight-card">
              <h3>Consistency checks</h3>
              <p>Flag contradictions in dates, titles, and timelines.</p>
            </div>
          </div>
        </section>

        <section className="cta">
          <div>
            <h2>Ready to elevate every resume?</h2>
            <p>Launch the scanner or connect to your ATS in minutes.</p>
          </div>
          <div className="cta-actions">
            <button type="button" className="primary">Launch scanner</button>
            <button type="button" className="secondary">Talk to sales</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Smart Resume Scanner © 2026</p>
        <div className="footer-links">
          <button type="button" className="link">Privacy</button>
          <button type="button" className="link">Security</button>
          <button type="button" className="link">Support</button>
        </div>
      </footer>
    </div>
  )
}

export default App
