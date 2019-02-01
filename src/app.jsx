import React, { Component } from "react";
import { ListMovie } from './pages/movie-list/index.jsx';
import { Header } from './component/index.jsx';
import './style.less';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <ListMovie />
            </div>
        );
    }
}

export default App;