const VisitDetails = ({ visit }) => {
  return (
    <div className="visit-details">
      <h2>Visit Log Details</h2>
      <p>Comprehensive information about the patient's visit.</p>
      
      <Card title="Patient Information">
        <div className="info-grid">
          <span>Patient Name</span>
          <span>{visit.patientName}</span>
          <span>Date of Birth</span>
          <span>{visit.dob}</span>
          <span>Patient ID</span>
          <span>{visit.patientId}</span>
        </div>
      </Card>
      
      <Card title="Visit Details">
        {/* Similar grid structure for visit details */}
      </Card>
      
      <Card title="Clinical Notes">
        <p>{visit.clinicalNotes}</p>
      </Card>
      
      {/* Additional sections for Diagnosis, Follow-up, etc. */}
      
      <div className="attachments-section">
        <h3>Attachments</h3>
        {visit.attachments.length > 0 ? (
          <div className="attachments-list">
            {/* Render attachments */}
          </div>
        ) : (
          <p className="no-attachments">No Attachments</p>
        )}
        <Button variant="outline" icon="upload">
          Upload Attachment
        </Button>
      </div>
    </div>
  );
};