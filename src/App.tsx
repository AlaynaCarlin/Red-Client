import React, { useEffect, useState } from 'react';
import Radium from 'radium';
import Auth from "./Components/Auth/Auth";
import PostIndex from './Components/Posts/postIndex';
import NavBar from './Components/Auth/NavBar';
import './App.css';


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
      <NavBar token={sessionToken} clickLogout={clearToken} tokenUpdate={updateToken}/>
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
