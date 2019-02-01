import React, { Component } from 'react';
import './style.less';

export class Header extends Component {
    render() {
        return (
            <header className="ml-header">
                <div className="container">
                    <i className="fa fa-film ml-movie-icon"></i>
                    <div className="ml-popular-movies">
                        Popular movies
                    </div>
                </div>
            </header>
        )
    }
}