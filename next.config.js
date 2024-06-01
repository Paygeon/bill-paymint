const nextConfig = {
    images: {
      domains: ['pbs.twimg.com', 'vashong.github.io', 'creditcards.chase.com', 'cdn.wallethub.com', 'images.ctfassets.net'],
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /node:/,
        loader: 'ignore-loader', // or any other loader you want to use
      });
  
      return config;
    },
  };
  
  module.exports = nextConfig;
  