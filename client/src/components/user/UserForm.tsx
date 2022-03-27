import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export const UserForm = (props: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // The form will submit using fetch
  function submitFormHandler(e: any) {
    e.preventDefault();
    fetch(`http://localhost:4100/api/v1/users/register`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      }),
    }).then((res: any) => {
      console.log(res.status)
      return res.json()
  })
      .then((res) => {
        if (res.status === 201) {
          // Reset input fields on form
          setName("");
          setEmail("");
          setPassword("");
        }
        else {

        }
      })
      .catch((e) => console.log(e));
     
  }
  return (
    <Form onSubmit={submitFormHandler}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Exchange amout"
          name="value"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Exchange amout"
          name="value"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Exchange amout"
          name="value"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button className="w-100 fs-3 p-0" type="submit">
          Register User
        </Button>
      </Form.Group>
    </Form>
  );
};
