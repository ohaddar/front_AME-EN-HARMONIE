import { render, screen } from "@testing-library/react";
import Root from "./Root";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { AuthProvider } from "src/contexts/AuthContext";

describe("Root component", () => {
  it("should render the Nav component", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });

  it("should render the Footer component", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  //   it("should render the Outlet component", async () => {
  //     render(
  //       <AuthProvider>
  //         <BrowserRouter>
  //           <Root />
  //         </BrowserRouter>
  //       </AuthProvider>,
  //     );
  //     await expect(screen.getByTestId("outlet")).toBeInTheDocument();
  //   });

  it("should apply correct styles to the main element", () => {
    const { container } = render(
      <AuthProvider>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </AuthProvider>,
    );
    const mainElement = container.querySelector("main");
    expect(mainElement).toHaveStyle({
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    });
  });
});
