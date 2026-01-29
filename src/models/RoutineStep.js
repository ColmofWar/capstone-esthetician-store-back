
const db = require("../../db");
const { sqlForPartialUpdate, asyncGet } = require("../helpers/sql");
const { ExpressError } = require("../helpers/expressError");

// RoutineStep model
export default class RoutineStep {
  constructor({ id, routine_id, step_number, product_id, instructions }) {
    this.id = id;
    this.routine_id = routine_id;
    this.step_number = step_number;
    this.product_id = product_id;
    this.instructions = instructions;
  }
    static async get(criteria = {}) {
    return await asyncGet(db, "routine_steps", criteria);
  }
}
