import express from "express";
import cors from "cors";
import router from "./routes/payments.router.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("app listening on port :", PORT);
});
