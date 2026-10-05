"use client";
import { useState } from "react";

export default function FinanceCalculator({ price }: { price: number }) {
  // useState remembers values the user can change
  const [down, setDown] = useState(0);
  const [apr, setApr] = useState(6.9);   // yearly interest rate (%)
  const [months, setMonths] = useState(60);

  const TAX = 0.13; // Ontario HST; change if needed
  const principal = Math.max(price * (1 + TAX) - down, 0); // amount borrowed
  const r = apr / 100 / 12;                                 // monthly rate

  // Standard loan formula: P * r / (1 - (1 + r)^-n)
  // If rate is 0 the formula divides by zero, so split evenly instead
  const payment =
    r === 0 ? principal / months : (principal * r) / (1 - Math.pow(1 + r, -months));
  const interest = payment * months - principal;

  // Formats numbers as $1,234.56
  const money = (n: number) =>
    n.toLocaleString("en-CA", { style: "currency", currency: "CAD" });

  const box = "rounded border border-brand-gray/30 bg-background p-2 text-foreground placeholder:text-muted focus:border-brand-cyan focus:outline-none";

  return (
    <div className="mt-8 rounded-lg border border-brand-gray/20 bg-white/5 p-4">
      <h2 className="mb-3 text-xl font-semibold">Financing Calculator</h2>

      <div className="grid gap-3 sm:grid-cols-3">
        <label>Down payment ($)
          <input type="number" min={0} value={down} className={box}
            onChange={(e) => setDown(Number(e.target.value))} />
        </label>
        <label>Interest rate (%)
          <input type="number" min={0} step="0.1" value={apr} className={box}
            onChange={(e) => setApr(Number(e.target.value))} />
        </label>
        <label>Term
          <select value={months} className={box}
            onChange={(e) => setMonths(Number(e.target.value))}>
            {[24, 36, 48, 60, 72, 84].map((m) => (
              <option key={m} value={m}>{m} months</option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-2xl font-bold text-brand-cyan">{money(payment)} / month</p>
      <p className="text-sm text-gray-500">
        Total interest: {money(interest)} (includes {TAX * 100}% tax)
      </p>
    </div>
  );
}