import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row product-section align-items-center gy-4">
        <div className="col-12 col-lg-6 text-center">
          <img src={imageURL} className="content-image" alt={productName} />
        </div>
        <div className="col-12 col-lg-6 p-lg-5 mt-lg-5 product-copy">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div className="product-links">
            <a href={tryDemo}>Try Demo</a>
            <a href={learnMore}>
              Learn More
            </a>
          </div>
          <div className="mt-3 store-badges">
            <a href={googlePlay}>
              <img src="/media/images/googlePlayBadge.svg" alt="Get it on Google Play" />
            </a>
            <a href={appStore}>
              <img src="/media/images/appstoreBadge.svg" alt="Download on the App Store" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;