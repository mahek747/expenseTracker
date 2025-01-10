const express = require("express");
const dotenv = require("dotenv");
const setupSwagger = require('./config/swagger');
const { dbConnection } = require("./database/db");  
const userRoute = require("./routes/user.route");  
const expenseRoute = require("./routes/expense.route");  
const aggragationRoute = require("./routes/aggregation.route");  
const roleRoute = require("./routes/role.route");  

dotenv.config();  

const app = express();  

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
  
app.use("/user", userRoute);  
app.use("/expense", expenseRoute);  
app.use("/aggragate", aggragationRoute);  
app.use("/role", roleRoute);  

dbConnection();  

const PORT = process.env.PORT || 8000; 
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
