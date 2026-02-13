import { describe, it, expect } from "vitest";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["employer", "seeker"]),
});

describe("register validation", () => {
  it("accepts valid input", () => {
    const result = registerSchema.safeParse({
      username: "John",
      email: "john@example.com",
      password: "securepass",
      role: "seeker",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short password", () => {
    const result = registerSchema.safeParse({
      username: "John",
      email: "john@example.com",
      password: "123",
      role: "seeker",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = registerSchema.safeParse({
      username: "John",
      email: "not-an-email",
      password: "securepass",
      role: "seeker",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid role", () => {
    const result = registerSchema.safeParse({
      username: "John",
      email: "john@example.com",
      password: "securepass",
      role: "admin",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing username", () => {
    const result = registerSchema.safeParse({
      username: "",
      email: "john@example.com",
      password: "securepass",
      role: "seeker",
    });
    expect(result.success).toBe(false);
  });
});
