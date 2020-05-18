import React, { Component } from "react";

import ExamList from "./components/ExamList";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <main className="exams">
          <ExamList />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
