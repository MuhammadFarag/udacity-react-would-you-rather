import {Link, withRouter} from "react-router-dom";
import * as PropTypes from "prop-types";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux-stuff";

function Logout(props) {
  const authenticatedUser = useSelector(state => state.authentication.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!authenticatedUser) {
    props.history.push('/')
    return null
  }

  return <ul>
    <li>
      Authenticated User: {authenticatedUser.name}
    </li>
    <li>
      <Link to='/' onClick={handleLogout}>logout</Link>
    </li>
  </ul>;
}

Logout.propTypes = {
  authenticatedUser: PropTypes.any,
  onLogout: PropTypes.func
};

export default withRouter(Logout)