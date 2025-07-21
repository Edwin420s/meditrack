const QueueTable = ({ patients }) => {
  return (
    <div className="queue-container">
      <div className="queue-header">
        <h2>Appointment Queue</h2>
        <SearchBar placeholder="Search by patient name or MRN" />
      </div>
      
      <table className="queue-table">
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
          {patients.map(patient => (
            <tr key={patient.id}>
              <td><a href={`/patient/${patient.id}`}>{patient.name}</a></td>
              <td>{patient.appointmentDateTime}</td>
              <td>{patient.reason}</td>
              <td>
                <Badge variant={patient.status === 'Served' ? 'success' : 'warning'}>
                  {patient.status}
                </Badge>
              </td>
              <td>
                <Button size="sm" variant="outline">
                  Mark as Served
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};