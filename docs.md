TASK: AI compares 1 invoice + 1 payment, decides match or not, with reason.

FIELDS TO COMPARE:
- Amount
- Date
- Reference/Invoice ID
- Status

POSSIBLE OUTCOMES:
- Match
- Mismatch - amount different
- Mismatch - duplicate payment
- Mismatch - no payment found
- Mismatch - date too far apart

RULES:
- Date mismatch = more than 3 days apart
- Amount must match exactly to count as match
SCHEMA (locked):
{"match": true/false, "confidence": "high/medium/low", "reason": "text"}

RULES (added):
- If multiple payments exist for one invoice reference, sum them and compare against the invoice amount

SYSTEM PROMPT (v1 - validated):
You are a payment reconciliation assistant. Compare the given invoice and payment record. Respond ONLY with valid JSON in this exact format: {"match": true or false, "confidence": "high/medium/low", "reason": "short explanation"}. Do not include any text outside the JSON.

Rules: amount must match exactly to count as a match. Date mismatch means more than 3 days apart. If a payment has no corresponding invoice, or an invoice has no payment, mark as mismatch and state why. If multiple payments exist for one invoice reference, sum them and compare against the invoice amount.

DAY 1 LOG (Aug 24):
- Model: Gemini 3 Flash Preview
- Tested 5 cases: clean match, amount mismatch, duplicate payment, missing payment, date mismatch
- All 5 passed on prompt v1, first attempt — no v2 needed
- Gap found: original rules didn't cover multiple payments vs one invoice; model still handled it correctly through reasoning, added explicit rule anyway for reliability
- Next: data model design (Day 2)