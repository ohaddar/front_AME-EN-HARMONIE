import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import DataView from "../components/common/DataView";

describe("DataView Component", () => {
  const sampleCols = [
    { field: "name", headerName: "Name" },
    { field: "age", headerName: "Age" },
  ];

  const sampleData = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 40 },
    { name: "Eve", age: 45 },
  ];

  test("should render the data grid with correct columns and data", () => {
    render(<DataView cols={sampleCols} data={sampleData} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  test("should render correct pagination controls", async () => {
    render(<DataView cols={sampleCols} data={sampleData} />);

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBe(6);
    });
  });

  test("should handle pagination correctly", async () => {
    render(<DataView cols={sampleCols} data={sampleData} />);

    const nextPageButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBe(6);
    });
  });

  test("should handle empty data correctly", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const emptyData: any[] = [];
    render(<DataView cols={sampleCols} data={emptyData} />);

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(1);
  });
});
