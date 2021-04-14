const db = require("../../data/db-config")

function find() {
  return db("schemes")
    .leftJoin("steps", "steps.scheme_id", "schemes.scheme_id")
    .select("schemes.*", "steps.step_number")
    .count("steps.step_id as number_of_steps")
    .groupBy("schemes.scheme_id")
    .orderBy("schemes.scheme_id", "asc")
    // asc is default by adding as a reminder for how to alter the option
  
  // EXERCISE A
  /*
    1A- Study the SQL query below running it in SQLite Studio against `data/schemes.db3`.
    What happens if we change from a LEFT join to an INNER join?

      SELECT
          sc.*,
          count(st.step_id) as number_of_steps
      FROM schemes as sc
      LEFT JOIN steps as st
          ON sc.scheme_id = st.scheme_id
      GROUP BY sc.scheme_id
      ORDER BY sc.scheme_id ASC;

    2A- When you have a grasp on the query go ahead and build it in Knex.
    Return from this function the resulting dataset.
  */
}

async function findById(scheme_id) {

  const rows = await db("schemes")
  .select("schemes.scheme_name", "steps.*")
  .where("schemes.scheme_id", "=", scheme_id)
  .leftJoin("steps","steps.scheme_id","schemes.scheme_id")
  .orderBy("steps.step_number", "asc")

  const steps = rows.map(row => {
    return {
      "step_id": row["step_id"],
      "step_number": row["step_number"],
      "instructions": row["instructions"]
    }
  })

  const cleanScheme = {
    "scheme_id": parseInt(scheme_id),
    "scheme_name": rows[0]["scheme_name"],
    "steps": steps
  }
  return cleanScheme 

}

function findSteps(scheme_id) { // EXERCISE C

  return db("schemes")
    .leftJoin("steps", "steps.scheme_id", "schemes.scheme_id")
    .select(
      "steps.step_id",
      "steps.step_number",
      "steps.instructions",
      "schemes.scheme_name")
    .where("schemes.scheme_id", "=", scheme_id)
    .orderBy("steps.step_number")


  /*
    1C- Build a query in Knex that returns the following data.
    The steps should be sorted by step_number, and the array
    should be empty if there are no steps for the scheme:

      [
        {
          "step_id": 5,
          "step_number": 1,
          "instructions": "collect all the sheep in Scotland",
          "scheme_name": "Get Rich Quick"
        },
        {
          "step_id": 4,
          "step_number": 2,
          "instructions": "profit",
          "scheme_name": "Get Rich Quick"
        }
      ]
  */
}

function add(scheme) { // EXERCISE D
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
