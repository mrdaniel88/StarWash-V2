import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";


// Para iniciar sesión

export const LoginUsuario = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()
  // function Password() {
  //   // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShowneye, setPasswordShowneye] = useState(false);
  //   // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
    setPasswordShowneye(!passwordShowneye)
  };

  async function submitForm(e) {
    e.preventDefault()
    let data = new FormData(e.target)
    let resp = await actions.userLogin(data.get("email"), data.get("password"))
    if (resp >= 400) {
      return
    }
    navigate("/book")
    //console.log("Login exitoso")
  }

  return (
    <div style={{ backgroundColor: '#24292e', color: '#eeffff' }}>
      <div className="container min-vh-100" >
        <h3>Sing in</h3>
        <form onSubmit={submitForm}>
          <div className="col-md-12 position-relative">
            <label className="form-label" >Email</label>
            <input type="text" className="form-control" style={{ backgroundColor: '#616161', color: '#B70000' }} name="email" placeholder="Username" aria-label="Username" />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input type={passwordShown ? "text" : "password"} className="form-control" style={{ backgroundColor: '#616161', color: '#B70000' }} placeholder="Password" name="password" />
              <button onClick={togglePassword} className="input-group-text">
                <i className={passwordShowneye ? "fa fa-eye" : "fa fa-eye-slash"}></i>
              </button>
            </div>
          </div>
          <div>
            <div className="form-check ">
              <input className="form-check-input" type="checkbox" name="password" value="" id="flexCheckChecked" />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Keep me signed in
              </label>
            </div>

          </div>
          <div className="col-12 mb-3 ">
            <div className="d-grid gap-2">
              <button className="nav-button btn btn-dark" type="submit">Login</button>
            </div>
          </div>
          <Link to="/Register">
            <div className="d-grid gap-2">
              <button type="button" className="nav-button btn btn-dark " >Become a Member</button>
            </div>
          </Link>
          <div>
            <Link to="/recovery">
              <div className="d-grid gap-2 d-md-flex mt-3">
                <button type="button" className="nav-button btn btn-danger mb-2">Forgot your password?</button>
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
