"use client";

import React, { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import { PortalAnnouncement } from "@/types/portal";
import {
  Bell,
  Plus,
  CheckCircle2,
  X,
  Send,
} from "lucide-react";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<PortalAnnouncement[]>(() =>
    schoolStore.getAnnouncements()
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState<PortalAnnouncement["priority"]>("normal");
  const [audience, setAudience] = useState<PortalAnnouncement["audience"]>("all");

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please provide both an announcement title and content body.");
      return;
    }

    const created = schoolStore.createAnnouncement({
      title,
      content,
      priority,
      audience,
      publisherName: "Dr. Evelyn Montgomery, Head of School",
    });

    setAnnouncements(schoolStore.getAnnouncements());
    setIsCreateModalOpen(false);
    setTitle("");
    setContent("");
    setSuccessMessage(`Published broadcast: "${created.title}".`);
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <PortalLayout
      requiredRole="administrator"
      breadcrumbs={[
        { label: "Administration", href: "/portal/admin" },
        { label: "Announcements", href: "/portal/admin/announcements" },
      ]}
      title="Portal Announcements & Communiqués"
      description="Publish official communications to students, parents, faculty, or the entire school body."
      actions={
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Publish Announcement
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

        <div className="space-y-4">
          {announcements.map((item) => (
            <Card key={item.id} className="bg-white border-slate-200 shadow-xs">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center font-bold shrink-0">
                      <Bell className="w-4 h-4" />
                    </span>
                    <h3 className="font-bold text-base text-[#0f2744]">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        item.priority === "urgent"
                          ? "primary"
                          : item.priority === "important"
                          ? "accent"
                          : "outline"
                      }
                      size="sm"
                    >
                      {item.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="navy" size="sm">
                      Target: {item.audience.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {item.content}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span>Authorized by: {item.publisher_name}</span>
                  <span>{new Date(item.created_at).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal: Create Announcement */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#0284c7]" />
                  <h3 className="font-bold text-base text-[#0f2744]">
                    Draft Portal Announcement
                  </h3>
                </div>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Announcement Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Schedule Changes for Next Week's Lab Sessions"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Urgency Level
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as PortalAnnouncement["priority"])}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                    >
                      <option value="normal">Normal Information</option>
                      <option value="important">Important Advisory</option>
                      <option value="urgent">Urgent Alert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Target Audience
                    </label>
                    <select
                      value={audience}
                      onChange={(e) => setAudience(e.target.value as PortalAnnouncement["audience"])}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                    >
                      <option value="all">Entire School Body (All)</option>
                      <option value="students">Students Only</option>
                      <option value="parents">Parents / Guardians</option>
                      <option value="teachers">Faculty Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Announcement Body *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Detailed explanation, dates, deadlines, and contact information..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
                    Broadcast Now
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
