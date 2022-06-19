import {join , dirname} from 'path';


const LOGS_DIRECTORY = join(dirname("."),"logs","app.log");

export const PATH_TO_LOGS_DIRECTORY = LOGS_DIRECTORY;