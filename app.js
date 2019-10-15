
// Miniserver
// creas folder
// npm init -y
// npm install request
// npm install express
// crear .gitignore
//     node_modules/
//     credentials.js
//nom
//npm run start

const express = require('express')
const weather = require('./weather.js')

const app = express()

// const port = process.env.PORT || 3000
const port = 3000

app.get('', function(req, res) {
  res.send({
    greeting:'Hola Mundo!'
  })
})

// http://localhost:3000/omdb?search=Game%20of%20Thrones
app.get('/weather', function(req, res) {
  //console.log(res.query)
	if (!req.query.search) {
	    res.send({
	      error: 'Debes enviar una Ciudad'
	    })
	}
  // Hardcodeado
  // res.send({
  //   title: 'Game of Thrones'
  // })
	weather.geocode( req.query.search, function(error, response) {
	  	if (error) {
		    return res.send({
		      error: error
		    })
	  	}

    	weather.forecast(response.longitude, response.latitude, function(error, response) {
		    if (error) {
		        return res.send({
		          error: error
		        })
		    }
		    res.send(response)
    	})
	})


})


// Comodin
app.get('*', function(req, res) {
  res.send({
    error:'ruta no valida'
  })
})

app.listen(port, function() {
  console.log('Up and running!')
})

// weather.geocode('New York', function(error, data) {
// 	if(error){
// 		console.log(error)
// 	} else {
// 		weather.forecast(data.longitude, data.latitude, function(error, data) {
// 			if (error) {
// 				console.log(error)
// 			} else {
// 				console.log(data)
// 			}
// 		})
// 	}
// })


