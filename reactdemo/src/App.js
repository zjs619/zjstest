/*
react路由配置：

1.  安装 npm install react-router-dom --save

2.  找到项目的根组件  react-router-dom
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

3.写法:(加载的组件要提前引入)

      <Router>
          <Route exact path='/' component={Home}></Route>
          <Route path='/news' component={News}></Route>
      </Router>

      exact表是严格匹配


*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './assets/css/App.css';
import Home from './components/Home';
import News from './components/News';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <div>

          <Link to='/'>首页</Link>
          <br />
          <Link to='/news'>新闻</Link>
<<<<<<< HEAD
=======



          <br />
          <br/>
          <hr/>
>>>>>>> ebf690c1b211deebeeb774735306f25cda32a6e7
          <Route exact path='/' component={Home}></Route>
          <Route path='/news' component={News}></Route>
        </div>
      </Router>
    );
  }
}


export default App;
