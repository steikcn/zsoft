var express = require('express')
var app = express()
var path = require('path')
var mongoose = require('mongoose')
var us = require('underscore')
var Movie = require('./models/movie')
var port = process.env.PORT || 3000
var bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")))
app.locals.moment = require('moment')
app.listen(port)

console.log('IMOOC started on port '+port)

// index page
app.get('/',(req, res)=>{
  Movie.fetch((err, movies)=>{
    if (err) {console.log(err)}

    res.render('index', {
      title: "IMOOC 首页",
      movies: movies
    })
  })
})

// detail page
app.get('/movie/:id',(req, res)=>{
  var id = req.params.id
  if (id) {
    Movie.findById(id, (err, movie)=>{
      if (err) {console.log("findById error")}

      res.render('detail', {
        title: "IMOOC " + movie.title,
        movie: movie
      })
    })
  }
})

// admin page
app.get('/admin/movie',(req, res)=>{
  res.render('admin', {
    title: "IMOOC 后台录入页",
    movie: {
      director: "",
      country: "",
      title: "",
      year: "",
      poster: "",
      language: "",
      flash: "",
      summary: ""
    }
  })
})

// admin update movie
app.get('/admin/update/:id', (req, res)=>{
  var id = req.params.id
  if (id) {
    Movie.findById(id, (err, movie)=>{
      if (err) {console.log("findById error")}

      res.render('admin',{
        title: 'imooc 后台更新页',
        movie: movie
      })
    })
  }
})

// admin post movie
app.post('/admin/movie/new', (req, res)=>{
  var movieObj = req.body.movie
  var id = movieObj._id
  var _movie

  if (id !== 'undefined') {
    Movie.findById(id, (err, movie) => {
      if (err) {
        console.log(err) 
      }
      _movie = us.extend(movie, movieObj)
      _movie.save((err, movie) => {
        if (err) {
          console.log(err)
        }
        res.redirect('/movie/'+movie._id)
      })
    })
  } else {
    _movie = new Movie({
      title: movieObj.title,
      director: movieObj.director,
      country: movieObj.country,
      language: movieObj.language,
      poster: movieObj.poster,
      flash: movieObj.flash,
      summary: movieObj.summary,
      year: movieObj.year
    })
    _movie.save((err, movie) => {
      if (err) {
        console.log(err)
      }
      res.redirect('/movie/'+movie._id)
    })
  }
})

// list page
app.get('/admin/list',(req, res)=>{
  Movie.fetch((err, movies)=>{
    if (err) {
      console.log(err)
    }

    res.render('list', {
      title: "IMOOC 列表页",
      movies: movies
    })
  })
})

// list delete movie
app.delete('/admin/list', (req, res)=>{
  var id = req.query.id
  if (id) {
    Movie.remove({_id: id}, (err, movie) => {
      if (err) {
        console.log(err)
      }
      else {
        res.json({success: 1})
      }
    })
  }
})