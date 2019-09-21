import React, { Component } from "react";
import "./App.css";
import { recipes } from "./tempList";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

class App extends Component {
  state = {
    recipes: [],
    url:
      "https://www.food2fork.com/api/search?key=2ea3fc2a3895d3dc3bb7e7a6bc5e67a0",
    base_url:
      "https://www.food2fork.com/api/search?key=2ea3fc2a3895d3dc3bb7e7a6bc5e67a0",
    details_id: 0,
    pageIndex: 1,
    // recipes: recipes,
    search: "",
    query: "&q=",
    error: ""
  };

  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      console.log(jsonData);
      if (jsonData.count === 0) {
        this.setState(() => {
          return {
            error: "Sorry, your search didn't return any result",
            search: ""
          };
        });
      } else {
        this.setState({ recipes: jsonData.recipes, error: "" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  displayPage = index => {
    switch (index) {
      default:
      case 1:
        return (
          <RecipeList
            recipes={this.state.recipes}
            handleDetails={this.handleDetails}
            value={this.state.search}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            error={this.state.error}
          ></RecipeList>
        );
      case 0:
        return (
          <RecipeDetails
            id={this.state.details_id}
            handleIndex={this.handleIndex}
          ></RecipeDetails>
        );
    }
  };

  handleIndex = index => {
    this.setState({ pageIndex: index });
  };
  handleDetails = (index, id) => {
    this.setState({ pageIndex: index, details_id: id });
  };
  handleChange = e => {
    this.setState({ search: e.target.value }, () => {});
  };
  handleSubmit = e => {
    e.preventDefault();
    const { base_url, query, search } = this.state;
    this.setState(
      () => {
        return { url: `${base_url}${query}${search}`, search: "" };
      },
      () => {
        this.getRecipes();
      }
    );
    console.log("hello from handle submit");
  };
  render() {
    //console.log(this.state.recipes);
    return (
      <React.Fragment>{this.displayPage(this.state.pageIndex)}</React.Fragment>
    );
  }
}

export default App;
