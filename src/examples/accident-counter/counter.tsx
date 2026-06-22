import { useState } from 'react';
import { Card } from '$/common/components/card';
import { Button } from './button';

export const Counter = () => {
  // REVISION NOTE — useState:
  // `count` is the current value, `setCount` is the only way to change it.
  // The <number> tells TypeScript this state is always a number.
  const [count, setCount] = useState<number>(0);

  // The text typed into the input. We keep it as a string because <input> values
  // are always strings — we convert to a number only when the user submits.
  const [draft, setDraft] = useState<string>('');

  // REVISION NOTE — updater function:
  // When the next value depends on the previous one, pass a function to setCount.
  // React gives you the latest value as `prev`, avoiding stale-state bugs.
  const increment = () => setCount((prev) => prev + 1);

  // Don't let the counter go below 0 — Math.max keeps it at 0 or higher.
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));

  const reset = () => setCount(0);

  // REVISION NOTE — typed events:
  // A form submit handler receives a typed React.FormEvent.
  // e.preventDefault() stops the browser from reloading the page.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = Number(draft);
    // Number('') is 0 and Number('abc') is NaN — guard against bad input.
    if (!Number.isNaN(parsed)) {
      setCount(Math.max(0, parsed));
    }
    setDraft(''); // clear the input after updating
  };

  return (
    <Card className="border-primary-500 flex w-2/3 flex-col items-center gap-8">
      <h1>Days Since the Last Accident</h1>

      {/* The count is now driven by state instead of a hardcoded 0 */}
      <p className="text-6xl">{count}</p>

      {/* REVISION NOTE — conditional rendering: show a message only at 0 */}
      {count === 0 && <p className="text-red-500">💥 Oops! Let&apos;s start fresh.</p>}

      <div className="flex gap-2">
        {/* Each Button gets an onClick handler — that's what was missing before */}
        <Button variant="neutral" onClick={decrement} disabled={count === 0}>
          ➖ Decrement
        </Button>
        <Button variant="danger" onClick={reset}>
          🔁 Reset
        </Button>
        <Button variant="primary" onClick={increment}>
          ➕ Increment
        </Button>
      </div>

      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        {/* REVISION NOTE — controlled input:
            `value` comes from state and `onChange` writes back to state.
            React is the single source of truth for what's in the box. */}
        <input
          className="ring-primary-600 focus:border-primary-800 rounded border border-slate-500 px-4 py-2 outline-none focus:ring-2"
          type="number"
          min={0}
          placeholder="Set a number"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <Button type="submit">Update Counter</Button>
      </form>
    </Card>
  );
};
