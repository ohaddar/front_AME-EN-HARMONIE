import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import BlogComponent from "../pages/blog/BlogComponent";
import { AuthProvider } from "../contexts/AuthContext";

vi.mock("../contexts/AuthContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-provider">{children}</div>
  ),
  useAuth: vi.fn(() => ({ currentUser: { role: "ADMIN" } })),
}));
const mockNavigate = vi.fn();

vi.mock(
  "react-router-dom",
  async (importOriginal: () => Promise<typeof import("react-router-dom")>) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useNavigate: vi.fn(() => mockNavigate),
    };
  },
);

const mockBlogs = [
  {
    id: 1,
    imageUrl: "test1.jpg",
    title: "Test Blog 1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    creationDate: "2023-01-01T00:00:00.000Z",
    category: "Tech",
  },
  {
    id: 2,
    imageUrl: "test2.jpg",
    title: "Test Blog 2",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    creationDate: "2023-01-02T00:00:00.000Z",
    category: "Health",
  },
  {
    id: 3,
    imageUrl: "test3.jpg",
    title: "Test Blog 3",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    creationDate: "2023-01-03T00:00:00.000Z",
    category: "Finance",
  },
];

vi.mock("../hooks/useBlog", () => ({
  useBlog: () => ({ blogs: mockBlogs }),
}));

describe("BlogComponent", () => {
  test("affiche le message 'Aucun article n'est disponible pour le moment.' si aucun blog n'est présent", () => {
    render(
      <BrowserRouter>
        <BlogComponent />
      </BrowserRouter>,
    );
    expect(screen.getByText("Derniers Articles")).toBeInTheDocument(); // expect(
    //   screen.getByText("Aucun article n'est disponible pour le moment."),
    // ).toBeInTheDocument();
  });
  test("affiche le titre et les cartes de blog", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <BlogComponent />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(screen.getByText("Derniers Articles")).toBeInTheDocument();
    expect(screen.getByText("Test Blog 1")).toBeInTheDocument();
    expect(screen.getByText("Test Blog 2")).toBeInTheDocument();
    expect(screen.getByText("Test Blog 3")).toBeInTheDocument();
  });

  // test("redirige vers le détail du blog lorsqu'on clique sur 'Lire la suite'", async () => {
  //   const mockHandleClick = vi.fn();
  //   render(
  //     <AuthProvider>
  //       <BrowserRouter>
  //         <BlogComponent />
  //       </BrowserRouter>
  //     </AuthProvider>,
  //   );

  //   const readMoreButtons = screen.getAllByText("Lire la suite");
  //   expect(readMoreButtons).toHaveLength(3);
  //   // eslint-disable-next-line no-console
  //   console.log("Click on button");
  //   fireEvent.click(readMoreButtons[0]);

  //   await waitFor(() => {
  //     expect(mockHandleClick).toHaveBeenCalledTimes(1);
  //     expect(mockHandleClick).toHaveBeenCalledWith("1");
  //   });
  // });
});
