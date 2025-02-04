import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  test("renders About Us section", () => {
    render(<Footer />);

    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  });

  test("renders Quick Links with expected links", () => {
    render(<Footer />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Blog/i)).toBeInTheDocument();
    expect(screen.getByText(/Connecter/i)).toBeInTheDocument();
  });

  test("renders Contact section with address, email, and phone number", () => {
    render(<Footer />);
    expect(screen.getByText(/1234 Street Name/i)).toBeInTheDocument();
    expect(screen.getByText(/info@mywebsite.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\(123\) 456-7890/i)).toBeInTheDocument();
  });

  test("renders social media icons with links", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
  });

  test("renders copyright text with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear}`, "i")),
    ).toBeInTheDocument();
  });
});
