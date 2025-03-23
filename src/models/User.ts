import pool from "../utils/db";

class User {
  // Create users table (only run once)
  //   static async createTable() {
  //     const query = `
  //       CREATE TABLE IF NOT EXISTS users (
  //         id SERIAL PRIMARY KEY,
  //         username VARCHAR(50) UNIQUE NOT NULL,
  //         mail VARCHAR(50) UNIQUE NOT NULL,
  //         password VARCHAR(255) NOT NULL,
  //         first_name VARCHAR(50) NOT NULL,
  //         last_name VARCHAR(50) NOT NULL,
  //         created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  //         last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  //         status BOOLEAN DEFAULT TRUE
  //       );
  //     `;
  //     try {
  //       await pool.query(query);
  //       console.log("Users table created successfully.");
  //     } catch (error) {
  //       console.error("Error creating table:", error);
  //     }
  //   }

  // Insert a new user
  static async createUser(
    username: string,
    mail: string,
    password: string,
    first_name: string,
    last_name: string,
    status: boolean
  ) {
    const query = `
      INSERT INTO users (username, mail, password, first_name, last_name, status)
      VALUES ($1, $2, $3, $4, $5 , $6) RETURNING *;
    `;
    try {
      const result = await pool.query(query, [
        username,
        mail,
        password,
        first_name,
        last_name,
        status,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error("Error inserting user:", error);
      throw error;
    }
  }

  // Get all users
  static async getAllUsers() {
    const query = `SELECT * FROM users;`;
    console.log("query", query);
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  // Get user by ID
  static async getUserById(mail: string) {
    const query = `SELECT * FROM users WHERE mail = $1;`;
    try {
      const result = await pool.query(query, [mail]);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  // Get user by ID
  static async checkUserExists(mail: string, username: string) {
    const query = `SELECT mail FROM users WHERE mail = $1 OR username = $2;`;
    try {
      const result = await pool.query(query, [mail, username]);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  // Update user login time
  static async updateLoginTime(id: number) {
    const query = `
      UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;
    `;
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error updating login time:", error);
      throw error;
    }
  }

  // Delete user by ID
  static async deleteUser(id: number) {
    const query = `DELETE FROM users WHERE id = $1 RETURNING *;`;
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

export default User;
