import {Link, withRouter} from "react-router-dom";
import * as PropTypes from "prop-types";
import React from "react";

function Logout(props) {

  if(!props.authenticatedUser){
    props.history.push('/')
    return null
  }

  return <ul>
    <li>
      Authenticated User: {props.authenticatedUser.name}
    </li>
    <li>
      <Link to='/' onClick={props.onLogout}>logout</Link>
    </li>
  </ul>;
}

Logout.propTypes = {
  authenticatedUser: PropTypes.any,
  onLogout: PropTypes.func
};

export default withRouter(Logout)