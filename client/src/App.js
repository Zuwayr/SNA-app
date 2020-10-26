import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./App.css";

import StudentList from "./components/StudentList";

class App extends Component {
  state = {
    new_first_name: "",
    new_last_name: "",
    new_id: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  clickAddStudent = (event) => {
    event.preventDefault();

    const first_name = this.state.new_first_name;
    const last_name = this.state.new_last_name;
    const id = this.state.new_id;
    const url = window.location.href.slice(0, -1);

    fetch(url + ":3000/api/students/add", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name, last_name, id }),
    }).then(() => {
      this.setState({ newStudentTitle: "" });
      this.refs.studentList.getStudents();
    });
  };

  render() {
    return (
      <div className="App">
        <Typography component="h1" variant="h4">
          Students
        </Typography>

        <StudentList ref="studentList" />

        <form onSubmit={this.clickAddStudent}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="new_first_name"
            label="First Name"
            name="new_first_name"
            autoComplete="first_name"
            autoFocus
            onChange={this.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="new_last_name"
            label="Last Name"
            name="new_last_name"
            autoComplete="last_name"
            onChange={this.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="new_id"
            label="ID"
            name="new_id"
            autoComplete="id"
            onChange={this.handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Add
          </Button>
        </form>
      </div>
    );
  }
}

export default App;
