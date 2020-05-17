import React, { Component } from "react";
import axios from "axios";
import { Search } from "./components";
import styles from "./App.module.css";
import cx from "classnames";

class App extends Component {
  state = {
    title: "",
    body: "",
    posts: [],
  };

  componentDidMount = () => {
    this.getBlogPosts();
  };

  getBlogPosts = () => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
      })
      .catch((error) => {
        console.error("Posts Not Recieved", error);
      });
  };

  searchBlogsUpdate = (posts) => {
    this.setState({ posts: posts });
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
        console.log("Post Sent to Server: ", data.data);
        this.resetInput();
        this.getBlogPosts();
      })
      .catch((error) => {
        console.error("ERROR", error);
      });
  };

  resetInput = () => {
    this.setState({
      title: "",
      body: "",
    });
  };

  displayBlogPosts = (posts) => {
    if (!posts.length) return null;
    return posts.map((post, idx) => (
      <div key={idx} className={styles.posts}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <button className={styles.buttonLike}>Like</button>
      </div>
    ));
  };

  render() {
    console.log("State: ", this.state);

    return (
      <div>
      
      <div className={styles.conatiner}>
        <span>Lets post</span>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.internaldiv}>
            <fieldset>
              <div className={styles.inputcontainer}>
                <label htmlFor="title">Title</label>
                <input
                  name="title"
                  type="text"
                  placeholder="Enter Title..."
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className={styles.inputcontainer}>
                <label htmlFor="body">Body</label>
                <textarea
                  placeholder="Type here..."
                  name="body"
                  value={this.state.body}
                  cols="30"
                  rows="10"
                  onChange={this.handleChange}
                ></textarea>
              </div>
              <div className={cx(styles.submitcontainer, styles.inputcontainer)}>
                <button className={styles.formSubmit}>Submit</button>
              </div>
            </fieldset>
          </div>
        </form>
       
        </div>
        <Search searchBlogsUpdate={this.searchBlogsUpdate} />
        <div className={styles.displayPosts}>{this.displayBlogPosts(this.state.posts)}</div>
    </div>
    );
  }
}

export default App;
