import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Exam from "./Exam";
import teal from "@material-ui/core/colors/teal";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const colorbase = teal[900];

const useStyles = (theme) => ({
  root: {
    width: "100%",
    color: { colorbase },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  coloring: {
    color: colorbase,
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
      editExamData: {
        id: "",
        numberOfSeats: "",
        classroom: "",
        date: "",
      },
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    //this.replaceModalItem = this.replaceModalItem.bind(this);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  titleHandler(e) {
    this.setState({ date: e.target.value });
  }

  msgHandler(e) {
    this.setState({ numberOfSeats: e.target.value });
  }

  classroomHandler(e) {
    this.setState({ classroom: e.target.value });
  }

  componentDidMount() {
    axios
      .get("https://my-json-server.typicode.com/cigolie/ex/exams")
      .then((res) => {
        this.setState({ exams: res.data });
      });
  }
  handleDelete = (id) => {
    axios
      .delete("https://my-json-server.typicode.com/cigolie/ex/exams/" + id)

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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleEdit = (id) => {
    // event.preventDefault(event);
    //console.log(event.target.date.value);
    const index = this.state.exams.findIndex((exam) => exam.id === id);
    let { date, numberOfSeats, classroom } = this.state.editExamData;
    axios
      .put("https://my-json-server.typicode.com/cigolie/ex/exams/" + index, {
        date,
        numberOfSeats,
        classroom,
      })

      .then((res) => {
        this.setState({ open: false });
        console.log("elo");
        console.log(res);
        console.log(res.data);
        // let newExams = this.state.exams;
        // const index = this.state.exams.findIndex((exam) => exam.id === id);
      });
  };

  editExam(id, date, numberOfSeats, classroom) {
    this.setState({
      editExamData: { id, date, numberOfSeats, classroom },
      open: !this.state.open,
    });
  }

  addExam = (exam) => {
    // console.log("bla", exam);

    let newExams = [...this.state.exams, exam];
    this.setState({ exams: newExams });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar style={{ width: "97%" }}>
            <Typography className={classes.title} variant="h6" noWrap>
              List of exams
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.root}>
          {this.state.exams.map((exam, id) => (
            <ExpansionPanel key={id}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div className={classes.column}> {exam.universityYear}</div>
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    {exam.section}
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>
                    {exam.studyYear}
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>
                    {exam.subjectExam}
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>
                    {exam.teacher}
                  </Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Semester"
                      defaultValue={exam.semester}
                      variant="outlined"
                    />
                  </Typography>
                </div>

                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Date"
                      // type="datetime-local"
                      defaultValue={exam.date}
                      variant="outlined"
                    />
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Number of students"
                      defaultValue={exam.numberOfSeats}
                      variant="outlined"
                    />
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Classroom"
                      defaultValue={exam.classroom}
                      variant="outlined"
                    />
                  </Typography>
                </div>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <div>
                  <div>
                    <Button size="small" onClick={this.handleClickOpen}>
                      Edit Exam
                    </Button>

                    <form onSubmit={this.handleEdit}>
                      <Dialog
                        key={exam.id}
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogTitle id="form-dialog-title">
                          Edit Exam
                        </DialogTitle>
                        <DialogContent>
                          {/*<DialogContentText>
              To subscribe to this website, please enter your email
              address here. We will send updates occasionally.
            </DialogContentText>*/}

                          <div>
                            <TextField
                              id="date"
                              label="Date & time"
                              type="datetime-local"
                              name="newdate"
                              value={this.state.date}
                              onChange={(e) => this.titleHandler(e)}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </div>
                          <br></br>
                          <div>
                            <TextField
                              required
                              id="numberOfSeats"
                              label="No. of students"
                              variant="outlined"
                              name="newnumberOfSeats"
                              value={this.state.numberOfSeats}
                              onChange={(e) => this.msgHandler(e)}
                            />
                          </div>
                          <br></br>
                          <div>
                            <TextField
                              required
                              id="classroom"
                              label="Classroom"
                              variant="outlined"
                              name="newclassroom"
                              value={this.state.classroom}
                              onChange={(e) => this.classroomHandler(e)}
                            />
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={this.editExam} color="primary">
                            Subscribe
                          </Button>
                          <Button
                            size="small"
                            color="primary"
                            type="submit"
                            onClick={() => this.handleEdit(exam.id)}
                          >
                            Save Changes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </form>
                  </div>
                </div>
                <Button
                  className={classes.b}
                  size="small"
                  type="submit"
                  onClick={() => this.handleDelete(exam.id)}
                >
                  Delete
                </Button>{" "}
              </ExpansionPanelActions>
            </ExpansionPanel>
          ))}{" "}
        </div>
        <Exam addExam={this.addExam} />
      </div>
    );
  }
}

export default withStyles(useStyles)(ExamList);
