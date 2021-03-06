interface ILoggerOptions {
  channels: string[]
}

function getLogChannels(conf?: string): string[] {
  if (!conf) {
    return []
  }

  conf = conf.replace('*', 'ERR,WARNING,INFO,LOG')

  return conf.split(",").map(s => s.trim())
}

const getOptions = (): ILoggerOptions => ({
  channels: getLogChannels(process.env.LOG_LEVEL)
})

function genericLog(channel: string, message?: any, ...optionalParams: any[]) {
  const { channels } = getOptions()
  if (channels.includes(channel)) {
    console.log(`[EOS-WATCH][${channel}]: `, message, ...optionalParams)
  }
}

export function verbose(message?: any, ...optionalParams: any[]) {
  genericLog("VERBOSE", message, ...optionalParams)
}

export function log(message?: any, ...optionalParams: any[]) {
  genericLog("LOG", message, ...optionalParams)
}

export function info(message?: any, ...optionalParams: any[]) {
  genericLog("INFO", message, ...optionalParams)
}

export function warn(message?: any, ...optionalParams: any[]) {
  genericLog("WARNING", message, ...optionalParams)
}

export function error(message?: any, ...optionalParams: any[]) {
  genericLog("ERROR", message, ...optionalParams)
}
