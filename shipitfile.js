// this is an example shipit file to deploy it on your server
// you will need to edit it with your data
// also make sure that your ~/.bash_profile file on the server loads nvm/node
// as shipit doesn't load profile scripts by default

// shipitfile.js
module.exports = (shipit) => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit);
  const path = require('path');

  shipit.initConfig({
    default: {
      deployTo: '/home/my-user/my-microservice-server',
      repositoryUrl: '',
      keepReleases: 3,
      branch: 'main',
      shared: {
        overwrite: true,
        dirs: ['node_modules']
      }
    },
    staging: {
      servers: 'user@server.com'
    }
  });

  shipit.task('deploy', [
    'deploy:init',
    'deploy:fetch',
    'deploy:update',
    'build'
  ]);

  shipit.task('build', async () => {
    const currentPath = path.join(
      shipit.config.deployTo,
      'releases',
      shipit.releaseDirname
    );
    await shipit.copyToRemote(
      'config.js.prod',
      `${currentPath}/config.js`
    );

    shipit.remote(`source ~/.bash_profile && cd ${currentPath} && yarn build`);
    shipit.emit('built');
  });

  shipit.on('built', async () => {
    await shipit.start('deploy:publish');
    await shipit.start('deploy:clean');
    await shipit.start('deploy:finish');
  });

  shipit.task('node', async () => {
    // shipit.remote('source ~/.bashrc');
    shipit.remote('source ~/.bash_profile && node -v');
  });
};
