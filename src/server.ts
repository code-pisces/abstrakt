import express, {Express} from 'express';
import { Logger } from 'tslog';
import passport from 'passport';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';
import cors from 'cors';

import { router as authRouter } from './routes/auth';
import { router as recordRouter } from './routes/records';
import { router as emotionRouter } from './routes/emotions';
import { router as docsRouter } from './routes/docs';

import { authenticate } from './middleware/authenticate';
import { notFound } from './middleware/notFound';
import { returnJSON } from './middleware/response';
import { GeneralRateLimit } from './middleware/rate-limit';

import { passportConfig } from './config/passport';
import { exit } from 'process';

const log: Logger = new Logger();
const app: Express = express();
const PORT: String = process.env.PORT || '8080';

/**
 * Config environmental variables on development
 */
const { SECRET_KEY, TOKEN_SECRET, MONGO_URI, ALLOWED_ORIGIN } = process.env;
if(!SECRET_KEY || !TOKEN_SECRET || !MONGO_URI || !ALLOWED_ORIGIN){
    log.error("'SECRET_KEY', 'TOKEN_SECRET', 'MONGO_URI' and 'ALLOWED_ORIGIN' environment variables is required for start server.");
    exit();
}

/**
 * Secure Config
 */
const whitelist = process.env.ALLOWED_ORIGIN?.replace(/\s/g, '').split(",");

app.use(helmet());
app.use(cors({
    origin: (origin, callback) => {
        if(whitelist?.indexOf(origin || "") !== -1)
            callback(null, true)
        else
            callback(new Error("cors"))
    },
    methods: ["GET", "PUT", "POST", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

/*
 *  Express Config
*/
passportConfig(passport);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + "/../public"));
app.use(passport.initialize());
app.use(morgan("tiny"));

app.set('trust proxy', 1);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, '../views'))
app.engine("handlebars", exphbs());

app.enable("view cache")
/*
 * Routes
 */
app.use("/docs", docsRouter);
app.use("/auth", GeneralRateLimit, authRouter);
app.use("/api/records", GeneralRateLimit, authenticate, recordRouter);
app.use("/api/emotions", GeneralRateLimit, authenticate, emotionRouter);
app.use("/*", notFound);
app.use(returnJSON);

/**
 * Start server HTTP
 */

app.listen(PORT, () => {
    log.info(`Server initialized on port: ${PORT}`);
    const MONGO_URI: string = process.env.MONGO_URI as string;
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }, (err: mongoose.CallbackError) => {
        if(err)
            log.error(`Failed to connect on MongoDB uri: ${MONGO_URI}`);
        else
            log.info(`Mongo DB connected on uri: ${MONGO_URI}`);
    })
});