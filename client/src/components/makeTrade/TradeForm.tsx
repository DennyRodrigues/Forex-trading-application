import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthContext";

export const TradeForm = (props: any) => {
  let token = useContext(AuthContext)?.token;

  const entryAmount = props.entryAmount;
  // The form will submit using fetch
  function submitForm(e:any) {
    e.preventDefault()

    
    fetch(`http://localhost:4100/api/v1/trades`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        value: entryAmount,
      }),
    })
      .then((res: any) => res.json())
      .then((res) => console.log(res))
      .catch((e) => console.log(e));

  }
  return (
    <Form onSubmit={submitForm}>
      <Form.Group>
        <Form.Label>Pound sterling(GBP) to US Dollar(USD):</Form.Label>
        <Form.Control
          type="number"
          placeholder="Exchange amout"
          name="value"
          onChange={props.changeHandler}
          value={entryAmount}
        />
        <Button className="w-100 fs-3 p-0" type="submit">
          Trade
        </Button>
      </Form.Group>
    </Form>
  );
};