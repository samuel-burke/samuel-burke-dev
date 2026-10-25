import { describe, expect, it } from "vitest";
import { eggFor } from "@/components/command-menu";

describe("eggFor (hidden ⌘K commands)", () => {
  it("stays hidden for empty and short queries", () => {
    expect(eggFor("")).toBeUndefined();
    expect(eggFor("   ")).toBeUndefined();
    expect(eggFor("cloc")).toBeUndefined();
    expect(eggFor("sudo")).toBeUndefined();
  });

  it("appears once the query spells five characters of a command", () => {
    expect(eggFor("clock")).toBe("clock in");
    expect(eggFor("sudo ")).toBeUndefined(); // trimmed back to four characters
    expect(eggFor("sudo h")).toBe("sudo hire samuel");
    expect(eggFor("engra")).toBe("engrave");
  });

  it("matches the full command", () => {
    expect(eggFor("clock in")).toBe("clock in");
    expect(eggFor("sudo hire samuel")).toBe("sudo hire samuel");
    expect(eggFor("engrave")).toBe("engrave");
  });

  it("ignores case, outer whitespace and repeated inner spaces", () => {
    expect(eggFor("  CLOCK   IN ")).toBe("clock in");
    expect(eggFor("Sudo\tHire")).toBe("sudo hire samuel");
  });

  it("only matches prefixes, never substrings or longer input", () => {
    expect(eggFor("hire samuel")).toBeUndefined();
    expect(eggFor("engraved")).toBeUndefined();
    expect(eggFor("clock out")).toBeUndefined();
  });
});
