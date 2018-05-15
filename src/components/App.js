import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import StarRatingComponent from 'react-star-rating-component';

import myData from '../movies.json';

class App extends Component {
  constructor(props){
    super(props);



    this.state = {
      sort:'title',
      movies:[]
    }
    myData.map((movie) => {
      this.state.movies.push(movie);
    })    
    this.state.movies.sort((a,b) => {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)})
    this.sortEventHandler = this.sortEventHandler.bind(this);
    this.ratingEventHandler = this.ratingEventHandler.bind(this);
  }



  sortEventHandler(str){
    this.setState({
      sort:str,
    })
  }

  ratingEventHandler(nextValue,prevValue,name){
    var movie = this.state.movies.filter((movie) => movie.title === name);
    movie[0].rating = nextValue;
    var movies = this.state.movies.filter((movie) => movie.title !== name).concat(movie);
    if(this.state.sort === 'title')
      this.setState({movies:movies.sort((a,b) => {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);} )});
    else
      this.setState({movies:movies.sort((a,b) => {return (a.releaseDate > b.releaseDate) ? 1 : ((b.releaseDate > a.releaseDate) ? -1 : 0);} )});
    
  }



  render() {

    return (
      <div className="App">
        <Header sortEvent = {this.sortEventHandler}/>
        <div className='container'>
            <div className='row'>
                {this.state.movies.map((movie) => (
                    <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6' key={movie.$id}>
                        <img src={require(`./${movie.image}`)} alt='wtf'/>
                        <p>{movie.title}</p>
                        <p>{movie.releaseDate}</p>
                        
                        
                        {movie.releaseDate < '2015-01-01'
                        ? <div>
                            <p>No Rating</p>
                            <StarRatingComponent
                            name={movie.title}
                            value={movie.rating} 
                            starCount={5}
                            onStarClick={this.ratingEventHandler}
                            editing={false} 
                            />
                          </div>
                        : <div>
                            <p>Rating {movie.rating}</p>
                            <StarRatingComponent
                            name={movie.title}
                            value={movie.rating} 
                            starCount={5}
                            onStarClick={this.ratingEventHandler} 
                            />
                          </div> }
                                       
                    </div>
                ))}
            </div>
        </div>        
      </div>
    );
  }

  componentDidMount(){

  }
  componentDidUpdate(prevProps,prevState){
    if(prevState.movies === this.state.movies){
      console.log(prevState.movies,this.state.movies)
    }
  }
}

export default App;
