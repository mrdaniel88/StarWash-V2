import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import DateTimePicker from "react-datetime-picker";
import { Link } from "react-router-dom";
import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'


import { useNavigate } from "react-router-dom";
import { object } from "prop-types";

export const Book = () => {

  const { store, actions } = useContext(Context);
  const services = store.services
  const vehicles = store.vehicle_types
  const [selectedVehicleType, setSelectedVehicleType] = useState(null)
  const [selectedServiceType, setSelectedServiceType] = useState(null)
  const navigate = useNavigate()
  const [dateService, setDateService] = useState(null);

  useEffect(() => {
    if (!store.accessToken) {
      navigate("/login")
    }
    else {
      actions.fetchServices()
      actions.fetchVehicleTypes()
    }
  }, [])

  const handleSelectVehicleType = (vehicleType) => {
    setSelectedVehicleType(vehicleType);
  };

  const handleSelectServiceType = (vehicleType) => {
    setSelectedServiceType(vehicleType);

  };

  const handleDateChange = (newDate) => {
    if (newDate && newDate.year && newDate.month && newDate.day) {
      const selectedDate = new Date(newDate.year, newDate.month - 1, newDate.day);
      setDateService(selectedDate);
    }
  };

  return (
    <div style={{ backgroundColor: '#24292e', color: '#eeffff' }}>
      {/* <div > */}
      <div className="container min-vh-100" style={{ backgroundColor: '#24292e', color: '#eeffff' }}>
        <h1 className=" display-4 text-center py-2" >Our Services</h1>
        {
          !!store.accessToken ? <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  1° Pick the Size
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <div className="row align-items-center">
                    {vehicles ? (vehicles.map((vehicle, index) => (
                      <div className="col" key={index}>
                        <div className={selectedVehicleType === index + 1 ? "card text-center card border border-3 border-dark  mb-3" : "card text-center card border-dark opacity-75 mb-3"} style={{ width: "30rem" }}>
                          <img src={vehicle.picture} className="card-img-top" alt="..." />
                          <div className="card-body " style={{ backgroundColor: '#24292e', color: '#eeffff' }}>
                            <h5 className="card-title">{vehicle.name}</h5>
                            <ul className="list-group list-group-flush">
                            </ul>
                            <button className="nav-button btn btn-dark my-2" onClick={() => handleSelectVehicleType(index + 1)}>Select</button>
                          </div>
                        </div>
                      </div>
                    ))) : (<p>Loading vehicles...</p>)}

                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  2° Save the Date
                </button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body" >
                  <DtPicker onChange={handleDateChange}  />
                  {/* <DateTimePicker onChange={setDateService} value={dateService} /> */}
                  {console.log(dateService)}
                  {/* {typeof dateService == 'null' ? setDateService(new Date(dateService.year, dateService.month, dateService.day)) : undefined} */}
                  {dateService && <p>Selected Date: {dateService.toString()}</p>}

                </div>
              </div>
            </div>
            <br></br>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  3° Pick the Services
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body ">
                  <div className="card-group">
                    <div className="row flex-nowrap overflow-auto">
                      {services.map((element, index) => (
                        element.vehicle_type == selectedVehicleType && (
                          <div className={selectedServiceType === index + 1 ? "card text-center card border-3 border-dark m-2" : "card text-center card border-dark opacity-75 m-2"} style={{ backgroundColor: '#24292e', color: '#eeffff', width: "15rem" }} key={index}>
                            <img src={element.picture} className="card-img-top" alt="..." />
                            <div className="card-body " style={{ backgroundColor: '#24292e', color: '#eeffff', height: "21rem" }}>
                              <h5 className="card-title" style={{ height: "7rem" }}>{element.name}</h5>
                              <ul className="list-group list-group-flush" style={{ height: "7rem" }}>
                                <li className="list-group-item" style={{ backgroundColor: '#24292e', color: '#eeffff' }}>Price:  {element.price} USD</li>
                              </ul>
                              <div className="card-footer" style={{ height: "5rem" }}>
                                <button className="nav-button btn btn-dark my-2" onClick={() => {
                                  handleSelectServiceType(index + 1)
                                  actions.addFavorites(element.name, element.price, dateService)
                                }}  >
                                  Select
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <div className="d-grid gap-2 col-6 mx-auto" style={{ "padding-botom": "2px" }}>
              <Link to="/shoppingCar">
                <button className="nav-button btn btn-dark justify-content-md-center">Go to Shopping Cart
                </button>
              </Link>
            </div>
            <br></br>
          </div>
            :
            <div className="alert alert-warning" role="alert">
              Signup or login before booking
            </div>
        }
      </div>


    </div>
  );
};
