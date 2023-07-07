import { cleanEnv } from "envalid";
import { port, str } from "envalid";

export default cleanEnv(process.env, {

    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
})