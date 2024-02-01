/*Workflow:
1.generating data
2.input receive: nhan du lieu dau vao
3.check input: kiem tra du lieu dau vao
4.process data: lam viec voi du lieu dau vao
5.save data: luu tru
*/
const fs = require("fs");
const csv = require("csvtojson"); //

const data = {
  data: [{}],
};

const createAlbum = async () => {
  let newData = await csv().fromFile("data.csv");
  console.log(newData);

  newData = new Set(
    newData.map((e, index) => ({
      id: index + 1,
      name: e.Make,
    }))
  );

  newData = Array.from(newData);
  // console.log(newData);

  //
  let data = JSON.parse(fs.readFileSync("db.json"));

  data = { data: newData };

  fs.writeFileSync("db.json", JSON.stringify(data));
  // JS obj to json string
  // console.log("done");
};

createAlbum();

