import React from 'react';
import Radium from 'radium';
import Auth from "./Components/Auth/Auth";
import PostIndex from './Components/Posts/postIndex';
import NavBar from './Components/Auth/NavBar';

import './App.css';
import { Navbar } from 'reactstrap';

var styles = {
 
};

class App extends React.Component<{}, any> {
  constructor(props: any) {
    super(props) 
      this.state = {
        sessionToken: ''
      }
  }

  componentDidMount = () => {
    console.log('componentDidMount');
    if(localStorage.getItem("token")){
      this.setState({sessionToken: localStorage.getItem("token")});
    }
  }

  updateToken = (newToken: string) => {
    console.log('updateToken');
    localStorage.setItem("token", newToken);
    this.setState({sessionToken: newToken});
    console.log(this.state.sessionToken);
  }

  clearToken = () => {
    console.log('clearToken');
    localStorage.clear();
    this.setState({sessionToken: ''});
  }

  protectedViews = () => {
    return this.state.sessionToken === localStorage.getItem("token") ? (
      <PostIndex token={this.state.sessionToken} />
    ) : (
      <Auth updateToken={this.updateToken}/>
    )
  }

render (){
  return (
    <div className="App">
      {/* <Navbar clickLogout={this.clearToken()} updateToken={this.updateToken}/> */}
     {this.protectedViews}
     <Auth/>
    </div>
  );
}
}

export default Radium(App);
