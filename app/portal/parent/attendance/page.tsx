"use client";

import React, { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { schoolStore } from "@/lib/data/school-store";
import { CheckCircle2, Clock, AlertCircle, ShieldCheck } from "lucide-react";

export default function ParentAttendancePage() {
  const parentId = "30000000-0000-0000-0000-000000000001";
  const linkedChildren = schoolStore.getParentLinkedChildren(parentId);

  const [selectedChildId, setSelectedChildId] = useState(
    linkedChildren[0]?.id || "20000000-0000-0000-0000-000000000001"
  );

  const activeChild = linkedChildren.find((c) => c.id === selectedChildId) || linkedChildren[0];
  const { records, summary } = schoolStore.getStudentAttendance(activeChild?.id || "");

  return (
    <PortalLayout
      requiredRole="parent"
      breadcrumbs={[
        { label: "Parent Oversight Portal", href: "/portal/parent" },
        { label: "Child Attendance", href: "/portal/parent/attendance" },
      ]}
      title="Verified Child Attendance Ledger"
      description="Official roll call attendance records and session audit history for your enrolled child."
    >
      <div className="space-y-6">
        {/* Child Selector */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-xs font-bold text-slate-700 whitespace-nowrap">
              Select Ward:
            </label>
            <select
              value={selectedChildId}
              onChange={(e) => setSelectedChildId(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-800 bg-white"
            >
              {linkedChildren.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.profile?.full_name} ({c.student_number})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Strict Privacy Partition</span>
          </div>
        </div>

        {/* Attendance Rates */}
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
                In Good Standing
              </span>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-4 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                Present Days
              </span>
              <div className="text-3xl font-extrabold text-[#0f2744] mt-1">
                {summary.present}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-4 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                Tardies / Late
              </span>
              <div className="text-3xl font-extrabold text-amber-600 mt-1">
                {summary.late}
              </div>
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
            </CardContent>
          </Card>
        </div>

        {/* Ledger */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="py-4 px-6 border-b border-slate-100 flex flex-row items-center justify-between">
            <CardTitle className="text-base text-[#0f2744]">
              Roll Call Record History
            </CardTitle>
            <span className="text-xs text-slate-500 font-mono">
              Student: {activeChild?.profile?.full_name}
            </span>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Cohort Section</th>
                  <th className="py-3 px-4">Instructor Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {r.date}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                          r.status === "present"
                            ? "bg-emerald-100 text-emerald-800"
                            : r.status === "late"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {r.status === "present" && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {r.status === "late" && <Clock className="w-3.5 h-3.5" />}
                        {r.status === "absent" && <AlertCircle className="w-3.5 h-3.5" />}
                        <span>{r.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {activeChild?.current_class_name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 italic">
                      {r.notes || "Standard verified record."}
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
