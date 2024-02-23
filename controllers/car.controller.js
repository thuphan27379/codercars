const { sendResponse, AppError } = require("../helpers/utils.js");
const Car = require("../models/Car.js");

const carController = {};

// Create a new car
carController.createCar = async (req, res, next) => {
  try {
    // In a real project, you will get info from req
    const { make, model, release_date, transmission_type, size, style, price } =
      req.body;

    // Validate if required fields are provided in the request
    if (
      !make ||
      !model ||
      !release_date ||
      !transmission_type ||
      !size ||
      !style ||
      !price
    ) {
      throw new AppError(400, "Bad Request", "Missing required fields");
    }

    // Mongoose query
    const created = await Car.create({
      make,
      model,
      release_date,
      transmission_type,
      size,
      style,
      price,
    });

    sendResponse(
      res,
      200,
      true,
      { car: created },
      null,
      "Create Car Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Get all cars
carController.getCars = async (req, res, next) => {
  // In a real project, you will get conditions from req and then construct the filter object for the query
  // Empty filter means get all
  const filter = {};

  // ph?n get chia page truoc tiên ch? nh?n query page t? fe b?ng req.query
  // r?i t? page ðó ch? tính offset  -> b? offset vào .skip() khi get car c?a mongo
  let { page, limit } = { ...req.query };
  page = parseInt(page) || 1; //page
  limit = parseInt(limit) || 10;

  // for pagination
  const offset = limit * (page - 1);

  try {
    // Mongoose query
    Car.f;
    // return cars and page
    const listOfFound = await Car.find(filter).skip(offset).limit(50);

    sendResponse(
      res,
      200,
      true,
      { car: listOfFound, page: 1, total: 1192 },
      null,
      "Get Car List Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

// Update a car
carController.editCar = async (req, res, next) => {
  try {
    // In a real project, you will get id from req
    const targetId = req.params._id;
    const updateInfo = req.body;

    // Options allow you to modify the query, e.g., new true returns the latest update of data
    const options = { new: true };

    // Mongoose query
    const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);

    sendResponse(
      res,
      200,
      true,
      { car: updated },
      null,
      "Update Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

// Delete a car
carController.deleteCar = async (req, res, next) => {
  try {
    // In a real project, you will get id from req
    const targetId = req.params._id;

    const options = { new: true };

    // Mongoose query
    const deleted = await Car.findByIdAndDelete(targetId, options);

    sendResponse(
      res,
      200,
      true,
      { car: deleted },
      null,
      "Delete Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

// Export
module.exports = carController;
