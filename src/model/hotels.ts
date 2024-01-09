import { promises as fs } from "fs";
import knexConfig, { baseKnexConfig } from "../knexFile";
import knex from "knex";
import { DateTime } from "luxon";
import { HotelInfo } from "../interface/hotelInterface";

const knexInstance = knex(baseKnexConfig);

// POST METHOD
export async function addNew(result: HotelInfo) {
    
}

