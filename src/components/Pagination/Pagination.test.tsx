import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  it("calls onPageChange correctly on button clicks", () => {
    const onPageChangeMock = jest.fn();
    const currentPage = 3;
    const totalPages = 5;

    const { getByText } = render(
      <Pagination
        onPageChange={onPageChangeMock}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    );

    fireEvent.click(getByText("Previous Page"));
    expect(onPageChangeMock).toHaveBeenCalledWith(currentPage - 1);

    fireEvent.click(getByText("Next Page"));
    expect(onPageChangeMock).toHaveBeenCalledWith(currentPage + 1);
  });

  it('disables the "Previous Page" button when on the first page', () => {
    const onPageChangeMock = jest.fn();
    const currentPage = 1;
    const totalPages = 5;

    const { getByText } = render(
      <Pagination
        onPageChange={onPageChangeMock}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    );

    const previousButton = getByText("Previous Page");
    expect(previousButton).toBeDisabled();

    fireEvent.click(previousButton);
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it('disables the "Next Page" button when on the last page', () => {
    const onPageChangeMock = jest.fn();
    const currentPage = 5;
    const totalPages = 5;

    const { getByText } = render(
      <Pagination
        onPageChange={onPageChangeMock}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    );

    const nextButton = getByText("Next Page");
    expect(nextButton).toBeDisabled();

    fireEvent.click(nextButton);
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });
});
