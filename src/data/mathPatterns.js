// Patterns derived from real Bac II Math exams: 2019, 2021, 2022, 2023, 2025
// Topics marked with years they appeared — higher frequency = higher priority

export const mathPatterns = [

  // ─── LIMITS (appears every year 2019–2025) ───────────────────────────────

  {
    id: 'p001',
    order: 1,
    title: 'Not factoring before evaluating a limit',
    description: 'Direct substitution gives 0/0. Students stop here and lose all marks instead of factoring.',
    risk: 'High risk',
    riskLevel: 'high',
    marks: '−3 marks avg',
    borderVariant: 'high',
    subject: 'Limits',
    years: [2019, 2022, 2023, 2025],
    warningBody: 'When direct substitution gives 0/0, that is NOT the answer — it is a signal to factor or rationalize. This appeared in every Bac II exam. Students who write "0/0 = undefined" lose all marks for that part.',
    preWarning: 'Before evaluating any limit, substitute the value first. If you get 0/0 or ∞/∞ — STOP. You must factor or rationalize. Never write 0/0 as your final answer.',
    question: 'Find: lim(x→1) (x−1) / (2(x²−1))',
    questionHint: 'Try substituting x=1 first. What do you get? What does that tell you to do next?',
    mistakeLines: [
      { text: 'lim(x→1) (x−1) / (2(x²−1))', wrong: false, annotation: '' },
      { text: 'Substitute x=1: (1−1) / (2(1−1))', wrong: false, annotation: '' },
      { text: '= 0/0', wrong: true, annotation: '← STOP — this means factor, not "undefined"' },
      { text: 'Answer: undefined ✗', wrong: true, annotation: '→ loses all marks' }
    ],
    mistakeExplanation: '0/0 is an indeterminate form — it means you must factor, not that the limit is undefined.',
    correctLines: [
      { text: 'lim(x→1) (x−1) / (2(x²−1))', correct: false },
      { text: 'Factor: x²−1 = (x−1)(x+1)', correct: true },
      { text: '= lim(x→1) (x−1) / (2(x−1)(x+1))', correct: false },
      { text: '= lim(x→1) 1 / (2(x+1))', correct: true },
      { text: '= 1 / (2×2) = 1/4  ✓', correct: true }
    ],
    correctExplanation: 'Factor first, cancel (x−1), then substitute. Full marks.'
  },

  {
    id: 'p002',
    order: 2,
    title: 'Forgetting to rationalize a square root limit',
    description: 'When (√something − number) appears in a fraction giving 0/0, students do not multiply by the conjugate.',
    risk: 'High risk',
    riskLevel: 'high',
    marks: '−3 marks avg',
    borderVariant: 'high',
    subject: 'Limits',
    years: [2022, 2023, 2025],
    warningBody: 'When a limit has √x − a in the numerator or denominator and gives 0/0, you must multiply by the conjugate. This appeared in 2022, 2023, and 2025 exams.',
    preWarning: 'See √ in a limit that gives 0/0? Multiply numerator AND denominator by the conjugate (√x + a). This eliminates the square root and lets you cancel.',
    question: 'Find: lim(x→4) (√x − 2) / (x − 4)',
    questionHint: 'Direct substitution gives 0/0. There is a square root. What technique removes it?',
    mistakeLines: [
      { text: 'lim(x→4) (√x − 2) / (x − 4)', wrong: false, annotation: '' },
      { text: 'Substitute x=4: (2−2)/(4−4) = 0/0', wrong: false, annotation: '' },
      { text: 'Try L\'Hôpital: 1/(2√x) / 1', wrong: true, annotation: '← works but loses steps marks' },
      { text: 'OR: writes "limit does not exist" ✗', wrong: true, annotation: '→ zero marks' }
    ],
    mistakeExplanation: 'Not using conjugate rationalization — the expected Bac II method for square root limits.',
    correctLines: [
      { text: 'Multiply by (√x + 2)/(√x + 2)', correct: true },
      { text: '= lim(x→4) (x − 4) / ((x−4)(√x+2))', correct: true },
      { text: '= lim(x→4) 1 / (√x + 2)', correct: true },
      { text: '= 1 / (2+2) = 1/4  ✓', correct: true }
    ],
    correctExplanation: 'Conjugate used. Square root eliminated. Clean cancellation. Full marks.'
  },

  // ─── FUNCTION STUDY (appears every year 2019–2025) ───────────────────────

  {
    id: 'p003',
    order: 3,
    title: 'Missing the oblique asymptote',
    description: 'Students find vertical and horizontal asymptotes but forget the oblique (slant) asymptote that appears in every function study question.',
    risk: 'High risk',
    riskLevel: 'high',
    marks: '−3 marks avg',
    borderVariant: 'high',
    subject: 'Function Study',
    years: [2019, 2021, 2022, 2023, 2025],
    warningBody: 'Every Bac II function study question (2019–2025) involves a rational function with an oblique asymptote. Students who only state the vertical asymptote lose 2–3 marks. The oblique asymptote y = ax + b is found by polynomial long division.',
    preWarning: 'When the degree of the numerator is exactly 1 more than the denominator, there is an oblique asymptote. Do polynomial division first — the quotient is your asymptote. This is tested every single year.',
    question: 'Find all asymptotes of f(x) = (x² + 2x − 2) / (x + 1)',
    questionHint: 'The numerator has degree 2, denominator degree 1. How many types of asymptote should you look for?',
    mistakeLines: [
      { text: 'f(x) = (x² + 2x − 2) / (x + 1)', wrong: false, annotation: '' },
      { text: 'Vertical: x = −1  ✓', wrong: false, annotation: '' },
      { text: 'Horizontal: none (degree top > degree bottom)', wrong: false, annotation: '' },
      { text: 'Done. ✗', wrong: true, annotation: '← oblique asymptote completely missed — loses 3 marks' }
    ],
    mistakeExplanation: 'The oblique asymptote y = x + 1 is missing. In Bac II this costs 2–3 marks every time.',
    correctLines: [
      { text: 'Divide: x²+2x−2 ÷ (x+1)', correct: false },
      { text: 'x²+2x−2 = (x+1)(x+1) − 3', correct: true },
      { text: 'So f(x) = x + 1 − 3/(x+1)', correct: true },
      { text: 'Oblique asymptote: y = x + 1  ✓', correct: true },
      { text: 'Vertical asymptote: x = −1  ✓', correct: true }
    ],
    correctExplanation: 'Polynomial division reveals the oblique asymptote. Both asymptotes found. Full marks.'
  },

  {
    id: 'p004',
    order: 4,
    title: 'Wrong domain — missing excluded values',
    description: 'Students write ℝ as domain without removing values that make the denominator zero or the log undefined.',
    risk: 'High risk',
    riskLevel: 'high',
    marks: '−2 marks avg',
    borderVariant: 'high',
    subject: 'Function Study',
    years: [2019, 2021, 2022, 2023, 2025],
    warningBody: 'Every function study in Bac II starts with finding the domain. For rational functions, exclude where the denominator = 0. For ln functions, the argument must be > 0. Writing ℝ as the domain of f(x) = 1/(x−2) is an automatic error.',
    preWarning: 'Before anything else: set denominator ≠ 0 and solve. For ln(expression), set expression > 0 and solve. Write the domain as ℝ − {excluded values}. This is always the first mark — never skip it.',
    question: 'Find the domain of f(x) = (x² − 5x + 7) / (2 − x)',
    questionHint: 'What value of x makes the denominator equal to zero?',
    mistakeLines: [
      { text: 'f(x) = (x² − 5x + 7) / (2 − x)', wrong: false, annotation: '' },
      { text: 'Domain D = ℝ ✗', wrong: true, annotation: '← x = 2 makes denominator 0 — not allowed' }
    ],
    mistakeExplanation: 'x = 2 makes the denominator zero. The domain must exclude it. Automatic mark deduction.',
    correctLines: [
      { text: 'Set denominator ≠ 0: 2 − x ≠ 0', correct: true },
      { text: 'So x ≠ 2', correct: true },
      { text: 'Domain: D = ℝ − {2}  ✓', correct: true }
    ],
    correctExplanation: 'Denominator checked. Domain correctly written. First mark secured.'
  },

  {
    id: 'p005',
    order: 5,
    title: 'Wrong tangent line equation',
    description: 'Students find the slope correctly but use the wrong point, or forget to evaluate f(x₀) for the y-intercept.',
    risk: 'High risk',
    riskLevel: 'high',
    marks: '−3 marks avg',
    borderVariant: 'high-rose',
    subject: 'Function Study',
    years: [2019, 2021, 2022, 2023, 2025],
    warningBody: 'Every Bac II function study asks for a tangent line. The formula is y = f(x₀) + f\'(x₀)(x − x₀). Students either use the wrong x₀, forget to calculate f(x₀), or write the slope formula incorrectly.',
    preWarning: 'Tangent line needs THREE things: the point x₀, the y-value f(x₀), and the slope f\'(x₀). Write all three before forming the equation. Missing any one loses marks.',
    question: 'Find the tangent to f(x) = (4−x²)/(1−x) at x₀ = 0',
    questionHint: 'What are f(0) and f\'(0)? Write both before forming the line equation.',
    mistakeLines: [
      { text: "f'(x) = (x² − 2x + 4) / (1−x)²  (correct)", wrong: false, annotation: '' },
      { text: "f'(0) = 4 → slope = 4  ✓", wrong: false, annotation: '' },
      { text: 'Tangent: y = 4x ✗', wrong: true, annotation: '← forgot f(0) = 4, should be y = 4x + 4' }
    ],
    mistakeExplanation: 'The y-intercept requires f(0), not just the slope. The correct line is y = 4x + 4.',
    correctLines: [
      { text: 'f(0) = (4−0)/(1−0) = 4  → point (0, 4)', correct: true },
      { text: "f'(0) = 4  → slope = 4", correct: true },
      { text: 'y = f(0) + f\'(0)(x−0)', correct: true },
      { text: 'y = 4 + 4x  ✓', correct: true }
    ],
    correctExplanation: 'Point AND slope both used. Tangent line correct. Full marks.'
  },

  // ─── INTEGRATION (appears every year 2019–2025) ──────────────────────────

  {
    id: 'p006',
    order: 6,
    title: 'Forgetting +C in indefinite integration',
    description: 'Omitting the constant of integration is an automatic deduction in every Bac II exam.',
    risk: 'High risk',
    riskLevel: 'high',
    marks: '−1 mark avg',
    borderVariant: 'high-rose',
    subject: 'Integration',
    years: [2019, 2021, 2022, 2023, 2025],
    warningBody: 'Every indefinite integral must end with + C. This is tested every year and loses an automatic mark. It takes 1 second to write and students still forget it.',
    preWarning: 'Ask yourself before writing the answer: "Is this definite (has bounds) or indefinite (no bounds)?" If there are no bounds — always write + C. No exceptions.',
    question: 'Find: ∫ (x² + x + 1) dx',
    questionHint: 'No bounds shown. What must you always add at the end of an indefinite integral?',
    mistakeLines: [
      { text: '∫ (x² + x + 1) dx', wrong: false, annotation: '' },
      { text: '= x³/3 + x²/2 + x ✗', wrong: true, annotation: '← missing + C — loses 1 mark automatically' }
    ],
    mistakeExplanation: 'The constant of integration is always required for indefinite integrals. Automatic deduction.',
    correctLines: [
      { text: '∫ (x² + x + 1) dx', correct: false },
      { text: '= x³/3 + x²/2 + x + C  ✓', correct: true }
    ],
    correctExplanation: '+ C written. This one habit saves a mark on every integration question.'
  },

  {
    id: 'p007',
    order: 7,
    title: 'Not decomposing a fraction before integrating',
    description: 'Integrating 1/(x−1) + 1/x² as a single fraction instead of two separate terms.',
    risk: 'Medium risk',
    riskLevel: 'medium',
    marks: '−2 marks avg',
    borderVariant: 'medium',
    subject: 'Integration',
    years: [2022, 2023],
    warningBody: 'In 2022 and 2023, integration questions gave fractions like (1/(x−1) + 1/x²). Students who try to combine these into one fraction before integrating make errors. Integrate each term separately.',
    preWarning: 'When integrating a sum of fractions, integrate each term separately. Never combine 1/(x−1) and 1/x² into a single fraction — that creates unnecessary errors.',
    question: 'Find: ∫₂³ [1/(x−1) + 1/x²] dx',
    questionHint: 'Two separate terms. Integrate each one independently. What is ∫ 1/(x−1) dx?',
    mistakeLines: [
      { text: '∫ [1/(x−1) + 1/x²] dx', wrong: false, annotation: '' },
      { text: '= ∫ (x² + x − 1) / (x²(x−1)) dx ✗', wrong: true, annotation: '← combining fractions creates a harder problem' },
      { text: 'Student gets stuck or makes algebra error', wrong: true, annotation: '→ loses 2 marks' }
    ],
    mistakeExplanation: 'Combining the fractions makes the integral much harder with no benefit. Integrate term by term.',
    correctLines: [
      { text: '∫₂³ 1/(x−1) dx + ∫₂³ 1/x² dx', correct: true },
      { text: '= [ln|x−1|]₂³ + [−1/x]₂³', correct: true },
      { text: '= (ln2 − ln1) + (−1/3 + 1/2)', correct: true },
      { text: '= ln2 + 1/6  ✓', correct: true }
    ],
    correctExplanation: 'Each term integrated separately. Clean result. Full marks.'
  },

  // ─── PROBABILITY (appears 4/5 years: 2019, 2021, 2022, 2023) ────────────

  {
    id: 'p008',
    order: 8,
    title: 'Confusing combinations with permutations',
    description: 'Using P(n,k) when order does not matter — should use C(n,k) instead.',
    risk: 'Medium risk',
    riskLevel: 'medium',
    marks: '−2 marks avg',
    borderVariant: 'medium',
    subject: 'Probability & Combinatorics',
    years: [2019, 2021, 2022, 2023],
    warningBody: 'Probability questions in Bac II ask you to "draw k people from a group of n." When order does NOT matter (which is almost always the case for drawing people), use combinations C(n,k) = n!/(k!(n−k)!), NOT permutations.',
    preWarning: 'Ask: "Does the ORDER of selection matter?" For drawing people from a group — NO, order never matters. Use C(n,k). Using P(n,k) gives a number k! times too large and loses all marks for that event.',
    question: 'From a group of 10 people, 3 are drawn. How many ways can this happen?',
    questionHint: 'Does it matter which person is drawn first, second, or third? Think before choosing your formula.',
    mistakeLines: [
      { text: 'Drawing 3 from 10', wrong: false, annotation: '' },
      { text: 'P(10,3) = 10×9×8 = 720 ✗', wrong: true, annotation: '← order does not matter here — wrong formula' }
    ],
    mistakeExplanation: 'Permutation used but order of selection does not matter. Answer should be 120, not 720.',
    correctLines: [
      { text: 'Order does NOT matter → use C(n,k)', correct: true },
      { text: 'C(10,3) = 10! / (3! × 7!)', correct: true },
      { text: '= (10 × 9 × 8) / (3 × 2 × 1)', correct: true },
      { text: '= 120  ✓', correct: true }
    ],
    correctExplanation: 'Correct formula chosen. C(10,3) = 120. Full marks.'
  },

  // ─── CONIC SECTIONS (appears every year 2019–2025) ───────────────────────

  {
    id: 'p009',
    order: 9,
    title: 'Wrong parabola formula — vertex vs standard form',
    description: 'Confusing the parabola equation y² = 4px (focus on x-axis) with x² = 4py (focus on y-axis).',
    risk: 'Medium risk',
    riskLevel: 'medium',
    marks: '−2 marks avg',
    borderVariant: 'medium',
    subject: 'Conic Sections',
    years: [2023, 2025],
    warningBody: 'In 2023 and 2025, parabola questions gave a focus and directrix and asked you to find the equation. Students mix up the two standard forms depending on the orientation of the axis.',
    preWarning: 'First identify the axis of symmetry: if the focus is on the y-axis (like F(0,−2)), the parabola opens up/down → use x² = 4py. If focus is on x-axis, use y² = 4px. Draw a quick sketch before writing the equation.',
    question: 'Find the parabola equation with focus F(0, −2) and directrix y = 2',
    questionHint: 'Where is the focus? Which axis is the axis of symmetry? Draw this before writing.',
    mistakeLines: [
      { text: 'Focus F(0,−2), directrix y = 2', wrong: false, annotation: '' },
      { text: 'p = −2 → use y² = 4px ✗', wrong: true, annotation: '← wrong orientation — focus is on y-axis' },
      { text: 'y² = −8x ✗', wrong: true, annotation: '→ completely wrong equation' }
    ],
    mistakeExplanation: 'Focus is at (0,−2) — on the y-axis. Must use x² = 4py form, not y² = 4px.',
    correctLines: [
      { text: 'Focus on y-axis → use x² = 4py', correct: true },
      { text: 'Vertex at origin (midpoint of F and directrix)', correct: true },
      { text: 'Distance p = −2 (focus below vertex)', correct: true },
      { text: 'x² = 4(−2)y = −8y  ✓', correct: true }
    ],
    correctExplanation: 'Correct form identified from axis orientation. Equation correct. Full marks.'
  }

]
