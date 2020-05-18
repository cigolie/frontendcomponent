import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    alignItems: "center",
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
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: 100,
    width: 200,
  },
});

export class Exam extends Component {
  state = {
    universityYear: "",
    studyYear: 0,
    section: "",
    numberOfSeats: 0,
    subjectExam: "",
    teacher: "",
    classroom: "",
    semester: 0,
    date: "",
  };

  handleReset = (event) => {
    this.setState({
      universityYear: "",
      studyYear: 0,
      section: "",
      numberOfSeats: 0,
      subjectExam: "",
      teacher: "",
      classroom: "",
      semester: 0,
      date: "",
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const exam = {
      universityYear: this.state.universityYear,
      studyYear: this.state.studyYear,
      section: this.state.section,
      numberOfSeats: this.state.numberOfSeats,
      subjectExam: this.state.subjectExam,
      teacher: this.state.teacher,
      classroom: this.state.classroom,
      semester: this.state.semester,
      date: this.state.date,
    };
    axios
      .post("https://my-json-server.typicode.com/cigolie/ex/exams", { exam })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.props.addExam(exam);
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar style={{ width: "97%" }}>
            <Typography className={classes.title} variant="h6" noWrap>
              Exam
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
              //className={classes.h}
            >
              <div className={classes.column}> Add exam</div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <div className={classes.column}>
                <form
                  className={classes.root}
                  onSubmit={this.handleSubmit}
                  onReset={this.handleReset}
                >
                  <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>
                      <TextField
                        required
                        id="major"
                        label="Insert major"
                        name="section"
                        value={this.state.section}
                        onChange={this.handleChange}
                      />
                    </Typography>
                  </div>
                  <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>
                      <TextField
                        required
                        id="studyYear"
                        label="Insert study year"
                        name="studyYear"
                        type="number"
                        min="1"
                        max="4"
                        value={this.state.studyYear}
                        onChange={this.handleChange}
                      />
                    </Typography>
                  </div>
                  <div className={classes.root}>
                    <TextField
                      required
                      id="semester"
                      label="Semester"
                      name="semester"
                      value={this.state.semester}
                      onChange={this.handleChange}
                    />
                  </div>
                  <TextField
                    required
                    id="subject"
                    label="Insert subject"
                    name="subjectExam"
                    value={this.state.subjectExam}
                    onChange={this.handleChange}
                  />
                  <TextField
                    required
                    id="teacher"
                    label="Insert teacher"
                    name="teacher"
                    value={this.state.teacher}
                    onChange={this.handleChange}
                  />

                  <div className={classes.root}>
                    <TextField
                      required
                      id="univyr"
                      label="University year"
                      variant="outlined"
                      name="universityYear"
                      value={this.state.universityYear}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className={classes.columns}>
                    <TextField
                      id="datetime-local"
                      label="Date & time"
                      type="datetime-local"
                      className={classes.textField}
                      name="date"
                      value={this.state.date}
                      onChange={this.handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>

                  <div className={classes.root}>
                    <TextField
                      required
                      id="nostd"
                      label="No. of students"
                      variant="outlined"
                      name="numberOfSeats"
                      value={this.state.numberOfSeats}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className={classes.columns}>
                    <TextField
                      required
                      id="classroom"
                      label="Classroom"
                      variant="outlined"
                      name="classroom"
                      value={this.state.classroom}
                      onChange={this.handleChange}
                    />
                  </div>

                  <Divider />

                  <Button size="small" type="reset">
                    Reset
                  </Button>
                  <Button size="small" color="primary" type="submit">
                    Save
                  </Button>
                </form>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Exam);
