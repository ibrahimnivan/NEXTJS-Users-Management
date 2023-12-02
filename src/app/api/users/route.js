import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from "fs";

// 1. all Users Data
export function GET() {
  const data = users;
  return NextResponse.json({ data }, { status: 200 });
}

// 4. Create New Users
export async function POST(req, res) {
  let { id, name, age, email, password } = await req.json();

  // all data must provided
  if (!id || !name || !age || !email || !password) {
    return NextResponse.json(
      { result: "required field not found" },
      { status: 400 }
    );
  } else {
    // Add the new user to the in-memory array
    users.push({ id, name, age, email, password });

    // Extract just the user array from the updated data
    const updatedUsersArray = users;

    // Convert the updated users array to a JSON string
    const updatedData = JSON.stringify(updatedUsersArray, null, 2);

    //Write the updated users array to a JSON steing
    fs.writeFileSync(
      "./src/app/util/db.js",
      `export const users =${updatedData};`,
      "utf-8"
    );

    return NextResponse.json({success: "User Successfully Create"})
  }
}

// 5. Updadted User
export async function PUT(req, res) {
  let {id, name, email, password} = await req.json();

  // Find the user in the users array by ID
  const userIndex = users.findIndex((user) => user.id === id)

  if(userIndex === -1) {
    return NextResponse.json({result: "User not found"}, {status: 404})
  }

  if(name) {
    users[userIndex].name = name
  }
  if(email) {
    users[userIndex].email = email
  }
  if(password) {
    users[userIndex].password = password
  }

  const updatedUsersArray = users;

    // Convert the updated users array to a JSON string
    const updatedData = JSON.stringify(updatedUsersArray, null, 2);

    //Write the updated users array to a JSON steing
    fs.writeFileSync(
      "./src/app/util/db.js",
      `export const users =${updatedData};`,
      "utf-8"
    );

    return NextResponse.json({success: "User Successfully Updated"})
}