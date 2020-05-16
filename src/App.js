import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  state = {
    title: "",
    body: "",
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      title: this.state.title,
      body: this.state.body,
    };
    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then((data) => {
        console.log("Data Sent to Server: ", data.data);
        this.resetInput()
      })
      .catch((error) => {
        console.error("ERROR", error);
      });
  };

  resetInput = () => {
    this.setState({
      title: '',
      body: ''
    })
  }

  render() {
    console.log("State: ", this.state);
    return (
      <div>
        <h2>Welcome to the App</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-input">
            <input name="title" type="text" placeholder="Title" value={this.state.title} onChange={this.handleChange} />
          </div>
          <div className="form-input">
            <textarea
              placeholder="Body"
              value={this.state.body}
              name="body"
              cols="30"
              rows="10"
              onChange={this.handleChange}
            ></textarea>
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
