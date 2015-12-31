// ombd api documentation is available here:
// http://www.omdbapi.com/

/**
 * app.getMovieById
 * @param id    - omdb id of the movie you're searching for
 */
app.getMovieById = function getMovieById(id) {

  console.log("app.getMovieById() has been called. nothing happens. wait.. some tumbleweeds are tumbling by! an ID of '" + id + "' was entered.");

  // request URL for omdb's id search
  // http://www.omdbapi.com/?i=tt0095016&plot=full&r=json

  // 1. create your ajax request and then in your success method.
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "http://www.omdbapi.com/?i=" + id + "&plot=full&r=json", true);
  xhr.onload = function() {
    if (xhr.readyState != XMLHttpRequest.DONE) {
      return;
    }
    if (xhr.status == 200) {
      // 2. you should create a new MovieModel object based on the returned
      // result.
      // var movie = new app.MovieModel(data);
      var movie = new app.MovieModel(JSON.parse(xhr.responseText));
      // 3. you should create a new MovieView object based on movie model
      var view = new app.MovieView(movie);
      // 4. you call render() on the view
      // 5. your render() should append the `$el` to the DOM
      view.render();
    }
  }
  xhr.send(null);
}

/**
 * app.getMovieByTitle
 * @param title     - title of the movie you're searching for
 */
app.getMovieByTitle = function getMovieByTitle(title) {

  console.log("app.getMovieByTitle() has been called. the form stares at you blankly. wait, what? A title of '" + title + "' was entered");

  // request URL for omdb's title search:
  //http://www.omdbapi.com/?t=Die+Hard&y=1988&plot=full&r=json

  // 1. create your ajax request and then in your success method.
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://www.omdbapi.com/?t=" + title + "&plot=full&r=json", true);
  xhr.onload = function() {
      if (xhr.readyState != XMLHttpRequest.DONE) {
          return;
      }
      if (xhr.status == 200) {
          // 2. you should create a new MovieModel object based on the returned
          // result.
          // var movie = new app.MovieModel(data);
          var movie = new app.MovieModel(JSON.parse(xhr.responseText));
          // 3. you should create a new MovieView object based on movie model
          var view = new app.MovieView(movie);
          // 4. you call render() on the view
          // 5. your render() should append the `$el` to the DOM
          view.render();
      }
  }
  xhr.send(null);
}


/**
 * app.MovieModel
 * movie model constructor
 * @param options  - options object
 */
app.MovieModel = function MovieModel(options) {

  // id, title, rating, director, plot, year, genre should all be in the `options` object
  // store all the information in the model
  this.id = options["imdbID"];
  this.title = options["Title"];
  this.rating = options["Rated"];
  this.director = options["Director"];
  this.plot = options["Plot"];
  this.year = options["Year"];
  this.genre = options["Genre"];
  this.poster = options["Poster"];

}

/**
 * app.MovieView
 * movie view constructor
 * @param options  - options object
 */
app.MovieView = function MovieView(options) {

  // options should contain the `model` for which the view is using

  // 1. create a view
  var view = {
    id: options.id,
    title: options.title,
    rating: options.rating,
    director: options.director,
    plot: options.plot,
    year: options.year,
    genre: options.genre,
    poster: options.poster
  };
  // 2. create a render() method
  this.render = function() {
    var movie = document.createElement("div");
    var html = "";
    // 3. render() should a div with a class of '.movie' via string concatenation
    //    you will want to add the id, title, rating, director, plot, year,
    //    and genre. See design/movielayout.html
    movie.className = "movie";
    html = "Title: " + view.title + "\nRated: " + view.rating + "\nDirected by: " + view.director + "\nPlotline: " + view.plot + "\nReleased: " + view.year + "\nGenre: " + view.genre;
    var img = document.createElement("img");
    img.src = view.poster
    // 4. finally, render() will $(selector).append() each new '.movie' to "#movie-listing".
    movie.innerHTML = html;
    movie.appendChild(img);
    var movieList = document.getElementById("movie-listing");
    movieList.appendChild(movie);
  }


}
