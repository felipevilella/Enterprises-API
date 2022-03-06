export default {
  secret_token: `${process.env.APP_SECRET}`,
  secret_refresh_token: `${process.env.SECRET}`,
  expire_in_token: '120m',
};
