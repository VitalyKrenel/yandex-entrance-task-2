module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 3,
      browsers: 'last 2 versions',
    },
  },
};
