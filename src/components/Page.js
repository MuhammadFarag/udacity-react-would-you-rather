import {Navigation} from "./Navigation";
import Logout from "./Logout";
import React from "react";

export function Page({children}) {
  return <div>
    <Navigation/>
    <Logout/>
    {children}
  </div>
}