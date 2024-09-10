import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app, auth } from "./firebase";

function App() {
  const [count, setCount] = useState(0);
  const handleSignIn = async () => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      "user@gmail.com",
      "123456"
    );
    const user = userCredentials.user;

    const idToken = await user.getIdToken(user.uid);
    console.log(idToken);
  };
  const handleSignUp = async () => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      "user@gmail.com",
      "123456"
    );
    const user = userCredentials.user;

    const idToken = await user.getIdToken(user.uid);
    console.log(idToken);
  };

  useEffect(() => {
    handleSignIn();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
