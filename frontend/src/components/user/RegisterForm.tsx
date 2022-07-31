import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  // The form will submit using fetch
  function submitFormHandler(e: any) {
    setIsInvalid(false)
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/register`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          // Reset input fields on form
          setName("");
          setEmail("");
          setPassword("");
          navigate('/login')
        }
        else {
          setIsInvalid(true)

        }
      })
      .catch((e) => {
        console.log(e)
        setIsInvalid(true)
      });

  }
  return (
    <Form onSubmit={submitFormHandler} autoComplete="off">
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="John"
          name="value"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          value={name}
          autoComplete="off"
        />
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="example@gmail.com"
          name="value"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          value={email}
          autoComplete="off"
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="01234"
          name="value"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          value={password}
        />
        {isInvalid && <p className="error" data-testId>Invalid Request</p>}
        <Button className="w-100  p-2 mt-3" type="submit">
          Register User
        </Button>
      </Form.Group>
    </Form>
  );
};
