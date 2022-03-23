import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRef } from 'react';


export const TradeForm = (props: any) => {

  function submitForm(e:any) {
    e.preventDefault()

    console.log(e);
    
    fetch(`http://localhost:4000/api/v1/trade`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        value: 52353,

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
          value={props.entryAmount}
        />
        <Button className="w-100 fs-3 p-0" type="submit">
          Trade
        </Button>
      </Form.Group>
    </Form>
  );
};