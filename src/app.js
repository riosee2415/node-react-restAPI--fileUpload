import express from "express";
import bodyParser from "body-parser";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const PORT = 3333;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

AWS.config.region = "ap-northeast-2";
AWS.config.update({
  accessKeyId: "AKIAJ6BP7PKCYN6MB7FQ",
  secretAccessKey: "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",
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "management-system.4leaf",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const currentTime = req.body.currentTime;

      const lng = file.originalname.length;
      const lastDot = file.originalname.lastIndexOf(".");

      const extendedType = file.originalname.substring(lastDot, lng);

      const path = `test/${currentTime}${extendedType}`;

      const prefixURL =
        "https://s3.ap-northeast-2.amazonaws.com/management-system.4leaf/";
      req.body.fileURL = `${prefixURL}test/${currentTime}${extendedType}`;
      cb(null, path);
    },
    acl: "public-read-write",
  }),
});

app.post("/api/fileUpload", upload.single("uploadFile"), (req, res) => {
  console.log(req.body.fileURL);
});

app.listen(PORT, () => {
  console.log(`${PORT} SERVER START`);
});
