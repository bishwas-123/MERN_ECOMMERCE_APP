// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV: "mongodb+srv://bishwas:VBkMbImopGn64KF7@reactreseve-jr2q9.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: "bishwasbishwasbishwasbishwas",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/bishwas/image/upload",
    STRIPE_SECRET_KEY: "<insert-stripe-secret-key>"
  }
};
