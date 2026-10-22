"use client";

import React, { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import { TeacherRecord, TeacherAssignment } from "@/types/portal";
import {
  UserCheck,
  Search,
  Plus,
  BookOpen,
  Briefcase,
  CheckCircle2,
  X,
} from "lucide-react";

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<TeacherRecord[]>(() => schoolStore.getTeachers());
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(() =>
    schoolStore.getTeacherAssignments()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTeacherForAssign, setSelectedTeacherForAssign] = useState<TeacherRecord | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  // New Teacher Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [qualification, setQualification] = useState("Ph.D. / M.Ed.");
  const [specialization, setSpecialization] = useState("");
  const [department, setDepartment] = useState("Sciences");

  // Assignment Modal State
  const [selectedSectionId, setSelectedSectionId] = useState("e0000000-0000-0000-0000-000000000001");
  const [selectedSubjectId, setSelectedSubjectId] = useState("c0000000-0000-0000-0000-000000000001");

  const sections = schoolStore.getSections();
  const subjects = schoolStore.getSubjects();

  const filteredTeachers = teachers.filter((t) => {
    const name = t.profile?.full_name?.toLowerCase() || "";
    const emp = t.employee_number.toLowerCase();
    const dept = t.department.toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = !q || name.includes(q) || emp.includes(q);
    const matchesDept = departmentFilter === "all" || dept === departmentFilter.toLowerCase();
    return matchesSearch && matchesDept;
  });

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !employeeNumber) {
      alert("Please fill in all required teacher details.");
      return;
    }

    const created = schoolStore.addTeacher({
      fullName,
      email,
      employeeNumber,
      qualification,
      specialization,
      department,
    });

    setTeachers(schoolStore.getTeachers());
    setIsAddModalOpen(false);
    setFullName("");
    setEmail("");
    setEmployeeNumber("");
    setSpecialization("");

    setSuccessMessage(`Registered faculty member ${created.profile?.full_name} (${created.employee_number}).`);
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleAssignTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacherForAssign) return;

    schoolStore.assignTeacherToClass({
      teacherId: selectedTeacherForAssign.id,
      sectionId: selectedSectionId,
      subjectId: selectedSubjectId,
    });

    setAssignments(schoolStore.getTeacherAssignments());
    setIsAssignModalOpen(false);
    setSuccessMessage(`Assigned ${selectedTeacherForAssign.profile?.full_name} to course.`);
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <PortalLayout
      requiredRole="administrator"
      breadcrumbs={[
        { label: "Administration", href: "/portal/admin" },
        { label: "Faculty & Staff", href: "/portal/admin/teachers" },
      ]}
      title="Faculty Directory & Instructional Assignments"
      description="Register faculty, configure subject appointments, and assign instructional cohorts."
      actions={
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Add Faculty Member
        </Button>
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
              placeholder="Search faculty name or employee number..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Department:</span>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full md:w-auto px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700"
            >
              <option value="all">All Departments</option>
              <option value="sciences">Sciences & Technology</option>
              <option value="mathematics">Mathematics</option>
              <option value="humanities">Humanities & Languages</option>
              <option value="arts">Arts & Physical Ed</option>
            </select>
          </div>
        </div>

        {/* Faculty Table */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="py-4 px-6 border-b border-slate-100 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-teal-600" />
              <CardTitle className="text-base text-[#0f2744]">
                Appointed Faculty ({filteredTeachers.length})
              </CardTitle>
            </div>
            <div className="text-xs text-slate-500">
              Active Institutional Roster
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Faculty Member</th>
                  <th className="py-3 px-4">Staff Email</th>
                  <th className="py-3 px-4">Department & Specialization</th>
                  <th className="py-3 px-4">Teaching Assignments</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTeachers.map((teacher) => {
                  const teacherAssignments = assignments.filter((a) => a.teacher_id === teacher.id);

                  return (
                    <tr key={teacher.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center shrink-0">
                            {teacher.profile?.full_name ? teacher.profile.full_name[0] : "T"}
                          </div>
                          <div>
                            <div className="font-bold text-[#0f2744]">
                              {teacher.profile?.full_name}
                            </div>
                            <div className="text-[11px] font-mono text-slate-500">
                              {teacher.employee_number} • {teacher.qualification}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {teacher.profile?.email}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">
                          {teacher.department}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {teacher.specialization}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {teacherAssignments.length === 0 ? (
                          <span className="text-slate-400 italic">No assigned classes</span>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {teacherAssignments.map((a) => (
                              <Badge key={a.id} variant="accent" size="sm">
                                {a.subject_code} ({a.section_name})
                              </Badge>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedTeacherForAssign(teacher);
                            setIsAssignModalOpen(true);
                          }}
                          className="text-xs text-[#0284c7] hover:bg-sky-50"
                        >
                          Assign Class
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Modal: Add Faculty Member */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                  <h3 className="font-bold text-base text-[#0f2744]">
                    Add Faculty Member
                  </h3>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateTeacher} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Name & Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Jennifer Lawrence"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Faculty Institutional Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="j.lawrence@oakridgeacademy.edu"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Staff ID Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={employeeNumber}
                      onChange={(e) => setEmployeeNumber(e.target.value)}
                      placeholder="FAC-2026-042"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Department
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                    >
                      <option value="Sciences">Sciences</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Humanities">Humanities</option>
                      <option value="Arts">Arts</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Academic Qualification
                    </label>
                    <input
                      type="text"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      placeholder="e.g. Ph.D. / M.Ed."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Academic Specialization
                    </label>
                    <input
                      type="text"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      placeholder="e.g. Organic Chemistry"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
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
                    Register Faculty
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Assign Class to Teacher */}
        {isAssignModalOpen && selectedTeacherForAssign && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#0284c7]" />
                  <h3 className="font-bold text-base text-[#0f2744]">
                    Assign Instructional Course
                  </h3>
                </div>
                <button onClick={() => setIsAssignModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="text-slate-500">Instructor:</div>
                <div className="font-bold text-[#0f2744] text-sm">
                  {selectedTeacherForAssign.profile?.full_name}
                </div>
                <div className="text-slate-500 text-[11px]">
                  {selectedTeacherForAssign.employee_number} • {selectedTeacherForAssign.department}
                </div>
              </div>

              <form onSubmit={handleAssignTeacher} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Select Section Cohort *
                  </label>
                  <select
                    value={selectedSectionId}
                    onChange={(e) => setSelectedSectionId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    {sections.map((sec) => (
                      <option key={sec.id} value={sec.id}>
                        {sec.name} ({sec.class_name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Select Subject / Course *
                  </label>
                  <select
                    value={selectedSubjectId}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    {subjects.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.code} — {sub.name} ({sub.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAssignModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Confirm Assignment
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
