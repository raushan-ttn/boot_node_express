import pool from "../utils/db";

class Members {
  // Create students table (only run once)
  // static async createTable() {
  //   const query = `
  //         CREATE TABLE IF NOT EXISTS members (
  //             id SERIAL PRIMARY KEY,
  //             name VARCHAR(100) NOT NULL,
  //             email VARCHAR(255) UNIQUE NOT NULL,
  //             password TEXT NOT NULL,
  //             age INT NOT NULL,
  //             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  //             status BOOLEAN DEFAULT TRUE
  //         );
  //       `;
  //   try {
  //     await pool.query(query);
  //     console.log("members table created successfully.");
  //   } catch (error) {
  //     console.error("Error creating table:", error);
  //   }
  // }

  // Check member exist or not.
  static async isMemberExist(email: string, name: string) {
    const query = `SELECT id from members WHERE email = $1 OR name = $2`;
    try {
      const { rows } = await pool.query(query, [email, name]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error("Error fetching member:", error);
    }
  }
  // Get user information.
  static async getMember(email: string) {
    const query = `SELECT password, email from members WHERE email = $1`;
    try {
      const { rows } = await pool.query(query, [email]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error("Error fetching member:", error);
    }
  }
  // Create member.
  static async createMember(
    name: string,
    email: string,
    password: string,
    age: number
  ) {
    const query = `
      INSERT INTO members (name, email, password, age)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    try {
      const result = await pool.query(query, [name, email, password, age]);
      return result.rows[0];
    } catch (error) {
      console.error("Error inserting member:", error);
      throw error;
    }
  }
}
export default Members;
