'use strict'

const fs    = require('fs')
const https = require('https')
const pem   = require('pem')

module.exports = (app, config) => {
  return new Promise((resolve, reject) => {
    const logger = require('./logger')(config)

    const SERVER_CONF = config.get('server')

    if (SERVER_CONF.protocol === 'https:') {
      const HTTPS_CONF = Object.assign({}, config.get('https'))

      createHttpsServer(app, HTTPS_CONF, logger).then(server => {
        let theServer = server.listen(SERVER_CONF.port, () => resolve(theServer) )
      }, reject)
    } else {
      let theServer = app.listen(SERVER_CONF.port, () => resolve(theServer))
    }
  })
}

function loadFileFromConfigParam (param, conf, logger) {
  if (conf[param]) {
    try {
      fs.accessSync(conf[param], fs.R_OK || fs.constants.R_OK)

      conf[param] = fs.readFileSync(conf[param], {encoding: 'utf8', flag: 'r'})
    } catch (err) {
      logger.debug(`Config value 'https.${param}' is not an accessible file path.`, conf[param])
    }
  }
}

function createHttpsServer (app, httpsConf, logger) {
  return new Promise((resolve, reject) => {
    if (!httpsConf.cert || !httpsConf.key) {
      generateDevelopmentCerts(httpsConf, logger).then(conf => {
        conf.agent = new https.Agent(conf)
        resolve( https.createServer(conf, app) )
      }, reject)
    } else {
      loadFileFromConfigParam('cert', httpsConf, logger)
      loadFileFromConfigParam('key', httpsConf, logger)
      loadFileFromConfigParam('ca', httpsConf, logger)
      loadFileFromConfigParam('crl', httpsConf, logger)

      httpsConf.agent = new https.Agent(httpsConf)

      const theServer = https.createServer(httpsConf, app)

      resolve(theServer)
    }
  })
}

function generateDevelopmentCerts (conf, logger) {
  return new Promise((resolve, reject) => {
    pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
      if (err) return reject(err)

      logger.warn('UNSAFE PRODUCTION CONFIGURATION!  Using auto-generated certificate for https.')

      conf.cert = keys.certificate
      conf.key = keys.serviceKey

      resolve(conf)
    })
  })
}
