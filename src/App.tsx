import { useEffect, useState } from 'react';
// import Radium from 'radium';
import Auth from "./Components/Auth/Auth";
import NavBar from './Components/Auth/NavBar';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";


var styles = {
 
};


function App() {
 const [sessionToken, setSessionToken] = useState('');

useEffect(() => {
  if (localStorage.getItem("token")) {
    setSessionToken(localStorage.getItem("token") || '');
  }
}, []);

  const updateToken = (newToken: string) => {
    console.log('updateToken');
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
    console.log('clearToken');
    localStorage.clear();
    setSessionToken("");
  }

  const protectedViews = () => {
    console.log('protected views');
    // storage();
    return sessionToken === localStorage.getItem("token") ? (
      <Router>
      <NavBar token={sessionToken} clickLogout={clearToken} tokenUpdate={updateToken}/>
      </Router>
    ) : (
      <Auth tokenUpdate={updateToken} />
    )
    
  }


  console.log('app render')
  return (
    <div className="App">
      {/* <NavBar clickLogout={clearToken} tokenUpdate={updateToken}/> */}
     {protectedViews()}
     {/* <Auth tokenUpdate={updateToken}/> */}
     {/* <PostIndex token={sessionToken}/> */}
    </div>
  );
}


export default App;
