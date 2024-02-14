import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import FilterInput from "./FilterInput";

describe("FilterInput", () => {
  test("renders FilterInput component", () => {
    const { getByLabelText } = render(
      <FilterInput onFilterChange={() => {}} filterValue="" />
    );
    const filterInputLabel = getByLabelText("Filter:");

    expect(filterInputLabel).toBeInTheDocument();
  });

  test("calls onFilterChange with the correct value on input change", () => {
    const onFilterChangeMock = jest.fn();
    const { getByLabelText } = render(
      <FilterInput onFilterChange={onFilterChangeMock} filterValue="" />
    );
    const filterInput = getByLabelText("Filter:");

    fireEvent.change(filterInput, { target: { value: "new value" } });

    expect(onFilterChangeMock).toHaveBeenCalledWith("new value");
  });

  test("displays the correct filterValue in the input", () => {
    const { getByLabelText } = render(
      <FilterInput onFilterChange={() => {}} filterValue="example" />
    );
    const filterInput = getByLabelText("Filter:");

    expect(filterInput).toHaveValue("example");
  });
});
