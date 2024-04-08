import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, userName }),
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
      setError(json.error);
    }

    if (response.ok) {
      console.log(json);
      dispatch({ type: "LOGIN", payload: json });
      localStorage.setItem("user", JSON.stringify(json));
    }
  };

  return (
    <div className="bg-slate-500 text-white min-h-screen flex justify-center items-center">
      <form
        className="bg-gray-900 p-12 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h3 className="mb-6 text-lg font-semibold">Sign Up</h3>
        <div className="mb-4">
          <label className="block mb-1">Email address</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              className="absolute inset-y-0 right-2 m-1  bg-gray-800 text-white"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white border border-blue-500 rounded-md px-4 py-2 cursor-pointer"
          type="submit"
        >
          Sign up
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <div className="mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
