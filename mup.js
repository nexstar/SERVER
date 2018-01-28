module.exports = {
  servers: {
    one: {
      host: '203.67.248.85',
      username: 'root',
      // pem: './path/to/pem'
      password: 's123'
      // or neither for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'SERVICE_Notification',
    path: '.',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      PORT:9484,
      ROOT_URL: 'http://203.67.248.85:9484/'
      // MONGO_URL: 'mongodb://203.67.248.84:8888',
    },

    docker: {
      image: 'abernix/meteord:node-8.4.0-base',
    },

    deployCheckWaitTime: 60,

    enableUploadProgressBar: true
  }
};
