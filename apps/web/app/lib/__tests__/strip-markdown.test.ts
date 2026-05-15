import { describe, expect, it } from "vitest";

import { stripMarkdown } from "../strip-markdown";

describe("stripMarkdown", () => {
  it("strips bold and links", () => {
    expect(stripMarkdown("**Bold** and [link](https://example.com)")).toBe("Bold and link");
  });

  it("strips headings and lists", () => {
    expect(stripMarkdown("# Title\n\n- item one")).toBe("Title item one");
  });
});
