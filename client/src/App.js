import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      context: [],
      id: " ",
      title: " ",
      description: " ",
      URL: " ",
    };
    this.postData = this.postData.bind(this);
  }

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  fetchData() {
    axios.get("/api").then((res) => this.setState({ context: res.data }));
  }

  postData(e) {
    e.preventDefault();
    axios
      .post("/api/new", {
        title: this.state.title,
        description: this.state.description,
        URL: this.state.URL,
      })
      .then((res) => this.setState({ context: res.data }));
  }

  putData(id) {
    axios
      .put("/api/new/" + id, {
        title: this.state.title,
        description: this.state.description,
        URL: this.state.URL,
      })
      .then((res) => this.setState({ context: res.data }));
  }

  deleteData(id) {
    axios
      .delete("/api/delete/" + id)
      .then((res) => this.setState({ context: res.data }));
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="container">
        <div className="heading">
          <h1>Fill out the form below to Add a Web Project to the list</h1>
          <h2>
            Select either the Edit or Delete button to change a item from the
            list or delete it
          </h2>
        </div>

        <form>
          <input placeholder="Title" onChange={this.handleChange("title")} />
          <input
            placeholder="Description"
            onChange={this.handleChange("description")}
          />
          <input placeholder="URL" onChange={this.handleChange("URL")} />
          <button onClick={this.postData}>Submit</button>
        </form>
        {this.state.context.map((project) => (
          <div key={project.id}>
            <h2 className="red">{project.title}</h2>
            <h2 className="red">{project.description}</h2>
            <h2 className="red">{project.URL}</h2>
            <button onClick={() => this.putData(project.id)}>Edit</button>
            <button onClick={() => this.deleteData(project.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
