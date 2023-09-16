"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const db_config_1 = __importDefault(require("./config/db-config"));
const routes_1 = require("./routes");
const sendError_1 = require("./middlewares/sendError");
const users_1 = require("./controllers/users");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.post("/signup", users_1.createUser);
app.post("/signin", users_1.loginUser);
app.use("/", routes_1.routes);
db_config_1.default
    .sync()
    .then(() => {
    console.log("Database successfully connected");
})
    .catch((err) => {
    console.log("Error", err);
});
app.use(sendError_1.handleSendError);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
