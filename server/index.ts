import { connectDB } from "./src/configs/database";
import app from "./src/server";

const PORT: string | number = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log("Server running on port...", PORT));
  })
  .catch((error) => console.log(error));
