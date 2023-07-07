import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import morgan from "morgan";
import createHttpError from "http-errors";
import { isHttpError } from "http-errors";
import UserRoutes from "./routes/users"; 

const app = express();

app.use(morgan("dev"));

app.use(express.json());

//endpoints
app.use("/api/users", UserRoutes);
app.use("/api/notes", notesRoutes);

app.use((req, res, next) => {
    next(createHttpError(404,"Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown,req:Request,res:Response,next: NextFunction) =>{
    console.error(error);
    let errorMessage = "Something went wrong";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });

});
  





export default app;