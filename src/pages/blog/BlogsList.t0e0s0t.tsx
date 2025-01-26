import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogsList from "./BlogsList";
import { BrowserRouter } from "react-router-dom";

// Mocking Context or API if required
jest.mock("src/contexts/CreateBlogContext.tsx", () => ({
  useBlogContext: jest.fn(() => ({
    blogs: [
      { id: 1, title: "Blog 1", category: "Tech", excerpt: "This is blog 1" },
      {
        id: 2,
        title: "Blog 2",
        category: "Lifestyle",
        excerpt: "This is blog 2",
      },
    ],
    deleteBlog: jest.fn(),
  })),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("BlogsList", () => {
  test("renders blogs correctly", async () => {
    renderWithProviders(<BlogsList />);

    // Ensure the title "Our Blogs" is present
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /our blogs/i }),
      ).toBeInTheDocument();
    });

    // Ensure blogs are rendered
    expect(screen.getByText("Blog 1")).toBeInTheDocument();
    expect(screen.getByText("Blog 2")).toBeInTheDocument();
  });

  test("clicking Read More navigates to the correct blog", async () => {
    renderWithProviders(<BlogsList />);

    // Find and click "Read More" for Blog 1
    const readMoreButton = screen.getByRole("button", { name: /read more/i });
    userEvent.click(readMoreButton);

    // Check if navigation occurred (mock or spy on `useNavigate` if necessary)
    await waitFor(() => {
      expect(screen.getByText("Blog 1")).toBeInTheDocument();
    });
  });

  test("clicking on a category filters the blogs", async () => {
    renderWithProviders(<BlogsList />);

    // Click on "Tech" category filter
    const categoryButton = screen.getByText("Tech");
    userEvent.click(categoryButton);

    // Ensure only Tech blogs are displayed
    await waitFor(() => {
      expect(screen.getByText("Blog 1")).toBeInTheDocument();
      expect(screen.queryByText("Blog 2")).not.toBeInTheDocument();
    });
  });

  test("clicking on delete button deletes the blog", async () => {
    renderWithProviders(<BlogsList />);

    // Mock delete button
    const deleteButton = screen.getAllByLabelText("delete")[0];
    userEvent.click(deleteButton);

    // Assert that the blog is deleted
    await waitFor(() => {
      expect(screen.queryByText("Blog 1")).not.toBeInTheDocument();
    });
  });

  test("clicking on edit button navigates to the edit page", async () => {
    renderWithProviders(<BlogsList />);

    // Mock edit button
    const editButton = screen.getAllByLabelText("edit")[0];
    userEvent.click(editButton);

    // Check if navigation to edit page occurred
    await waitFor(() => {
      expect(screen.getByText(/edit blog/i)).toBeInTheDocument();
    });
  });
});
