import log4js from 'log4js';
import {PATH_TO_LOGS_DIRECTORY} from './paths.js'

log4js.configure({
    appenders: {
        app: {
            type: 'dateFile',
            filename: `${PATH_TO_LOGS_DIRECTORY}`,
            layout : {
                type: 'basic'
            },
            compress: true,
            numBackups: 5,
            keepFileExt: true
        }
    },
    categories:{
        default:{
            appenders: ['app'],
            level: 'info'
        }
    },
});
const LOGGER = log4js.getLogger();
export default LOGGER;