const { connectDatabase } = require("./mongo-connect")

module.exports = () => {
  connectDatabase()
}
