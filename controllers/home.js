import { verifyUser } from "./user.js";

export const home = async (req, res) => {
    try {
        const auth_token = await req.headers.authorizaition;
        const loginCredentials =await verifyUser(auth_token);
        if (loginCredentials === false) {
            res.status(200).send("Invalid Token")
        } else {
            res.json(loginCredentials)
        }
    } catch (e) {
        console.log(e);
        res.status(400).send("Server Busy")
    }
}
export default home;  