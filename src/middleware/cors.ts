import cors from "cors";

const whitelist = process.env.ALLOWED_ORIGIN?.replace(/\s/g, '').split(",");

export const corsPreflight = cors({
    origin: whitelist,
    methods: ["GET", "PUT", "POST", "DELETE"],
    //allowedHeaders: ["Origin"],
    maxAge: 86400,
})

export const corsMiddleware = cors({
    origin: (origin, callback) => {
        if(whitelist?.indexOf(origin || "") !== -1)
            callback(null, true)
        else
            callback(new Error("cors"))
    },
    methods: ["GET", "PUT", "POST", "DELETE"],
    optionsSuccessStatus: 204,
})