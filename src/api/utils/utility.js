module.exports = {
  suffleData: (files) => {
    files.sort(() => (Math.random() > 0.5 ? 1 : -1));
    let allFiles = files.map((item) => {
      let obj = {
        file: item,
      };
      if (fileType(item) == "image") {
        obj.type = "image";
      } else {
        obj.type = "video";
      }
      return obj;
    });
    return allFiles;
  },
};

const fileType = (fileURL) => {
  let strArr = fileURL.split(".");
  let extention = strArr[strArr.length - 1];
  if (
    extention === "png" ||
    extention === "jpg" ||
    extention === "jpeg" ||
    extention === "svg" ||
    extention === "gif" ||
    extention === "psd"
  ) {
    return "image";
  }
  return "video";
};
