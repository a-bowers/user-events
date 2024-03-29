import type { AWS } from '@serverless/typescript';

import handleEvent from '@functions/handleEvent';

const serverlessConfiguration: AWS = {
  service: 'lambda',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
	'serverless-offline': {
		httpPort: 4000,
	},
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { handleEvent },
  useDotenv: true,
};

module.exports = serverlessConfiguration;
