// 30 Math failure patterns from real Bac II exams: 2019, 2021, 2022, 2023, 2025

export const mathPatterns = [

  // ── LIMITS (5 patterns) ──────────────────────────────────────────────────

  {
    id: 'p001', order: 1,
    title: 'Not factoring a 0/0 limit',
    description: 'Direct substitution gives 0/0. Students stop here instead of factoring and lose all marks.',
    risk: 'High risk', riskLevel: 'high', marks: '−3 marks avg', borderVariant: 'high',
    subject: 'Limits', years: [2019, 2022, 2023, 2025],
    warningBody: 'When substitution gives 0/0, that is NOT the answer — it is a signal to factor. Students who write "undefined" lose all marks. This appeared in every Bac II exam.',
    preWarning: 'Substitute first. Got 0/0? STOP — factor or rationalize. Never write 0/0 as a final answer. Always look for a common factor to cancel.',
    question: 'Find: lim(x→1) (x − 1) / (2(x² − 1))',
    questionHint: 'Substitute x=1 first. What do you get? What does that tell you to do next?',
    mistakeLines: [
      { text: 'Substitute x=1: (0)/(0) = 0/0', wrong: false, annotation: '' },
      { text: '"Limit does not exist" ✗', wrong: true, annotation: '← 0/0 means factor, not undefined' }
    ],
    mistakeExplanation: '0/0 is indeterminate — factor and cancel, it does not mean undefined.',
    correctLines: [
      { text: 'x²−1 = (x−1)(x+1)', correct: true },
      { text: '= lim(x→1) 1 / (2(x+1))', correct: true },
      { text: '= 1/4  ✓', correct: true }
    ],
    correctExplanation: 'Factor first, cancel (x−1), then substitute. Full marks.'
  },

  {
    id: 'p002', order: 2,
    title: 'Not rationalizing a square root limit',
    description: 'Limits with √x − a giving 0/0. Students skip multiplying by the conjugate.',
    risk: 'High risk', riskLevel: 'high', marks: '−3 marks avg', borderVariant: 'high',
    subject: 'Limits', years: [2022, 2023, 2025],
    warningBody: 'When a limit has (√x − number) giving 0/0, multiply top and bottom by the conjugate. This appeared in 2022, 2023, and 2025.',
    preWarning: 'See √ in a limit that gives 0/0? Multiply numerator AND denominator by the conjugate (√x + a). This eliminates the square root and lets you cancel.',
    question: 'Find: lim(x→4) (√x − 2) / (x − 4)',
    questionHint: 'Substitution gives 0/0 and there is a square root. Which technique removes it?',
    mistakeLines: [
      { text: 'Substitute x=4: 0/0', wrong: false, annotation: '' },
      { text: '"Limit does not exist" ✗', wrong: true, annotation: '← must use conjugate rationalization' }
    ],
    mistakeExplanation: 'The conjugate technique removes the square root. Skipping it loses all marks.',
    correctLines: [
      { text: 'Multiply by (√x+2)/(√x+2)', correct: true },
      { text: '= lim(x→4) (x−4) / ((x−4)(√x+2))', correct: false },
      { text: '= lim(x→4) 1/(√x+2) = 1/4  ✓', correct: true }
    ],
    correctExplanation: 'Conjugate applied. Square root eliminated. Full marks.'
  },

  {
    id: 'p003', order: 3,
    title: 'Wrong handling of ∞/∞ limits',
    description: 'Students try direct substitution on ∞/∞ instead of dividing by the highest power of x.',
    risk: 'High risk', riskLevel: 'high', marks: '−3 marks avg', borderVariant: 'high',
    subject: 'Limits', years: [2021, 2022, 2023],
    warningBody: 'When x → ±∞ and you have polynomial/polynomial, divide every term by the highest power of x in the denominator. Appeared in 2021, 2022, 2023.',
    preWarning: 'For lim(x→∞) of a fraction: divide top and bottom by xⁿ where n = highest power in denominator. Terms like 1/x → 0 as x → ∞.',
    question: 'Find: lim(x→+∞) (2x − 1) / (3 − x)',
    questionHint: 'x → ∞ means substitution fails. Divide numerator and denominator by the highest power of x.',
    mistakeLines: [
      { text: '= ∞/∞ → "indeterminate, no answer" ✗', wrong: true, annotation: '← divide by x first' }
    ],
    mistakeExplanation: 'Must divide by x (highest power) before evaluating.',
    correctLines: [
      { text: 'Divide top and bottom by x:', correct: true },
      { text: '= lim(x→+∞) (2 − 1/x) / (3/x − 1)', correct: true },
      { text: '= (2−0)/(0−1) = −2  ✓', correct: true }
    ],
    correctExplanation: 'Divided by x. All 1/x terms vanish. Full marks.'
  },

  {
    id: 'p004', order: 4,
    title: "Applying L'Hôpital incorrectly",
    description: "Using L'Hôpital without verifying 0/0 or ∞/∞, or differentiating the fraction as a whole.",
    risk: 'High risk', riskLevel: 'high', marks: '−2 marks avg', borderVariant: 'high',
    subject: 'Limits', years: [2025],
    warningBody: "L'Hôpital's rule only applies when the limit is exactly 0/0 or ∞/∞. Differentiate numerator and denominator SEPARATELY — never use the quotient rule on the whole fraction.",
    preWarning: "Before L'Hôpital: confirm 0/0 or ∞/∞. Then differentiate top and bottom separately. The quotient rule is NOT used here.",
    question: 'Find: lim(x→π/3) (x − π/3) / (sin x − √3 cos x)',
    questionHint: 'Substitute x=π/3 first. Is it 0/0? Now differentiate top and bottom separately.',
    mistakeLines: [
      { text: '0/0 confirmed ✓', wrong: false, annotation: '' },
      { text: "d/dx [(x−π/3)/(sin x−√3 cos x)] using quotient rule ✗", wrong: true, annotation: '← wrong — differentiate top and bottom separately' }
    ],
    mistakeExplanation: "L'Hôpital differentiates numerator and denominator separately, not as a quotient.",
    correctLines: [
      { text: 'd(x−π/3)/dx = 1', correct: true },
      { text: 'd(sin x − √3 cos x)/dx = cos x + √3 sin x', correct: true },
      { text: '= lim(x→π/3) 1/(cos x + √3 sin x) = 1/2  ✓', correct: true }
    ],
    correctExplanation: "L'Hôpital applied correctly — top and bottom differentiated separately."
  },

  {
    id: 'p005', order: 5,
    title: 'Wrong limit direction of eˣ at infinity',
    description: 'Forgetting eˣ → +∞ as x → +∞ and eˣ → 0 as x → −∞.',
    risk: 'Medium risk', riskLevel: 'medium', marks: '−2 marks avg', borderVariant: 'medium',
    subject: 'Limits', years: [2021, 2023],
    warningBody: 'Limits with eˣ × polynomial appeared in 2021 and 2023. eˣ dominates any polynomial as x → +∞. As x → −∞, eˣ → 0.',
    preWarning: 'eˣ grows faster than any polynomial. As x→+∞: eˣ × (anything → ±∞) = ±∞. As x→−∞: eˣ → 0, so 0 × bounded = 0.',
    question: 'Find: lim(x→+∞) eˣ(−x² + 1/x)',
    questionHint: 'What happens to eˣ as x→+∞? What happens to (−x² + 1/x)?',
    mistakeLines: [
      { text: '→ ∞ × (−∞) = 0 ✗', wrong: true, annotation: '← ∞ × (−∞) = −∞, not 0' }
    ],
    mistakeExplanation: '∞ × (−∞) = −∞, not 0. Both magnitude and sign matter.',
    correctLines: [
      { text: 'As x→+∞: eˣ → +∞', correct: true },
      { text: '(−x² + 1/x) → −∞', correct: true },
      { text: 'eˣ dominates → result is −∞  ✓', correct: true }
    ],
    correctExplanation: 'eˣ growth direction identified. Sign noted. Correct limit.'
  },

  // ── FUNCTION STUDY (8 patterns) ─────────────────────────────────────────

  {
    id: 'p006', order: 6,
    title: 'Missing the oblique asymptote',
    description: 'Students find only the vertical asymptote and miss the oblique one — costs 3 marks every year.',
    risk: 'High risk', riskLevel: 'high', marks: '−3 marks avg', borderVariant: 'high',
    subject: 'Function Study', years: [2019, 2021, 2022, 2023, 2025],
    warningBody: 'Every Bac II function study (2019–2025) has an oblique asymptote found by polynomial division. Missing it loses 2–3 marks every single year.',
    preWarning: 'If degree of numerator = degree of denominator + 1 → there is an oblique asymptote. Do polynomial long division. The quotient (ax + b) is the asymptote.',
    question: 'Find all asymptotes of f(x) = (x² + 2x − 2)/(x + 1)',
    questionHint: 'Numerator degree 2, denominator degree 1. How many types of asymptote exist here?',
    mistakeLines: [
      { text: 'Vertical asymptote: x = −1  ✓', wrong: false, annotation: '' },
      { text: 'Done ✗', wrong: true, annotation: '← oblique asymptote completely missed' }
    ],
    mistakeExplanation: 'The oblique asymptote y = x + 1 is missing. Costs 2–3 marks every exam.',
    correctLines: [
      { text: 'x²+2x−2 = (x+1)(x+1) − 3', correct: true },
      { text: 'f(x) = x + 1 − 3/(x+1)', correct: true },
      { text: 'Oblique: y = x + 1  ✓  |  Vertical: x = −1  ✓', correct: true }
    ],
    correctExplanation: 'Polynomial division reveals the oblique asymptote. Both stated. Full marks.'
  },

  {
    id: 'p007', order: 7,
    title: 'Wrong domain — missing excluded values',
    description: 'Writing ℝ as the domain without removing values where denominator = 0 or ln argument ≤ 0.',
    risk: 'High risk', riskLevel: 'high', marks: '−2 marks avg', borderVariant: 'high',
    subject: 'Function Study', years: [2019, 2021, 2022, 2023, 2025],
    warningBody: 'Domain is always the first sub-question. Writing ℝ for a rational function is an automatic error. Appeared in all 5 exam years.',
    preWarning: 'Step 1 is always domain. Set denominator ≠ 0 and solve. For ln: set argument > 0. Write domain as ℝ − {excluded values}.',
    question: 'Find the domain of f(x) = (x² − 5x + 7)/(2 − x)',
    questionHint: 'What value of x makes the denominator zero?',
    mistakeLines: [
      { text: 'Domain D = ℝ ✗', wrong: true, annotation: '← x = 2 makes denominator 0' }
    ],
    mistakeExplanation: 'x = 2 must be excluded. This is always the first mark — never skip it.',
    correctLines: [
      { text: '2 − x ≠ 0 → x ≠ 2', correct: true },
      { text: 'Domain: D = ℝ − {2}  ✓', correct: true }
    ],
    correctExplanation: 'Excluded value found and written. First mark secured.'
  },

  {
    id: 'p008', order: 8,
    title: 'Wrong tangent line — forgetting f(x₀)',
    description: 'Students find slope f\'(x₀) correctly but forget to calculate f(x₀), producing a line through the wrong point.',
    risk: 'High risk', riskLevel: 'high', marks: '−3 marks avg', borderVariant: 'high',
    subject: 'Function Study', years: [2019, 2021, 2022, 2023, 2025],
    warningBody: 'Every function study asks for a tangent line. Students find slope but forget the y-value f(x₀). Appeared in all 5 years.',
    preWarning: 'Tangent needs 3 things: x₀ (given), f(x₀) (calculate!), f\'(x₀) (slope). Write all 3 before forming the equation y = f(x₀) + f\'(x₀)(x − x₀).',
    question: 'Find the tangent to f(x) = (4 − x²)/(1 − x) at x₀ = 0',
    questionHint: 'Calculate BOTH f(0) and f\'(0) before writing the line.',
    mistakeLines: [
      { text: "f'(0) = 4  →  slope = 4  ✓", wrong: false, annotation: '' },
      { text: 'Tangent: y = 4x  ✗', wrong: true, annotation: '← forgot f(0) = 4 — line must pass through (0,4)' }
    ],
    mistakeExplanation: 'Slope correct but point wrong. f(0) was never computed.',
    correctLines: [
      { text: 'f(0) = (4−0)/(1−0) = 4  → point (0, 4)', correct: true },
      { text: "f'(0) = 4  → slope = 4", correct: true },
      { text: 'y = 4 + 4x  ✓', correct: true }
    ],
    correctExplanation: 'Both point AND slope used. Correct tangent. Full marks.'
  },

  {
    id: 'p009', order: 9,
    title: 'Incomplete monotonicity sign table',
    description: 'Finding f\'(x) = 0 but not checking the sign of f\'(x) on each interval.',
    risk: 'High risk', riskLevel: 'high', marks: '−3 marks avg', borderVariant: 'high',
    subject: 'Function Study', years: [2019, 2021, 2022, 2023, 2025],
    warningBody: 'After finding where f\'(x) = 0, you must build a sign table for every interval. Skipping this loses 3 marks and is one of the most common errors in function study.',
    preWarning: 'Finding f\'(x) = 0 is only step 1. Build the sign table: pick a test value in each interval, compute sign of f\'(x). Positive = increasing, Negative = decreasing.',
    question: 'Study monotonicity of f(x) = (4−x²)/(1−x), given f\'(x) = (x²−2x+4)/(1−x)²',
    questionHint: 'Set f\'(x) = 0. Check discriminant of numerator. Then check sign on each interval.',
    mistakeLines: [
      { text: 'x²−2x+4 = 0 → Δ < 0 → no real roots', wrong: false, annotation: '' },
      { text: '"f is increasing on ℝ" ✗', wrong: true, annotation: '← domain excludes x=1 — must state intervals separately' }
    ],
    mistakeExplanation: 'The function is not defined at x=1. Monotonicity must be stated on (−∞,1) and (1,+∞) separately.',
    correctLines: [
      { text: 'Numerator > 0 always (Δ < 0)', correct: true },
      { text: 'Denominator (1−x)² > 0 for x ≠ 1', correct: true },
      { text: "f'(x) > 0 on (−∞,1) and (1,+∞)  ✓", correct: true }
    ],
    correctExplanation: 'Sign table complete. Domain gap respected. Full marks.'
  },

  {
    id: 'p010', order: 10,
    title: 'Not computing one-sided limits at vertical asymptote',
    description: 'Stating the vertical asymptote x = a but not computing lim(x→a⁺) and lim(x→a⁻).',
    risk: 'Medium risk', riskLevel: 'medium', marks: '−2 marks avg', borderVariant: 'medium',
    subject: 'Function Study', years: [2021, 2022, 2023],
    warningBody: 'For every vertical asymptote x = a, Bac II expects both one-sided limits to determine which side goes to +∞ and which to −∞.',
    preWarning: 'For each vertical asymptote x = a, compute BOTH lim(x→a⁺) and lim(x→a⁻). Check the sign of the denominator approaching from each side.',
    question: 'For f(x) = (4−x²)/(1−x), find lim(x→1⁺) and lim(x→1⁻)',
    questionHint: 'Substitute x slightly > 1 and x slightly < 1. What sign does (1−x) have each time?',
    mistakeLines: [
      { text: '"The function goes to infinity near x=1" ✗', wrong: true, annotation: '← must specify +∞ or −∞ for each side' }
    ],
    mistakeExplanation: 'Both one-sided limits required with correct signs.',
    correctLines: [
      { text: 'x→1⁺: (1−x)→0⁻, numerator→3>0 → lim = −∞  ✓', correct: true },
      { text: 'x→1⁻: (1−x)→0⁺, numerator→3>0 → lim = +∞  ✓', correct: true }
    ],
    correctExplanation: 'Both one-sided limits with correct signs. Full marks.'
  },

  {
    id: 'p011', order: 11,
    title: 'Wrong bounds when calculating area under curve',
    description: 'Using wrong x-values as integration bounds when finding area between curve and axis.',
    risk: 'Medium risk', riskLevel: 'medium', marks: '−3 marks avg', borderVariant: 'medium',
    subject: 'Function Study', years: [2023, 2025],
    warningBody: 'In 2023 and 2025, function study ended with an area calculation. Students use wrong bounds or forget absolute value when the curve is below the x-axis.',
    preWarning: 'Before integrating for area: find where f(x)=0 for bounds. Check if f is above or below the axis. Area = ∫|f(x)|dx — never negative.',
    question: 'Find the area between f(x) = (3x−1)/(x−1)² and the x-axis from x=0 to x=1/3',
    questionHint: 'Where does f(x)=0? Is f positive or negative on [0, 1/3]?',
    mistakeLines: [
      { text: 'Area = ∫₀¹ f(x) dx ✗', wrong: true, annotation: '← x=1 is outside domain — wrong bound' }
    ],
    mistakeExplanation: 'Domain excludes x=1. Bound must be x=1/3 where f(x)=0.',
    correctLines: [
      { text: 'f(x)=0 when 3x−1=0 → x=1/3', correct: true },
      { text: 'f(0) = −1 < 0 → curve below x-axis', correct: true },
      { text: 'Area = −∫₀^(1/3) f(x) dx  ✓', correct: true }
    ],
    correctExplanation: 'Bounds from f(x)=0. Absolute value applied. Correct area.'
  },

  {
    id: 'p012', order: 12,
    title: 'Wrong domain for ln function — not solving inequality',
    description: 'Writing domain as ℝ − {excluded} instead of solving the inequality expression > 0.',
    risk: 'High risk', riskLevel: 'high', marks: '−2 marks avg', borderVariant: 'high-rose',
    subject: 'Function Study', years: [2025],
    warningBody: 'In 2025, g(x) = ln((-x-3)/(x-3)) required solving (-x-3)/(x-3) > 0. Students who just exclude where denominator=0 miss the full domain.',
    preWarning: 'For ln(expression): solve expression > 0 as an INEQUALITY with a sign table — not just find where denominator=0.',
    question: 'Find the domain of g(x) = ln((−x−3)/(x−3))',
    questionHint: 'Set (−x−3)/(x−3) > 0. Build a sign table for numerator and denominator.',
    mistakeLines: [
      { text: 'Domain = ℝ − {3} ✗', wrong: true, annotation: '← must solve fraction > 0, not just ≠ 0' }
    ],
    mistakeExplanation: 'The fraction must be > 0. Need a full sign analysis.',
    correctLines: [
      { text: '(−x−3)/(x−3) > 0', correct: true },
      { text: 'Sign table: same sign when x < −3 or x > 3', correct: true },
      { text: 'Domain: (−∞,−3) ∪ (3,+∞)  ✓', correct: true }
    ],
    correctExplanation: 'Inequality solved with sign table. Correct domain.'
  },

  {
    id: 'p013', order: 13,
    title: 'Not showing steps when proving simplified form',
    description: 'Writing the simplified form f(x) = ax + b + c/(x−d) without showing the polynomial division.',
    risk: 'Medium risk', riskLevel: 'medium', marks: '−2 marks avg', borderVariant: 'medium',
    subject: 'Function Study', years: [2019, 2021, 2022, 2023],
    warningBody: 'Every function study (2019–2023) asks "prove that f(x) = ...". Students write the result without showing division steps and lose all proof marks.',
    preWarning: 'When asked to PROVE a form, show the polynomial long division step by step. Write quotient and remainder explicitly. The word "prove" means show your working.',
    question: 'Prove f(x) = (x²+2x−2)/(x+1) can be written as f(x) = x+1−3/(x+1)',
    questionHint: 'Show the polynomial division of x²+2x−2 by (x+1). What is the quotient? The remainder?',
    mistakeLines: [
      { text: 'f(x) = x + 1 − 3/(x+1) ✗', wrong: true, annotation: '← just writing result earns zero proof marks' }
    ],
    mistakeExplanation: 'Writing the result without steps earns no marks for a proof question.',
    correctLines: [
      { text: 'x² + 2x − 2 = (x+1)(x+1) − 3', correct: true },
      { text: 'Quotient: x+1,  Remainder: −3', correct: true },
      { text: 'Therefore f(x) = x+1 − 3/(x+1)  ✓', correct: true }
    ],
    correctExplanation: 'Division shown. Quotient and remainder stated. Full proof marks.'
  },

  // ── INTEGRATION (6 patterns) ────────────────────────────────────────────

  {
    id: 'p014', order: 14,
    title: 'Forgetting +C in indefinite integration',
    description: 'Omitting the constant of integration — automatic 1-mark deduction in every exam.',
    risk: 'High risk', riskLevel: 'high', marks: '−1 mark avg', borderVariant: 'high-rose',
    subject: 'Integration', years: [2019, 2021, 2022, 2023, 2025],
    warningBody: 'Every indefinite integral must end with + C. Appeared in every Bac II exam. Easiest mark to lose.',
    preWarning: 'No bounds? → indefinite → always write + C. Ask before every integral: "Does this have bounds?" If NO — add + C.',
    question: 'Find: ∫(x² + x + 1) dx',
    questionHint: 'No bounds shown. What must you always include?',
    mistakeLines: [
      { text: '= x³/3 + x²/2 + x ✗', wrong: true, annotation: '← missing + C' }
    ],
    mistakeExplanation: 'Automatic deduction. Takes 1 second to write. Never forget.',
    correctLines: [
      { text: '= x³/3 + x²/2 + x + C  ✓', correct: true }
    ],
    correctExplanation: '+ C written. One habit, one mark saved every time.'
  },

  {
    id: 'p015', order: 15,
    title: 'Combining fractions before integrating',
    description: 'Combining 1/(x−1) + 1/x² into a single fraction before integrating — makes it much harder.',
    risk: 'High risk', riskLevel: 'high', marks: '−2 marks avg', borderVariant: 'high',
    subject: 'Integration', years: [2022, 2023],
    warningBody: 'In 2022 and 2023, integrals had sums of fractions. Students combine into one fraction first, creating a harder problem unnecessarily.',
    preWarning: 'Sum of fractions inside integral? Integrate each term SEPARATELY. Never combine fractions first — it creates complexity with no benefit.',
    question: 'Find: ∫₂³ [1/(x−1) + 1/x²] dx',
    questionHint: 'Two separate terms. Integrate each independently.',
    mistakeLines: [
      { text: '= ∫(x²+x−1)/(x²(x−1)) dx ✗', wrong: true, annotation: '← combined — now much harder' }
    ],
    mistakeExplanation: 'Combining turns a simple problem into partial fractions. Never do this.',
    correctLines: [
      { text: '= ∫₂³ 1/(x−1) dx + ∫₂³ 1/x² dx', correct: true },
      { text: '= [ln|x−1|]₂³ + [−1/x]₂³', correct: true },
      { text: '= ln2 + 1/6  ✓', correct: true }
    ],
    correctExplanation: 'Each term integrated separately. Clean and fast. Full marks.'
  },

  {
    id: 'p016', order: 16,
    title: 'Not using substitution for eˣ/(eˣ+1)',
    description: 'Trying to integrate eˣ/(eˣ+1) directly without substitution u = eˣ+1.',
    risk: 'High risk', riskLevel: 'high', marks: '−3 marks avg', borderVariant: 'high',
    subject: 'Integration', years: [2023, 2025],
    warningBody: 'In 2023 and 2025, integration had ∫eˣ/(eˣ+1)dx. This is a standard f\'(x)/f(x) form requiring substitution u = denominator.',
    preWarning: 'See eˣ/(eˣ+1)? The numerator is the derivative of the denominator. Use u = eˣ+1, du = eˣ dx. Result: ∫du/u = ln|u| + C.',
    question: 'Find: ∫₀¹ eˣ/(eˣ+1) dx',
    questionHint: 'The numerator eˣ is the derivative of (eˣ+1). What substitution does this suggest?',
    mistakeLines: [
      { text: '= ∫(1 − 1/(eˣ+1)) dx ✗', wrong: true, annotation: '← incorrect algebraic manipulation' }
    ],
    mistakeExplanation: 'This manipulation is incorrect. Use substitution u = eˣ+1.',
    correctLines: [
      { text: 'u = eˣ+1 → du = eˣ dx', correct: true },
      { text: 'Bounds: x=0→u=2, x=1→u=e+1', correct: true },
      { text: '= [ln u]₂^(e+1) = ln(e+1)−ln2  ✓', correct: true }
    ],
    correctExplanation: 'Substitution applied. Bounds converted. Full marks.'
  },

  {
    id: 'p017', order: 17,
    title: 'Forgetting to change bounds after substitution',
    description: 'When using substitution u = g(x) in a definite integral, keeping the original x-bounds.',
    risk: 'High risk', riskLevel: 'high', marks: '−2 marks avg', borderVariant: 'high',
    subject: 'Integration', years: [2019, 2021, 2022, 2023, 2025],
    warningBody: 'When applying substitution u=g(x) to ∫ₐᵇ, the bounds must become g(a) and g(b). Keeping x-bounds with u is always wrong.',
    preWarning: 'After substituting u = g(x): convert BOTH bounds. New lower = g(a), new upper = g(b). Or convert back to x before applying bounds.',
    question: 'Evaluate ∫₀¹ eˣ/(eˣ+1) dx using u = eˣ+1',
    questionHint: 'When x=0, u=? When x=1, u=? These are your new bounds.',
    mistakeLines: [
      { text: 'u = eˣ+1, du = eˣ dx', wrong: false, annotation: '' },
      { text: '= ∫₀¹ (1/u) du ✗', wrong: true, annotation: '← bounds still in x — must convert to u' }
    ],
    mistakeExplanation: 'After u substitution, bounds 0 and 1 are x-values. Must convert to u-values.',
    correctLines: [
      { text: 'x=0 → u=2,  x=1 → u=e+1', correct: true },
      { text: '= ∫₂^(e+1) (1/u) du = ln(e+1)−ln2  ✓', correct: true }
    ],
    correctExplanation: 'Bounds converted correctly. Full marks.'
  },

  {
    id: 'p018', order: 18,
    title: 'Not factoring trig integral sin²x cos⁴x + sin⁴x cos²x',
    description: 'Expanding directly instead of factoring sin²x cos²x first.',
    risk: 'Medium risk', riskLevel: 'medium', marks: '−3 marks avg', borderVariant: 'medium',
    subject: 'Integration', years: [2025],
    warningBody: 'In 2025, integral K = ∫(sin²x cos⁴x + sin⁴x cos²x)dx. Students who expand directly get lost in long algebra. The key is to factor first.',
    preWarning: 'See sin²x cos⁴x + sin⁴x cos²x? Factor out sin²x cos²x first. Then use sin²x + cos²x = 1 to simplify to sin²x cos²x = sin²(2x)/4.',
    question: 'Evaluate K = ∫₀^(π/2) (sin²x cos⁴x + sin⁴x cos²x) dx',
    questionHint: 'Factor out the common term sin²x cos²x. What do you get inside the brackets?',
    mistakeLines: [
      { text: 'Expand each term directly ✗', wrong: true, annotation: '← very long algebra, easy to make errors' }
    ],
    mistakeExplanation: 'Expanding wastes time. Factor first to see the simplification.',
    correctLines: [
      { text: '= sin²x cos²x(cos²x + sin²x) = sin²x cos²x', correct: true },
      { text: '= (sin2x)²/4  (using sin2x = 2sinx cosx)', correct: true },
      { text: '= ∫₀^(π/2) sin²(2x)/4 dx = π/16  ✓', correct: true }
    ],
    correctExplanation: 'Factoring reveals sin²+cos²=1. Clean integral results.'
  },

  {
    id: 'p019', order: 19,
    title: 'Wrong sign when integrating 1/(x−a)',
    description: 'Writing ∫1/(a−x)dx = ln|a−x| instead of −ln|a−x|.',
    risk: 'Medium risk', riskLevel: 'medium', marks: '−1 mark avg', borderVariant: 'medium',
    subject: 'Integration', years: [2019, 2021, 2022],
    warningBody: 'When the denominator is (a−x) instead of (x−a), there is a sign difference. ∫1/(a−x)dx = −ln|a−x|+C. Missing the negative loses a mark.',
    preWarning: '∫1/(x−a)dx = ln|x−a|+C, but ∫1/(a−x)dx = −ln|a−x|+C. The negative comes from the chain rule. Always check the sign of the derivative of the denominator.',
    question: 'Find: ∫ 1/(2−x) dx',
    questionHint: 'The denominator is (2−x). What is the derivative of (2−x)? How does that affect the integral?',
    mistakeLines: [
      { text: '∫ 1/(2−x) dx = ln|2−x| + C ✗', wrong: true, annotation: '← missing negative sign from chain rule' }
    ],
    mistakeExplanation: 'd/dx(2−x) = −1, so we get an extra factor of −1.',
    correctLines: [
      { text: 'Let u = 2−x → du = −dx', correct: true },
      { text: '= −∫ 1/u du = −ln|u| + C', correct: true },
      { text: '= −ln|2−x| + C  ✓', correct: true }
    ],
    correctExplanation: 'Negative from chain rule included. Correct antiderivative.'
  },

  // ── PROBABILITY (4 patterns) ────────────────────────────────────────────

  {
    id: 'p020', order: 20,
    title: 'Permutation instead of combination',
    description: 'Using P(n,k) when order does not matter — gives answer k! times too large.',
    risk: 'High risk', riskLevel: 'high', marks: '−3 marks avg', borderVariant: 'high',
    subject: 'Probability', years: [2019, 2021, 2022, 2023],
    warningBody: 'Drawing people from a group — order never matters. Use C(n,k). This is tested in 4 out of 5 years.',
    preWarning: 'Ask: "Does ORDER of selection matter?" Choosing people from a group — NO. Use C(n,k) = n!/(k!(n−k)!). P(n,k) gives k! times too large an answer.',
    question: 'From 10 people, 3 are drawn. How many ways?',
    questionHint: 'Does it matter who is drawn first? Think before choosing your formula.',
    mistakeLines: [
      { text: 'P(10,3) = 10×9×8 = 720 ✗', wrong: true, annotation: '← order does not matter — wrong formula' }
    ],
    mistakeExplanation: 'Permutation gives 720. Correct answer is C(10,3) = 120.',
    correctLines: [
      { text: 'Order does NOT matter → C(n,k)', correct: true },
      { text: 'C(10,3) = 10!/(3!×7!) = 120  ✓', correct: true }
    ],
    correctExplanation: 'Correct formula. C(10,3) = 120. Full marks.'
  },

  {
    id: 'p021', order: 21,
    title: 'Wrong total outcomes in probability denominator',
    description: 'Using n instead of C(n,k) as the total number of outcomes.',
    risk: 'High risk', riskLevel: 'high', marks: '−2 marks avg', borderVariant: 'high',
    subject: 'Probability', years: [2019, 2021, 2022, 2023],
    warningBody: 'The denominator is always the total outcomes for the whole experiment — C(n, items drawn). Students confuse this with just n.',
    preWarning: 'Total outcomes = C(total pool, number drawn). Drawing 3 from 10: denominator = C(10,3) = 120, NOT 10. Every event in the question uses the SAME denominator.',
    question: 'Drawing 3 from 10 (4 women, 6 men). Find P(all 3 are women).',
    questionHint: 'How many ways to draw 3 from the whole group? How many ways to draw 3 women only?',
    mistakeLines: [
      { text: 'Numerator: C(4,3) = 4  ✓', wrong: false, annotation: '' },
      { text: 'P = 4/10 ✗', wrong: true, annotation: '← denominator should be C(10,3)=120' }
    ],
    mistakeExplanation: 'Denominator is C(10,3)=120, not 10.',
    correctLines: [
      { text: 'Total: C(10,3) = 120', correct: true },
      { text: 'Favorable: C(4,3) = 4', correct: true },
      { text: 'P = 4/120 = 1/30  ✓', correct: true }
    ],
    correctExplanation: 'Correct denominator. Probability calculated properly.'
  },

  {
    id: 'p022', order: 22,
    title: 'Confusing arithmetic and geometric sequences',
    description: 'Mixing up uₙ = u₁+(n−1)d (arithmetic) with uₙ = u₁×rⁿ⁻¹ (geometric).',
    risk: 'Medium risk', riskLevel: 'medium', marks: '−2 marks avg', borderVariant: 'medium',
    subject: 'Probability', years: [2021, 2022, 2023],
    warningBody: 'Probability questions in 2021, 2022, 2023 described groups using arithmetic or geometric sequences. Wrong formula = wrong group size = wrong probability.',
    preWarning: 'Identify sequence type FIRST. "Common difference d" → arithmetic. "Common ratio r" → geometric. Then apply the correct formula for the general term.',
    question: 'First term u₁=5, common difference d=3, n=5 terms. Find u₅.',
    questionHint: '"Common difference" means which type of sequence?',
    mistakeLines: [
      { text: 'u₅ = 5 × 3⁴ = 405 ✗', wrong: true, annotation: '← used geometric formula — wrong type' }
    ],
    mistakeExplanation: '"Common difference" means arithmetic, not geometric.',
    correctLines: [
      { text: 'Arithmetic: uₙ = u₁ + (n−1)d', correct: true },
      { text: 'u₅ = 5 + 4×3 = 17  ✓', correct: true }
    ],
    correctExplanation: 'Correct sequence type. Correct formula. Full marks.'
  },

  {
    id: 'p023', order: 23,
    title: 'Not using the complementary event',
    description: 'Calculating P(at least one...) by listing all cases instead of 1 − P(none).',
    risk: 'Medium risk', riskLevel: 'medium', marks: '−2 marks avg', borderVariant: 'medium',
    subject: 'Probability', years: [2019, 2021, 2022, 2023],
    warningBody: '"At least one" problems are much faster via complement: P(at least one) = 1 − P(none). Students who enumerate all cases waste time and make errors.',
    preWarning: 'See "at least one"? Use complement: P(at least one X) = 1 − P(no X at all). One calculation instead of three.',
    question: 'Drawing 3 from 6 men + 4 women. P(at least 1 woman)?',
    questionHint: 'Count P(1W) + P(2W) + P(3W)? Or use 1 − P(0 women)?',
    mistakeLines: [
      { text: 'P = P(1W) + P(2W) + P(3W) ✗', wrong: true, annotation: '← 3 separate calculations — slow and error prone' }
    ],
    mistakeExplanation: 'Use complement. One calculation is always better here.',
    correctLines: [
      { text: 'P(0 women) = C(6,3)/C(10,3) = 20/120 = 1/6', correct: true },
      { text: 'P(at least 1) = 1 − 1/6 = 5/6  ✓', correct: true }
    ],
    correctExplanation: 'Complement used. One simple calculation. Full marks.'
  },

  // ── CONIC SECTIONS (3 patterns) ─────────────────────────────────────────

  {
    id: 'p024', order: 24,
    title: 'Wrong parabola orientation — x² vs y²',
    description: 'Confusing x² = 4py (opens up/down) with y² = 4px (opens left/right).',
    risk: 'High risk', riskLevel: 'high', marks: '−3 marks avg', borderVariant: 'high',
    subject: 'Conic Sections', years: [2023, 2025],
    warningBody: 'Parabola appeared in 2023 and 2025. Most common error: wrong standard form based on axis of symmetry.',
    preWarning: 'Identify the axis of symmetry FIRST. Focus on y-axis (e.g. F(0,−2)) → opens up/down → x² = 4py. Focus on x-axis → y² = 4px. Sketch before writing.',
    question: 'Find the parabola with focus F(0,−2) and directrix y=2',
    questionHint: 'Focus is on which axis? Draw this before writing the equation.',
    mistakeLines: [
      { text: 'Using y² = 4px ✗', wrong: true, annotation: '← focus on y-axis means x² = 4py form' },
      { text: 'y² = −8x ✗', wrong: true, annotation: '' }
    ],
    mistakeExplanation: 'Focus at (0,−2) is on y-axis. Must use x² = 4py.',
    correctLines: [
      { text: 'Focus on y-axis → x² = 4py', correct: true },
      { text: 'p = −2 (focus below vertex)', correct: true },
      { text: 'x² = −8y  ✓', correct: true }
    ],
    correctExplanation: 'Orientation identified first. Correct form. Full marks.'
  },

  {
    id: 'p025', order: 25,
    title: 'Wrong ellipse — swapping a² and b²',
    description: 'Taking the smaller denominator as a² instead of the larger one, giving impossible c² < 0.',
    risk: 'High risk', riskLevel: 'high', marks: '−3 marks avg', borderVariant: 'high',
    subject: 'Conic Sections', years: [2019, 2021, 2022],
    warningBody: 'Ellipse was tested in 2019, 2021, 2022. Students mix up a² and b², leading to c² < 0 — impossible — and wrong foci.',
    preWarning: 'In x²/A + y²/B = 1: the LARGER value is always a². Then c² = a² − b² > 0. If you get c² < 0 → you swapped a and b — go back and fix it.',
    question: 'Write 25x² + 9y² = 225 in standard form and find the foci.',
    questionHint: 'Divide by 225 first. Which denominator is larger — that is a².',
    mistakeLines: [
      { text: 'x²/9 + y²/25 = 1', wrong: false, annotation: '' },
      { text: 'a²=9, b²=25 ✗', wrong: true, annotation: '← a² must be the LARGER value = 25' },
      { text: 'c²=9−25<0 — impossible ✗', wrong: true, annotation: '' }
    ],
    mistakeExplanation: 'a² is always the larger denominator. Here a²=25 under y².',
    correctLines: [
      { text: 'a²=25 (larger, under y²), b²=9', correct: true },
      { text: 'c²=25−9=16 → c=4', correct: true },
      { text: 'Foci: (0, ±4)  ✓', correct: true }
    ],
    correctExplanation: 'Larger denominator = a². Foci correct. Full marks.'
  },

  {
    id: 'p026', order: 26,
    title: 'Wrong eccentricity — e ≥ 1 for an ellipse',
    description: 'Getting eccentricity e ≥ 1 which is impossible for an ellipse — signals a and b were swapped.',
    risk: 'Medium risk', riskLevel: 'medium', marks: '−1 mark avg', borderVariant: 'medium',
    subject: 'Conic Sections', years: [2019, 2021, 2022],
    warningBody: 'An ellipse always has 0 < e < 1. Getting e ≥ 1 means a and b were swapped upstream.',
    preWarning: 'After computing e = c/a: verify 0 < e < 1. If e ≥ 1 → you swapped a and b earlier. Go back and fix the assignment, not just the eccentricity.',
    question: 'For x²/9 + y²/25 = 1, verify your eccentricity is valid.',
    questionHint: 'Compute e = c/a. Is 0 < e < 1? If not, what went wrong?',
    mistakeLines: [
      { text: 'a²=9, c²=25−9=16, e=4/3>1 ✗', wrong: true, annotation: '← e>1 for ellipse is impossible — a and b swapped' }
    ],
    mistakeExplanation: 'e>1 signals the error. Fix: a²=25, c²=16, e=4/5.',
    correctLines: [
      { text: 'a²=25, b²=9, c²=16', correct: true },
      { text: 'e = c/a = 4/5 = 0.8', correct: true },
      { text: '0 < 0.8 < 1 → valid ellipse  ✓', correct: true }
    ],
    correctExplanation: 'e=4/5 confirmed. Ellipse validated.'
  },

  // ── COMPLEX NUMBERS (2 patterns) ────────────────────────────────────────

  {
    id: 'p027', order: 27,
    title: 'Wrong argument — not checking quadrant',
    description: 'Using arctan(b/a) as the argument without verifying the quadrant of z.',
    risk: 'High risk', riskLevel: 'high', marks: '−3 marks avg', borderVariant: 'high',
    subject: 'Complex Numbers', years: [2025],
    warningBody: 'In 2025, finding arg(z₁) for z₁=√3−i. Students take arctan(−1/√3) = π/6 (positive) but miss the negative sign. Always sketch z on the Argand plane first.',
    preWarning: 'To find arg(z=a+bi): first identify the quadrant from signs of a and b. arctan(b/a) gives reference angle only — adjust sign for the correct quadrant.',
    question: 'Find arg(z₁) for z₁ = √3 − i',
    questionHint: 'a=√3>0, b=−1<0. Which quadrant? Sketch before computing.',
    mistakeLines: [
      { text: 'arg = arctan(−1/√3) = π/6 ✗', wrong: true, annotation: '← 4th quadrant → should be −π/6' }
    ],
    mistakeExplanation: 'a>0, b<0 → 4th quadrant → argument must be negative.',
    correctLines: [
      { text: 'a>0, b<0 → 4th quadrant', correct: true },
      { text: 'Reference: arctan(1/√3) = π/6', correct: true },
      { text: 'arg(z₁) = −π/6  ✓', correct: true }
    ],
    correctExplanation: 'Quadrant identified first. Correct sign. Full marks.'
  },

  {
    id: 'p028', order: 28,
    title: 'Wrong modulus — adding instead of Pythagorean formula',
    description: 'Computing |z| = |a| + |b| instead of |z| = √(a² + b²).',
    risk: 'Medium risk', riskLevel: 'medium', marks: '−2 marks avg', borderVariant: 'medium',
    subject: 'Complex Numbers', years: [2025],
    warningBody: 'Modulus of z = a+bi is always |z| = √(a²+b²). Students add |a|+|b| especially when a or b involves √.',
    preWarning: 'Modulus formula: |z| = √(a²+b²). Both parts must be SQUARED then added. For z=√3−i: |z|=√(3+1)=2, not √3+1.',
    question: 'Find |z₁| for z₁ = √3 − i',
    questionHint: 'a=√3, b=−1. Apply the Pythagorean formula.',
    mistakeLines: [
      { text: '|z₁| = √3 + 1 ✗', wrong: true, annotation: '← adding instead of √(a²+b²)' }
    ],
    mistakeExplanation: 'Must square each part first: (√3)²=3, (−1)²=1.',
    correctLines: [
      { text: '|z₁| = √((√3)² + (−1)²) = √(3+1) = 2  ✓', correct: true }
    ],
    correctExplanation: 'Both parts squared. |z₁|=2. Full marks.'
  },

  // ── DIFFERENTIAL EQUATIONS (2 patterns) ─────────────────────────────────

  {
    id: 'p029', order: 29,
    title: 'Wrong characteristic equation for 2nd order ODE',
    description: 'Not rearranging to standard form y\'\'+py\'+qy=0 before writing the characteristic equation.',
    risk: 'High risk', riskLevel: 'high', marks: '−3 marks avg', borderVariant: 'high',
    subject: 'Differential Equations', years: [2025],
    warningBody: 'In 2025, solving y\'\'=3y−2y\' required forming the characteristic equation. Students who skip rearranging to standard form get wrong roots and lose all subsequent marks.',
    preWarning: 'Always rearrange to y\'\'+py\'+qy=0 FIRST. Then write r²+pr+q=0. Never write the characteristic equation from a non-standard arrangement.',
    question: "Solve: y'' = 3y − 2y'",
    questionHint: 'Rearrange to standard form first. What are coefficients p and q?',
    mistakeLines: [
      { text: "Characteristic from y''=3y−2y': r²=3−2r ✗", wrong: true, annotation: '← must rearrange first' },
      { text: 'Wrong roots → wrong general solution ✗', wrong: true, annotation: '' }
    ],
    mistakeExplanation: 'Characteristic equation must come from standard form only.',
    correctLines: [
      { text: "Rearrange: y''+2y'−3y=0", correct: true },
      { text: 'r²+2r−3=0 → (r+3)(r−1)=0', correct: true },
      { text: 'r₁=−3, r₂=1 → y=C₁e⁻³ˣ+C₂eˣ  ✓', correct: true }
    ],
    correctExplanation: 'Standard form first. Correct roots. Full marks.'
  },

  {
    id: 'p030', order: 30,
    title: 'Stopping at general solution — not applying initial conditions',
    description: 'Finding y=C₁e⁻³ˣ+C₂eˣ and stopping without substituting y(0)=1 and y\'(1)=e.',
    risk: 'High risk', riskLevel: 'high', marks: '−3 marks avg', borderVariant: 'high',
    subject: 'Differential Equations', years: [2025],
    warningBody: 'In 2025, part b required the particular solution using y(0)=1 and y\'(1)=e. Students stop at the general solution and lose all marks from the initial condition step.',
    preWarning: 'General solution with C₁ and C₂ is NOT the final answer when initial conditions are given. You MUST substitute them to find C₁ and C₂.',
    question: "Find particular solution of y''+2y'−3y=0 with y(0)=1 and y'(1)=e",
    questionHint: 'Substitute x=0 into y, and x=1 into y\'. Solve the two equations for C₁ and C₂.',
    mistakeLines: [
      { text: 'y = C₁e⁻³ˣ + C₂eˣ  ← stops here ✗', wrong: true, annotation: '← general solution only — initial conditions not used' }
    ],
    mistakeExplanation: 'C₁ and C₂ are still unknown. Must substitute initial conditions.',
    correctLines: [
      { text: 'y(0)=1: C₁+C₂=1  ...(i)', correct: true },
      { text: "y'=−3C₁e⁻³ˣ+C₂eˣ", correct: true },
      { text: "y'(1)=e: −3C₁e⁻³+C₂e=e  ...(ii)", correct: true },
      { text: 'Solve: C₁=0, C₂=1 → y=eˣ  ✓', correct: true }
    ],
    correctExplanation: 'Initial conditions applied. C₁=0, C₂=1. Particular solution y=eˣ.'
  }

]
