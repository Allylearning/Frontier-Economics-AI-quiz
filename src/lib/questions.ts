
import type { QuizQuestion } from '@/types';

export const questionPool: QuizQuestion[] = [
  {
    id: 'q1',
    text: '{{playerName}}, what is the primary purpose of our AI policy?',
    questionType: 'multiple-choice',
    options: [
      'To maximise profits using AI.',
      'To ensure responsible and ethical use of AI tools within our company.',
      'To replace human employees with AI.',
      'To collect user data for AI training.'
    ],
    correctAnswer: 'To ensure responsible and ethical use of AI tools within our company.',
    approvedAnswers: ['To ensure responsible and ethical use of AI tools within our company.'],
    detailedFeedback: 'Our AI policy prioritises ethical considerations, safety, and compliance in all AI applications, guiding employees to use AI tools in a way that aligns with our company values and legal obligations.',
    voiceoverUrl: '/audio/1.mp3',
  },
  {
    id: 'q2',
    text: 'Can you use unapproved third-party AI tools for work tasks involving sensitive company data?',
    questionType: 'multiple-choice',
    options: [
      'Yes, if it helps get the job done faster.',
      'Yes, but only if you don\'t tell anyone.',
      'No, due to security and privacy risks to our company.',
      'Only if the data is anonymised.'
    ],
    correctAnswer: 'No, due to security and privacy risks to our company.',
    approvedAnswers: ['No, due to security and privacy risks to our company.'],
    detailedFeedback: 'Using unapproved AI tools for sensitive company data can lead to data breaches, compromise confidential information, and violate privacy regulations. Always use company-vetted tools for such tasks.',
    voiceoverUrl: '/audio/2.mp3',
  },
  {
    id: 'q3',
    text: 'If an AI tool generates content that seems biased, {{playerName}}, what should you do according to our policy?',
    questionType: 'multiple-choice',
    options: [
      'Use it as is, AI is always objective.',
      'Modify it slightly to hide the bias.',
      'Report it to your manager or our designated ethics contact.',
      'Ignore it and find another AI tool.'
    ],
    correctAnswer: 'Report it to your manager or our designated ethics contact.',
    approvedAnswers: ['Report it to your manager or our designated ethics contact.'],
    detailedFeedback: 'Identifying and reporting bias is crucial for maintaining fairness and ethical standards here. Your report helps us address issues with AI tools and prevent the perpetuation of harmful biases.',
    voiceoverUrl: '/audio/3.mp3',
  },
  {
    id: 'q4',
    text: `Subject: Project Nightingale - Q3 Financial Projections (CONFIDENTIAL)

Hi Team,

Please find attached the draft financial projections for Q3 regarding Project Nightingale. This document contains highly sensitive information, including unannounced product roadmaps and preliminary revenue forecasts.

ACTION REQUIRED: I need a concise summary of the key takeaways from page 5-7 to include in my upcoming presentation to the board.

Could you assist with drafting this summary?

Best,
{{playerName}}

---
What action should you take next regarding this request, according to our AI policy {{playerName}}?`,
    questionType: 'scenario-buttons',
    options: [
        'Share with external AI assistant',
        'Share with Secure AI assistant',
        'Share with AI Assistant (Temporary Chat)',
        'Do not share with AI assistant'
    ],
    correctAnswer: 'Do not share with AI assistant',
    approvedAnswers: ['Do not share with AI assistant'],
    detailedFeedback: 'Public AI chatbots and many external assistants process data on external servers and may not guarantee confidentiality. Sharing company secrets through these platforms poses a significant security risk. Even "secure" or "temporary chat" assistants might not comply with our specific data handling protocols for highly sensitive information. The safest approach, according to policy for such confidential data, is not to use an AI assistant unless it is explicitly approved and vetted for this level of data sensitivity.',
    voiceoverUrl: '/audio/4.mp3',
  },
  {
    id: 'q5',
    text: 'What is your responsibility, {{playerName}}, regarding the accuracy of AI-generated content before using it for official company purposes?',
    questionType: 'multiple-choice',
    options: [
        'Assume it is always accurate.',
        'Only check for grammatical errors.',
        'Verify its accuracy and appropriateness thoroughly, as per our guidelines.',
        'It is the AI provider\'s responsibility.'
    ],
    correctAnswer: 'Verify its accuracy and appropriateness thoroughly, as per our guidelines.',
    approvedAnswers: ['Verify its accuracy and appropriateness thoroughly, as per our guidelines.'],
    detailedFeedback: 'AI-generated content can sometimes be inaccurate or inappropriate. It\'s your responsibility to critically review and validate any AI output before using it in an official capacity here to ensure quality and correctness.',
    voiceoverUrl: '/audio/5.mp3',
  },
  {
    id: 'q6',
    text: 'Does our AI policy allow using AI to generate content that might infringe on copyrights?',
    questionType: 'multiple-choice',
    options: [
        'Yes, if the AI tool says it\'s okay.',
        'No, creating content that infringes on IP rights is prohibited under our policy.',
        'Only for internal drafts, not for public release.',
        'If you cite the AI as a source, it\'s fine.'
    ],
    correctAnswer: 'No, creating content that infringes on IP rights is prohibited under our policy.',
    approvedAnswers: ['No, creating content that infringes on IP rights is prohibited under our policy.'],
    detailedFeedback: 'We place paramount importance on respecting intellectual property. Our policy prohibits using AI to create or distribute content that violates copyright laws or infringes on the rights of others.',
    voiceoverUrl: '/audio/6.mp3',
  },
  {
    id: 'q7',
    text: 'When using an AI tool for a significant project here, should you document its use?',
    questionType: 'multiple-choice',
    options: [
        'No, it\'s not necessary.',
        'Yes, to ensure transparency and for future reference, as outlined in our AI policy.',
        'Only if the project fails.',
        'Documentation is only for human-created work.'
    ],
    correctAnswer: 'Yes, to ensure transparency and for future reference, as outlined in our AI policy.',
    approvedAnswers: ['Yes, to ensure transparency and for future reference, as outlined in our AI policy.'],
    detailedFeedback: 'Documenting the use of AI tools in our projects helps maintain transparency, allows for auditing, and provides a record for future reference, especially if questions arise about the process or outcomes.',
    voiceoverUrl: '/audio/7.mp3',
  },
  {
    id: 'q8',
    text: 'What is our stance on using AI for employee performance evaluation as the SOLE determinant?',
    questionType: 'multiple-choice',
    options: [
        'It is encouraged for efficiency.',
        'It is allowed if employees consent.',
        'It is generally not allowed due to bias and lack of human oversight, as per our policy.',
        'It is mandatory for all performance reviews.'
    ],
    correctAnswer: 'It is generally not allowed due to bias and lack of human oversight, as per our policy.',
    approvedAnswers: ['It is generally not allowed due to bias and lack of human oversight, as per our policy.'],
    detailedFeedback: 'While AI can assist in evaluations, relying solely on AI can introduce bias and lacks the nuanced understanding a human manager provides. Our policy emphasises human oversight in such critical decisions.',
    voiceoverUrl: '/audio/8.mp3',
  },
  {
    id: 'q9',
    text: `Team,

I've just found this great new AI tool called 'InnovateAI Pro' that I think could massively help with our current market research project. It claims to analyse competitor data and generate insights much faster than our current methods. I'm keen to get started with it.
---
{{playerName}}, what is the correct first step you should take with 'InnovateAI Pro' according to our company's AI policy?`,
    questionType: 'scenario-buttons',
    options: [
        'Start using it immediately for all tasks.',
        'Purchase a subscription for the whole team.',
        'Propose the tool for review through our approved channels.',
        'Only use it for personal, non-sensitive tasks.'
    ],
    correctAnswer: 'Propose the tool for review through our approved channels.',
    approvedAnswers: ['Propose the tool for review through our approved channels.'],
    detailedFeedback: 'To ensure security, compliance, and proper integration within the company, new AI tools must undergo a review process. Proposing it through official channels allows for evaluation before widespread adoption.',
    voiceoverUrl: '/audio/9.mp3',
  }
];
