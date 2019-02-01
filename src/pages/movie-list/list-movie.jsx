import React, { Component } from "react";
import { loadMovieList, loadGenreList } from '../../shared-library/movies-list/methods/index.js';
import { connect } from 'react-redux';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader';
import './style.less';

class ListMovieComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpinner: true,
            moviesList: [],
            page: 1,
            inputValue: 3
        };
    }

    componentDidMount() {
        this.props.loadMovieList(this.state.page,this.state.inputValue);
        this.props.loadGenreList();
    }

    componentWillReceiveProps(newProps) {
        if ('Initiated' === newProps.allData.moviesData.status) {
            this.setState({ showSpinner: true });
        }
        if ('Success' === newProps.allData.moviesData.status ||
            'Failure' === newProps.allData.moviesData.status) {
            this.setState({ showSpinner: false });
            if ('Success' === newProps.allData.moviesData.status) {
                if (this.state.page > 1) {
                    this.setState({
                        moviesList: [...this.state.moviesList, ...newProps.allData.moviesData.data.results]
                    })
                }
                else {
                    this.setState({
                        moviesList: newProps.allData.moviesData.data.results
                    })
                }
            }
        }
    }

    render() {
        return (
            <div className="container ml-popular-movie-container">
                <div className="ml-popular-heading">
                    Popular Movies
                </div>
                {this.state.showSpinner && this.state.page === 1 ?
                    <div className="ml-loader">
                        <OverlayLoader
                            color={'#BEBEBE'}
                            loader="BounceLoader"
                            active={this.state.showSpinner}
                            backgroundColor={'white'}
                        >
                        </OverlayLoader>
                    </div> :
                    <div>
                        <div>
                            <input className="ml-input-box"
                                value={this.state.inputValue}
                                type="number"
                                min='3' max='10' step='0.5'
                                onChange={this.updateInputValue} />
                            <button className="btn btn-primary ml-submit-button" onClick={this.handleSubmit}>Submit</button>
                        </div>
                        <div>
                            {this.renderMovieList(this.state.moviesList)}
                        </div>
                        <div className="ml-load-more">
                            <button className="btn btn-primary" onClick={this.handleClick}>Load More</button>
                        </div>
                    </div>
                }
            </div>
        );
    }

    updateInputValue = (evt) => {
        this.setState({
            inputValue: evt.target.value
        });
    }

    handleSubmit = () => {
        this.props.loadMovieList(this.state.page,this.state.inputValue);
    }

    handleClick = () => {
        this.setState({ page: this.state.page + 1 }, () => {
            this.props.loadMovieList(this.state.page,this.state.inputValue);
        });
    }

    renderMovieList = (movies) => {
        const list = movies.map(movie => {
            return (
                <div className="card ml-movie-card" key={movie.id}>
                    <img className="card-img-top" src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${movie.poster_path}`} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <p className="card-text">{movie.overview}</p>
                    </div>
                </div>
            );
        });
        return (list);
    }
    renderFormLabel = () => {
        const isSuccess = this.props.allData.genreData.status === 'Success';
        const labels = isSuccess && this.props.allData.genreData.data.genres.map(label => {
            return (
                {
                    value: label.id,
                    label: label.name
                }
            );
        });
        return (
            <CheckBoxList ref="chkboxList" defaultData={labels} onChange={this.handleCheckboxListChange} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allData: state.allData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadMovieList: (page,rating) => {
            dispatch(loadMovieList(page, rating))
        },
        loadGenreList: () => {
            dispatch(loadGenreList())
        }
    }
}

export const ListMovie = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListMovieComponent);