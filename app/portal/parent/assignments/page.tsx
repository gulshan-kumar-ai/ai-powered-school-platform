"use client";

import React, { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { schoolStore } from "@/lib/data/school-store";
import {
  Clock,
  Award,
  Info,
  ShieldCheck,
} from "lucide-react";

export default function ParentAssignmentsPage() {
  const parentId = "30000000-0000-0000-0000-000000000001";
  const linkedChildren = schoolStore.getParentLinkedChildren(parentId);

  const [selectedChildId, setSelectedChildId] = useState(
    linkedChildren[0]?.id || "20000000-0000-0000-0000-000000000001"
  );

  const activeChild = linkedChildren.find((c) => c.id === selectedChildId) || linkedChildren[0];
  const sectionId = activeChild?.current_section_id || "e0000000-0000-0000-0000-000000000001";
  const assignments = schoolStore.getAssignments({ sectionId, isPublishedOnly: true });

  const today = new Date().toISOString().split("T")[0];

  return (
    <PortalLayout
      requiredRole="parent"
      breadcrumbs={[
        { label: "Parent Oversight Portal", href: "/portal/parent" },
        { label: "Assignments Status", href: "/portal/parent/assignments" },
      ]}
      title="Child Coursework & Deadline Monitor"
      description="Track assigned curriculum tasks, homework deadlines, and classroom submission expectations."
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
                  {c.profile?.full_name} ({c.student_number}) — {c.current_class_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authorized Family Oversight</span>
          </div>
        </div>

        {/* Phase 3 Notice Banner */}
        <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-amber-900">
              Phase 2 Notice: Coursework Submission Workflow
            </div>
            <p className="leading-relaxed text-amber-900/90">
              Students turn in coursework physically to class instructors during scheduled periods. Interactive parent submission receipts and digital file portfolios will launch in <strong>Phase 3 (Digital Learning & Submissions)</strong>.
            </p>
          </div>
        </div>

        {/* Assignments Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.length === 0 ? (
            <div className="col-span-2 p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 text-xs">
              No active assignments currently assigned for your ward&apos;s class.
            </div>
          ) : (
            assignments.map((item) => {
              const isOverdue = item.due_date < today;

              return (
                <Card key={item.id} className="bg-white border-slate-200 flex flex-col justify-between">
                  <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="navy" size="sm">
                          {item.subject_name}
                        </Badge>
                        <Badge variant="outline" size="sm">
                          {item.section_name}
                        </Badge>
                      </div>
                      <CardTitle className="text-base text-[#0f2744]">
                        {item.title}
                      </CardTitle>
                    </div>

                    {isOverdue ? (
                      <Badge variant="primary" size="sm" className="bg-rose-600 text-white">
                        Past Deadline
                      </Badge>
                    ) : (
                      <Badge variant="accent" size="sm">
                        Pending
                      </Badge>
                    )}
                  </CardHeader>

                  <CardContent className="p-5 flex-1 space-y-4">
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Clock className={`w-3.5 h-3.5 ${isOverdue ? "text-rose-600" : "text-slate-400"}`} />
                        <span>Deadline: <strong className={isOverdue ? "text-rose-700" : "text-slate-900"}>{item.due_date}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span>Max Score: <strong>{item.max_marks} pts</strong></span>
                      </div>
                    </div>
                  </CardContent>

                  <div className="p-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Instructor: {item.teacher_name}</span>
                    <span className="font-semibold text-slate-700">Classroom In-Person Delivery</span>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
