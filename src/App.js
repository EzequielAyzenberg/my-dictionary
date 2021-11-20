import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {DictionaryEditor} from "./views/dictionary-editor";
import GlobalStyle from "./global-styles";

class App extends Component {
  render() {
    return (
      <div className="main">
        <DictionaryEditor/>
        <GlobalStyle/>
      </div>
    );
  }
}

export default App;
