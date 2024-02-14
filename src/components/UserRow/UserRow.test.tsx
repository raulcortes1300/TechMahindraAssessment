import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserRow from "./UserRow";

const mockUser = {
  id: 1,
  email: "test@example.com",
  first_name: "John",
  last_name: "Doe",
  avatar: "https://example.com/avatar.jpg",
};

const mockOnDelete = jest.fn();

beforeEach(() => {
  mockOnDelete.mockClear();
});

test("renders user data", () => {
  render(<UserRow user={mockUser} onDelete={mockOnDelete} />);

  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("test@example.com")).toBeInTheDocument();
  expect(screen.getByText("John")).toBeInTheDocument();
  expect(screen.getByText("Doe")).toBeInTheDocument();
  expect(screen.getByAltText("Avatar of John")).toBeInTheDocument();
});

test("calls onDelete function when delete button is clicked", () => {
  render(<UserRow user={mockUser} onDelete={mockOnDelete} />);

  fireEvent.click(screen.getByText("Delete"));

  expect(mockOnDelete).toHaveBeenCalledWith(1);
});
