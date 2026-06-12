import { jobFilterSchema } from "@/lib/validation";

// Integration-level test: exercises the real zod schema used by the jobs filter.
// Runs in the node environment (TEST_ENV=integration), no DB required.
describe("jobFilterSchema (integration)", () => {
  it("coerces the `remote` flag and keeps provided filters", () => {
    const parsed = jobFilterSchema.parse({ q: "developer", remote: "true" });
    expect(parsed.q).toBe("developer");
    expect(parsed.remote).toBe(true);
  });

  it("accepts an empty filter object", () => {
    expect(() => jobFilterSchema.parse({})).not.toThrow();
  });
});
