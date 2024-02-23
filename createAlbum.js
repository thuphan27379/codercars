/*Workflow:
1.generating data
2.input receive: nhan du lieu dau vao
3.check input: kiem tra du lieu dau vao
4.process data: lam viec voi du lieu dau vao
5.save data: luu tru
*/
const fs = require("fs");
const csv = require("csvtojson");
const mongoose = require("mongoose");
const Car = require("./models/Car");

// const data = {
//   data: [{}],
// };

// 1. doc data tu file csv
// 2. convert data -> array
// 3. seed field trong data cho match voi field models
// 4. connect voi mongo atlas
// 5. create data len atlas

const createAlbum = async () => {
  // csv to json
  let newData = await csv().fromFile("./archive/data.csv");
  // console.log(newData);

  newData = Array.from(newData);

  await mongoose
    .connect(
      "mongodb+srv://thuphan273:123456789Thu@cluster0.jpe3qy9.mongodb.net/"
    )
    .then(() => {
      console.log("connect to db success");
    });

  newData = newData.map((car) => {
    return {
      make: car.Make,
      model: car.Model,
      release_date: Number(car.Year),
      transmission_type: car["Transmission Type"],
      size: car["Vehicle Size"],
      style: car["Vehicle Style"],
      price: Number(car.MSRP),
    };
  });
  await Car.create(newData).then(() => console.log("create success"));

  // newData = new Set(
  //   newData.map((e, index) => ({
  //     id: index + 1,
  //     name: e.Make,
  //   }))
  // );

  // newData = Array.from(newData);
  // // console.log(newData);

  // // read data in db.json
  // let data = JSON.parse(fs.readFileSync("db.json"));

  // data = { data: newData };

  // fs.writeFileSync("db.json", JSON.stringify(data));
  // // JS obj to json string
  // // console.log("done");
};

createAlbum().then(() =>
  console.log("create db success").catch((err) => console.log("err"))
);
