"use client";

import React, { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import {
  Lock,
  CheckCircle2,
  Save,
} from "lucide-react";

export default function StudentProfilePage() {
  const studentId = "20000000-0000-0000-0000-000000000001"; // Alex Vance
  const student = schoolStore.getStudentById(studentId);

  // Editable fields
  const [preferredName, setPreferredName] = useState("Alex");
  const [emergencyContact, setEmergencyContact] = useState(
    student?.emergency_contact || "+1 (555) 019-2831"
  );
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSaveApprovedFields = (e: React.FormEvent) => {
    e.preventDefault();
    schoolStore.updateStudentEmergencyContact(studentId, emergencyContact);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 4000);
  };

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "Profile", href: "/portal/student/profile" },
      ]}
      title="Scholar Profile & Demographic Records"
      description="View institutional enrolment attributes and update approved personal contact parameters."
    >
      <div className="space-y-6 max-w-4xl">
        {savedFeedback && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile contact updates recorded successfully.</span>
          </div>
        )}

        {/* Protected Academic Notice */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
          <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-slate-900">
              Institutional Security Protection Notice
            </div>
            <p className="leading-relaxed">
              Official student identifiers, cohort enrollments, attendance ledgers, examination marks, and account roles are strictly managed by school registrars and cannot be modified by student accounts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Identity Card */}
          <Card className="bg-white border-slate-200 text-center p-6 space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-[#0f2744] text-sky-300 font-extrabold text-2xl flex items-center justify-center mx-auto shadow-sm">
              AV
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-[#0f2744]">
                {student?.profile?.full_name}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {student?.student_number}
              </p>
              <Badge variant="navy" size="sm" className="mt-2">
                Grade 10 Senior Preparatory
              </Badge>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-left space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Enrolment Date:</span>
                <span className="font-semibold text-slate-800">{student?.enrollment_date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Academic Standing:</span>
                <span className="font-bold text-emerald-700 uppercase">{student?.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Roll Position:</span>
                <span className="font-semibold text-slate-800">#{student?.roll_number}</span>
              </div>
            </div>
          </Card>

          {/* Configuration Form */}
          <Card className="md:col-span-2 bg-white border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base text-[#0f2744]">
                Student Record Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSaveApprovedFields} className="space-y-4 text-xs">
                {/* Non-editable locked fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-500 mb-1 flex items-center justify-between">
                      <span>Legal Name</span>
                      <Lock className="w-3 h-3 text-slate-400" />
                    </label>
                    <input
                      type="text"
                      disabled
                      value={student?.profile?.full_name || ""}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-xs cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-500 mb-1 flex items-center justify-between">
                      <span>Institutional Email</span>
                      <Lock className="w-3 h-3 text-slate-400" />
                    </label>
                    <input
                      type="email"
                      disabled
                      value={student?.profile?.email || ""}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-xs cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-500 mb-1 flex items-center justify-between">
                      <span>Cohort Section</span>
                      <Lock className="w-3 h-3 text-slate-400" />
                    </label>
                    <input
                      type="text"
                      disabled
                      value={student?.current_class_name || ""}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-xs cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-500 mb-1 flex items-center justify-between">
                      <span>Account Role</span>
                      <Lock className="w-3 h-3 text-slate-400" />
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Student (Learner Clearance)"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-xs cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Editable approved fields */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Approved Editable Preferences</span>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Preferred Greeting Name
                    </label>
                    <input
                      type="text"
                      value={preferredName}
                      onChange={(e) => setPreferredName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-[#0284c7]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Emergency Guardian Contact Phone
                    </label>
                    <input
                      type="text"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-[#0284c7]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <Button type="submit" variant="primary" size="sm" leftIcon={<Save className="w-3.5 h-3.5" />}>
                    Save Approved Preferences
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}
