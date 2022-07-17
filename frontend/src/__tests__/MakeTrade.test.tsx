import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import user from '@testing-library/user-event'
import { MakeTrade } from "../components/makeTrade/MakeTrade";
import React from "react"

let realUseContext: any;
let useContextMock: any;
// Setup mock
beforeEach(() => {
  realUseContext = React.useContext;
  useContextMock = React.useContext = jest.fn();
});
// Cleanup mock
afterEach(() => {
  React.useContext = realUseContext;
});
describe("test Make Trade component", () => {
  it("should keep input between 0 and 5000", async () => {

    const { rerender } = render(
      <MakeTrade>
      </MakeTrade>
    );

    const input = screen.getByPlaceholderText("entry amount", { exact: false });
    user.type(input, "-6");
    rerender(
      <MakeTrade>
      </MakeTrade>
    );

    await waitFor(() => {
      expect(input).toHaveValue(0)
    })

    user.type(input, "6");
    rerender(
      <MakeTrade>
      </MakeTrade>
    );
    await waitFor(() => {
      expect(input).toHaveValue(6);
    });

    user.type(input, "test");
    rerender(
      <MakeTrade>
      </MakeTrade>
    );
    await waitFor(() => {
      expect(input).toHaveValue(0);
    });
  });
  it("should make correct calculation", async () => {
    useContextMock.mockReturnValue(2);

    const { rerender } = render(<MakeTrade exitSymbol="JPY"></MakeTrade>);


    const input = screen.getByPlaceholderText("entry amount", { exact: false });
    const calculation = screen.getByTestId("calculation", { exact: false });

    user.type(input, "5");
    await waitFor(() => {
      expect(calculation).toHaveTextContent("10 JPY");
    });

    rerender(<MakeTrade exitSymbol={"USD"}></MakeTrade>);

    await waitFor(() => {
      expect(calculation).toHaveTextContent("2.5 USD");
    });

  });

});
