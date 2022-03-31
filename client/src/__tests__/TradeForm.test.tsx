import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { TradeForm } from "../components/makeTrade/TradeForm";
import  user from '@testing-library/user-event'
import { MakeTrade } from "../components/makeTrade/MakeTrade";



describe("test Trade Form", () => {
  test("Accept only valid Input", async () => {
    const onSubmitHandler = jest.fn().mockImplementation(() => {
    });
    const { rerender } = render(
  <MakeTrade>
    <TradeForm onSubmit={onSubmitHandler} />
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
        <TradeForm onSubmit={onSubmitHandler} />
      </MakeTrade>
    );
    await waitFor(() => {
      expect(input).toHaveValue(6);
    });


    user.type(input, "test");
    rerender(
      <MakeTrade>
        <TradeForm onSubmit={onSubmitHandler} />
      </MakeTrade>
    );
    await waitFor(() => {
      expect(input).toHaveValue(0);
    });

  });

});