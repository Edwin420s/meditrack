export default function DoctorSelection() {
  return (
    <div className="doctor-selection">
      <div className="progress-steps">
        <div className="step active"></div>
        <div className="step active"></div>
        <div className="step"></div>
      </div>
      
      <h2>Select a Doctor</h2>
      
      <div className="doctor-grid">
        <div className="doctor-card selected">
          <div className="doctor-avatar"></div>
          <h3>Dr. Amelia Chen</h3>
          <p>Cardiologist</p>
        </div>
        
        <div className="doctor-card">
          <div className="doctor-avatar"></div>
          <h3>Dr. Ethan Ramirez</h3>
          <p>Dermatologist</p>
        </div>
        
        {/* More doctors */}
      </div>
      
      <div className="action-buttons">
        <button className="secondary-btn">Back</button>
        <button className="primary-btn">Next</button>
      </div>
    </div>
  );
}