import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { MAIN_ROUTE } from "routes/baseRoute";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // static getDerivedStateFromError() {
  //   return { hasError: true };
  // }

  componentDidCatch(error, info) {
    console.log({ error, info });
    // Changing the state to true
    // if some error occurs
    this.setState({
      hasError: true
    });
  }

  render() {
    return (
      <div>
        {this.state.hasError ? (
          <div style={{ textAlign: "center", margin: "30px 0 0" }}>
            <Typography variant="h3" component="div" gutterBottom>
              Oops.. Something went wrong
            </Typography>
            <Typography variant="body1" gutterBottom>
              Please try again after sometime..
            </Typography>
          </div>
        ) :
          this.props.children
        }
      </div>
    );
  }
}

export default ErrorBoundary;
