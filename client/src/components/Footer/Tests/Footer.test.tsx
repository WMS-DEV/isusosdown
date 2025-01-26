import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";
import config from "../../../config.json";

describe("Footer", () => {
  it("renders correct content", () => {
    render(<Footer />);

    expect(screen.getByText((content) => {
      return content.includes(`Made with ❤ by ${config.authorName}`);
    })).toBeInTheDocument();

    expect(screen.getByText((content) => {
      return content.includes(config.wmsDevWebsiteLink)
    }
    )).toBeInTheDocument();

    expect(screen.getByText("Dołącz do nas!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dołącz do nas!" })).toBeInTheDocument()
  });
});
