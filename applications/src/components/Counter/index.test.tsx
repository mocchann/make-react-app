import { render } from "@testing-library/react";
import { Counter } from ".";

describe("Counter component test", () => {
  test("p tag view test", () => {
    const result = render(<Counter />);
    expect(result.getByText("Welcome To Counter App")).toBeDefined();
  });

  test("Increment button view test", () => {
    const result = render(<Counter />);
    expect(result.getByText("Increment")).toBeDefined();
  });

  test("Increment button click test", () => {
    const counter = render(<Counter />);
    const button = counter.getByText("Increment");
    button.click();
    const result = render(<Counter />);
    expect(result.getByText("1")).toBeDefined();
  });

  test("Decrement button view test", () => {
    const result = render(<Counter />);
    expect(result.getByText("Decrement")).toBeDefined();
  });

  test("Decrement button click test", () => {
    const counter = render(<Counter />);
    const incrementButton = counter.getByText("Increment");
    incrementButton.click();
    const decrementButton = counter.getByText("Decrement");
    decrementButton.click();
    const result = render(<Counter />);
    expect(result.getByText("0")).toBeDefined();
  });
});
