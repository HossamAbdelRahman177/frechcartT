export default function Footer() {
  return (
    <>
      <div className="d-flex align-items-end footer col-md-12 ">
        <div className="bg-secondary-subtle p-4  footer col-md-12 ">
          <div className="col-md-12">
            <h4 className="fw-bolder"> Get the Fresh Cart app </h4>
            <p className="text-muted fw-bolder">
              We will send you a link, open it on your phone to download the app{" "}
            </p>
            <form>
              <div className="container-fluid d-flex justify-content-between col-md-12">
                <input
                  type="email"
                  className="form-control w-75"
                  placeholder="Eamil"
                />
                <button className="btn bg-main text-white me-5 ">
                  Share App link
                </button>
              </div>
            </form>

            <div className="container-fluid my-5 d-flex justify-content-between col-md-12">
              <div className="d-flex">
                <h5 className="fw-bolder">Get deliveries with FreshCart</h5>
                <img
                  src="images/apple.png"
                  width={75}
                  height={30}
                  className="ms-2"
                  alt=""
                />
                <img
                  src="images/google.png"
                  width={75}
                  className="ms-2"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
