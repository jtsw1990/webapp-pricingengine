import { useState } from "react";
import CoefChart from "./CoefChart";




function Quote() {
  /*
  useEffect(() => {
    fetchItems();
  }, []);
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    const data = await fetch("/quote");
    console.log(data);
    const items = await data.json();
    setItems(items);
  };
  */
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
    };
    const fetchQuote = async () => {
      const results = await fetch("/quote", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await results.json();

      setIspending(false);
      setIsCalculated(true);
      setClaimsCost(data.claims_cost);
      setChartData({
        labels: Object.keys(data.coefficients),
        datasets: Object.values(data.coefficients)
      })

    };
    fetchQuote();
  };

  const [dateOfBirth, setDateOfBirth] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [children, setChildren] = useState();
  const [sex, setSex] = useState("Male");
  const [smoker, setSmoker] = useState("Yes");
  const [region, setRegion] = useState("Northeast");
  const [claimsCost, setClaimsCost] = useState(0);

  const [isPending, setIspending] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
 


  return (
    <>
      <div className="container my-2">
        <div className="row">
          <div className="col">
            <div className="card shadow-lg">
              <h5 className="card-header lead">Get a fake quote now!</h5>
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

                  <div className="row align-items-center">
                    <div className="col text-center">
                      {!isPending && (
                        <button type="submit" className="btn btn-primary">
                          Get a quote
                        </button>
                      )}
                      {isPending && (
                        <button disabled className="btn btn-primary">
                          Calculating...
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
                <h5 className="card-header lead">Your quote breakdown</h5>
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h3 className="card-header-lead">
                        Your expected premium is $
                        {Math.round((claimsCost / 100) * 100, 0) / 100} per
                        annum.
                      </h3>
           
                      <CoefChart labels={ chartData.labels } datasets={ chartData.datasets }/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <button type="" disabled className="btn btn-success">
                        Buy Policy
                      </button>
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

export default Quote;
