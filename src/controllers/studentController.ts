import { Request, Response } from "express";
import Student from "../models/Student";
export const getAllStudents = async (req: Request, res: Response) => {
  // show all students response.
  const students = await Student.getAllStudentsInfo();
  if (students && students.length > 0) {
    res.json({
      status: 200,
      message: "Record fetch successfully.",
      data: students,
    });
  } else {
    res.json({
      status: 404,
      message: "No reord found.",
      data: [],
    });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  // show all students response.
  const { email, phone } = req.body;
  // check student exist or not based on email.
  const isExistStudent = await Student.isStudentExist(email, phone);

  if (isExistStudent && isExistStudent?.id) {
    res.json({
      status: 200,
      message: "student already exist, please use another email or phone.",
      data: [],
    });
  }

  // Insert record in db.

  const studentInfo = await Student.createStudentInfo(req.body);
  if (studentInfo) {
    res.json({
      status: 201,
      message: "Record inserted successfully.",
      data: studentInfo,
    });
  }
};

export const updateStudentsInfo = async (req: Request, res: Response) => {
  const id = req.params.id ? parseInt(req.params.id) : 0;
  if (!id) {
    res.status(400).json({ message: "Student ID is required" });
  }

  const updates: string[] = [];
  const values: any[] = [];
  const {
    first_name,
    last_name,
    email,
    phone,
    date_of_birth,
    gender,
    address,
    status,
  } = req.body;

  if (first_name) {
    updates.push(`first_name = $${values.length + 1}`);
    values.push(first_name);
  }
  if (last_name) {
    updates.push(`last_name = $${values.length + 1}`);
    values.push(last_name);
  }
  if (email) {
    updates.push(`email = $${values.length + 1}`);
    values.push(email);
  }
  if (phone) {
    updates.push(`phone = $${values.length + 1}`);
    values.push(phone);
  }
  if (date_of_birth) {
    updates.push(`date_of_birth = $${values.length + 1}`);
    values.push(date_of_birth);
  }
  if (gender) {
    updates.push(`gender = $${values.length + 1}`);
    values.push(gender);
  }
  if (address) {
    updates.push(`address = $${values.length + 1}`);
    values.push(address);
  }
  if (status !== undefined) {
    updates.push(`status = $${values.length + 1}`);
    values.push(status);
  }

  if (updates.length === 0) {
    res.status(400).json({ message: "No fields provided for update" });
  }

  values.push(id); // Add ID at the end for WHERE clause
  console.log("Update values:", values);

  try {
    const updatedInfo = await Student.updateStudent(updates, values);
    if (!updatedInfo) {
      res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully", data: updatedInfo });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
