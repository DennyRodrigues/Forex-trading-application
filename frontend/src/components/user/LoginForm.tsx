import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authentication/AuthContext";

export const LoginForm = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);


  let onLogin = useContext(AuthContext)?.onLogin;

  // The form will submit using fetch
  function submitFormHandler(e: any) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/login`, {
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
        if (res.status === "success") {
          // Add token to AuthContext
          if (onLogin) {
            onLogin(res.result);
          }
        } else {
          setIsInvalid(true)
        }
      })
      .catch((e) => {
        console.log(e);
        setIsInvalid(true)
      });
  }
  return (
    <Form onSubmit={submitFormHandler} autoComplete="off">
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Email"
          name="value"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoComplete="off"
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="password"
          name="value"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          autoComplete="off"
        />
        {isInvalid && (
          <p className="error" data-testid="error">
            Invalid Request
          </p>
        )}
        <Button
          className="w-100 fs-3 p-0 mt-3"
          type="submit"
          role="SubmitButton"
        >
          Login In
        </Button>
      </Form.Group>
    </Form>
  );
};
