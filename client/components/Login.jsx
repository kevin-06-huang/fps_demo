import React from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  return (<>
            <form method="POST" action='/login'>
              <input name="username" type="text" placeholder="username"></input>
              <input name="password" type="password" placeholder="password"></input>
              <input type='submit' value="login"></input>
            </form>
            <br/>
            <Link to={'/signup'}>Sign up</Link>
          </>
         );
}

export default Login;
