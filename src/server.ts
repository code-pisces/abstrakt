import express, {Express} from 'express';
import { Logger } from 'tslog';
import passport from 'passport';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import expressJSDocSwagger from 'express-jsdoc-swagger';

import { router as authRouter } from './routes/auth';
import { router as recordRouter } from './routes/records';
import { router as emotionRouter } from './routes/emotions';

import { authenticate } from './middleware/authenticate';
import { notFound } from './middleware/notFound';
import { returnJSON } from './middleware/response';

import { passportConfig } from './config/passport';

/**
 * Config environmental variables on development
 */

 if(process.env.NODE_ENV !== 'production')
 require("dotenv").config();

passportConfig(passport);

const log: Logger = new Logger();
const app: Express = express();
const PORT: String = process.env.PORT || '8080';

/**
 * Config Swagger Doc API
 */

const options = {
  info: {
    version: '1.0.0',
    title: 'MindMe',
    description: "Api REST desenvolvida com Express e MongoDB. Ainda não achei o lugar de especificar essa parte, mas o access token tem que ser mandado pelo header Authorization pelo formato Bearer <token>.",
    contact: {
      name: 'Daniel Vitor',
      url: 'https://github.com/danielvitorsm',
    },
    license: {
      name: 'GNU',
    },
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Servidor de Desenvolvimento',
    },
  ],
  baseDir: __dirname,
  filesPattern: './routes/*.ts',
  swaggerUIPath: '/docs',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  apiDocsPath: '/docs-json',
  notRequiredAsNullable: false,
  swaggerUiOptions: {
    customCss: '.swagger-ui .topbar { display: none }',
  },
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
};

expressJSDocSwagger(app)(options);

/**
 * Helmet Config
 */
app.use(helmet());

/*
 *  Express Config
 */
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static(__dirname + "/../public"));
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());

/*
 * Routes
 */

app.use("/docs", swaggerUi.serve, swaggerUi.setup());
app.use("/auth", authRouter);
app.use("/api/records", authenticate, recordRouter);
app.use("/api/emotions", authenticate, emotionRouter);
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