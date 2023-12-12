import express from 'express'
import cors from 'cors'
import { AppDataSource } from "./data-source"
import router from './route'

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        const port = 5002
        const body = require('body-parser')
        app.use(body.urlencoded({ extended: true }))
        app.use(cors())
        app.use(express.json())
        app.use("/api/v1", router)
        app.use(express.static('public'))
        app.listen(port, () => {
            console.log("Server running on port: " + port)
        })
    })
    .catch(error => console.log(error))