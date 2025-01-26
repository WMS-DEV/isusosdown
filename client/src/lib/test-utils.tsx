import React from "react";
import { BrowserRouter as Router } from "react-router-dom";




export const getComponentsInRouter = (children: React.ReactNode) => {
  return <Router>{children}</Router>;
};
