import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

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
  coloring: {
    color: "white",
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

class ExamItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editExam: {},
      open: false,
    };
  }

  componentDidMount = () => {
    this.setState({ ...this.state, editExam: this.props.exam });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    //this.replaceModalItem = this.replaceModalItem.bind(this);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  dateHandler(e) {
    this.setState({
      ...this.state,
      editExam: {
        ...this.state.editExam,
        date: e.target.value,
      },
    });
  }

  seatsHandler(e) {
    this.setState({
      ...this.state,
      editExam: {
        ...this.state.editExam,
        numberOfSeats: e.target.value,
      },
    });
  }

  classroomHandler(e) {
    this.setState({
      ...this.state,
      editExam: {
        ...this.state.editExam,
        classroom: e.target.value,
      },
    });
  }

  render() {
    const { classes, exam, deleteExam, editExamen } = this.props;
    const { editExam, open } = this.state;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            {" "}
            <Typography className={classes.heading}>
              {exam.universityYear}
            </Typography>{" "}
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
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
                value={exam.date}
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
                value={exam.numberOfSeats}
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
                value={exam.classroom}
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
                  open={open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Edit Exam</DialogTitle>
                  <DialogContent>
                    <div>
                      <TextField
                        id="date"
                        label="Date & time"
                        type="datetime-local"
                        name="newdate"
                        value={editExam.date}
                        onChange={(e) => this.dateHandler(e)}
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
                        value={editExam.numberOfSeats}
                        onChange={(e) => this.seatsHandler(e)}
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
                        value={editExam.classroom}
                        onChange={(e) => this.classroomHandler(e)}
                      />
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={this.handleClose}
                      style={{ color: "#1b5e20" }}
                    >
                      Cancel
                    </Button>

                    <Button
                      size="small"
                      style={{ color: "#1b5e20" }}
                      type="submit"
                      onClick={() => editExamen(editExam)}
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
            onClick={() => deleteExam(exam.id)}
          >
            Delete
          </Button>{" "}
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

export default withStyles(useStyles)(ExamItem);
