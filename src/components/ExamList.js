import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Exam from "./Exam";
import ExamItem from "./ExamItem";

const useStyles = (theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "20%",
  },
  columns: {
    flexBasis: "19%",
  },
  b: {
    color: "red",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  appbar: {
    alignItems: "center",
  },

  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
});

class ExamList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exams: [],
    };
  }
  componentDidMount() {
    axios.get(`${process.env.API_URL}/exams`).then((res) => {
      this.setState({ exams: res.data });
    });
  }

  addExam = (exam) => {
    let newExams = [...this.state.exams, exam];
    this.setState({ exams: newExams });
  };

  handleEdit = (exam) => {
    console.log(exam);
    let { date, numberOfSeats, classroom } = exam;
    axios
      .put(`${process.env.API_URL}/exams/` + exam.id, {
        date,
        numberOfSeats,
        classroom,
      })

      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("text");
          let newExams = this.state.exams;
          const index = this.state.exams.findIndex(
            (item) => item.id === exam.id
          );

          this.setState({
            exams: [
              ...newExams.slice(0, index),
              Object.assign({}, this.state.exams[index], { ...exam }),
              ...newExams.slice(index + 1),
            ],
          });
        }
      });
  };

  handleDelete = (id) => {
    axios
      .delete(`${process.env.API_URL}/exams/` + id)

      .then((res) => {
        console.log(res);
        console.log(res.data);
        let newExams = this.state.exams;
        const index = this.state.exams.findIndex((exam) => exam.id === id);

        this.setState({
          exams: [...newExams.slice(0, index), ...newExams.slice(index + 1)],
        });
      });
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.exams);
    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          className={classes.appbar}
          style={{ background: "white" }}
        >
          <Toolbar>
            <Typography
              style={{ fontFamily: "Roboto", color: "#388e3c" }}
              variant="h2"
              noWrap
            >
              Exam Planning
            </Typography>
          </Toolbar>
        </AppBar>{" "}
        <AppBar position="static">
          <Toolbar style={{ width: "97%" }} style={{ background: "#1b5e20" }}>
            <Typography className={classes.title} variant="h5" noWrap>
              List of exams
            </Typography>
          </Toolbar>
        </AppBar>{" "}
        <div className={classes.root}>
          <AppBar position="static" style={{ background: "#81c784" }}>
            <Toolbar variant="dense">
              <div className={classes.columns}>
                <Typography style={{ fontSize: "12", color: "#1b5e20" }}>
                  University year
                </Typography>
              </div>
              <div className={classes.columns}>
                <Typography style={{ fontSize: "12", color: "#1b5e20" }}>
                  Major
                </Typography>
              </div>
              <div className={classes.columns}>
                <Typography style={{ fontSize: "12", color: "#1b5e20" }}>
                  Study year
                </Typography>
              </div>
              <div className={classes.columns}>
                <Typography style={{ fontSize: "12", color: "#1b5e20" }}>
                  Subject
                </Typography>
              </div>
              <div className={classes.columns}>
                <Typography style={{ fontSize: "12", color: "#1b5e20" }}>
                  Teacher
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.root}>
          {this.state.exams.map((exam, index) => (
            <ExamItem
              exam={exam}
              deleteExam={this.handleDelete}
              editExamen={this.handleEdit}
              key={index}
            />
          ))}
        </div>
        <Exam addExam={this.addExam} />
      </div>
    );
  }
}

export default withStyles(useStyles)(ExamList);
