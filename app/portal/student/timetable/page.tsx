"use client";

import React, { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { schoolStore } from "@/lib/data/school-store";
import { Clock, MapPin, User } from "lucide-react";

export default function StudentTimetablePage() {
  const sectionId = "e0000000-0000-0000-0000-000000000001"; // Section 10-A
  const timetable = schoolStore.getStudentTimetable(sectionId);
  const [selectedDay, setSelectedDay] = useState<string>("All");

  const days = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const filteredSlots = selectedDay === "All"
    ? timetable
    : timetable.filter((s) => s.day_of_week === selectedDay);

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "Class Timetable", href: "/portal/student/timetable" },
      ]}
      title="Classroom Timetable & Schedule"
      description="Official period schedule and room assignments for Section 10-A (Grade 10 Senior Preparatory)."
    >
      <div className="space-y-6">
        {/* Day Filter Tabs */}
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

        {/* Schedule List */}
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
                    <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] border border-sky-100 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold uppercase text-sky-600">Period</span>
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
                    <Clock className="w-3.5 h-3.5 text-[#0284c7]" />
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
