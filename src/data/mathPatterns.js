export const mathPatterns = [
  {
    id: 'p001',
    order: 1,
    title: 'Forgetting the second root',
    description: 'Taking only +√ and missing −√ in quadratic equations.',
    risk: 'High risk',
    riskLevel: 'high',
    marks: '−3 marks avg',
    borderVariant: 'high',
    subject: 'Quadratic Equations',
    warningBody: 'Every quadratic equation with x² has exactly two solutions. Many students solve for only the positive root and miss the negative one completely.',
    preWarning: 'When an equation has x², there are always TWO solutions — one positive (+√) and one negative (−√). Many students find only one and lose 3 marks.',
    question: 'Solve: 2(x − 3)² = 8',
    questionHint: 'You have been warned. Think carefully before solving. How many solutions should this have?',
    mistakeLines: [
      { text: '2(x − 3)² = 8',  wrong: false, annotation: '' },
      { text: '(x − 3)² = 4',   wrong: false, annotation: '' },
      { text: 'x − 3 = 2',      wrong: true,  annotation: '← only +root taken' },
      { text: 'x = 5',          wrong: true,  annotation: '→ INCOMPLETE — loses 3 marks' }
    ],
    mistakeExplanation: 'Only one root found. The negative root (x = 1) is completely missing.',
    correctLines: [
      { text: '2(x − 3)² = 8',         correct: false },
      { text: '(x − 3)² = 4',          correct: false },
      { text: 'x − 3 = ±2',            correct: true  },
      { text: 'x = 5  and  x = 1  ✓',  correct: true  }
    ],
    correctExplanation: 'Both roots found. Full marks. Never miss the ± symbol again.'
  },
  {
    id: 'p002',
    order: 2,
    title: 'Skipping algebra steps',
    description: 'Jumping steps loses method marks even when the final answer is right.',
    risk: 'High risk',
    riskLevel: 'high',
    marks: '−2 marks avg',
    borderVariant: 'high',
    subject: 'Algebra & Methods',
    warningBody: 'Bac II markers award marks for each shown step, not just the final answer. A correct answer with no working shown can still score zero.',
    preWarning: 'Write every step clearly. Markers in Bac II give method marks — even if your final answer is wrong, you can still earn 2–3 marks for correct working.',
    question: 'Expand and simplify: (2x + 3)(x − 4)',
    questionHint: 'Show every multiplication step. Do not jump straight to the answer.',
    mistakeLines: [
      { text: '(2x + 3)(x − 4)',    wrong: false, annotation: '' },
      { text: '= 2x² − 5x − 12',   wrong: true,  annotation: '← no working shown, wrong sign' }
    ],
    mistakeExplanation: 'No working shown and the answer is wrong. Zero marks awarded.',
    correctLines: [
      { text: '(2x + 3)(x − 4)',                           correct: false },
      { text: '= 2x·x + 2x·(−4) + 3·x + 3·(−4)',         correct: true  },
      { text: '= 2x² − 8x + 3x − 12',                     correct: true  },
      { text: '= 2x² − 5x − 12  ✓',                       correct: true  }
    ],
    correctExplanation: 'Each step shown clearly. Full method marks awarded even if one step had a small error.'
  },
  {
    id: 'p003',
    order: 3,
    title: 'Forgetting +C in integration',
    description: 'Omitting the constant of integration is an automatic mark deduction.',
    risk: 'High risk',
    riskLevel: 'high',
    marks: '−1 mark avg',
    borderVariant: 'high-rose',
    subject: 'Integration',
    warningBody: 'Every indefinite integral must end with + C. Forgetting it is one of the most common and easiest marks to lose in Bac II calculus.',
    preWarning: 'Before writing your integral answer, ask yourself: "Is this a definite or indefinite integral?" If indefinite — always add + C at the end. No exceptions.',
    question: 'Find: ∫ (3x² + 2x) dx',
    questionHint: 'This is an indefinite integral. What must you always add at the end?',
    mistakeLines: [
      { text: '∫ (3x² + 2x) dx',   wrong: false, annotation: '' },
      { text: '= x³ + x²',         wrong: true,  annotation: '← missing + C, loses 1 mark' }
    ],
    mistakeExplanation: 'The constant of integration is missing. This is an automatic deduction in every Bac II exam.',
    correctLines: [
      { text: '∫ (3x² + 2x) dx',   correct: false },
      { text: '= x³ + x² + C  ✓',  correct: true  }
    ],
    correctExplanation: 'Perfect. + C written. This single habit saves 1 mark on every integration question.'
  },
  {
    id: 'p004',
    order: 4,
    title: 'Wrong domain for ln(x)',
    description: 'Not checking x > 0 before applying logarithm rules causes wrong answers.',
    risk: 'Medium risk',
    riskLevel: 'medium',
    marks: '−2 marks avg',
    borderVariant: 'medium',
    subject: 'Logarithms',
    warningBody: 'The natural logarithm ln(x) is only defined for x > 0. Students often solve ln equations and accept negative solutions without checking validity.',
    preWarning: 'Whenever you solve a ln equation, you MUST check every solution satisfies x > 0. Any negative solution or zero must be rejected — even if the algebra is correct.',
    question: 'Solve: ln(x² − 3x) = ln(x − 1) + ln(2)',
    questionHint: 'You will get two algebraic solutions. Which ones are valid for ln?',
    mistakeLines: [
      { text: 'x² − 3x = 2(x − 1)',   wrong: false, annotation: '' },
      { text: 'x² − 5x + 2 = 0',      wrong: false, annotation: '' },
      { text: 'x = 4.56  or  x = 0.44', wrong: true, annotation: '← both accepted without check' }
    ],
    mistakeExplanation: 'x = 0.44 makes the original expression ln(negative) — undefined. It must be rejected.',
    correctLines: [
      { text: 'x² − 5x + 2 = 0',             correct: false },
      { text: 'x = 4.56  or  x = 0.44',       correct: false },
      { text: 'Check: x = 0.44 → ln(−1.12) ✗', correct: true  },
      { text: 'Valid solution: x = 4.56  ✓',   correct: true  }
    ],
    correctExplanation: 'Domain checked. Invalid solution rejected. This step is always required in Bac II.'
  },
  {
    id: 'p005',
    order: 5,
    title: 'Degrees vs radians in calculus',
    description: 'Using degree mode when calculus requires radians causes completely wrong answers.',
    risk: 'Medium risk',
    riskLevel: 'medium',
    marks: '−2 marks avg',
    borderVariant: 'medium',
    subject: 'Trigonometry & Calculus',
    warningBody: 'All calculus involving trigonometric functions (derivatives and integrals) must use radians. Using degrees gives wrong numerical answers and wrong derivatives.',
    preWarning: 'The derivative of sin(x) = cos(x) is ONLY true in radians. If your calculator or working uses degrees, your answer will be wrong. Always switch to radian mode before calculus.',
    question: 'Find the derivative of f(x) = sin(x) at x = π/6',
    questionHint: 'What is π/6 in radians? Make sure your mode matches.',
    mistakeLines: [
      { text: "f'(x) = cos(x)",           wrong: false, annotation: '' },
      { text: "f'(30°) = cos(30°) = 0.866", wrong: true, annotation: '← used degrees, lost context of π' }
    ],
    mistakeExplanation: 'The question uses π/6 radians, not 30°. Mixing units gives the wrong numerical answer.',
    correctLines: [
      { text: "f'(x) = cos(x)",                  correct: false },
      { text: 'x = π/6 (radians)',                correct: true  },
      { text: "f'(π/6) = cos(π/6) = √3/2  ✓",   correct: true  }
    ],
    correctExplanation: 'Radians used correctly. cos(π/6) = √3/2 ≈ 0.866, expressed exactly as required.'
  }
]
