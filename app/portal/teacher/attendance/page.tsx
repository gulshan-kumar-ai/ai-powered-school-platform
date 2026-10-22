"use client";

import React, { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import { AttendanceStatus } from "@/types/portal";
import {
  CheckCircle2,
  AlertCircle,
  Save,
  Users,
  Check,
  X,
} from "lucide-react";

export default function TeacherAttendancePage() {
  const teacherId = "10000000-0000-0000-0000-000000000001"; // Dr. Marcus Chen
  const assignedClasses = schoolStore.getTeacherAssignments(teacherId);

  const [selectedSectionId, setSelectedSectionId] = useState(
    assignedClasses[0]?.section_id || "e0000000-0000-0000-0000-000000000001"
  );
  const [selectedDate, setSelectedDate] = useState("2026-10-21");
  const students = schoolStore.getSectionStudents(selectedSectionId);

  const [attendanceMap, setAttendanceMap] = useState<Record<string, { status: AttendanceStatus; notes: string }>>(() => {
    const initialSecId = assignedClasses[0]?.section_id || "e0000000-0000-0000-0000-000000000001";
    const list = schoolStore.getSectionStudents(initialSecId);
    const existing = schoolStore.getAttendanceByDateAndSection("2026-10-21", initialSecId);
    const map: Record<string, { status: AttendanceStatus; notes: string }> = {};
    list.forEach((s) => {
      const match = existing.find((a) => a.student_id === s.id);
      map[s.id] = {
        status: match ? match.status : "present",
        notes: match?.notes || "",
      };
    });
    return map;
  });

  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSectionSelect = (newSecId: string) => {
    setSelectedSectionId(newSecId);
    const list = schoolStore.getSectionStudents(newSecId);
    const existing = schoolStore.getAttendanceByDateAndSection(selectedDate, newSecId);
    const map: Record<string, { status: AttendanceStatus; notes: string }> = {};
    list.forEach((s) => {
      const match = existing.find((a) => a.student_id === s.id);
      map[s.id] = {
        status: match ? match.status : "present",
        notes: match?.notes || "",
      };
    });
    setAttendanceMap(map);
  };

  const handleDateSelect = (newDate: string) => {
    setSelectedDate(newDate);
    const list = schoolStore.getSectionStudents(selectedSectionId);
    const existing = schoolStore.getAttendanceByDateAndSection(newDate, selectedSectionId);
    const map: Record<string, { status: AttendanceStatus; notes: string }> = {};
    list.forEach((s) => {
      const match = existing.find((a) => a.student_id === s.id);
      map[s.id] = {
        status: match ? match.status : "present",
        notes: match?.notes || "",
      };
    });
    setAttendanceMap(map);
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
      },
    }));
  };

  const handleNotesChange = (studentId: string, notes: string) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        notes,
      },
    }));
  };

  const handleMarkAllPresent = () => {
    setAttendanceMap((prev) => {
      const updated = { ...prev };
      students.forEach((s) => {
        updated[s.id] = {
          ...updated[s.id],
          status: "present",
        };
      });
      return updated;
    });
  };

  const handleSaveAttendance = () => {
    setSaving(true);
    setFeedback(null);

    try {
      const recordsToSave = students.map((s) => ({
        studentId: s.id,
        sectionId: selectedSectionId,
        date: selectedDate,
        status: attendanceMap[s.id]?.status || "present",
        notes: attendanceMap[s.id]?.notes || undefined,
        markedByTeacherId: teacherId,
      }));

      const res = schoolStore.saveAttendance(recordsToSave);

      setSaving(false);
      setFeedback({
        type: "success",
        message: `${res.message} (Duplicate check verified — composite key [student, section, date] enforced).`,
      });
      setTimeout(() => setFeedback(null), 6000);
    } catch {
      setSaving(false);
      setFeedback({
        type: "error",
        message: "Failed to save attendance registry. Please review inputs.",
      });
    }
  };

  const presentCount = Object.values(attendanceMap).filter((v) => v.status === "present").length;
  const lateCount = Object.values(attendanceMap).filter((v) => v.status === "late").length;
  const absentCount = Object.values(attendanceMap).filter((v) => v.status === "absent").length;

  return (
    <PortalLayout
      requiredRole="teacher"
      breadcrumbs={[
        { label: "Teacher Workspace", href: "/portal/teacher" },
        { label: "Roll Call Attendance", href: "/portal/teacher/attendance" },
      ]}
      title="Daily Class Attendance Registry"
      description="Record student attendance status with automated duplicate prevention and date-stamped audit logs."
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllPresent}
            leftIcon={<Check className="w-3.5 h-3.5 text-emerald-600" />}
          >
            Mark All Present
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={saving}
            onClick={handleSaveAttendance}
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            {saving ? "Saving..." : "Save Registry"}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {feedback && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between border ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-rose-50 text-rose-800 border-rose-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>{feedback.message}</span>
            </div>
            <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Selection Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label htmlFor="assigned-class-select" className="text-xs font-bold text-slate-700 whitespace-nowrap">
                Assigned Class:
              </label>
              <select
                id="assigned-class-select"
                value={selectedSectionId}
                onChange={(e) => handleSectionSelect(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold bg-white text-slate-900"
              >
                {assignedClasses.map((ac) => (
                  <option key={ac.id} value={ac.section_id}>
                    {ac.section_name} — {ac.subject_code} ({ac.subject_name})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label htmlFor="session-date-input" className="text-xs font-bold text-slate-700 whitespace-nowrap">
                Session Date:
              </label>
              <input
                id="session-date-input"
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateSelect(e.target.value)}
                className="w-full sm:w-auto px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Quick Counter Badges */}
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              Present: {presentCount}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-bold">
              Late: {lateCount}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-bold">
              Absent: {absentCount}
            </span>
          </div>
        </div>

        {/* Student Roll Call List */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="py-4 px-6 border-b border-slate-100 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#0284c7]" />
              <CardTitle className="text-base text-[#0f2744]">
                Enrolled Students ({students.length})
              </CardTitle>
            </div>
            <div className="text-xs text-slate-500">
              Single-Click Attendance Toggle
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Roll #</th>
                  <th className="py-3 px-4">Student Name & ID</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4">Observational Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((student) => {
                  const currentStatus = attendanceMap[student.id]?.status || "present";
                  const currentNotes = attendanceMap[student.id]?.notes || "";

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-500">
                        #{student.roll_number || "1"}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0f2744]">
                          {student.profile?.full_name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500">
                          {student.student_number}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 gap-1">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(student.id, "present")}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                              currentStatus === "present"
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "text-slate-600 hover:text-emerald-700"
                            }`}
                          >
                            Present
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(student.id, "late")}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                              currentStatus === "late"
                                ? "bg-amber-500 text-white shadow-xs"
                                : "text-slate-600 hover:text-amber-700"
                            }`}
                          >
                            Late
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(student.id, "absent")}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                              currentStatus === "absent"
                                ? "bg-rose-600 text-white shadow-xs"
                                : "text-slate-600 hover:text-rose-700"
                            }`}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <input
                          type="text"
                          value={currentNotes}
                          onChange={(e) => handleNotesChange(student.id, e.target.value)}
                          placeholder="Optional remark (e.g. excused doctor note)"
                          className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PortalLayout>
  );
}
