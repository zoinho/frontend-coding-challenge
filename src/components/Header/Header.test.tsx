import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { testIds } from "@test/testIds";

describe("Header component", () => {
  const renderHeader = (content: string) => {
    render(<Header content={content} />);
  };
  it("render component", () => {
    const text = "Test header";
    renderHeader(text);

    const header = screen.getByTestId(testIds.header);
    const headerContent = screen.getByTestId(testIds.headerContent);

    expect(header).toBeInTheDocument();
    expect(headerContent).toBeInTheDocument();
    expect(headerContent).toHaveTextContent(text);
  });
});
