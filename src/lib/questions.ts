
import type { QuizQuestion } from '@/types';

export const questionPool: QuizQuestion[] = [
  {
    id: 'q1',
    text: '{{playerName}}, which of the following generative AI tools are currently approved for use at Frontier Economics?',
    questionType: 'multiple-choice',
    options: [
      'ChatGPT Enterprise and GitHub Copilot within the Frontier Economics Organisation on GitHub',
      'Any version of ChatGPT and Google Bard',
      'ChatGPT Free and Hugging Face',
      'GitHub Copilot (personal account) and ChatGPT Pro'
    ],
    correctAnswer: 'ChatGPT Enterprise and GitHub Copilot within the Frontier Economics Organisation on GitHub',
    approvedAnswers: ['ChatGPT Enterprise and GitHub Copilot within the Frontier Economics Organisation on GitHub'],
    detailedFeedback: 'Only ChatGPT Enterprise and GitHub Copilot used within Frontier Economics GitHub are approved.',
    voiceoverUrl: '/audio/1.mp3',
  },
  {
    id: 'q2',
    text: 'If a staff member wants to use a generative AI tool not currently approved, what should they do?',
    questionType: 'multiple-choice',
    options: [
      'Use the tool as long as no client data is involved',
      'Request sign-off from their Project Director',
      'Contact the Head of Data Science and IT Security and Data Protection Manager',
      'Ask another team member who has used the tool before'
    ],
    correctAnswer: 'Contact the Head of Data Science and IT Security and Data Protection Manager',
    approvedAnswers: ['Contact the Head of Data Science and IT Security and Data Protection Manager'],
    detailedFeedback: 'Any additional tools must be approved by both the Head of Data Science and the IT Security and Data Protection Manager.',
    voiceoverUrl: '/audio/2.mp3',
  },
  {
    id: 'q3',
    text: 'When can staff use approved generative AI tools without seeking sign-off?',
    questionType: 'multiple-choice',
    options: [
      'When using them on internal documents',
      'When the tool is used outside work hours',
      'When no Client Information or Client Sensitive Information is involved',
      'When the tool gives high-quality output'
    ],
    correctAnswer: 'When no Client Information or Client Sensitive Information is involved',
    approvedAnswers: ['When no Client Information or Client Sensitive Information is involved'],
    detailedFeedback: 'No sign-off is required for uses that do not involve Client or Client Sensitive Information.',
    voiceoverUrl: '/audio/3.mp3',
  },
  {
    id: 'q4',
    text: 'If there\'s any uncertainty about whether client information is involved, what should staff do?',
    questionType: 'multiple-choice',
    options: [
        'Proceed with caution',
        'Request a second opinion from a colleague',
        'Seek sign-off from the relevant Project Director',
        'Skip the task until further notice'
    ],
    correctAnswer: 'Seek sign-off from the relevant Project Director',
    approvedAnswers: ['Seek sign-off from the relevant Project Director'],
    detailedFeedback: 'Staff should always seek sign-off in case of doubt.',
    voiceoverUrl: '/audio/4.mp3',
  },
  {
    id: 'q5',
    text: 'Who must approve the use of generative AI on projects involving client data?',
    questionType: 'multiple-choice',
    options: [
        'The project manager',
        'The IT team',
        'The signatory of the client contract (Associate Director or Director)',
        'Any Associate'
    ],
    correctAnswer: 'The signatory of the client contract (Associate Director or Director)',
    approvedAnswers: ['The signatory of the client contract (Associate Director or Director)'],
    detailedFeedback: 'Only the Associate Director or Director who signed the client contract may approve AI use in such contexts.',
    voiceoverUrl: '/audio/5.mp3',
  },
  {
    id: 'q6',
    text: '{{playerName}}, which of the following is not a permitted use of generative AI without specific sign-off?',
    questionType: 'multiple-choice',
    options: [
        'Generating marketing headlines for internal campaigns',
        'Drafting and reviewing client reports',
        'Creating generic training materials',
        'Brainstorming team name ideas'
    ],
    correctAnswer: 'Drafting and reviewing client reports',
    approvedAnswers: ['Drafting and reviewing client reports'],
    detailedFeedback: 'Drafting or reviewing client reports requires explicit sign-off due to potential exposure to sensitive data.',
    voiceoverUrl: '/audio/6.mp3',
  },
  {
    id: 'q7',
    text: 'Which of the following are examples of prohibited or high-risk uses of generative AI?',
    questionType: 'multiple-choice',
    options: [
        'Data analysis on anonymised, internal practice datasets',
        'Writing code snippets from scratch',
        'Use on client datasets containing personally identifiable information',
        'Generating meeting agenda templates'
    ],
    correctAnswer: 'Use on client datasets containing personally identifiable information',
    approvedAnswers: ['Use on client datasets containing personally identifiable information'],
    detailedFeedback: 'Using generative AI on PII (personally identifiable information)-containing datasets is explicitly prohibited.',
    voiceoverUrl: '/audio/7.mp3',
  },
  {
      id: 'q8',
      text: 'Which of the following are key risks that occur when using generative AI, that must be accounted for through best practice?',
      questionType: 'multi-select',
      options: [
          'Hallucinations',
          'Copyright infringement',
          'Client feedback delays',
          'Unreliable analysis or code output'
      ],
      correctAnswer: [
        'Hallucinations', 
        'Copyright infringement', 
        'Unreliable analysis or code output'
      ],
      approvedAnswers: [
        'Hallucinations', 
        'Copyright infringement', 
        'Unreliable analysis or code output'
      ],
      detailedFeedback: 'These are the critical risks highlighted in the policy. Client feedback delays are not mentioned as an AI-specific risk.',
      voiceoverUrl: '/audio/8.mp3',
  },
  {
    id: 'q9',
    text: 'What is the primary risk when Generative AI produces "hallucinations"?',
    questionType: 'multiple-choice',
    options: [
        'It consumes excessive computing resources',
        'It produces outdated information only',
        'It outputs plausible but incorrect content, including invented sources',
        'It creates content that is difficult for AI systems to process'
    ],
    correctAnswer: 'It outputs plausible but incorrect content, including invented sources',
    approvedAnswers: ['It outputs plausible but incorrect content, including invented sources'],
    detailedFeedback: 'Do not provide Generative AI output directly to clients without human review – including checking of sources, and having a subject-matter-expert review the content.',
    voiceoverUrl: '/audio/9.mp3',
  },
  {
  id: 'q10',
  text: 'How should Generative AI outputs be handled before being shared with clients, {{playerName}}?',
  questionType: 'multiple-choice',
  options: [
      'Shared without edits to maintain authenticity',
      'Used only if approved by legal teams',
      'Reviewed by a human, including source checks and subject-matter-expert input',
      'Sent alongside a disclaimer written by the AI'
  ],
  correctAnswer: 'Reviewed by a human, including source checks and subject-matter-expert input',
  approvedAnswers: ['Reviewed by a human, including source checks and subject-matter-expert input'],
  detailedFeedback: 'Always ensure AI outputs are reviewed by a human and verified for accuracy before sharing with clients.',
  voiceoverUrl: '/audio/10.mp3',
},
  {
  id: 'q11',
  text: 'To mitigate copyright infringement in AI-generated output, what should you do?',
  questionType: 'multiple-choice',
  options: [
      'Only use content generated after 2023',
      'Check if any verbatim quotes need sourcing',
      'Avoid using any AI-generated content in external documents',
      'Use only open-source AI tools'
  ],
  correctAnswer: 'Check if any verbatim quotes need sourcing',
  approvedAnswers: ['Check if any verbatim quotes need sourcing'],
  detailedFeedback: 'Check and properly source any verbatim content in AI outputs to avoid copyright issues.',
  voiceoverUrl: '/audio/11.mp3',
},
  {
  id: 'q12',
  text: 'What is a key requirement when using AI to produce code or quantitative analysis?',
  questionType: 'multiple-choice',
  options: [
      'Subject the output to the same scrutiny as human-written code',
      'Allow the AI to self-correct based on outcomes',
      'Use code only in non-critical systems',
      'Skip peer review if unit tests pass'
  ],
  correctAnswer: 'Subject the output to the same scrutiny as human-written code',
  approvedAnswers: ['Subject the output to the same scrutiny as human-written code'],
  detailedFeedback: 'AI-generated code must be reviewed and tested with the same rigour as human-written code.',
  voiceoverUrl: '/audio/12.mp3',
},
  {
  id: 'q13',
  text: 'Last question {{playerName}}! The approved AI tools ChatGpt Enterprise or GitHub CoPilot may be used for all Frontier work (whether internal or using client data) unless:',
  questionType: 'multiple-choice',
  options: [
      'A Director or Associate Director has explicitly restricted the use',
      'Personal AI Tools are available',
      'A new AI tool has been launched and recommended externally',
      'A client has suggested a new tool they heard is fit for purpose'
  ],
  correctAnswer: 'A Director or Associate Director has explicitly restricted the use',
  approvedAnswers: ['A Director or Associate Director has explicitly restricted the use'],
  detailedFeedback: 'Use approved AI tools unless explicitly restricted by a Director or Associate Director.',
  voiceoverUrl: '/audio/13.mp3',
}
];
