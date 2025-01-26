import { fireEvent, render, screen } from "@testing-library/react";
import { RedirectButton } from "./RedirectButton";

const mockPathname = jest.fn();
Object.defineProperty(window, "location", {
  value: {
    get pathname() {
      return mockPathname();
    },
  },
});


const spyWindowOpen = jest.spyOn(window, "open");
spyWindowOpen.mockImplementation(jest.fn());

describe("Redirect WmsLogoButton", () => {
  it.each([
    ["", ""],
    ["/", "/"],
    ["button", "button"],
    ["/button", "/button"],
  ])("should render a label", (test: string, expected: string) => {
    render(<RedirectButton label={test} destination={""} />);
    expect(screen.getByRole("button")).toHaveTextContent(expected);
  });


  it.each([
    ["www.google.com", "www.google.com"],
    ["localhost", "localhost"],
    ["", ""],
  ])("should open new window on specific paths", async (test:string, expected) => {
    render(<RedirectButton label={test} destination={expected} />);
    const button = screen.getByRole("button");

    mockPathname.mockReturnValue(test);
    await fireEvent.click(button);
    expect(spyWindowOpen).toHaveBeenCalledTimes(1);
    expect(window.location.pathname).toBe(expected)

  });
});
