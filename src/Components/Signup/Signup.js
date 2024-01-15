import React, { useContext, useState } from "react";

import Logo from "../../olx-logo.png";
import { FirebaseContext } from "../../store/Context";
import { useHistory } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !userName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password.trim()
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    if (isNaN(phone) || phone.length !== 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: userName }).then(() => {
          firebase
            .firestore()
            .collection("users")
            .add({
              id: result.user.uid,
              userName: userName,
              phone: phone,
            })
            .then(() => {
              history.push("/login");
            });
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="userName"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          {error && <p className="error">{error}</p>}
          <br />
          <br />
          <button onSubmit={handleSubmit}>Signup</button>
        </form>
        <a href='/login'>Login</a>
      </div>
    </div>
  );
}
