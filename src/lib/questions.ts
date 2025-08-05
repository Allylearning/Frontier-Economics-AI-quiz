
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
    text: 'When do you need to carry out a Data Protection Impact Assessment (DPIA)?',
    questionType: 'multiple-choice',
    options: [
      'Whenever using generative AI',
      'When using generative AI tools on client data',
      'When using a generative AI tool not listed in our AI policy',
      'If you are carrying out a data processing activity that could result in a high risk to the rights and freedoms of individuals'
    ],
    correctAnswer: 'If you are carrying out a data processing activity that could result in a high risk to the rights and freedoms of individuals',
    approvedAnswers: ['If you are carrying out a data processing activity that could result in a high risk to the rights and freedoms of individuals'],
    detailedFeedback: 'A DPIA is not required for most work that we carry out using generative AI but might be needed if we are developing tools that make decisions about individuals.',
    voiceoverUrl: '/audio/3.mp3',
  },
  {
    id: 'q4',
    text: 'Who needs to sign-off the use of generative AI tools for client data?',
    questionType: 'multiple-choice',
    options: [
        'David Dorrell and Rob Ding',
        'No-one (you can use generative AI tools following the guidelines in the policy unless you have been told otherwise)',
        'An AD or Director',
        'ExCo'
    ],
    correctAnswer: 'No-one (you can use generative AI tools following the guidelines in the policy unless you have been told otherwise)',
    approvedAnswers: ['No-one (you can use generative AI tools following the guidelines in the policy unless you have been told otherwise)'],
    detailedFeedback: 'You do not need to obtain sign-off to use generative AI tools. However you should always talk to your manager or director in case of any doubts.',
    voiceoverUrl: '/audio/4.mp3',
  },
  {
    id: 'q5',
    text: 'How do I know that output produced by a generative AI tool is correct?',
    questionType: 'multiple-choice',
    options: [
        'By using the Frontier workspace on ChatGPT Enterprise',
        'By checking that the output seems plausible',
        'By having a human review it – including checking sources',
        'By asking ChatGPT to provide a source'
    ],
    correctAnswer: 'By having a human review it – including checking sources',
    approvedAnswers: ['By having a human review it – including checking sources'],
    detailedFeedback: 'Generative AI can produce ‘hallucinations’ – seemingly plausible but incorrect output. This can even include made-up sources. A human should always review the output. This includes following up sources to confirm that they have been referenced correctly.',
    voiceoverUrl: '/audio/5.mp3',
  },
  {
    id: 'q6',
    text: '{{playerName}}, which of the following are examples of prohibited uses of generative AI at Frontier?',
    questionType: 'multiple-choice',
    options: [
        'Using personally identifiable information',
        'Work relating to confidential disputes',
        'Developing a tool which a client will use to produce credit scores',
        'Helping to draft a report'
    ],
    correctAnswer: 'Developing a tool which a client will use to produce credit scores',
    approvedAnswers: ['Developing a tool which a client will use to produce credit scores'],
    detailedFeedback: 'Uses that are prohibited or classified as “high risk” by the EU AI act are prohibited at Frontier – this includes tools used to evaluate the eligibility of individuals for credit. All the other usages here are not prohibited, unless an AD or Director has indicated otherwise.',
    voiceoverUrl: '/audio/6.mp3',
  },
  {
    id: 'q7',
    text: 'How should Generative AI outputs be handled before being shared with clients?',
    questionType: 'multiple-choice',
    options: [
        'Shared without edits to maintain authenticity',
        'Used only if approved by legal teams',
        'Reviewed by a human, including source checks and subject matter expert input',
        'Sent alongside a disclaimer written by the AI'
    ],
    correctAnswer: 'Reviewed by a human, including source checks and subject matter expert input',
    approvedAnswers: ['Reviewed by a human, including source checks and subject matter expert input'],
    detailedFeedback: 'Do not provide Generative AI output directly to clients without human review. If for any reason this is impractical, the content must be prominently flagged as having been produced by AI and subject to these potential issues.',
    voiceoverUrl: '/audio/7.mp3',
  },
  {

    id: 'q8',
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
    detailedFeedback: 'It is also important to ensure that imagery created with Generative AI does not include visible brand logos etc.',
    voiceoverUrl: '/audio/8.mp3',
  },
  {
  id: 'q9',
  text: 'What is a key requirement when using AI to produce code or quantitative analysis, {{playerName}}?',
  questionType: 'multiple-choice',
  options: [
      'Subject the output to the same scrutiny as human-written code',
      'Allow the AI to self-correct based on outcomes',
      'Use code only in non-critical systems',
      'Skip peer review if unit tests pass'
  ],
  correctAnswer: 'Subject the output to the same scrutiny as human-written code',
  approvedAnswers: ['Subject the output to the same scrutiny as human-written code'],
  detailedFeedback: 'Just that the code runs doesn’t mean that it is doing what you expect it will, or that it is free of bugs.',
  voiceoverUrl: '/audio/9.mp3',
},
  {
  id: 'q10',
  text: 'How does Frontier want to use AI tools?',
  questionType: 'multiple-choice',
  options: [
      'As little as possible, to reduce risks',
      'In a fully-automated way so we don’t have to read or edit the work',
      'Only by the data science team',
      'By all staff, in the most effective way possible'
  ],
  correctAnswer: 'By all staff, in the most effective way possible',
  approvedAnswers: ['By all staff, in the most effective way possible'],
  detailedFeedback: 'Our ambition is to be at the forefront of the use of Generative AI in economic consulting, and so we want to adopt these tools wherever they help us produce better work, more efficiently.',
  voiceoverUrl: '/audio/10.mp3',
}
];
