"use strict";
//    ./src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// async function main() {
//   try {
//     await mongoose.connect();
const port = 3000;
app_1.default.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//   } catch (error) {
//     console.log(error);
//   }
// }
// main();
