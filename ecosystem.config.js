// a config file for pm2
// pm2 start ecosystem.config.js
//
// if you uses shipit to deploy it
// you should place it one level above the current directory
// so pm2 always uses the currently linked latest release
module.exports = {
  apps: [
    {
      // name of your service
      name: 'my-microservice-server',
      script: 'yarn start',
      cwd: './current'
    }
  ]
};
