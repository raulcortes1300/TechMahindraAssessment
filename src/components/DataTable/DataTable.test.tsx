import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import DataTable from "./DataTable";

jest.mock("../../api/api", () => ({
  fetchData: jest.fn(),
  deleteUser: jest.fn(),
}));

describe("DataTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //   it("renders DataTable component correctly", async () => {
  //     const { getByLabelText, getByText } = render(<DataTable />);

  //     // Ensure FilterInput is rendered
  //     expect(getByLabelText("Filter:")).toBeInTheDocument();

  //     // Ensure table headers are rendered
  //     expect(getByText("ID")).toBeInTheDocument();
  //     expect(getByText("Email")).toBeInTheDocument();
  //     expect(getByText("First Name")).toBeInTheDocument();
  //     expect(getByText("Last Name")).toBeInTheDocument();
  //     expect(getByText("Avatar")).toBeInTheDocument();
  //     expect(getByText("Actions")).toBeInTheDocument();

  //     // Ensure Pagination is rendered
  //     expect(getByText("1")).toBeInTheDocument(); // Assuming the default page is 1
  //   });

  it("fetches and displays user data", async () => {
    const mockData = {
      data: [
        {
          id: 1,
          email: "test@example.com",
          first_name: "John",
          last_name: "Doe",
          avatar: "avatar.jpg",
        },
      ],
      page: 1,
      total_pages: 1,
    };

    jest
      .spyOn(require("../../api/api"), "fetchData")
      .mockResolvedValueOnce(mockData);

    const { getByText } = render(<DataTable />);

    await waitFor(() =>
      expect(getByText("test@example.com")).toBeInTheDocument()
    );
  });

  it("filters users based on input", async () => {
    const mockData = {
      data: [
        {
          id: 1,
          email: "test@example.com",
          first_name: "John",
          last_name: "Doe",
          avatar: "avatar.jpg",
        },
        {
          id: 2,
          email: "another@example.com",
          first_name: "Jane",
          last_name: "Doe",
          avatar: "avatar.jpg",
        },
      ],
      page: 1,
      total_pages: 1,
    };

    jest
      .spyOn(require("../../api/api"), "fetchData")
      .mockResolvedValueOnce(mockData);

    const { getByLabelText, getByText, queryByText } = render(<DataTable />);

    await waitFor(() =>
      expect(getByText("test@example.com")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(getByText("another@example.com")).toBeInTheDocument()
    );

    fireEvent.change(getByLabelText("Filter:"), { target: { value: "John" } });

    await waitFor(() =>
      expect(getByText("test@example.com")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(queryByText("another@example.com")).not.toBeInTheDocument()
    );
  });
});
