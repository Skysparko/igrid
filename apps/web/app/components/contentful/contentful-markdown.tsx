import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { normalizeContentfulMarkdown } from "~/lib/normalize-contentful-markdown";
import { cn } from "~/lib/utils";

export type ContentfulMarkdownVariant =
  | "hero"
  | "body"
  | "compact"
  | "muted"
  | "inline"
  | "inverse";

type ContentfulMarkdownProps = {
  content?: string | null;
  className?: string;
  variant?: ContentfulMarkdownVariant;
};

const variantRoot: Record<ContentfulMarkdownVariant, string> = {
  hero: "text-lg leading-relaxed text-gray-500 sm:text-xl [&_p]:mb-3 [&_p:last-child]:mb-0",
  body: "text-base leading-relaxed text-slate-600 [&_p]:mb-3 [&_p:last-child]:mb-0",
  compact: "text-sm leading-relaxed text-gray-500 sm:text-[15px] [&_p]:mb-2 [&_p:last-child]:mb-0",
  muted: "text-sm leading-relaxed text-gray-500 [&_p]:mb-2 [&_p:last-child]:mb-0",
  inline: "inline text-inherit [&_p]:inline [&_p]:mb-0",
  inverse:
    "text-lg leading-relaxed text-primary-100 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-white [&_a]:text-white [&_a]:underline",
};

function buildComponents(variant: ContentfulMarkdownVariant): Components {
  const isInline = variant === "inline";
  const isInverse = variant === "inverse";
  const primaryText = isInverse ? "text-white" : "text-gray-900";
  const secondaryText = isInverse ? "text-primary-100" : "text-slate-600";
  const subtleBg = isInverse ? "bg-white/10" : "bg-gray-50";
  const linkClass = isInverse
    ? "font-medium text-white underline underline-offset-2 hover:text-primary-50"
    : "font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700";

  return {
    p: ({ children }) =>
      isInline ? (
        <span className="leading-relaxed">{children}</span>
      ) : (
        <p className="leading-relaxed">{children}</p>
      ),
    h1: ({ children }) => (
      <h3
        className={cn(
          "mb-3 mt-4 text-2xl font-semibold tracking-tight first:mt-0 sm:text-3xl",
          primaryText,
        )}
      >
        {children}
      </h3>
    ),
    h2: ({ children }) => (
      <h3
        className={cn(
          "mb-3 mt-4 text-xl font-semibold tracking-tight first:mt-0 sm:text-2xl",
          primaryText,
        )}
      >
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className={cn("mb-2 mt-4 text-lg font-semibold first:mt-0", primaryText)}>{children}</h4>
    ),
    h4: ({ children }) => (
      <h5 className={cn("mb-2 mt-3 text-base font-semibold first:mt-0", primaryText)}>
        {children}
      </h5>
    ),
    strong: ({ children }) => (
      <strong className={cn("font-semibold", primaryText)}>{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    del: ({ children }) => <del className={cn("line-through", secondaryText)}>{children}</del>,
    blockquote: ({ children }) => (
      <blockquote
        className={cn("my-4 border-l-4 border-primary-500 px-4 py-2 italic", subtleBg, primaryText)}
      >
        {children}
      </blockquote>
    ),
    hr: () => <hr className={cn("my-6", isInverse ? "border-white/20" : "border-gray-200")} />,
    ul: ({ children }) => (
      <ul className="mb-3 list-disc space-y-1.5 pl-5 marker:text-primary-600">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-3 list-decimal space-y-1.5 pl-5 marker:text-primary-600">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className={cn("rounded px-1.5 py-0.5 font-mono text-sm", subtleBg)}>{children}</code>
    ),
    pre: ({ children }) => (
      <pre className={cn("my-4 overflow-x-auto rounded-lg p-4 text-sm", subtleBg)}>{children}</pre>
    ),
  };
}

export function ContentfulMarkdown({
  content,
  className,
  variant = "body",
}: ContentfulMarkdownProps) {
  const text = content?.trim();
  if (!text) return null;

  const markdown = normalizeContentfulMarkdown(text);

  return (
    <div className={cn("contentful-markdown max-w-none", variantRoot[variant], className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={buildComponents(variant)}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
