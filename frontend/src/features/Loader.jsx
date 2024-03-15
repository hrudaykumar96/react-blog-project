const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <br />
      <h4 className="text-center text-dark">Loading Please Wait...</h4>
    </div>
  );
};

export default Loader;