import { RequireAuth } from "../authentication/RequireAuth";
import { PastTrades } from "../pastTrades/PastTrades";

export const PastTradesPage = () => {
  return (
    <RequireAuth>
      <div className="container">
        <PastTrades />
      </div>
    </RequireAuth>
  );
};
