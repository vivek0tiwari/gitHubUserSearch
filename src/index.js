import React from "react";
import ReactDOM from "react-dom";
import CardGrid from "./CardGrid";
import { Container, Spinner, Row, Alert } from "react-bootstrap";

import SearchBar from './SearchBar'
import Modal from "./Modal"
import SortComponent from "./SortComponent"
import "./styles.css";
import gitHubUserModule from './gitHubUserModule'
import sorter from './sorter';

const UlrConf = {
  search: "https://api.github.com/search/users",
  userDetails: "https://api.github.com/users"
}
const gitHubClient = gitHubUserModule(UlrConf);
const options = [
  { value: "asc", label: "Low to High" },
  { value: "desc", label: "High to Low" }
];



export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortingOrder: null,
      loading: false,
      users: [],
      hasError: false,
      showModal: false,
      selectedUser: {}
    };
  }
  
  onSearch = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.key === "Enter") {
      this.setState({ loading: true });
      gitHubClient
        .searchUser(e.target.value)
        .then(res => res.json()) // todo: check for the http status
        .then(data => {
          const users = data.items.map(user =>{
            // this is immediately invoke function
            return (({ login, avatar_url, score }) => (
              { login, avatar_url, score })
              )(user)
          })
          this.setState(() => ({ users: users, loading: false, hasError: false }));
        })
        .catch(
          e => {
            console.log(e)
            this.setState(() => ({ hasError: true, loading: false }))
          })
    }
  };
  
  sortUser = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    debugger
    const sortingOrder = e.target.value;
    let  users  = [...this.state.users];
    console.log('Before sorting', users[0], sortingOrder);
    users = users.sort(sorter('score', sortingOrder));
    console.log('After sorting', users[0]);
    this.setState((e) => ({ sortingOrder, users}));
  };

  onSelect = (selectedUser) => {
    gitHubClient
        .getUserDetails(selectedUser.login)
        .then(res => res.json()) // todo: check for the http status
        .then(data => {
          const selectedUser = (({following, followers, public_repos, login, site_admin}) =>({following, followers, public_repos, login, site_admin}))(data)
          this.setState(() => ({  showModal: true, selectedUser}));
        })
        .catch( e => {
          console.log(e)
          this.setState(() => ({ hasError: true, loading: false }))
        });
  };

  closeModal = () =>{this.setState(() => ({  showModal: false}))}
  renderNoResult = () => {
    return <Alert variant='secondary'>
                No result found
            </Alert>};
  renderSearchResult =()=>{
    const {sortingOrder, users} = this.state;
      return users.length?<div>
                <SortComponent options={options} onChange={this.sortUser} value={sortingOrder}/>
                <Row><CardGrid users={users} onCardSelect={this.onSelect} /></Row>
            </div>:this.renderNoResult();
  }
  render() {
    return (
      <div className="App">
        <SearchBar onSearch = {this.onSearch.bind(null)}/>
        
        <Container>
          {this.state.loading ? (
            <Spinner animation="border" />
          ) : (
            this.renderSearchResult()
          )}
        </Container>
        <Modal {...this.state.selectedUser} handleClose={this.closeModal} showModal={this.state.showModal}/>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
