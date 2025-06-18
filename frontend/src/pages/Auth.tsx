import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    name: "",
    registerEmail: "",
    registerPassword: "",
    loginEmail: "",
    loginPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setError("")
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(`Name: ${input.name}`);
    console.log(`Email: ${input.registerEmail}`);
    console.log(`Password: ${input.registerPassword}`);
    const user = {
      name: input.name,
      email: input.registerEmail,
      password: input.registerPassword,
    };
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || data.error ||  "Sign up failed");

      // alert(data.message || data.error);
      localStorage.setItem("token", data.token);
      setInput({
        name: "",
        registerEmail: "",
        registerPassword: "",
        loginEmail: "",
        loginPassword: "",
      });
      navigate("/dashboard");
    } catch (error) {
      // console.log(`Error registering: ${error}`);
      setError(`${error}`)
    }
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Email: ${input.loginEmail}`);
    console.log(`Password: ${input.loginPassword}`);
    const user = {
      email: input.loginEmail,
      password: input.loginPassword,
    };

    
    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });
      
      const data = await response.json();
          

      if (!response.ok) throw new Error(data.message || data.error ||  "Login failed");
      alert(data.message || data.error);
      localStorage.setItem("token", data.token);
      setInput({
        name: "",
        registerEmail: "",
        registerPassword: "",
        loginEmail: "",
        loginPassword: "",
      });
      navigate("/dashboard");
    } catch (error) {
      // console.log(`Error logging in: ${error}`);
      setError(`${error}`)
    }
  };
  return (
    <div>
      <div className=" p-5 ">
        {error && 
        <div className="text-red-600">{error}</div>
        }
        <div className="mb-5">
          <h2 className="font-bold underline">Signup</h2>
          <form action="" onSubmit={handleRegister}>
            <label htmlFor="" className="block my-1">
              Name :{" "}
              <input
                type="text"
                name="name"
                className="border"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="" className="block my-1">
              Email :{" "}
              <input
                type="email"
                name="registerEmail"
                className="border "
                onChange={handleChange}
              />
            </label>
            <label htmlFor="" className="block my-1">
              Password{" "}
              <input
                type="password"
                name="registerPassword"
                className="border"
                onChange={handleChange}
              />
            </label>

            <button type="submit" className="border p-1 cursor-pointer">
              Sign Up
            </button>
          </form>
        </div>
        <div className="mb-5">
          <h2 className="font-bold underline">Login</h2>
          <form action="" onSubmit={handleLogin}>
            <label htmlFor="" className="block my-1">
              Email :{" "}
              <input
                type="email"
                name="loginEmail"
                className="border "
                onChange={handleChange}
              />
            </label>
            <label htmlFor="" className="block my-1">
              Password{" "}
              <input
                type="password"
                name="loginPassword"
                className="border"
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="border p-1 cursor-pointer">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
