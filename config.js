module.exports={
jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET || "development_secret",
    refreshSecret: process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
    expiry: "7d",
    refreshExpiry: "2d",
  }};