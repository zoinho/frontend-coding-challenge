import { render, screen } from '@testing-library/react';
import App from './App';
import { testIds } from '@test/testIds';

describe("main component" , ()=> {
  const renderApp = () => {render(<App />)}
  it("should render test component", () => {
    renderApp();
    const test = screen.getByTestId(testIds.main)

    expect(test).toBeInTheDocument();

  })
})