import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { AuthContext } from "../authentication/AuthContext";

export const LoginForm = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let onLogin = useContext(AuthContext)?.onLogin;

  // The form will submit using fetch
  function submitFormHandler(e: any) {
    e.preventDefault();
    fetch(`http://localhost:4100/api/v1/users/login`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res: any) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.status === "success") {
          // Add token to AuthContext
          if (onLogin) {
            onLogin(res.result);
          }
        } else {
        }
      })
      .catch((e) => console.log(e));
  }
  return (
    <Form onSubmit={submitFormHandler}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Email"
          name="value"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="password"
          name="value"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button className="w-100 fs-3 p-0" type="submit">
          Login In
        </Button>
      </Form.Group>
    </Form>
  );
};
