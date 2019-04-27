import React from "react";
import ReactDOM from "react-dom";
import CardGrid from "./CardGrid";
import Container from "react-bootstrap/Container";
import Select from "react-select";
import "./styles.css";

var searchModule = (function(Urls) {
  function searchUser(param) {
    return fetch(Urls.search + "?q=" + param, {
      headers: {
        Origin: "codesandbox.io"
      }
    });
  }
  function getUserDetails(userName) {
    return fetch(Urls.userDetails + `/${{ userName }}`, {
      headers: {
        Origin: "codesandbox.io"
      }
    });
  }
  return {
    searchUser: searchUser
  };
})({
  search: "https://api.github.com/search/users",
  userDetails: "https://api.github.com/users"
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      hasError: false,
      showModal: false,
      selectedUser: {}
    };
    this.onSearch = this.onSearch.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }
  onSearch = e => {
    if (e.key === "Enter") {
      this.setState({ loading: true });
      searchModule
        .searchUser(e.target.value)
        .then(res => res.json())
        .then(data => {
          this.setState({ users: data.items, loading: false });
          console.log(data.items);
        })
        .catch(e => console.log(e));
    }
  };
  sortBy = data => {
    console.log(data);
    const { users } = this.state;
    users = users.sort((a, b) => {
      const A = a.score,
        B = b.score;

      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });
  };
  onSelect = user => {};
  render() {
    const options = [
      { value: "asc", label: "Low to High" },
      { value: "dis", label: "High to Low" }
    ];
    return (
      <div className="App">
        <input type="text" onKeyUp={this.onSearch.bind(null)} />
        <div>sortBy</div>
        <Select options={options} onChange={this.sortBy.bind(null)} />
        <Container>
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <CardGrid users={this.state.users} onCardSelect={this.onSelect} />
          )}
        </Container>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
