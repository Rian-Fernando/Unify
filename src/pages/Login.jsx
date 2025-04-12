import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect to homepage if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("🎉 Account created!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        onAuthStateChanged(auth, (user) => {
          if (user) {
            navigate("/");
          }
        });
      }
    } catch (err) {
      console.error(err);
      setError(`Firebase: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-gray-100 to-gray-200 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          {isSignUp ? "🔐 Create an Account" : "🔓 Log In to Unify"}
        </h1>
        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Adelphi Email</label>
            <input
              type="email"
              placeholder="yourname@mail.adelphi.edu"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-medium shadow-md transition-all duration-150"
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-5 text-blue-600 text-sm text-center w-full hover:underline"
        >
          {isSignUp
            ? "👤 Already a member? Log in"
            : "🆕 New to Unify? Create an account"}
        </button>
      </div>
    </div>
  );
};

export default Login;