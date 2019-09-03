const app = require('./server')
const PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})