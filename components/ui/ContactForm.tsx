"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import {
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";


interface ContactFormProps {
  initialSubject?: string;
  isAdmissionsEnquiry?: boolean;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  gradeOfInterest?: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export function ContactForm({
  initialSubject = "General Inquiry",
  isAdmissionsEnquiry = false,
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    subject: initialSubject,
    department: isAdmissionsEnquiry ? "Admissions" : "General Office",
    gradeOfInterest: "grade-6-8",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters long.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter an email address.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address (e.g., name@domain.com).";
    }

    if (formData.phone.trim() && !/^[+0-9\s\-().]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid telephone number.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message or question.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Explicit demonstration client simulation (Phase 1)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: initialSubject,
      department: isAdmissionsEnquiry ? "Admissions" : "General Office",
      gradeOfInterest: "grade-6-8",
      message: "",
    });
    setErrors({});
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
      {/* Explicit Demo Mode Indicator */}
      <div className="mb-6 rounded-xl bg-amber-50/80 border border-amber-200/80 p-3.5 flex items-start gap-3 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Demonstration Mode Active:</span> Client-side
          validation is enforced below. In Phase 1, form transmissions are verified locally
          without dispatching external emails. Phase 2 introduces backend CRM integration.
        </div>
      </div>

      {submitted ? (
        <div className="py-8 text-center space-y-4 animate-in fade-in-50 duration-200">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-bold text-[#0f2744]">
            Message Validated & Recorded (Demo)
          </h3>

          <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 text-slate-700">
            <div className="font-semibold text-slate-900 border-b pb-1">
              Submission Verification Summary:
            </div>
            <div>
              <strong>Sender:</strong> {formData.fullName} ({formData.email})
            </div>
            {formData.phone && (
              <div>
                <strong>Phone:</strong> {formData.phone}
              </div>
            )}
            <div>
              <strong>Department:</strong> {formData.department}
            </div>
            {isAdmissionsEnquiry && (
              <div>
                <strong>Grade of Interest:</strong> {formData.gradeOfInterest}
              </div>
            )}
            <div>
              <strong>Message:</strong> &ldquo;{formData.message}&rdquo;
            </div>
          </div>

          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            This entry has been validated in the browser. In production, this trigger dispatches an
            API request to the school communications endpoint.
          </p>

          <Button onClick={resetForm} variant="outline" size="sm">
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="e.g., Jonathan Campbell"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 transition-all ${
                    errors.fullName
                      ? "border-rose-400 focus-visible:ring-rose-400 bg-rose-50/20"
                      : "border-slate-300 focus-visible:ring-[#0284c7]"
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="name@example.com"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 transition-all ${
                  errors.email
                    ? "border-rose-400 focus-visible:ring-rose-400 bg-rose-50/20"
                    : "border-slate-300 focus-visible:ring-[#0284c7]"
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+1 (555) 000-0000"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 transition-all ${
                  errors.phone
                    ? "border-rose-400 focus-visible:ring-rose-400 bg-rose-50/20"
                    : "border-slate-300 focus-visible:ring-[#0284c7]"
                }`}
              />
              {errors.phone && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            {/* Department / Category */}
            <div>
              <label
                htmlFor="department"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Inquiry Topic / Recipient
              </label>
              <select
                id="department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7] transition-all cursor-pointer"
              >
                <option value="General Office">General Campus Inquiry</option>
                <option value="Admissions">Admissions & Enrollment</option>
                <option value="Academic Dean">Academic Affairs & Curriculum</option>
                <option value="Student Life">Student Life & Counseling</option>
                <option value="Athletics & Arts">Athletics & Performing Arts</option>
              </select>
            </div>
          </div>

          {/* Conditional: Grade of Interest for Admissions */}
          {isAdmissionsEnquiry && (
            <div>
              <label
                htmlFor="gradeOfInterest"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Prospective Grade Level
              </label>
              <select
                id="gradeOfInterest"
                value={formData.gradeOfInterest}
                onChange={(e) =>
                  setFormData({ ...formData, gradeOfInterest: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7] transition-all cursor-pointer"
              >
                <option value="Kindergarten – Grade 2">Primary Division (K – Grade 2)</option>
                <option value="Grade 3 – Grade 5">Intermediate Division (Grades 3 – 5)</option>
                <option value="grade-6-8">Middle School Discovery (Grades 6 – 8)</option>
                <option value="grade-9-12">Senior School & AP Track (Grades 9 – 12)</option>
              </select>
            </div>
          )}

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Your Message or Questions <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Please provide details regarding your inquiry, preferred contact times, or questions for our faculty..."
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 transition-all ${
                errors.message
                  ? "border-rose-400 focus-visible:ring-rose-400 bg-rose-50/20"
                  : "border-slate-300 focus-visible:ring-[#0284c7]"
              }`}
            />
            {errors.message && (
              <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Fields marked with <span className="text-rose-500">*</span> are mandatory.
            </span>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              rightIcon={<Send className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Validating Entry..." : "Submit Inquiry"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
