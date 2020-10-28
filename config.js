const dotenv = require('dotenv')
dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.email_whitelist' })

const config = {}

config.PORT = process.env.PORT || 8080

const isPresent = varName => {
  if (varName in process.env && process.env[varName].trim() !== '') {
    return true
  }
  return false
}

if (!isPresent('APP_NAME')) {
  config.APP_NAME = 'CoucouCollègues'
} else {
  config.APP_NAME = process.env.APP_NAME
}

if (!isPresent('MAIL_USER') || !isPresent('MAIL_PASS')) {
  throw new Error('Env vars MAIL_USER and MAIL_PASS should be set')
}
config.MAIL_USER = process.env.MAIL_USER
config.MAIL_PASS = process.env.MAIL_PASS

if (!isPresent('MAIL_SENDER_EMAIL')) {
  throw new Error('Env vars MAIL_SENDER_EMAIL should be set')
}
config.MAIL_SENDER_EMAIL = process.env.MAIL_SENDER_EMAIL

if (isPresent('MAIL_SERVICE')) {
  config.MAIL_SERVICE = process.env.MAIL_SERVICE
} else {
  if (!isPresent('MAIL_HOST') || !isPresent('MAIL_PORT')) {
    throw new Error('When MAIL_SERVICE is not set, env vars MAIL_HOST and MAIL_PORT should be set')
  }
  config.MAIL_HOST = process.env.MAIL_HOST
  config.MAIL_PORT = process.env.MAIL_PORT
}

if (isPresent('EMAIL_WHITELIST')) {
  config.EMAIL_WHITELIST = process.env.EMAIL_WHITELIST.split(",").map(string => new RegExp(string))
} else {
  config.EMAIL_WHITELIST = [/.*/]
}

console.log('EMAIL_WHITELIST', config.EMAIL_WHITELIST)

module.exports = config
