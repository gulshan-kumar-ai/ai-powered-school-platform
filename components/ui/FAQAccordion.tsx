"use client";

import React, { useState } from "react";
import { FAQItem } from "@/types";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenId?: string;
  allowCategoryFilter?: boolean;
}

export function FAQAccordion({
  items,
  defaultOpenId,
  allowCategoryFilter = true,
}: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || items[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "admissions", label: "Admissions & Entry" },
    { id: "academics", label: "Curriculum & AP" },
    { id: "tuition", label: "Tuition & Financial Aid" },
    { id: "campus-life", label: "Campus Life & Well-Being" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {allowCategoryFilter && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                activeCategory === cat.id
                  ? "bg-[#0f2744] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={cn(
                "border rounded-xl transition-all duration-200 overflow-hidden bg-white",
                isOpen
                  ? "border-[#0284c7]/60 shadow-sm ring-1 ring-[#0284c7]/20"
                  : "border-slate-200/90 hover:border-slate-300"
              )}
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs transition-colors",
                      isOpen
                        ? "bg-sky-50 text-[#0284c7]"
                        : "bg-slate-100 text-slate-500"
                    )}
                  >
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm sm:text-base text-[#0f2744]">
                    {item.question}
                  </span>
                </div>

                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200",
                    isOpen && "transform rotate-180 text-[#0284c7]"
                  )}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${item.id}`}
                  className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in-50 duration-200"
                >
                  <p className="pl-10">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            No questions found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
