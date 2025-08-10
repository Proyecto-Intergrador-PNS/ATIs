import bcrypt from 'bcrypt';
import User from './models/User.js'
import connectDB from './db/connection.js';

const register = async () => {
  try{
    connectDB();
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "admin",
      email: "admin@gmail.com",
      password: hashPassword,
      address: "admin address",
      role: "admin"
    })

    await newUser.save();
    console.log("Admin user created successfully");
  } catch(error) { 
    console.log(error);
  }
}


register();

//This is add more users to the database if required

/*
const users = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: "admin",
    address: "admin address",
    role: "admin"
  },
  {
    name: "customer1",
    email: "customer1@gmail.com",
    password: "customer1",
    address: "customer1 address",
    role: "customer"
  },
  // You can add more users here
];

const register = async () => {
  try {
    await connectDB();
    for (const userData of users) {
      const hashPassword = await bcrypt.hash(userData.password, 10);
      const newUser = new User({
        ...userData,
        password: hashPassword
      });
      await newUser.save();
      console.log(`customer ${userData.name} created successfully`);
    }
  } catch (error) {
    console.log(error);
  }
};
*/