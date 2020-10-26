import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default class StudentList extends Component {
  state = {
    students: [],
  };

  componentDidMount() {
    this.getStudents();
  }

  getStudents = () => {
    const url = window.location.href.slice(0, -1);
    fetch(url + ":3000/api/students")
      .then((res) => res.json())
      .then((students) => {
        this.setState({ students });
      });
  };

  clickDeleteStudent = (event, student) => {
    event.preventDefault();
    const url = window.location.href.slice(0, -1);
    fetch(url + `3000/api/students/delete/${student.id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((t) => {
        this.getStudents();
      });
  };

  render() {
    const { students } = this.state;

    return (
      <table>
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>ID</th>
            <th>Delete</th>
          </tr>
        </tbody>

        {students.map((student) => (
          <tbody key={student.id}>
            <tr>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.id}</td>
              <td>
                <Button
                  onClick={(event) => this.clickDeleteStudent(event, student)}
                  variant="contained"
                  color="secondary"
                >
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
}
