import log4js from 'log4js';
import path, { dirname } from 'path';

log4js.configure({
    dateFile: {
        type: 'dateFile',
        filename: path.join(dirname("."),"..","logs","app.log"),
        layout : {
            type: 'basic'
        },
        compress: true,
        numBackups: 5,
        keepFileExt: true
    },
    categories:{
        default:{
            appenders: ['dateFile'],
            level: 'trace'
        }
    },
    appenders: ['dateFile']
});
const LOGGER = log4js.getLogger();
export default LOGGER;