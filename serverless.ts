import type { Serverless } from 'serverless/aws'

const serverlessConfiguration: Serverless = {
  service: {
    name: 'rc-entry-serverless',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '>=1.72.0',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    timeout: 120,
    region: 'ap-northeast-1',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      EMAIL: process.env.EMAIL,
      PASSWORD: process.env.PASSWORD,
    },
  },
  functions: {
    rcEntry: {
      handler: 'handler.rcEntry',
      timeout: 120,
      memorySize: 512,
      events: [
        {
          schedule: 'cron(* 3 */5 * ? *)',
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration
