// import { render, screen } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
// import RoutesConfig from "./routeConfig";

// jest.mock("../../contexts/AuthContext");

// const mockedUseAuth = useAuth as jest.Mock;

// describe("RoutesConfig", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   const renderWithRouter = (initialRoute: string) => {
//     return render(
//       <MemoryRouter initialEntries={[initialRoute]}>
//         <RoutesConfig />
//       </MemoryRouter>,
//     );
//   };

//   it("redirects to user dashboard for a logged-in user with USER role", () => {
//     mockedUseAuth.mockReturnValue({
//       currentUser: { role: "USER" },
//     });

//     renderWithRouter("/");

//     expect(screen.getByText("Home"));
//   });
// });
