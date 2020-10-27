import React, { Component, forwardRef } from "react";
import { Container } from "@material-ui/core/";
import MaterialTable from "material-table";
import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Print,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons/";

export default class StudentList extends Component {
  state = {
    columns: [
      { title: "First Name", field: "first_name" },
      { title: "Last Name", field: "last_name" },
      { title: "ID", field: "id", type: "numeric" },
    ],
    data: [],
    loaded: false,
  };

  componentDidMount() {
    this.getStudents();
  }

  getStudents = () => {
    const url = window.location.href.slice(0, -1);
    fetch(url + ":3000/api/students")
      .then((res) => res.json())
      .then((students) => {
        if (students.name === "SequelizeDatabaseError") {
          console.log("Empty!");
        } else {
          this.setState({
            data: [...students],
          });
        }
      });
  };

  clickUpdateStudent = (old, student) => {
    const url = window.location.href.slice(0, -1);
    var { first_name, last_name, id } = student;
    fetch(url + `:3000/api/students/update/${old.id}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name, last_name, id }),
    }).then((res) => res.json());
  };

  clickDeleteStudent = (studentId) => {
    const url = window.location.href.slice(0, -1);
    fetch(url + `:3000/api/students/delete/${studentId}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  render() {
    const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => (
        <DeleteOutline {...props} ref={ref} />
      )),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
      )),
      PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
      )),
      Print: forwardRef((props, ref) => <Print {...props} ref={ref} />),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => (
        <ArrowUpward {...props} ref={ref} />
      )),
      ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
      )),
      ViewColumn: forwardRef((props, ref) => (
        <ViewColumn {...props} ref={ref} />
      )),
    };
    return (
      <Container maxWidth="xl" disableGutters={true}>
        <React.Fragment>
          <MaterialTable
            title="Records table"
            columns={this.state.columns}
            data={this.state.data}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    let data = [...this.state.data];
                    const index = data.indexOf(oldData);
                    data[index] = newData;
                    this.clickUpdateStudent(oldData, newData);
                    this.setState({
                      data: data,
                    });
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      let data = this.state.data;
                      const index = data.indexOf(oldData);
                      const del_id = data[index].id;
                      this.clickDeleteStudent(del_id);
                      this.setState({
                        data: data.filter((student) => student.id !== del_id),
                      });
                      this.getStudents();
                    }
                    resolve();
                  }, 1000);
                }),
            }}
            icons={tableIcons}
            options={{
              rowStyle: {
                backgroundColor: "#FFFFFF",
              },
              headerStyle: {
                backgroundColor: "#EEE",
                fontWeight: "bold",
                fontSize: 16,
              },
            }}
          />
        </React.Fragment>
      </Container>
    );
  }
}
