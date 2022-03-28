import { Link } from "react-router-dom";
import { RegisterForm } from "../user/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="container">
      <h2 className="mb-4">Register new user</h2>
      <RegisterForm />
      <Link to="/login" className="link mt-4">
        Already have an account? login in
      </Link>
    </div>
  );
};
