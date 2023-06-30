import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";



export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	// useEffect(() => {
	// 	if (!store.accessToken) {
	// 	  navigate("/login")
	// 	}
	//    }, [])
	function logout() {
		if (store.accessToken) {
			navigate("/logout")
		}
	}
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
			<div className="container-fluid">
				<Link to="/" className="text-decoration-none">
					<h1 className="page-title">StarWash</h1>
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-center p-2" id="navbarNav">
					<ul className="navbar-nav ">
						<li className="nav-item px-3 nav-element">
							<Link to="/" className="nav-link active" aria-current="page">Home</Link>
						</li>
						<li className="nav-item px-3">
							<Link to="/aboutUs" className="nav-link active nav-element" aria-current="page">About Us</Link>
						</li>
						<li className="nav-item px-3">
							<Link to="/services" className="nav-link active nav-element" aria-current="page" >Services</Link>
						</li>
						<li className="nav-item px-3">
							<Link to="/frecuently-asked-questions" className="nav-link active nav-element" aria-current="page">Frequently Asked Questions</Link>
						</li>

					</ul>
				</div>
				<div className="nav-item justify-content-end">
					<div className="btn-group" role="group" aria-label="Basic example">
						{
							!!store.accessToken ?
								<><button onClick={logout} type="button" className="nav-button btn btn-dark custom-button">Logout</button><Link to="/shoppingCar">
									<button type="button" className="nav-button btn btn-dark custom-button position-relative">
										<i className="fa-solid fa-cart-shopping"></i>
										<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
											{store.user_services.length}
										</span>
									</button>
								</Link></>
								:
								<><Link to="/Login"><button type="button" className="nav-button btn btn-dark custom-button">Login</button></Link>
									<Link to="/Register"><button type="button" className="nav-button btn btn-dark custom-button">SignUp</button></Link></>
						}

					</div>

				</div>
			</div>
		</nav>
	);
};
