import knex from "knex";
import { env } from "../configs/env";
import config from "./knexfile";

const connection = knex(config[env.NODE_ENV]);

export default connection;
