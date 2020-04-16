import React from "react";
import axios from "axios";

class App extends React.Component {
  _fileUploadHandler = async () => {
    const uploadFile = document.getElementById("file-js");
    const imageDiv = document.getElementById("image");

    if (uploadFile.files && uploadFile.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        imageDiv.src = e.target.result;
      };

      reader.readAsDataURL(uploadFile.files[0]);

      const d = new Date();
      const currentTime =
        d.getFullYear() +
        "" +
        (d.getMonth() + 1) +
        "" +
        d.getDate() +
        "" +
        d.getHours() +
        "" +
        d.getMinutes() +
        "" +
        d.getSeconds();

      const formData = new FormData();
      formData.append("currentTime", currentTime);
      formData.append("uploadFile", uploadFile.files[0]);

      const response = await axios.post("/api/fileUpload", formData);
    }
  };

  render() {
    return (
      <div>
        <input
          type="file"
          accept="image/*"
          id="file-js"
          name="file-js"
          style={{ display: "none" }}
          onChange={this._fileUploadHandler}
        />
        <label htmlFor="file-js">파일등록</label>
        <br />
        <img id="image" width="300px" height="300px" alt="미리보기" />
      </div>
    );
  }
}

export default App;
