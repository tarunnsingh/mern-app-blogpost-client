import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  state = {
    title: "",
    body: "",
    posts: [],
    search: "",
  };

  componentDidMount = () => {
    this.getBlogPosts();
  };

  getBlogPosts = () => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        console.log("Posts Recieved");
        this.setState({ posts: data });
      })
      .catch(() => {
        console.log("Posts Recieved");
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSearch = ({ target }) => {
    const searchBlog = target.value;
    this.setState({ search: searchBlog });
    this.state.posts.filter((post) => {
      if (searchBlog == post.title) {
      }
    });
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
      <div key={idx}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    ));
  };

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
        <input
          name="searchBar"
          type="text"
          placeholder="Search a blog..."
          value={this.state.search}
          onChange={this.handleSearch}
        />
        <div>{this.displayBlogPosts(this.state.posts)}</div>
      </div>
    );
  }
}

export default App;
