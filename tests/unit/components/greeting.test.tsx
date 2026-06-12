import { render, screen } from "@testing-library/react";

// Self-contained smoke test that proves the RTL + jsdom + jest-dom + JSX
// pipeline works without depending on ESM-only component dependencies.
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>;
}

describe("Greeting (RTL smoke test)", () => {
  it("renders an accessible heading", () => {
    render(<Greeting name="Skills&Work" />);
    expect(
      screen.getByRole("heading", { name: /hello, skills&work/i })
    ).toBeInTheDocument();
  });
});
