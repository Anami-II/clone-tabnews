import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 AS sum;");
  console.log(result.rows);
  response.json({ status: "Tudo funcionando numa boa mermão!" });
}

export default status;
