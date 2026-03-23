import app from "./src/App.js";
import connectedDB from "./src/Config/Database.js";

connectedDB();

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});