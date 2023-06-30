import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";




export const Services = () => {
  const { store, actions } = useContext(Context);
  const services = store.services

  useEffect(() => {
    actions.fetchServices()
  }, [])

  return (
    <div style={{ backgroundColor: '#24292e', color: '#eeffff' }}>
      <div className="container">
        <div className="row g-4">
          {services.map((element, index) => (
            <div className="col" key={index}>
              <div className="card text-center border-dark m-3" style={{ width: "20rem" }}>
                <img src={element.picture} className="card-img-top rounded-0" alt="..." style={{ width: "100%"}} />
                <div className="card-body " style={{ backgroundColor: '#616161' }}>
                  <h5 className="card-title" style={{ height: "5rem" }}>{element.name}</h5>
                  <p className="card-text" style={{ height: "8rem" }}>Want to learn more? <br />
                  click Learn More to see more details! <br />
                  Price: ${element.price} USD</p>
                  <button type="button" className="nav-button btn btn-dark " data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`}>
                    Learn More
                  </button>
                  <div className="modal fade" id={`exampleModal${index}`}  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-dialog-scrollable">
                      <div className="modal-content" style={{ backgroundColor: '#616161', color: '#eeffff' }}>
                        <div className="modal-header" style={{ backgroundColor: '#616161', color: '#eeffff' }}>
                          <h5 className="modal-title" id="exampleModalLabel" style={{ backgroundColor: '#616161', color: '#eeffff' }}>{element.name}</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <p>{element.description}</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer ">
                    <Link to="/Book" className="nav-button btn btn-dark">Book Now</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
