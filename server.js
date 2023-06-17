const app=require('./app');
const dotenv=require('dotenv');
const cors=require('cors');
app.use(cors());

dotenv.config();
const Database=require('./database/database');

Database();

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})