import { useState } from "react";
import Layout from "../../layout/Layout";
import SocialSignIn from "./SocialSignIn";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserSessionPersistence,
  browserLocalPersistence,
  TwitterAuthProvider,
  GithubAuthProvider
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [persistance, setPersistance] = useState(false);
  const auth = getAuth();

  const signInWithGoogle = () => {
    auth.setPersistence(browserLocalPersistence);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // The signed-in user info.
        // const user = result.user
        login();
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
      });
  };

  const signInWithTwitter = () => {
    auth.setPersistence(browserLocalPersistence);
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        // The signed-in user info.
        // const user = result.user
        login();
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
      });
  };

  const signInWithGithub = () => {
    auth.setPersistence(browserLocalPersistence);
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        console.log(result);
        // The signed-in user info.
        // const user = result.user
        login();
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        console.log(error)
      });
  }

  const signInWithEmail = () => {
    if (persistance) {
      auth.setPersistence(browserLocalPersistence);
    } else {
      auth.setPersistence(browserSessionPersistence);
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/user-not-found") {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in
              navigate("/dashboard");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
            });
        }
      });
  };

  return (
    <Layout noLinks={true}>
      <div className="min-h-full flex flex-col justify-center py-6 lg:py-24 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 mb-6 text-center text-3xl font-bold">
            Sign in to continue
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-site-background-dark py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    placeholder="john.smith@gmail.com"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    placeholder="********"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="input"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="checkbox"
                    checked={persistance}
                    onChange={(e) => setPersistance(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium  hover:text-primary"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  className="py-4 btn-primary-lg w-full"
                  onClick={signInWithEmail}
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-site-background-dark">Or continue with</span>
                </div>
              </div>

              <SocialSignIn signInWithGoogle={signInWithGoogle} signInWithTwitter={signInWithTwitter} signInWithGithub={signInWithGithub} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
