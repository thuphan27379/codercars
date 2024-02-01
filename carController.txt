const { sendResponse, AppError } = require("../helpers/utils.js");
const Car = require("../models/Car.js");
const fs = require("fs");
const path = require("path");

const carController = {};

const carsJsonPath = path.join(__dirname, "../cars.json");

// Create a new car
carController.createCar = async (req, res, next) => {
  const { make, model, release_date, transmission_type, size, style, price } = req.body;

  try {
    if (!req.body) {
      throw new AppError(400, "Bad Request", "Create car Error");
    }

    // Create in MongoDB
    const createdCarMongo = await Car.create({
      make,
      model,
      release_date,
      transmission_type,
      size,
      style,
      price
    });

    // Read from cars.json
    const jsonData = fs.readFileSync(carsJsonPath, "utf-8");
    const listOfFound = JSON.parse(jsonData);

    // Add the newly created car to the array
    listOfFound.push(createdCarMongo);

    // Write back to cars.json
    fs.writeFileSync(carsJsonPath, JSON.stringify(listOfFound, null, 2));

    sendResponse(
      res,
      200,
      true,
      { car: createdCarMongo },
      null,
      "Create Car Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Get all cars
carController.getCars = async (req, res, next) => {
  try {
    // Read from cars.json
    const jsonData = fs.readFileSync(carsJsonPath, "utf-8");
    const listOfFound = JSON.parse(jsonData);

    // Fetch from MongoDB
    const carsFromMongo = await Car.find().limit(10);

    sendResponse(
      res,
      200,
      true,
      { cars: carsFromMongo.concat(listOfFound), total: carsFromMongo.length + listOfFound.length },
      null,
      "Get Car List Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

// Update a car
carController.editCar = async (req, res, next) => {
  const targetId = req.params.id;
  const updateInfo = req.body;
  const options = { new: true };

  try {
    // Update in MongoDB
    const updatedCarMongo = await Car.findByIdAndUpdate(targetId, updateInfo, options);

    // Read from cars.json
    const jsonData = fs.readFileSync(carsJsonPath, "utf-8");
    let listOfFound = JSON.parse(jsonData);

    // Update the car in the array
    listOfFound = listOfFound.map(car => (car._id == targetId ? updatedCarMongo : car));

    // Write back to cars.json
    fs.writeFileSync(carsJsonPath, JSON.stringify(listOfFound, null, 2));

    sendResponse(
      res,
      200,
      true,
      { car: updatedCarMongo },
      null,
      "Update Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

// Delete car
carController.deleteCar = async (req, res, next) => {
  const targetId = req.params.id;

  try {
    // Delete in MongoDB
    const deletedCarMongo = await Car.findByIdAndDelete(targetId);

    // Read from cars.json
    const jsonData = fs.readFileSync(carsJsonPath, "utf-8");
    let listOfFound = JSON.parse(jsonData);

    // Remove the car from the array
    listOfFound = listOfFound.filter(car => car._id != targetId);

    // Write back to cars.json
    fs.writeFileSync(carsJsonPath, JSON.stringify(listOfFound, null, 2));

    sendResponse(
      res,
      200,
      true,
      { car: deletedCarMongo },
      null,
      "Delete Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
