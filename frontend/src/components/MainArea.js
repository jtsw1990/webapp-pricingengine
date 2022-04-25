import { Switch, Route } from "react-router-dom";
import Quote from "./Quote";
import Claim from "./Claim";
import Pricing from "./About";

function MainArea() {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col">
          <div className="jumbotron">
              <Switch>
                <Route path="/" exact component={Quote}></Route>
                <Route path="/claim" exact component={Claim}></Route>
                <Route path="/pricing" exact component={Pricing}></Route>
              </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainArea;
