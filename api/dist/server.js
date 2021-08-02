"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tslog_1 = require("tslog");
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const path_1 = __importDefault(require("path"));
const auth_1 = require("./routes/auth");
const records_1 = require("./routes/records");
const emotions_1 = require("./routes/emotions");
const docs_1 = require("./routes/docs");
const authenticate_1 = require("./middleware/authenticate");
const notFound_1 = require("./middleware/notFound");
const response_1 = require("./middleware/response");
const passport_2 = require("./config/passport");
/**
 * Config environmental variables on development
 */
if (process.env.NODE_ENV !== 'production')
    require("dotenv").config();
passport_2.passportConfig(passport_1.default);
const log = new tslog_1.Logger();
const app = express_1.default();
const PORT = process.env.PORT || '8080';
/**
 * Helmet Config
 */
app.use(helmet_1.default());
/*
 *  Express Config
*/
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(__dirname + "/../public"));
app.use(passport_1.default.initialize());
app.use(morgan_1.default("tiny"));
app.set("view engine", "handlebars");
app.set("views", path_1.default.join(__dirname, '../views'));
app.engine("handlebars", express_handlebars_1.default());
app.enable("view cache");
/*
 * Routes
 */
app.use("/docs", docs_1.router);
app.use("/auth", auth_1.router);
app.use("/api/records", authenticate_1.authenticate, records_1.router);
app.use("/api/emotions", authenticate_1.authenticate, emotions_1.router);
app.use("/*", notFound_1.notFound);
app.use(response_1.returnJSON);
/**
 * Start server HTTP
 */
app.listen(PORT, () => {
    log.info(`Server initialized on port: ${PORT}`);
    const MONGO_URI = process.env.MONGO_URI;
    mongoose_1.default.connect(MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }, (err) => {
        if (err)
            log.error(`Failed to connect on MongoDB uri: ${MONGO_URI}`);
        else
            log.info(`Mongo DB connected on uri: ${MONGO_URI}`);
    });
});
