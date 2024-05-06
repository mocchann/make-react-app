import { render, RenderResult } from "@testing-library/react";
import { CounterTemplate } from ".";
import "@testing-library/jest-dom";

let counter: RenderResult;

describe("Counter component test", () => {
  afterEach(() => {
    counter.unmount();
  });

  test("p tag view test", async () => {
    counter = await render(<CounterTemplate />);

    expect(counter.getByText("Welcome To Counter App")).toBeDefined();
  });

  test("Increment button view test", async () => {
    counter = await render(<CounterTemplate />);

    expect(counter.getByText("Increment")).toBeDefined();
  });

  test("Increment button click test", async () => {
    counter = await render(<CounterTemplate />);
    const button = await counter.getByText("Increment");
    await button.click();

    expect(counter.getByText("1")).toBeDefined();
  });

  test("Decrement button view test", async () => {
    counter = await render(<CounterTemplate />);

    expect(counter.getByText("Decrement")).toBeDefined();
  });

  test("Decrement button click test", async () => {
    counter = await render(<CounterTemplate />);
    const incrementButton = await counter.getByText("Increment");
    await incrementButton.click();
    const decrementButton = await counter.getByText("Decrement");
    await decrementButton.click();

    expect(counter.getByText("0")).toBeDefined();
  });

  test("If the number is negative, the decrement button cannot be pressed.", async () => {
    counter = await render(<CounterTemplate />);
    const decrementButton = await counter.getByText("Decrement");
    await decrementButton.click();

    expect(counter.container.innerHTML.includes("-1")).toBeFalsy();
  });

  test("If 0, the decrement button cannot be pressed", async () => {
    counter = await render(<CounterTemplate />);
    const decrementButton = await counter.getByRole("button", {
      name: "Decrement",
    });

    expect(decrementButton).toBeDisabled();
  });

  test("Reset button view test", async () => {
    counter = await render(<CounterTemplate />);

    expect(counter.getByText("Reset")).toBeDefined();
  });

  test("Reset button click test", async () => {
    counter = await render(<CounterTemplate />);
    const incrementButton = await counter.getByText("Increment");
    await incrementButton.click();
    const resetButton = await counter.getByText("Reset");
    await resetButton.click();

    expect(counter.getByText("0")).toBeDefined();
  });

  test("If 0, the reset button cannot be pressed", async () => {
    counter = await render(<CounterTemplate />);
    const resetButton = await counter.getByRole("button", { name: "Reset" });

    expect(resetButton).toBeDisabled();
  });
});
