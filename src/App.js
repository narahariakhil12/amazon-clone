import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import { auth } from "./firebase";

function App() {
  const[{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //the user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  console.log('User is ',user)
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/amazon-clone/checkout">
            <Checkout />
          </Route>
          <Route path="/amazon-clone/login">
            <Login />
          </Route>
          <Route exact path="/amazon-clone">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
