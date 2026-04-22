import {
  STATUS_TRANSITIONS,
  isFinalStatus,
  getStatusLabel,
  getStatusStyle,
} from "../../../../utils/appointmentStatus";
import CustomSelect from "../../../../components/common/CustomSelect";
import Button from "../../../../components/common/Button";
import StatusBadge from "../../common/StatusBadge";
import { APPOINTMENT_STATUS } from "../../../../utils/appointmentStatus";

export default function AppointmentsTable({
  appointments,
  onStatusChange,
  loadingId,
}) {
  return (
    <div className="glass rounded-xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-(--card) border-b border-(--border)">
            <tr className="text-left text-(--text-secondary)">
              <th className="p-6 font-medium">Patient</th>
              <th className="p-6 font-medium">Doctor</th>
              <th className="p-6 font-medium">Dept</th>
              <th className="p-6 font-medium">Date & Time</th>
              <th className="p-6 font-medium">Status</th>
              <th className="p-6 font-medium">Amount</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-(--border)">
            {appointments.map((a) => {
              let currentStatus = (a.status || "pending").toLowerCase().trim();

              if (currentStatus === "requested") {
                currentStatus = "pending";
              }

              const isLocked = isFinalStatus(currentStatus);
              const allowedNext = STATUS_TRANSITIONS[currentStatus] || [];
              const statusOptions = [
                { value: currentStatus, label: getStatusLabel(currentStatus) },
                ...allowedNext.map(s => ({ value: s, label: getStatusLabel(s) }))
              ].filter((_, i) => i === 0 || allowedNext.includes(_.value));

              return (
                <tr
                  key={a.id}
                  className="hover:bg-(--card) transition-colors duration-200"
                >
                  <td className="p-6 font-medium max-w-50 truncate">
                    {a.patientName}
                  </td>
                  <td className="p-6">{a.doctorName}</td>
                  <td className="p-6">{a.departmentName}</td>
                  <td className="p-6">
                    <div>
                      <div className="font-medium">{a.date}</div>
                      <div className="text-[var(--muted)]">{a.time}</div>
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <StatusBadge status={currentStatus} />
                      
                      {!isLocked && (
                        <CustomSelect
                          options={Object.entries(STATUS_TRANSITIONS).flatMap(([from, toList]) => 
                            toList.map(to => ({ value: to, label: getStatusLabel(to) }))
                          ).filter(o => o.value === currentStatus || allowedNext.includes(o.value))}
                          value={currentStatus}
                          onChange={(value) => onStatusChange(a.id, value)}
                        />
                      )}
                      
                      {a.statusHistory?.length > 1 && (
                        <div className="text-xs text-[var(--muted)]">
                          {a.statusHistory.length} changes
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-6 font-semibold text-green-600">
                    ₹{a.totalAmount || 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
