import { render, screen } from "@testing-library/react";
import config from "../../../config.json";
import {SlimFooter} from "../SlimFooter";

describe("SlimFooter", () => {
  it("Test WMS Love", () => {
    render(<SlimFooter />);
    expect(
      screen.getByText((content) => {
        return content.includes(`Made with ❤ by ${config.authorName}`);
      })
    ).toBeInTheDocument();
  });
});
