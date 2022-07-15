import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { PastTrades } from "../components/pastTrades/PastTrades";




describe("test past trades", () => {
  it("Should Render correct text when trades is empty", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ result: { trades: [] } }),
      })
    ) as jest.Mock;
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<PastTrades />);
    });
    await waitFor(async () => {
      expect(
        screen.getByText("No past trades were found", { exact: false })
      ).toBeInTheDocument();
    });
  });
  it("Should Render correct text when servers sends invalid response", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ result: { test: [] } }),
      })
    ) as jest.Mock;
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<PastTrades />);
    });
    await waitFor(async () => {
      expect(
        screen.getByText("ERROR: Unable to connect with server", {
          exact: false,
        })
      ).toBeInTheDocument();
    });
  });
  it("Should Render trades when servers sends a valid response", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            result: {
              trades: [
                {
                  _id: "test",
                  date: "2022-03-30T17:29:08.370Z",
                  entrySymbol: "entrySymbolTest",
                  exitSymbol: "exitSymbolTest",
                  exchangeRate: 1,
                  entryAmount: 10,
                  exitAmount: 20,
                },
              ],
            },
          }),
      })
    ) as jest.Mock;
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<PastTrades />);
    });
      expect(
        screen.getByText("entrySymbolTest", {
          exact: false,
        })
      ).toBeInTheDocument();
    expect(
      screen.getByText("exitSymbolTest", {
        exact: false,})).toBeInTheDocument();
  });

});
