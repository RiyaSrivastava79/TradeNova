import React from "react";
function Awards() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center gy-4">
        <div className="col-12 col-lg-6 p-lg-5">
          <img src="media/images/largestBroker.svg" className="content-image" alt="Largest broker illustration" />
        </div>
        <div className="col-12 col-lg-6 p-lg-5">
          <h1>Largest stock broker in India.</h1>
          <p className="mb-5">
            2+ million TradeNova constribute to over 15% of all the volumes in
            India daily by trading and investing in:
          </p>
          <div className="row g-3">
            <div className="col-12 col-sm-6">
              <ul>
                <li>Futures and options</li>
                <li>Commodity derivatives</li>
                <li>Currency derivatives</li>
              </ul>
            </div>
            <div className="col-12 col-sm-6">
              <ul>
                <li>Stocks and IPOs</li>
                <li>Direct mutual funds</li>
                <li>Bonds and Govt. securities</li>
              </ul>
            </div>
          </div>
          <img className="p-3 mt-2 content-image" src="media/images/pressLogos.png" alt="Partner press logos" />
        </div>
      </div>
    </div>
  );
}

export default Awards;