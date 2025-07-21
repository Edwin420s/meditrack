export default function QueueManagement() {
  return (
    <div className="dashboard doctor-dashboard">
      <Sidebar active="queue" />
      
      <main className="main-content">
        <Header title="Appointment Queue" />
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search by patient name or MRN" 
          />
        </div>
        
        <table className="appointment-queue">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Appointment Date/Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sophie Carter</td>
              <td>2024-03-15 10:00 AM</td>
              <td>Routine Checkup</td>
              <td><span className="badge pending">Pending</span></td>
              <td><button className="action-btn">Mark as Served</button></td>
            </tr>
            {/* More rows */}
          </tbody>
        </table>
      </main>
    </div>
  );
}