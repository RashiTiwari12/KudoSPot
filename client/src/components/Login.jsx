import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useContext";

function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      document.cookie = `email=${email}`;
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setUser({ name: data.email });
        // On successful login, navigate to the kudolist/main page
        navigate("/kudoslist");
      } else {
        // If user not found
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-6 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
          >
            Login
          </button>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
