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
            genre: '',
            moviesList: [],
            filteredMovieList: [],
            genreList: [],
            page: 1,
            inputValue: 3
        };
    }

    componentDidMount() {
        this.props.loadMovieList(this.state.page, this.state.inputValue, this.state.genre);
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
                        moviesList: newProps.allData.moviesData.data.results,
                        filteredMovieList: newProps.allData.moviesData.data.results
                    })
                }
            }
            if ('Success' === newProps.allData.genreData.status && this.props.allData.genreData.status !== newProps.allData.genreData.status) {
                newProps.allData.genreData.data.genres.map((checkbox) => {
                    checkbox.checked = false;
                });
                this.setState({
                    genreList: newProps.allData.genreData.data.genres
                })
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
                    <div className="row">
                        <div className="col-lg-3">
                            <div>
                                <label>
                                    Rating:
                                    <input className="ml-input-box"
                                        value={this.state.inputValue}
                                        type="number"
                                        min='3' max='10' step='0.5'
                                        onChange={this.updateInputValue} />
                                </label>
                            </div>
                            <div className="ml-check-box-container">
                                {this.renderCheckBoxes()}
                            </div>
                            <div>
                                <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div>
                                {this.renderMovieList(this.state.filteredMovieList)}
                            </div>
                            {/* <div className="ml-load-more">
                                <button className="btn btn-primary" onClick={this.handleClick}>Load More</button>
                            </div> */}
                        </div>
                    </div>
                }
            </div>
        );
    }

    renderCheckBoxes = () => {
        const { genreList } = this.state;
        return genreList.map((checkbox, index) =>
            <div key={index} className="ml-check-box-width">
                <label>
                    <input
                        className="ml-input-check-box"
                        type="checkbox"
                        checked={checkbox.checked}
                        onChange={() => this.toggleCheckbox(index)}
                    />
                    {checkbox.name}
                </label>
            </div>
        )
    }

    updateInputValue = (evt) => {
        this.setState({
            inputValue: evt.target.value
        });
    }

    toggleCheckbox = (index) => {
        const { genreList } = this.state;

        genreList[index].checked = !genreList[index].checked;

        this.setState({
            genreList
        });
    }

    scrollToTop = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    handleSubmit = () => {
        const genreSelectedList = this.state.genreList.filter((word) => word.checked === true).map((arr) => { return arr['id']; });
        // const genre = genreSelectedList.join(',');
        // this.setState({ moviesList: [], genre })
        // this.props.loadMovieList(1, this.state.inputValue, genre);
        const filterMovie = this.state.moviesList.filter((movie) => (movie.vote_average >= this.state.inputValue && this.arraysEqual(genreSelectedList, movie.genre_ids)));
        this.setState({ filteredMovieList: filterMovie });
        this.scrollToTop();
    }

    arraysEqual = (arr1, arr2) => {
        let result = [];
        if (arr1.length === 0)
            return true;
        for (var i = arr1.length; i--;) {
            if (arr2.includes(arr1[i]))
                result.push(true);
        }
        if (result.includes(false) || result.length === 0) {
            return false;
        }
        else if (arr1.length === result.length) {
            return true;
        }
    }

    handleClick = () => {
        this.setState({ page: this.state.page + 1 }, () => {
            this.props.loadMovieList(this.state.page, this.state.inputValue, this.state.genre);
        });
    }

    renderMovieList = (movies) => {
        if (movies.length === 0) {
            return (
                <div className="ml-nothing-to-show">
                    There is nothing to show.
            </div>)
        }
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
        loadMovieList: (page, rating, genre) => {
            dispatch(loadMovieList(page, rating, genre))
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