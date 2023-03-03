const path = require('path');

module.exports = {
  env: "development",
  port: 9000,
  jwtSecret: "bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4",
  jwtExpirationInterval: 2000,
  mongo: {
    uri: `mongodb://Production:Kukku%401975@15.207.57.45:27017/Orgzstack?&authSource=admin`,
   // uri: `mongodb+srv://localhost:27017/Development?retryWrites=true&w=majority`
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  emailConfig: {
    host: "process.env.EMAIL_HOST",
    port: "process.env.EMAIL_PORT",
    username: "process.env.EMAIL_USERNAME",
    password: "process.env.EMAIL_PASSWORD",
  },
};