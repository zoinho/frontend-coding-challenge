import { render, screen } from "@testing-library/react";
import { PointsCounter } from "./PointsCounter";
import { testIds } from "@test/testIds";

describe("PointsCounter", () => {
  const renderPointsCounter = (totalPoints: number, usedPoints: number) => {
    render(<PointsCounter totalPoints={totalPoints} usedPoints={usedPoints} />);
  };

  it("render the component", () => {
    renderPointsCounter(5, 2);
    const counter = screen.getByTestId(testIds.pointsCounter);
    const points = screen.getByTestId(testIds.pointsCounterPoints);

    expect(counter).toBeInTheDocument();
    expect(points).toBeInTheDocument();
    expect(points).toHaveTextContent("2 / 5");
  });
});
