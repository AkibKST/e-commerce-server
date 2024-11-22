//    ./src/server.ts

import mongoose from "mongoose";
import app from "./app";
import config from "./config";

//All not found route
app.all("*", (req, res) => {
  {
    res.status(400).json({
      success: false,
      message: "Route not found in api",
    });
  }
});

async function main() {
  try {
    await mongoose.connect(config.db_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
