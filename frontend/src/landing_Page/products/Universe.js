import React from "react";
import { useNavigate } from "react-router-dom";
function Universe() {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The TradeNova Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-12 col-sm-6 col-lg-4 p-3 mt-4">
          <img src="media/images/smallcaseLogo.png" className="universe-logo" alt="Partner platform" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 p-3 mt-4">
          <img src="media/images/smallcaseLogo.png" className="universe-logo" alt="Partner platform" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 p-3 mt-4">
          <img src="media/images/smallcaseLogo.png" className="universe-logo" alt="Partner platform" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 p-3 mt-4">
          <img src="media/images/smallcaseLogo.png" className="universe-logo" alt="Partner platform" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 p-3 mt-4">
          <img src="media/images/smallcaseLogo.png" className="universe-logo" alt="Partner platform" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 p-3 mt-4">
          <img src="media/images/smallcaseLogo.png" className="universe-logo" alt="Partner platform" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <button
          className="p-2 btn btn-primary fs-5 mb-5 cta-button"
           onClick={() => navigate('/signup')}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;