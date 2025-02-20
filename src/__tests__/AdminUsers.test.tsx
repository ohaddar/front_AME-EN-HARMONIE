import { vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AdminUsers from "../pages/users/AdminUsers";

const mockApiClient = {
  get: vi.fn(),
};

vi.mock("../api/apiClient", () => ({
  __esModule: true,
  default: () => mockApiClient,
}));

describe("AdminUsers Component", () => {
  it("renders the title", () => {
    render(<AdminUsers />);
    const titleElement = screen.getByText(/Utilisateurs/i);
    expect(titleElement).toBeInTheDocument();
  });

  /* it("fetches and displays users", async () => {
    const usersData = [
      { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com" },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
      },
    ];

    mockApiClient.get.mockResolvedValueOnce({ data: usersData });

    render(<AdminUsers />);

    await waitFor(() => {
      expect(screen.getByText(/John Doe/)).toBeInTheDocument();
      expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
    });

    // eslint-disable-next-line no-console
    console.log(screen.debug());
  });*/

  it("displays an alert on fetch error", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    mockApiClient.get.mockRejectedValueOnce(new Error("Network error"));

    render(<AdminUsers />);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Access denied. You do not have the required permissions.",
      );
    });

    alertSpy.mockRestore();
  });
});
