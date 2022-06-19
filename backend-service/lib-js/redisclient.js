import LOGGER from './logger.js';
import redis from 'redis';


function RedisClient(options) {
    this.client = redis.createClient({
        host: options["host"],
        port: options["port"],
        username: options["username"],
        password: options["password"]
    });
    if(!options["password"]){
        this.client["auth"] = null;
    }

    this.selectIndex = function(i){
        if(!(i instanceof number) || ((i instanceof number) && i<0)){
            throw Error("value of argument should of type number and positive numbers only")
        }

        this.client.select(i);
    }
    
    this.getAllKeys = function(match){
        var listofkeys = this.client.hGetAll(`*${match}*`);
        LOGGER.info(`Getting all keys with matching regex ${match}...`)
        return listofkeys;
    }

    this.setKeyvalue = function(key,value){
        LOGGER.info(`setting value - ${value} , for key- ${key}`);
        this.client.set(key,value);
    }

    this.setKeysValues = function(keys,values){
        if(keys.length!==values.length){
            throw Error("Number of keys and values are not matching for this operation");
        }

        LOGGER.info(`key value list function called`);
        
        for(let i = 0;i<keys.length;i++){
            this.client.set(keys[i],values[i]);
        }
    }

    this.setMap = function(map){
        if(!(map instanceof Map)){
            throw Error("Expected object should be of type Map");
        }

        LOGGER.info(`redis map function called`);

        map.forEach((val,key,map)=>{
            this.client.set(key,val);
        })
    }

    
}


export default RedisClient;


