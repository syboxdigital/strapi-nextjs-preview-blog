module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4c5f10ac64dedb249f3b3323d23a9370'),
  },
});
