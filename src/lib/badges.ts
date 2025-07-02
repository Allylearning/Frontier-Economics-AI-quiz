import type { Badge, BadgeIconName } from '@/types';

export const badgeDefinitions: Badge[] = [
  {
    id: 'policy-foundations',
    name: 'Policy Foundations Expert',
    description: 'Demonstrated understanding of the core purpose of the AI policy.',
    icon: 'Award' as BadgeIconName,
    questionIds: ['q1'],
  },
  {
    id: 'data-security-steward',
    name: 'Data Security Steward',
    description: 'Knows how to handle sensitive company data with AI tools.',
    icon: 'ShieldCheck' as BadgeIconName,
    questionIds: ['q2', 'q4'],
  },
  {
    id: 'ethical-ai-advocate',
    name: 'Ethical AI Advocate',
    description: 'Understands the importance of reporting bias and ethical AI use.',
    icon: 'Scale' as BadgeIconName,
    questionIds: ['q3', 'q8', 'q10'],
  },
  {
    id: 'ip-guardian',
    name: 'IP Guardian',
    description: 'Recognizes the importance of intellectual property in AI-generated content.',
    icon: 'Copyright' as BadgeIconName,
    questionIds: ['q6'],
  },
  {
    id: 'ai-tool-sme',
    name: 'AI Tool SME',
    description: 'Proficient in AI tool usage, verification, and company processes.',
    icon: 'Settings2' as BadgeIconName,
    questionIds: ['q5', 'q7', 'q9', 'q11', 'q12', 'q13'],
  },
];
