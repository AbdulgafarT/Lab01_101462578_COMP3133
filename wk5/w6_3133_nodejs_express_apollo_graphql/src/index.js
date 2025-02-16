const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
require("dotenv").config();

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/graphql", expressMiddleware(server));

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected..."))
    .catch((err) => console.log("❌ MongoDB Connection Error:", err));

  app.listen(process.env.PORT || 4000, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT || 4000}/graphql`);
  });
}

startServer();
