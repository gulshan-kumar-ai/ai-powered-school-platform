"use client";

import React, { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { schoolStore } from "@/lib/data/school-store";
import {
  ShieldCheck,
  Search,
  Terminal,
} from "lucide-react";

export default function AdminAuditLogsPage() {
  const auditLogs = schoolStore.getAuditLogs();
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const filteredLogs = auditLogs.filter((log) => {
    const act = (log.action || "").toLowerCase();
    const user = (log.user_name || "").toLowerCase();
    const res = (log.resource || "").toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = !q || act.includes(q) || user.includes(q) || res.includes(q);
    const matchesAction = actionFilter === "all" || act.includes(actionFilter.toLowerCase());

    return matchesSearch && matchesAction;
  });

  return (
    <PortalLayout
      requiredRole="administrator"
      breadcrumbs={[
        { label: "Administration", href: "/portal/admin" },
        { label: "Security Audit Logs", href: "/portal/admin/audit-logs" },
      ]}
      title="Immutable Security & Administrative Audit Logs"
      description="Cryptographically recorded event log for grade publications, attendance edits, enrolments, and role changes."
    >
      <div className="space-y-6">
        {/* Compliance Banner */}
        <div className="p-4 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">
                Compliance Protocol: FERPA & Institutional Audit Mandate
              </div>
              <div className="text-slate-400 text-[11px]">
                All administrative mutations, enrollment records, and grade publishing events are timestamped and permanently logged.
              </div>
            </div>
          </div>
          <Badge variant="navy" size="sm" className="hidden sm:inline-flex shrink-0">
            TLS & Server Enforced
          </Badge>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit trail by actor, action, or resource..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Filter Action:</span>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full md:w-auto px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700"
            >
              <option value="all">All Operations</option>
              <option value="publish">Mark Publications</option>
              <option value="attendance">Attendance Records</option>
              <option value="enroll">Student Enrolment</option>
              <option value="assign">Faculty Assignments</option>
              <option value="broadcast">Announcements</option>
            </select>
          </div>
        </div>

        {/* Logs Table */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="py-4 px-6 border-b border-slate-100 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-slate-700" />
              <CardTitle className="text-base text-[#0f2744]">
                Event History ({filteredLogs.length})
              </CardTitle>
            </div>
            <div className="text-xs text-slate-500">
              Ordered by timestamp descending
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Authorized Actor</th>
                  <th className="py-3 px-4">Action Type</th>
                  <th className="py-3 px-4">Resource Target</th>
                  <th className="py-3 px-4">Details / Metadata</th>
                  <th className="py-3 px-4 text-right">Verification IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#0f2744]">
                      {log.user_name}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 text-slate-800 border border-slate-200">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {log.resource}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {log.details ? JSON.stringify(log.details) : "—"}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-[11px] text-slate-400">
                      {log.ip_address || "127.0.0.1"}
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
