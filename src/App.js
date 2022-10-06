import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ChildForm from "./components/ChildForm";

function App() {
/* const [isOnline, setNetwork] = useState(window.navigator.onLine);

 /seEffect(() => {
   updateNetwork();
 }, []);

 const updateNetwork = () => {
   setNetwork(window.navigator.onLine);
   console.log(isOnline);
   if (isOnline){
     setNetworkColor("green")
   } else {
     setNetworkColor("red")
   }
 };

 useEffect(() => {
   window.addEventListener("offline", updateNetwork);
   window.addEventListener("online", updateNetwork);
   return () => {
     window.removeEventListener("offline", updateNetwork);
     window.removeEventListener("online", updateNetwork);
   };
 });*/

 return (
   <div className="App">
     <header className="App-header">

       <img src={logo} className="App-logo" alt="logo" />
       <p>
         Edit <code>src/App.js</code> and save to reload.
       </p>
       <a
         className="App-link"
         href="https://reactjs.org"
         target="_blank"
         rel="noopener noreferrer"
       >
         Learn React
       </a>
       <ChildForm/>
     </header>
   </div>
 );
}

export default App;
