import { describe, expect, it } from "vitest";

import { normalizeContentfulMarkdown } from "../normalize-contentful-markdown";

describe("normalizeContentfulMarkdown", () => {
  it("removes stray __ lines", () => {
    expect(normalizeContentfulMarkdown("Hello\n__\nWorld")).toBe("Hello\n\nWorld");
  });

  it("fixes blockquote before numbered list", () => {
    const input = "> Quote line\n\n>\n\n1. First step";
    expect(normalizeContentfulMarkdown(input)).toContain("1. First step");
  });

  it("collapses excessive blank lines", () => {
    expect(normalizeContentfulMarkdown("a\n\n\n\nb")).toBe("a\n\nb");
  });
});
