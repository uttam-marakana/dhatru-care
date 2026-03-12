export default function DoctorsTable({ doctors, loading, onEdit, onDelete }) {
  if (loading) {
    return <div>Loading doctors...</div>;
  }

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3 text-left">Name</th>
          <th>Specialty</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {doctors.map((doctor) => (
          <tr key={doctor.id} className="border-t">
            <td className="p-3">{doctor.name}</td>

            <td>{doctor.specialty}</td>

            <td>{doctor.departmentName}</td>

            <td className="space-x-2">
              <button
                onClick={() => onEdit(doctor)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(doctor)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
