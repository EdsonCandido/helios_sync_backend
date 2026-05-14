import knex from "knex";
import config from "./knexfile";
import { env } from "../configs/env";

const connection = knex(config[env.NODE_ENV]);

export default connection;
