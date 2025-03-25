import {
  ShieldCheck,
  FileText,
  UserCheck,
  Search,
  UserPlus,
  BarChart2,
  FileSignature,
  ClipboardList,
  GraduationCap,
  FileSearch,
  MessageSquare,
  Briefcase,
} from "lucide-react";

export const iconMap = {
  "AML Compliance Advisor": ShieldCheck,
  "AML/CFT Policy/Procedures": FileText,
  "MLRO Services": UserCheck,
  "Sanction Screening Tool": Search,
  "KYC Review and Verification": UserPlus,
  "Risk Assessment": BarChart2,
  "Assistance in Mandatory Registration (GOAML)": FileSignature,
  "Periodic Inspection Assistance": ClipboardList,
  "AML Training": GraduationCap,
  "AML Independent Review": FileSearch,
  "Grievance Filing": MessageSquare,
  "Guidance on Management Work": Briefcase,
};
export const services = [
  {
    title: "AML Compliance Advisor",
    items: [
      "Tailored services based on your requirements.",
      "Contract for annually/Quarterly/monthly.",
    ],
  },
  {
    title: "AML/CFT Policy/Procedures",
    items: [
      "Custom made AML manuals and policies opt for your business and in accordance with regulator's guidance.",
      "Regular update of policies based on the update from the MOE, UAE/FATF/CPI/BI.",
    ],
  },
  {
    title: "MLRO Services",
    items: ["End to end compliance services"],
  },
  {
    title: "Sanction Screening Tool",
    items: [
      "Screening against 100+ sanctions including UAE, UN list.",
      "PEP check",
      "Adverse media check",
    ],
  },
  {
    title: "KYC Review and Verification",
    items: [
      "Client on boarding form",
      "KYC documents verification",
      "GOAML reporting (DPMSR/SAR/STR etc)",
    ],
  },
  {
    title: "Risk Assessment",
    items: [
      "Enterprise-wide risk assessment",
      "Clients/Suppliers Risk assessment",
    ],
  },
  {
    title: "Assistance in Mandatory Registration (GOAML)",
    items: ["GOAML registration", "EOCN subscription"],
  },
  {
    title: "Periodic Inspection Assistance",
    items: ["RAP, Onsite inspection report, Compliance meeting."],
  },
  {
    title: "AML Training",
    items: [
      "Training to MLRO/Senior management",
      "Training to first/second line defence staffs",
    ],
  },
  {
    title: "AML Independent Review",
    items: ["Annual AML review GAP analysis"],
  },
  {
    title: "Grievance Filing",
    items: ["Assistance in grievance filing"],
  },
  {
    title: "Guidance on Management Work",
    items: [
      "Assistance in Survey/Registration work",
      "Other management works.",
    ],
  },
];
