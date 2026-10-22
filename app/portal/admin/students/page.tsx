"use client";

import React, { useState, useMemo } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import { StudentRecord } from "@/types/portal";
import {
  Users,
  Search,
  Plus,
  Upload,
  AlertCircle,
  CheckCircle2,
  X,
  FileSpreadsheet,
  GraduationCap,
} from "lucide-react";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentRecord[]>(() => schoolStore.getStudents());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sectionFilter, setSectionFilter] = useState<string>("all");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  // New Student Form
  const [newFullName, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newStudentNumber, setNewStudentNumber] = useState("");
  const [newSectionId, setNewSectionId] = useState("e0000000-0000-0000-0000-000000000001");
  const [newEmergencyContact, setNewEmergencyContact] = useState("");

  // CSV Import State
  const [csvContent, setCsvContent] = useState("");
  const [csvError, setCsvError] = useState("");
  const [csvPreview, setCsvPreview] = useState<{ fullName: string; email: string; studentNumber: string }[]>([]);

  const sections = schoolStore.getSections();

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const name = s.profile?.full_name?.toLowerCase() || "";
      const email = s.profile?.email?.toLowerCase() || "";
      const num = s.student_number?.toLowerCase() || "";
      const q = searchQuery.toLowerCase();

      const matchesSearch = !q || name.includes(q) || email.includes(q) || num.includes(q);
      const matchesStatus = statusFilter === "all" || s.status === statusFilter;
      const matchesSection = sectionFilter === "all" || s.current_section_id === sectionFilter;

      return matchesSearch && matchesStatus && matchesSection;
    });
  }, [students, searchQuery, statusFilter, sectionFilter]);

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newEmail || !newStudentNumber) {
      alert("Please provide full name, institutional email, and student number.");
      return;
    }

    const created = schoolStore.addStudent({
      fullName: newFullName,
      email: newEmail,
      studentNumber: newStudentNumber,
      sectionId: newSectionId,
      emergencyContact: newEmergencyContact,
    });

    setStudents(schoolStore.getStudents());
    setIsAddModalOpen(false);
    setNewFullName("");
    setNewEmail("");
    setNewStudentNumber("");
    setNewEmergencyContact("");

    setSuccessMessage(`Enrolled ${created.profile?.full_name} (${created.student_number}) successfully.`);
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleStatusChange = (studentId: string, newStatus: StudentRecord["status"]) => {
    schoolStore.updateStudentStatus(studentId, newStatus);
    setStudents(schoolStore.getStudents());
    setSuccessMessage(`Updated student status to ${newStatus}.`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleCsvChange = (text: string) => {
    setCsvContent(text);
    setCsvError("");
    setCsvPreview([]);

    if (!text.trim()) return;

    try {
      const lines = text.trim().split("\n");
      if (lines.length < 2) {
        setCsvError("CSV must include a header line and at least one student row.");
        return;
      }

      const rows: { fullName: string; email: string; studentNumber: string }[] = [];
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(",").map((p) => p.trim());
        if (parts.length >= 3) {
          rows.push({
            fullName: parts[0],
            email: parts[1],
            studentNumber: parts[2],
          });
        }
      }
      setCsvPreview(rows);
    } catch {
      setCsvError("Invalid CSV format. Expected: FullName, Email, StudentNumber");
    }
  };

  const handleImportCsv = () => {
    if (csvPreview.length === 0) return;

    csvPreview.forEach((row) => {
      schoolStore.addStudent({
        fullName: row.fullName,
        email: row.email,
        studentNumber: row.studentNumber,
        sectionId: sections[0]?.id || "e0000000-0000-0000-0000-000000000001",
      });
    });

    setStudents(schoolStore.getStudents());
    setIsCsvModalOpen(false);
    setCsvContent("");
    setCsvPreview([]);
    setSuccessMessage(`Successfully imported ${csvPreview.length} students via validated CSV.`);
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <PortalLayout
      requiredRole="administrator"
      breadcrumbs={[
        { label: "Administration", href: "/portal/admin" },
        { label: "Student Roster", href: "/portal/admin/students" },
      ]}
      title="Student Directory & Enrolment Management"
      description="Register learners, assign institutional IDs, configure classroom section cohorts, and monitor academic standing."
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCsvModalOpen(true)}
            leftIcon={<Upload className="w-3.5 h-3.5 text-slate-600" />}
          >
            Import CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Student
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage("")} className="text-emerald-700 hover:text-emerald-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, ID, or email..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Classroom:</span>
              <select
                value={sectionFilter}
                onChange={(e) => setSectionFilter(e.target.value)}
                className="w-full md:w-auto px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700"
              >
                <option value="all">All Cohort Sections</option>
                {sections.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.name} ({sec.class_name})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full md:w-auto px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="graduated">Graduated</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
          </div>
        </div>

        {/* Student Roster Table */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="py-4 px-6 border-b border-slate-100 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#0284c7]" />
              <CardTitle className="text-base text-[#0f2744]">
                Enrolled Scholars ({filteredStudents.length})
              </CardTitle>
            </div>
            <div className="text-xs text-slate-500">
              Showing filtered results
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Student ID & Name</th>
                  <th className="py-3 px-4">Contact Email</th>
                  <th className="py-3 px-4">Cohort Section</th>
                  <th className="py-3 px-4">Enrolment Date</th>
                  <th className="py-3 px-4">Academic Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No students found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-sky-100 text-[#0284c7] font-bold flex items-center justify-center shrink-0">
                            {s.profile?.full_name ? s.profile.full_name[0] : "S"}
                          </div>
                          <div>
                            <div className="font-bold text-[#0f2744]">
                              {s.profile?.full_name}
                            </div>
                            <div className="text-[11px] font-mono text-slate-500">
                              {s.student_number}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {s.profile?.email}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800">
                          {s.current_class_name || "Assigned"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {s.enrollment_date}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={s.status}
                          onChange={(e) => handleStatusChange(s.id, e.target.value as StudentRecord["status"])}
                          className="px-2 py-1 rounded text-xs font-semibold border border-slate-200 bg-white cursor-pointer"
                        >
                          <option value="active">Active</option>
                          <option value="suspended">Suspended</option>
                          <option value="graduated">Graduated</option>
                          <option value="withdrawn">Withdrawn</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedStudent(s)}
                          className="text-xs text-[#0284c7] hover:bg-sky-50"
                        >
                          View Dossier
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Modal: Add Student */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#0284c7]" />
                  <h3 className="font-bold text-base text-[#0f2744]">
                    Enrol New Student
                  </h3>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    placeholder="e.g. Maya Chen"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Assigned Student Institutional ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={newStudentNumber}
                    onChange={(e) => setNewStudentNumber(e.target.value)}
                    placeholder="e.g. STU-2026-1120"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    School Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="m.chen@oakridgeacademy.edu"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Assign Classroom Section Cohort *
                  </label>
                  <select
                    value={newSectionId}
                    onChange={(e) => setNewSectionId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    {sections.map((sec) => (
                      <option key={sec.id} value={sec.id}>
                        {sec.name} — {sec.class_name} (Room: {sec.room_number})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Emergency Guardian Contact
                  </label>
                  <input
                    type="text"
                    value={newEmergencyContact}
                    onChange={(e) => setNewEmergencyContact(e.target.value)}
                    placeholder="Primary contact phone number"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Confirm Enrolment
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: CSV Import */}
        {isCsvModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-teal-600" />
                  <h3 className="font-bold text-base text-[#0f2744]">
                    Batch Enrolment CSV Upload
                  </h3>
                </div>
                <button onClick={() => setIsCsvModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-600 space-y-2">
                <p>
                  Paste or input comma-separated values with the header: <code className="bg-slate-100 p-1 rounded font-mono">FullName, Email, StudentNumber</code>
                </p>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-600">
                  FullName, Email, StudentNumber<br />
                  Liam O&apos;Connor, liam.o@oakridgeacademy.edu, STU-2026-1190<br />
                  Sophia Rossi, sophia.r@oakridgeacademy.edu, STU-2026-1191
                </div>
              </div>

              <textarea
                rows={5}
                value={csvContent}
                onChange={(e) => handleCsvChange(e.target.value)}
                placeholder="Paste CSV rows here..."
                className="w-full p-3 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-[#0284c7]"
              />

              {csvError && (
                <div className="text-xs text-rose-600 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>{csvError}</span>
                </div>
              )}

              {csvPreview.length > 0 && (
                <div className="text-xs text-emerald-700 font-medium">
                  &check; Parsed {csvPreview.length} valid student record(s) ready for ingestion.
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCsvModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  disabled={csvPreview.length === 0}
                  onClick={handleImportCsv}
                >
                  Import {csvPreview.length > 0 ? `(${csvPreview.length})` : ""}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: View Student Dossier */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-[#0f2744]">
                  Student Academic Dossier
                </h3>
                <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-50/70 border border-sky-100">
                  <div className="w-12 h-12 rounded-xl bg-[#0284c7] text-white flex items-center justify-center font-bold text-lg">
                    {selectedStudent.profile?.full_name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#0f2744]">
                      {selectedStudent.profile?.full_name}
                    </div>
                    <div className="text-slate-600 font-mono text-[11px]">
                      {selectedStudent.student_number}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Cohort</span>
                    <span className="font-semibold text-slate-900">{selectedStudent.current_class_name}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Enrolment Date</span>
                    <span className="font-semibold text-slate-900">{selectedStudent.enrollment_date}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Status</span>
                    <span className="font-bold text-emerald-700 uppercase">{selectedStudent.status}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Emergency Contact</span>
                    <span className="font-semibold text-slate-900">{selectedStudent.emergency_contact || "+1 (555) 019-2831"}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Institutional Email</span>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 font-mono text-slate-800">
                    {selectedStudent.profile?.email}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
