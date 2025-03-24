import pool from "../utils/db";

class Student {
  // Create students table (only run once)
  //   static async createTable() {
  //     const query = `
  //         CREATE TABLE IF NOT EXISTS students (
  //             id SERIAL PRIMARY KEY,
  //             first_name VARCHAR(50) NOT NULL,
  //             last_name VARCHAR(50) NOT NULL,
  //             email VARCHAR(100) UNIQUE NOT NULL,
  //             phone VARCHAR(15) UNIQUE,
  //             date_of_birth DATE NOT NULL,
  //             gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
  //             address TEXT,
  //             enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  //             status BOOLEAN DEFAULT TRUE
  //         );
  //       `;
  //     try {
  //       await pool.query(query);
  //       console.log("Student table created successfully.");
  //     } catch (error) {
  //       console.error("Error creating table:", error);
  //     }
  //   }

  // Get all students

  static async getAllStudentsInfo() {
    const query = `
         SELECT * FROM students;
      `;
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  static async isStudentExist(email: string, phone: string) {
    const query = `SELECT id from students WHERE email = $1 OR phone = $2`;
    try {
      const { rows } = await pool.query(query, [email, phone]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  static async createStudentInfo(student: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | null;
    date_of_birth: string;
    gender: "Male" | "Female" | "Other";
    address?: string | null;
    enrollment_date?: string | null;
    status?: boolean;
  }) {
    console.log(student);
    const query = `INSERT INTO students (first_name, last_name, email, phone, date_of_birth, gender, address, enrollment_date, status)
      VALUES ($1, $2, $3, $4, $5 , $6, $7, $8, $9) RETURNING * `;
    try {
      const { rows } = await pool.query(query, [
        student.first_name,
        student.last_name,
        student.email,
        student.phone || null,
        student.date_of_birth,
        student.gender,
        student.address || null,
        student.enrollment_date || null,
        student.status ?? true,
      ]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  static async updateStudent(updates: string[], values: any[]) {
    try {
      const query = `
        UPDATE students 
        SET ${updates.join(", ")}
        WHERE id = $${values.length}
        RETURNING *;
      `;

      const { rows } = await pool.query(query, values);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error updating student:", error);
      throw error; // Ensures error is caught in `updateStudentsInfo`
    }
  }
}

export default Student;
