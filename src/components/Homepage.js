import React, { Component } from "react";
import { Wave } from "react-animated-text";
import { Typography, Box } from "@material-ui/core";
import schoolfront from "../lmsAssets/schoolfront.jpeg";
class Homepage extends Component {
  render() {
    return (
      <div>
        <Box display="flex" justifyContent="center" mt={5}>
          <Typography variant="h5" color="secondary">
            <Wave
              text="Guru Nanak Public Sr Sec School"
              effect="stretch"
              effectChange={2.2}
            />
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt={5}>
          <img style={{ width: "50%" }} src={schoolfront} alt="School pic" />
        </Box>
      </div>
    );
  }
}

export default Homepage;
