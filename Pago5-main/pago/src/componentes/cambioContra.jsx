import React from "react";

const cambioContra = () => {
  return (
    <div>
      <>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <img
            className="pt-5"
            src="../pictures/Screenshot_2024-02-15_155144-removebg-preview 1.png"
            alt=""
          />
        </div>
        <section>
          <div className="container pt-4 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card text-white"
                  style={{ borderRadius: "1rem", backgroundColor: "#002c6a" }}
                >
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-4 mt-md-2 pb-2">
                      <h3 className="fw-bold mb-4">Cambio de contraseña</h3>
                      {/* <p class="text-white-50 mb-5">Please enter your login and password!</p> */}
                      <div
                        data-mdb-input-init=""
                        className="form-outline form-white mb-4"
                      >
                        <input
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="typeEmailX">
                          Email
                        </label>
                      </div>
                      <div
                        data-mdb-input-init=""
                        className="form-outline form-white mb-4"
                      >
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="typePasswordX">
                          Nueva Contraseña
                        </label>
                      </div>
                      <div
                        data-mdb-input-init=""
                        className="form-outline form-white mb-4"
                      >
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="typePasswordX">
                          Confirmar Contraseña
                        </label>
                      </div>
                      <button
                        data-mdb-button-init=""
                        data-mdb-ripple-init=""
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Actualizar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default cambioContra;
