const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const { mongoose } = require("mongoose");
const connectDB = require("./database/db");

// router location
// const profileRoute = require("./router/profile.router");
// const serviceRoute = require("./router/service.router");
// const portfolioRoute = require("./router/portfolio.router");
// const eduRoute = require("./router/edu.router");
const {
  getProfileController,
  createProfile,
  updateProfileController,
} = require("./controller/profile.controller");
const {
  updateServiceController,
  deleteServiceController,
  getServiceController,
  createService,
} = require("./controller/service.controller");
const {
  deletePortfolioController,
  updatePortfolioController,
  getSinglePortfolioController,
  getPortfolioController,
  createPortfolio,
} = require("./controller/portfolio.controller");
const {
  createEducation,
  getAllEduController,
  updateEduController,
  deleteEduController,
} = require("./controller/edu.controller");
const Profile = require("./models/profile.model");

dotenv.config();
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 8040;

// api router
// app.use("/profile",profileRoute);
app.post("/profile/create", createProfile);
// app.get("/profile", getProfileController);
app.get("/profile", async (req, res) => {
  const _id = req.params.id;
  console.log(_id, "user found");
  const updateData = req.body;
  try {
    const userToUpdate = await Profile.findById(_id);
    if (!userToUpdate) {
      throw new CustomError("User not found!", 404);
    }

    Object.assign(userToUpdate, updateData);

    await userToUpdate.save();

    res
      .status(200)
      .json({ message: "User updated successfully!", user: userToUpdate });
  } catch (error) {}
});
app.put("/profile/:id", updateProfileController);
// app.use("/service",serviceRoute )
app.post("/service/create", createService);
app.get("/service/all", getServiceController);
app.delete("/service/delete/:serviceId", deleteServiceController);
app.put("/service/update/:serviceId", updateServiceController);
// app.use("/portfolio",portfolioRoute )
app.post("/portfolio/create", createPortfolio);
app.get("/portfolio/all", getPortfolioController);
app.get("/portfolio/:portfolioId", getSinglePortfolioController);
app.put("/portfolio/update/:portfolioId", updatePortfolioController);
app.delete("/portfolio/delete/:portfolioId", deletePortfolioController);
// app.use("/edu", eduRoute);
app.post("/edu/create", createEducation);
app.get("/edu/all", getAllEduController);
app.put("/edu/update/:eduId", updateEduController);
app.delete("/edu/delete/:eduId", deleteEduController);

app.listen(port, async () => {
  console.log(`suchy's portfolio server running on http://localhost:${port}`);
  await connectDB();
});

app.get("/", (req, res) => {
  res.send("welcome suchy's portfolio server");
});
app.get("/tst", (req, res) => {
  res.send("test");
});
