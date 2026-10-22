/**
 * Phase 4 AI Cybersecurity Awareness & Suspicious Message Analyzer
 * Evaluates emails, SMS, and chat messages for security threats, phishing indicators,
 * credential harvesting, and social engineering patterns.
 *
 * Core Ethical & Security Principles:
 * 1. Suspicious does not necessarily mean fraudulent.
 * 2. A message without flagged indicators is NOT guaranteed to be safe.
 * 3. Never auto-open or resolve external links.
 * 4. Synthetic educational presets provided for classroom demonstrations.
 */

import { CyberAnalysisResult, CyberRiskIndicator } from "@/types/portal";

interface RulePattern {
  type: CyberRiskIndicator["type"];
  label: string;
  pattern: RegExp;
  severity: "high" | "medium" | "low";
  baseScore: number;
  explanation: string;
  safeAction: string;
}

const CYBER_DETECTION_RULES: RulePattern[] = [
  // 1. Urgency / Coercion Pressure
  {
    type: "urgency_pressure",
    label: "Artificial Urgency & Coercive Deadline",
    pattern:
      /(immediate(ly)?|within 24 hours|within 1 hour|act now|account will be (suspended|terminated|deleted|locked)|urgent action required|final notice|immediate response)/i,
    severity: "high",
    baseScore: 28,
    explanation:
      "Adversaries employ artificial panic and impending penalties to circumvent rational deliberation and pressure victims into hasty actions.",
    safeAction:
      "Pause. Legitimate institutions rarely impose instant account deletion without formal prior warnings.",
  },

  // 2. Credential Harvesting & Sensitive Info Requests
  {
    type: "credential_harvesting",
    label: "Credential Harvesting or Secret Solicitation",
    pattern:
      /(enter your password|confirm your login|verify your credentials|send your pin|ssn|social security|verification code|reset your password here|fill out this form with your credentials)/i,
    severity: "high",
    baseScore: 35,
    explanation:
      "Direct requests to reveal login passwords, two-factor codes, or personal identifiers are primary indicators of credential theft.",
    safeAction:
      "Never disclose passwords or 2FA codes. School IT administration will never ask for your plain-text password via email or message.",
  },

  // 3. Unexpected Financial & Payment Demands
  {
    type: "financial_demand",
    label: "Unverified Financial Demand or Wire Request",
    pattern:
      /(wire transfer|gift card|crypto(currency)?|bitcoin|overdue invoice|pay immediately|unpaid tuition fee|apple pay card|steam card)/i,
    severity: "high",
    baseScore: 32,
    explanation:
      "Demands for non-standard payment channels (gift cards, cryptocurrency, or sudden wire transfers) are common extortion techniques.",
    safeAction:
      "Verify tuition or fee status directly with the School Administration Office using published telephone numbers.",
  },

  // 4. Authority Impersonation
  {
    type: "authority_impersonation",
    label: "Authority or Executive Impersonation",
    pattern:
      /(from the principal|office of the headmaster|it department security desk|dean of academics|superintendent office|fbi|irs|official notice)/i,
    severity: "medium",
    baseScore: 20,
    explanation:
      "Attackers frequently disguise their communications using leadership names or administrative departments to compel compliance.",
    safeAction:
      "Check the sender's full email domain. Contact the named official through official internal directory channels.",
  },

  // 5. Suspicious Link Patterns
  {
    type: "suspicious_link",
    label: "Suspicious or Obfuscated Hyperlink",
    pattern:
      /(https?:\/\/[^\s]+(bit\.ly|tinyurl|is\.gd|t\.co|xyz|top|loan|click|buzz|tk|ml|ga|cf|gq)[^\s]*|https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/i,
    severity: "high",
    baseScore: 25,
    explanation:
      "Shortened URLs, raw IP addresses, or non-standard top-level domains disguise the true destination server.",
    safeAction:
      "Do NOT click the link. Hover to inspect the actual destination URL without opening it, or navigate manually to the portal.",
  },

  // 6. Too Good to Be True Offers
  {
    type: "too_good_to_be_true",
    label: "Unsolicited Prize, Grant, or Scholarship Offer",
    pattern:
      /(you have won|congratulations! you are selected|free macbook|unclaimed scholarship funds|100% full grant guaranteed|instant cash reward)/i,
    severity: "medium",
    baseScore: 22,
    explanation:
      "Offers of unexpected prizes, free electronics, or unapplied-for grants are lures designed to collect identity details or malware downloads.",
    safeAction:
      "Ask yourself if you applied for this opportunity. Genuine academic grants require formal verification and written institutional letters.",
  },
];

/**
 * Synthetic demonstration messages for classroom testing and student safety education
 */
export const SYNTHETIC_CYBER_EXAMPLES = [
  {
    id: "sample-phish-urgent",
    title: "Urgent IT Portal Account Suspension (High Risk)",
    sender: "School Administration Helpdesk <support-portal-alert@school-verify.xyz>",
    content:
      "FINAL NOTICE: Your student portal credentials have expired. You must immediately verify your login and enter your password at http://school-verify.xyz/login within 1 hour or your academic files and exam submissions will be permanently deleted. Act now!",
  },
  {
    id: "sample-scholarship-lure",
    title: "Unsolicited International Scholarship (Medium Risk)",
    sender: "Global Merit Foundation <awards@internationalscholarship-fund.click>",
    content:
      "Congratulations! You have won an unclaimed $15,000 Global STEM Fellowship. Claim your cash reward immediately by replying with your Social Security number and purchasing a $50 administrative processing gift card.",
  },
  {
    id: "sample-legit-announcement",
    title: "Legitimate School Library Announcement (Low Concern)",
    sender: "School Library Services <library@qazisultanboys.edu.pk>",
    content:
      "Hello Scholars, Please be reminded that the digital library has updated its catalog with new AP Physics and Calculus study materials. You may review these resources by visiting your student dashboard at your convenience. Have a great term!",
  },
];

/**
 * Analyzes arbitrary message text and calculates an explainable cybersecurity risk assessment
 */
export function analyzeSuspiciousMessage(messageText: string): CyberAnalysisResult {
  const trimmed = messageText.trim();
  if (!trimmed) {
    return {
      id: `cyber-${Date.now()}`,
      risk_level: "low_concern",
      risk_score: 0,
      summary: "No content provided for inspection.",
      indicators: [],
      safe_recommendations: [
        "Paste the full text or email headers of a message you wish to inspect.",
      ],
      official_verification_tip:
        "Always confirm message legitimacy via verified official school channels.",
      analyzed_at: new Date().toISOString(),
    };
  }

  const detectedIndicators: CyberRiskIndicator[] = [];
  let accumulatedScore = 0;

  for (const rule of CYBER_DETECTION_RULES) {
    const match = trimmed.match(rule.pattern);
    if (match) {
      detectedIndicators.push({
        type: rule.type,
        label: rule.label,
        detected_text: match[0],
        severity: rule.severity,
        explanation: rule.explanation,
        safe_action: rule.safeAction,
      });
      accumulatedScore += rule.baseScore;
    }
  }

  // Multiplier for compound psychological pressure
  if (detectedIndicators.length >= 3) {
    accumulatedScore = Math.round(accumulatedScore * 1.25);
  }

  // Cap score between 0 and 100
  const finalScore = Math.min(Math.max(accumulatedScore, 0), 100);

  let riskLevel: CyberAnalysisResult["risk_level"] = "low_concern";
  if (finalScore >= 60) {
    riskLevel = "high_risk_alert";
  } else if (finalScore >= 25) {
    riskLevel = "medium_concern";
  }

  // Synthesize contextual summary
  let summary = "";
  if (riskLevel === "high_risk_alert") {
    summary = `CRITICAL ALERT: This message exhibits ${detectedIndicators.length} severe social engineering traits (score ${finalScore}/100), including pressure tactics or solicitations for private credentials. There is a strong likelihood of phishing or fraud.`;
  } else if (riskLevel === "medium_concern") {
    summary = `CAUTION ADVISED: This communication contains ${detectedIndicators.length} cautionary patterns (score ${finalScore}/100). Exercise restraint before responding, clicking links, or sharing information.`;
  } else {
    summary = `LOW DETECTED CONCERN: No prominent deception triggers were identified in the text (score ${finalScore}/100). Remember: The absence of obvious warnings does not guarantee absolute safety. Always verify sender email domains.`;
  }

  const safeRecommendations: string[] = [
    "Never click links or open attachments originating from unverified external senders.",
    "Inspect the actual sender address header rather than the display name.",
    "Do not provide passwords, OTPs, or payment information under any circumstances.",
    "If in doubt, forward the suspicious message directly to info@qazisultanboys.edu.pk or consult the School Administration.",
  ];

  return {
    id: `cyber-${Date.now()}`,
    risk_level: riskLevel,
    risk_score: finalScore,
    summary,
    indicators: detectedIndicators,
    safe_recommendations: safeRecommendations,
    official_verification_tip:
      "Important Reminder: Legitimate Govt. Boys Qazi Sultan Higher Secondary School administrators will always communicate through official school channels and will never demand immediate gift card or cryptocurrency payments.",
    analyzed_at: new Date().toISOString(),
  };
}
