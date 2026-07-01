// Adjacency list for the 30 Math patterns.
// Each key lists the IDs of directly related patterns (1-hop BFS neighbors).
// Edges are bidirectional — if p001 lists p002, p002 also lists p001.
// Relationships are based on: shared subject, prerequisite dependency, overlapping exam technique.

export const patternGraph = {
  // ── Limits ──────────────────────────────────────────────────────────────
  p001: ['p002', 'p003', 'p004'],     // 0/0 factoring → rationalize, ∞/∞, L'Hôpital
  p002: ['p001', 'p003'],             // rationalize → factoring, ∞/∞
  p003: ['p001', 'p002', 'p005'],     // ∞/∞ → factoring, rationalize, eˣ limits
  p004: ['p001', 'p002', 'p029'],     // L'Hôpital → factoring, rationalize, ODE char eq (both use derivatives)
  p005: ['p003', 'p016'],             // eˣ limits → ∞/∞, eˣ integration

  // ── Function Study ───────────────────────────────────────────────────────
  p006: ['p007', 'p010', 'p013'],     // oblique asymptote → domain, one-sided limits, prove form
  p007: ['p006', 'p010', 'p012'],     // domain → asymptote, one-sided limits, ln domain
  p008: ['p009'],                     // tangent line → sign table (both use f'(x))
  p009: ['p008', 'p010', 'p011'],     // sign table → tangent, one-sided limits, area bounds
  p010: ['p001', 'p006', 'p007'],     // one-sided limits → 0/0 technique, asymptote, domain
  p011: ['p009', 'p014', 'p015'],     // area bounds → sign table, +C, combining fractions
  p012: ['p007'],                     // ln domain → general domain
  p013: ['p006'],                     // prove form → oblique asymptote (both use polynomial division)

  // ── Integration ──────────────────────────────────────────────────────────
  p014: ['p015', 'p016', 'p017'],     // +C → combining fractions, eˣ substitution, change bounds
  p015: ['p011', 'p014', 'p019'],     // combining fractions → area bounds, +C, sign 1/(a-x)
  p016: ['p005', 'p014', 'p017'],     // eˣ substitution → eˣ limits, +C, change bounds
  p017: ['p014', 'p016', 'p018'],     // change bounds → +C, eˣ sub, trig factoring
  p018: ['p014', 'p017'],             // trig factoring → +C, change bounds
  p019: ['p014', 'p015'],             // sign 1/(a-x) → +C, combining fractions

  // ── Probability ───────────────────────────────────────────────────────────
  p020: ['p021', 'p022', 'p023'],     // C vs P → wrong denominator, sequences, complement
  p021: ['p020', 'p023'],             // wrong denominator → C vs P, complement
  p022: ['p020'],                     // arithmetic vs geometric → C vs P
  p023: ['p020', 'p021'],             // complement → C vs P, wrong denominator

  // ── Conic Sections ────────────────────────────────────────────────────────
  p024: ['p025'],                     // parabola orientation → ellipse a²/b²
  p025: ['p024', 'p026'],             // ellipse a²/b² → parabola, eccentricity
  p026: ['p025'],                     // eccentricity → ellipse a²/b²

  // ── Complex Numbers ───────────────────────────────────────────────────────
  p027: ['p028'],                     // argument → modulus (both parts of polar form)
  p028: ['p027'],                     // modulus → argument

  // ── Differential Equations ────────────────────────────────────────────────
  p029: ['p004', 'p030'],             // char eq → L'Hôpital (derivatives), initial conditions
  p030: ['p029'],                     // initial conditions → char eq (same problem, part 2)
}
