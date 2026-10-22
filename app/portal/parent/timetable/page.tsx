"use client";

import React, { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { schoolStore } from "@/lib/data/school-store";
import { Clock, MapPin, User, ShieldCheck } from "lucide-react";

export default function ParentTimetablePage() {
  const parentId = "30000000-0000-0000-0000-000000000001";
  const linkedChildren = schoolStore.getParentLinkedChildren(parentId);

  const [selectedChildId, setSelectedChildId] = useState(
    linkedChildren[0]?.id || "20000000-0000-0000-0000-000000000001"
  );
  const [selectedDay, setSelectedDay] = useState<string>("All");

  const activeChild = linkedChildren.find((c) => c.id === selectedChildId) || linkedChildren[0];
  const sectionId = activeChild?.current_section_id || "e0000000-0000-0000-0000-000000000001";
  const timetable = schoolStore.getStudentTimetable(sectionId);

  const days = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const filteredSlots = selectedDay === "All"
    ? timetable
    : timetable.filter((s) => s.day_of_week === selectedDay);

  return (
    <PortalLayout
      requiredRole="parent"
      breadcrumbs={[
        { label: "Parent Oversight Portal", href: "/portal/parent" },
        { label: "Class Timetable", href: "/portal/parent/timetable" },
      ]}
      title="Child Classroom Timetable"
      description="View weekly class hours, subject periods, classroom locations, and instructors."
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
            <span>Authorized Family Access Only</span>
          </div>
        </div>

        {/* Day Filters */}
        <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-1">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-t-lg text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                selectedDay === day
                  ? "border-[#0284c7] text-[#0284c7] bg-sky-50/50"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule */}
        <div className="space-y-3">
          {filteredSlots.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200 text-xs">
              No classes scheduled for {selectedDay}.
            </div>
          ) : (
            filteredSlots.map((slot) => (
              <Card key={slot.id} className="bg-white border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold uppercase text-indigo-500">Period</span>
                      <span className="text-base font-extrabold text-[#0f2744]">
                        {slot.period_number}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="navy" size="sm">
                          {slot.day_of_week}
                        </Badge>
                        <h3 className="font-bold text-base text-[#0f2744]">
                          {slot.subject_name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{slot.teacher_name}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>Room: <strong>{slot.room_number}</strong></span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80 self-start sm:self-center">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{slot.start_time} - {slot.end_time}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
