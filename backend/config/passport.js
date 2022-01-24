const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const SECRET_ACCESS_KEY = require("../config/config").SECRET_ACCESS_KEY;
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
var opts = {};
const TableName = require("../config/config").Users;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_ACCESS_KEY;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await docClient
          .get({ TableName, Key: { email: payload.email } })
          .promise();
        if (user.Item) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        console.error(error);
      }
    })
  );
};
