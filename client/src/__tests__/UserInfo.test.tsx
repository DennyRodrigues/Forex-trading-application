import { render, screen } from "@testing-library/react";
import { UserInfo } from "../components/user/UserInfo";
import React from "react"


let realUseContext:any;
let useContextMock:any;

// mock the user context
beforeEach(() => {
  realUseContext = React.useContext;
  useContextMock = React.useContext = jest.fn();
});
// Cleanup mock
afterEach(() => {
  React.useContext = realUseContext;
});

test("User Info display correct name and wallet value", () => {
  useContextMock.mockReturnValue({
    user: {
      name: "Test",
      wallet: {
        USD: 100,
        GBP: 200,
      },
    },
  });
  render(
      <UserInfo/>
  );
  expect(screen.getByText("User", { exact: false })).toHaveTextContent(
    "User:Test"
  );
  expect(screen.getByText("wallet:", { exact: false })).toHaveTextContent(
    "wallet:100.00USD200.00GBP"
  );




});
