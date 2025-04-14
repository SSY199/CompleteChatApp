import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import contactsRoutes from "./routes/contact.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);


const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });



  // (
  //   <div
  //     className="flex-1 flex flex-col justify-center items-center bg-[#181920] text-opacity-80 text-white transition-all duration-300"
  //     aria-label="Empty Container"
  //   >
  //     <Lottie
  //       isClickToPauseDisabled={true}
  //       options={animationDefaultOptions}
  //       height={150}
  //       width={150}
  //     />
  //     <div className="flex flex-col gap-2 items-center justify-center mt-5 lg:text-2xl text-xl text-center">
  //       <h2 className="poppins-medium">
  //         Hi<span className="text-purple-500">!</span> Search new
  //         <span className="text-purple-500"> Contacts</span>
  //       </h2>
  //     </div>
  //   </div>
  // )