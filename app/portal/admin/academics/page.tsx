"use client";

import React, { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import {
  Layers,
  Calendar,
  BookOpen,
  Plus,
  CheckCircle2,
  X,
} from "lucide-react";

export default function AdminAcademicsPage() {
  const terms = schoolStore.getTerms();
  const [classes, setClasses] = useState(() => schoolStore.getClasses());
  const [sections, setSections] = useState(() => schoolStore.getSections());
  const [subjects, setSubjects] = useState(() => schoolStore.getSubjects());

  const [activeTab, setActiveTab] = useState<"structure" | "subjects" | "terms">("structure");
  const [successMessage, setSuccessMessage] = useState("");

  // Modals state
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false);

  // New Class Form State
  const [className, setClassName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("11");
  const [sectionName, setSectionName] = useState("Section 11-A");
  const [roomNumber, setRoomNumber] = useState("Science Pavilion 301");
  const [capacity, setCapacity] = useState("24");

  // New Subject Form State
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [department, setDepartment] = useState("Science & Engineering");
  const [credits, setCredits] = useState("1.0");
  const [subjectDesc, setSubjectDesc] = useState("");

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!className.trim()) return;

    const createdClass = schoolStore.createClass({
      name: className.trim(),
      gradeLevel: Number(gradeLevel) || 10,
    });

    if (sectionName.trim()) {
      schoolStore.createSection({
        classId: createdClass.id,
        name: sectionName.trim(),
        roomNumber: roomNumber.trim(),
        capacity: Number(capacity) || 25,
      });
    }

    setClasses([...schoolStore.getClasses()]);
    setSections([...schoolStore.getSections()]);
    setIsAddClassModalOpen(false);
    setClassName("");
    setSuccessMessage(`Successfully created ${createdClass.name} with ${sectionName.trim()}.`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectCode.trim() || !subjectName.trim()) return;

    const created = schoolStore.createSubject({
      code: subjectCode.trim(),
      name: subjectName.trim(),
      department: department.trim(),
      credits: Number(credits) || 1.0,
      description: subjectDesc.trim() || undefined,
    });

    setSubjects([...schoolStore.getSubjects()]);
    setIsAddSubjectModalOpen(false);
    setSubjectCode("");
    setSubjectName("");
    setSubjectDesc("");
    setSuccessMessage(`Accredited course "${created.code} — ${created.name}" registered successfully.`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <PortalLayout
      requiredRole="administrator"
      breadcrumbs={[
        { label: "Administration", href: "/portal/admin" },
        { label: "Academic Structure", href: "/portal/admin/academics" },
      ]}
      title="Academic Architecture & Curriculum Structure"
      description="Define academic years, terms, grade-level classes, section cohorts, and curricular subjects."
      actions={
        <div className="flex items-center gap-2">
          {activeTab === "structure" && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddClassModalOpen(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Class Cohort
            </Button>
          )}
          {activeTab === "subjects" && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddSubjectModalOpen(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Course Subject
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Success Alert */}
        {successMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in-50">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2">
          <button
            onClick={() => setActiveTab("structure")}
            className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "structure"
                ? "border-[#0284c7] text-[#0284c7]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Classes & Section Cohorts ({sections.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("subjects")}
            className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "subjects"
                ? "border-[#0284c7] text-[#0284c7]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Curricular Subjects ({subjects.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "terms"
                ? "border-[#0284c7] text-[#0284c7]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Academic Terms & Sessions</span>
          </button>
        </div>

        {/* Tab 1: Structure */}
        {activeTab === "structure" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classes.map((cls) => {
              const classSections = sections.filter((s) => s.class_id === cls.id);
              return (
                <Card key={cls.id} className="bg-white border-slate-200">
                  <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">
                        Grade Level {cls.grade_level}
                      </div>
                      <CardTitle className="text-base text-[#0f2744]">
                        {cls.name}
                      </CardTitle>
                    </div>
                    <Badge variant="navy" size="sm">
                      {classSections.length} Sections
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    {classSections.map((sec) => {
                      const studentCount = schoolStore.getSectionStudents(sec.id).length;
                      return (
                        <div
                          key={sec.id}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                        >
                          <div className="space-y-0.5">
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{sec.name}</span>
                              <span className="text-[10px] text-slate-400 font-normal">
                                • Room {sec.room_number}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-2">
                              <span>Capacity: {sec.capacity} seats</span>
                              <span>•</span>
                              <span className="font-semibold text-teal-700">
                                {studentCount} Enrolled
                              </span>
                            </div>
                          </div>
                          <Badge variant="accent" size="sm">
                            Active
                          </Badge>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Tab 2: Subjects */}
        {activeTab === "subjects" && (
          <Card className="bg-white border-slate-200">
            <CardHeader className="py-4 px-6 border-b border-slate-100">
              <CardTitle className="text-base text-[#0f2744]">
                Accredited Course Catalog
              </CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Course Code & Title</th>
                    <th className="py-3 px-4">Academic Department</th>
                    <th className="py-3 px-4">Credits</th>
                    <th className="py-3 px-4">Curricular Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subjects.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0f2744]">
                          {sub.code} — {sub.name}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 font-medium">
                          {sub.department}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {sub.credits} Units
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {sub.description || "Core secondary college preparatory syllabus."}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Tab 3: Terms */}
        {activeTab === "terms" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {terms.map((term) => (
                <Card key={term.id} className="bg-white border-slate-200">
                  <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
                    <CardTitle className="text-base text-[#0f2744]">
                      {term.name}
                    </CardTitle>
                    {term.is_current ? (
                      <Badge variant="navy" size="sm">
                        Current Term
                      </Badge>
                    ) : (
                      <Badge variant="outline" size="sm">
                        Upcoming
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="p-4 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Instruction Start Date:</span>
                      <span className="font-semibold text-slate-800">{term.start_date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Term Conclusion Date:</span>
                      <span className="font-semibold text-slate-800">{term.end_date}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-slate-500">Academic Year:</span>
                      <span className="font-semibold text-slate-800">2026–2027</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add Class Cohort */}
      {isAddClassModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-[#0f2744]">Add New Academic Class & Section</h2>
              <button
                onClick={() => setIsAddClassModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Class Name (e.g. Grade 11 Advanced Honors)
                </label>
                <input
                  type="text"
                  required
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Grade 11 Advanced Honors"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grade Level</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Initial Section Name</label>
                  <input
                    type="text"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    placeholder="Section 11-A"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Room Assignment</label>
                  <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Seat Capacity</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddClassModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Create Class Cohort
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Subject */}
      {isAddSubjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-[#0f2744]">Accredit New Subject Course</h2>
              <button
                onClick={() => setIsAddSubjectModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubject} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Course Code (e.g. AP-CHEM-1)
                  </label>
                  <input
                    type="text"
                    required
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                    placeholder="AP-CHEM-1"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 uppercase focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Credits / Units</label>
                  <input
                    type="number"
                    step="0.5"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Course Title (e.g. AP Chemistry: Thermodynamics & Kinetics)
                </label>
                <input
                  type="text"
                  required
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="AP Chemistry: Molecular Structure"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Science & Engineering">Science & Engineering</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Humanities">Humanities</option>
                  <option value="STEM & Technology">STEM & Technology</option>
                  <option value="Arts & Languages">Arts & Languages</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Curriculum Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={subjectDesc}
                  onChange={(e) => setSubjectDesc(e.target.value)}
                  placeholder="College preparatory laboratory curriculum covering chemical equilibria..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddSubjectModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Register Subject
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
