const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const formBodyParser = bodyParser.urlencoded({ extended: false })


const { argv: [, , port = 8080] } = process

const app = express()

app.get('/register', (req, res) => {

    res.send(`<html>
    <head>
        <title>HELLO WORLD</title>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
        <h1>HELLO WORLD</h1>
        <section class="register">
            <h2>Register</h2>
            <form method="POST" action="/register">
            <input name="name" type="text" placeholder="name">
            <input name="surname" type="text" placeholder="surname">
            <input name="username" type="text" placeholder="username">
            <input name="password" type="password" placeholder="password">
            <button type="submit">Register</button>
            </form>
        </section>
    </body>
    </html>`)
})

app.post('/register', formBodyParser,(req, res) =>{

    const {body: {name, surname, username, password}} = req

    const postData = JSON.stringify({name, surname, username, password})

    const options = {
        hostname: 'skylabcoders.herokuapp.com',
        port: 443,
        path: '/api/user',
        method: POST,
        headers: {
          'Content-type': 'application/json'
        },
        body: postData
    }

    https.post(options, (res)=> {
        console.log('uolaaa')
    })
})

app.listen(port, () => console.log(`server running on port ${port}`))