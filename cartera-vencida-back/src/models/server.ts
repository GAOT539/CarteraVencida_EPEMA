//to create our API REST
import express, {Application} from 'express';
import cors from 'cors';
//routes
import routesHistorical from '../routes/historical.routes';
import routesFiles from '../routes/files.routes';
import routesContributors from '../routes/contributors.routes';
//creation of tables
import {Historicos} from './historical.models';

class Server{

    private app: Application;
    private port:String;

    constructor(){
        this.app=express();
        this.port=process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Application is running in port ${this.port}`);
        })
    }

    routes(){
        this.app.use('/api/', routesHistorical);
        this.app.use('/archivo/', routesFiles);
        this.app.use('/contribuyentes/', routesContributors);
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect(){
        try {
            //These lines of code the first time create my tables
            await Historicos.sync();

        } catch (error) {
            console.log('unable to connect to the database:',error);
        }
    }

}

export default Server;