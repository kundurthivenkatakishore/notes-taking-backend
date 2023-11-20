import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import connectDB from "./config/db.js";
import noteRoute from "./routes/notes.js";
import userRouter from "./routes/user.js";
import homeRoutes from "./routes/home.js";

connectDB();

const app = express();
// Middleware
app.use(bodyParser.json());
const corsOptions = {
    origin: *,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/user', userRouter)
app.use("/home", homeRoutes)
app.use('/api/notes', noteRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
