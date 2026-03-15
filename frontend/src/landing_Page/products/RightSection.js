function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-5">
      <div className="row product-section align-items-center gy-4">
        <div className="col-12 col-lg-6 p-lg-5 mt-lg-5 product-copy">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div>
            <a href={learnMore}>Learn More</a>
          </div>
        </div>
        <div className="col-12 col-lg-6 text-center">
          <img src={imageURL} className="content-image" alt={productName} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;