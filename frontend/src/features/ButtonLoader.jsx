const ButtonLoader = () => {
  return (
    <div>
      <button className="btn btn-secondary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
        <span role="status">Loading...</span>
      </button>
    </div>
  );
};

export default ButtonLoader;