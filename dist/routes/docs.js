"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = express_1.Router();
exports.router.get("/", (req, res) => {
    res.render("index");
});
exports.router.get("/auth", (req, res) => {
    res.render("authentication");
});
exports.router.get("/emotions", (req, res) => {
    res.render("emotions");
});
exports.router.get("/records", (req, res) => {
    res.render("records");
});
