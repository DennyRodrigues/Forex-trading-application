import { LoginForm } from "../components/user/LoginForm";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div className="container">
      <h2 className="mb-4">Login</h2>
      <LoginForm />
      <Link to="/register" className="link mt-4">New? Register now</Link>
    </div>
  );
}
