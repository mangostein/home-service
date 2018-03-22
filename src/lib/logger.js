let moment = require('moment');
let os = require('os');
let threshold = 'info';
const levels = [
  'silly',
  'debug',
  'info',
  'log',
  'warn',
  'error'
];

let loggerInstance;
let hostname = os.hostname();

module.exports = (config) => {
  if (config.log_level && levels.indexOf(config.log_level) != -1) {
    threshold = config.log_level;
  }

  if (loggerInstance) {
    return loggerInstance;
  }

  loggerInstance = {};

  levels.forEach((level) => {
    loggerInstance[level] = factory(level);
  });
  return loggerInstance;
}

function factory(level) {
  return logFn.bind(this, level);
}

function logFn(level, ...args) {
  let priority = levels.indexOf(level);
  if (priority < levels.indexOf(threshold)) {
    return;
  }
  let timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");
  let prefix = `${timestamp} [${hostname}]`;
  let data = args.map((a) => {
    if (a === undefined) {
      return 'undefined';
    }
    else if (a === null) {
      return 'null';
    }
    else if (!a) {
      return a;
    }
    else if (Object.prototype.toString.call(a) === '[object Array]') {
      let pointers = [];
      return '\n' + JSON.stringify(a, tostring.bind(this, pointers), 2) + '\n';
    }
    else if (Object.prototype.toString.call(a) === '[object Object]') {
      if (!Object.keys(a).length) {
        return '{}';
      }
      else {
        let pointers = [];
        return '\n' + JSON.stringify(a, tostring.bind(this, pointers), 2) + '\n';
      }
    }
    else if (a.toString) {
      return a.toString();
    }
    return a;
  });
  if (level === 'error') {
    console.error(prefix, data.join(' '));
  }
  else if (level === 'warn') {
    console.warn(prefix, data.join(' '));
  }
  else {
    console.log(prefix, data.join(' '));
  }
}

function tostring(pointers, key, value) {
  if (value && typeof(value) == 'object') {
    if (pointers.indexOf(value) === -1) {
      pointers.push(value);
      return value;
    }
    let valueType = Object.prototype.toString.call(value);
    return valueType === '[object Array]' ? '[Array circular ref]' : '[Object circular ref]';
  }
  else {
    return value;
  }
}
