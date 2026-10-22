"use client";

import React from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { schoolStore } from "@/lib/data/school-store";
import { CheckCircle2, Clock, AlertCircle, Calendar, ShieldCheck } from "lucide-react";

export default function StudentAttendancePage() {
  const studentId = "20000000-0000-0000-0000-000000000001"; // Alex Vance
  const { records, summary } = schoolStore.getStudentAttendance(studentId);

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "Attendance Record", href: "/portal/student/attendance" },
      ]}
      title="Personal Attendance Ledger"
      description="Official classroom roll call records verified by instructional staff."
    >
      <div className="space-y-6">
        {/* Attendance Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="bg-white border-slate-200">
            <CardContent className="p-4 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                Attendance Rate
              </span>
              <div className="text-3xl font-extrabold text-emerald-700 mt-1">
                {summary.rate}%
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">
                Complies with school policy (&ge; 90%)
              </span>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-4 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                Present Sessions
              </span>
              <div className="text-3xl font-extrabold text-[#0f2744] mt-1">
                {summary.present}
              </div>
              <span className="text-[10px] text-slate-400">On-time classroom attendance</span>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-4 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                Late Arrivals
              </span>
              <div className="text-3xl font-extrabold text-amber-600 mt-1">
                {summary.late}
              </div>
              <span className="text-[10px] text-slate-400">Admitted with pass</span>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-4 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                Unexcused Absences
              </span>
              <div className="text-3xl font-extrabold text-rose-600 mt-1">
                {summary.absent}
              </div>
              <span className="text-[10px] text-slate-400">No disciplinary flags</span>
            </CardContent>
          </Card>
        </div>

        {/* Ledger Table */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="py-4 px-6 border-b border-slate-100 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#0284c7]" />
              <CardTitle className="text-base text-[#0f2744]">
                Recorded Attendance Logs ({records.length})
              </CardTitle>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Immutable Ledger</span>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Session Date</th>
                  <th className="py-3 px-4">Recorded Status</th>
                  <th className="py-3 px-4">Classroom Cohort</th>
                  <th className="py-3 px-4">Instructor Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {rec.date}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                          rec.status === "present"
                            ? "bg-emerald-100 text-emerald-800"
                            : rec.status === "late"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {rec.status === "present" && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {rec.status === "late" && <Clock className="w-3.5 h-3.5" />}
                        {rec.status === "absent" && <AlertCircle className="w-3.5 h-3.5" />}
                        <span>{rec.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      Section 10-A (Grade 10 Senior Preparatory)
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 italic">
                      {rec.notes || "Standard verified attendance record."}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PortalLayout>
  );
}
