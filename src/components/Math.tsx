import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathProps {
  children: string;
  display?: boolean;
}

export function Math({ children, display = false }: MathProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(children, ref.current, {
        displayMode: display,
        throwOnError: false,
      });
    }
  }, [children, display]);

  return display ? (
    <div className="katex-display my-4 overflow-x-auto">
      <span ref={ref} />
    </div>
  ) : (
    <span ref={ref} />
  );
}

interface MathBlockProps {
  children: string;
}

export function MathBlock({ children }: MathBlockProps) {
  return <Math display>{children}</Math>;
}
