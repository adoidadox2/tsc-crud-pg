import "reflect-metadata";
import "dotenv/config";
import app from "./App";

app.listen(process.env.PORT || 3333, () => {
  console.log("Server On");
});
