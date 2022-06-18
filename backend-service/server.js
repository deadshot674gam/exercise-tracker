import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import LOGGER from './lib/logger.js';
import RedisClient from './lib/redisclient.js';

dotenv.config();

var app = express();

var redisclient = null;

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/loginToRedis',(request,response)=>{
    request = request["query"]
    if(!request){
        LOGGER.error("Null or undefined query passed for this request");
        response.status(400).send({
            message: "Parameters required to login to redis",
            
        });
    }else if(!request["hostname"]){
        LOGGER.error("No Hostname was passed in query");
        response.status(400).send({
            message: "Hostname is a required parameter for making this call to this endpoint"
        });
    }else{
        try{
            redisclient = new RedisClient({
                host: request["hostname"],
                port: request["port"] ? Number(request["port"]) : 6379,
                username: request["username"],
                password: request["password"]
            })



            response.status(200).send({
                message: `Connected successfully with redis host ${request["hostname"]}`
            });

            LOGGER.info(`Connection established with host -> ${request["hostname"]}...`);
        }catch(error){
            LOGGER.error(`Exception found -> ${error}`)
            response.status(500).send({
                message: `An Error occured while connecting to redis host ${request["hostname"]}`
            });
        }
        
    }
})

app.get('/selectIndex',(request,response)=>{
    request = request["query"]

    if(!request){
        LOGGER.error("Null or undefined query passed for this request");
        response.status(400).send({
            message: "Parameters required to select index",
            
        });
    }else if(!request["index"]){
        LOGGER.error("Index is not provided in this request");
        response.status(400).send({
            message: "Index parameter is required field for this request"
        })
    }else{
        if(redisclient!==null && redisclient instanceof RedisClient && Number.isInteger(request["index"])){
            try{
                redisclient.selectIndex(Number(request["index"]));
                LOGGER.info(`Selected database ${request["index"]}`);
    
                response.status(200).send({
                    message : `DB ${request["index"]} selected successfully`
                });
            }catch(error){
                LOGGER.error(`Exception found -> ${error}`)
                response.status(404).send({
                    message: error
                });
            }

        }else{
            response.status(404).send({
                message: "This request is invalid until host connection is established are provided"
            })
        }
    }
})

app.listen(port,()=>{
    LOGGER.info("Application server is running at port 5000");
})
