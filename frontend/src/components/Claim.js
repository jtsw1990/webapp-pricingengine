import { useState } from "react";

function Claim() {
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    const payload = { _id: searchInputId };
    const searchClaim = async () => {
      const results = await fetch("/search_claim", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await results.json();
      setIsSearching(false);
      setSearchResult(data);
      setIsSearched(true);
    };
    searchClaim();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIspending(true);
    const payload = {
      date_of_birth: dateOfBirth,
      weight: weight,
      height: height,
      children: children,
      sex: sex,
      smoker: smoker,
      region: region,
      claimAmount: claimAmount,
    };
    const submitClaim = async () => {
      const results = await fetch("/submit_claim", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await results.json();
      setClaimId(data);
      setIspending(false);
      setIsCalculated(true);
    };
    submitClaim();
  };
  const [dateOfBirth, setDateOfBirth] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [children, setChildren] = useState();
  const [sex, setSex] = useState("Male");
  const [smoker, setSmoker] = useState("Yes");
  const [region, setRegion] = useState("Northeast");
  const [claimAmount, setClaimAmount] = useState();
  const [claimId, setClaimId] = useState("");
  const [searchResult, setSearchResult] = useState();

  const [isSearching, setIsSearching] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [isPending, setIspending] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);
  const [searchInputId, setSearchInputId] = useState("");

  return (
    <>
      <div className="container my-2">
        <div className="row">
          <div className="col">
            <div className="card shadow-lg">
              <h5 className="card-header lead">Search your claim by ID</h5>
              <div className="card-body">
                <form onSubmit={handleSearch}>
                  <div className="row align-items-center">
                    <div className="col-sm-3">
                      <label htmlFor="claimid" className="mb-0">
                        Claim ID
                      </label>
                    </div>
                    <div className="col-xs-9">
                      <div className="input-group">
                        <input
                          name="claimid"
                          type="text"
                          className="form-control"
                          id="claimid"
                          placeholder="6267fffe67a634c94cfad44f"
                          onChange={(e) => setSearchInputId(e.target.value)}
                          required
                        ></input>{" "}
                        <span className="input-group-append">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            type="submit"
                          >
                            {!isSearching && (
                              <img alt="searchIcon" src="searchIcon.png"></img>
                            )}
                            {isSearching && (
                              <img
                                alt="loadingIcon"
                                src="loadingIcon.png"
                              ></img>
                            )}
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            {isSearched && (
              <div className="card shadow-lg">
                <h5 className="card-header lead">Your claim details</h5>
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <ul>
                        <li>Claimd ID: {searchResult._id}</li>
                        <li>Claimant Age: {searchResult.age}</li>
                        <li>Claimant BMI: {searchResult.bmi}</li>
                        <li>Claimant Sex: {searchResult.sex}</li>
                        <li>Number of children: {searchResult.children}</li>
                        <li>Smoker declaration: {searchResult.smoker}</li>
                        <li>Claimant region: {searchResult.region}</li>
                        <li>Submitted amount: {searchResult.charges}</li>
                      </ul>

                      <p>
                        We are not really going to pay you out. Please do not
                        take this website seriously.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <div className="card shadow-lg">
              <h5 className="card-header lead">Submit your fake claim now!</h5>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="row align-items-center">
                      <div className="col-sm-6 text-right">
                        <label htmlFor="dob" className="mb-0">
                          Date of birth
                        </label>
                      </div>
                      <div className="col-xs-6">
                        <input
                          name="date_of_birth"
                          type="date"
                          className="form-control"
                          id="dob"
                          placeholder="Date of Birth"
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          required
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row align-items-center">
                      <div className="col-sm-6 text-right">
                        <label htmlFor="weight" className="mb-0">
                          Weight (Kg)
                        </label>
                      </div>
                      <div className="col-xs-6">
                        <input
                          name="weight"
                          type="number"
                          className="form-control"
                          id="weight"
                          placeholder="Eg. 60"
                          onChange={(e) => setWeight(e.target.value)}
                          required
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row align-items-center">
                      <div className="col-sm-6 text-right">
                        <label htmlFor="height" className="mb-0">
                          Height (cm)
                        </label>
                      </div>
                      <div className="col-xs-6">
                        <input
                          name="height"
                          type="number"
                          className="form-control"
                          id="height"
                          placeholder="Eg. 175"
                          onChange={(e) => setHeight(e.target.value)}
                          required
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row align-items-center">
                      <div className="col-sm-6 text-right">
                        <label htmlFor="children" className="mb-0">
                          Number of Children
                        </label>
                      </div>
                      <div className="col-xs-6">
                        <input
                          name="children"
                          type="number"
                          className="form-control"
                          id="children"
                          placeholder="Eg. 2"
                          onChange={(e) => setChildren(e.target.value)}
                          required
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row align-items-center">
                      <div className="col-sm-6 text-right">
                        <label htmlFor="sex" className="mb-0">
                          Sex
                        </label>
                      </div>
                      <div className="col-xs-6">
                        <select
                          name="sex"
                          className="form-control"
                          id="sex"
                          required
                          value={sex}
                          onChange={(e) => setSex(e.target.value)}
                        >
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row align-items-center">
                      <div className="col-sm-6 text-right">
                        <label htmlFor="smoker" className="mb-0">
                          Smoker
                        </label>
                      </div>
                      <div className="col-xs-6">
                        <select
                          name="smoker"
                          className="form-control"
                          id="smoker"
                          value={smoker}
                          onChange={(e) => setSmoker(e.target.value)}
                          required
                        >
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row align-items-center">
                      <div className="col-sm-6 text-right">
                        <label htmlFor="region" className="mb-0">
                          Region of residency
                        </label>
                      </div>
                      <div className="col-xs-6">
                        <select
                          name="region"
                          className="form-control"
                          id="region"
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          required
                        >
                          <option>Northeast</option>
                          <option>Northwest</option>
                          <option>Southeast</option>
                          <option>Southwest</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row align-items-center">
                      <div className="col-sm-6 text-right">
                        <label htmlFor="weight" className="mb-0">
                          Claim amount ($)
                        </label>
                      </div>
                      <div className="col-xs-6">
                        <input
                          name="claimAmount"
                          type="number"
                          className="form-control"
                          id="claimAmount"
                          min="0"
                          placeholder="Eg. 3532.20"
                          onChange={(e) => setClaimAmount(e.target.value)}
                          required
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-center">
                      {!isPending && (
                        <button type="submit" className="btn btn-primary">
                          Submit claim
                        </button>
                      )}
                      {isPending && (
                        <button disabled className="btn btn-primary">
                          Submitting...
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3 mb-3">
          <div className="col">
            {isCalculated && (
              <div className="card shadow-lg">
                <h5 className="card-header lead">
                  Claim submitted successfully!
                </h5>
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h3 className="card-header-lead">
                        Your claim id is: {claimId}
                      </h3>
                      <p>
                        Please save it and paste it above to look up the status
                        of your claim in our system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Claim;
