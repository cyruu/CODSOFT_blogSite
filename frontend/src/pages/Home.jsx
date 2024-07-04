import React, { useState } from "react";
import query from "../images/query.png";
const Home = () => {
  const [postimg, setPostimg] = useState({ myFile: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  async function handlefileupload(e) {
    const file = e.target.files[0];
    const base64 = await convertobase64(file);

    setPostimg({ ...postimg, myFile: base64 });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fileupload">
          <img src={postimg.myFile || query} />
        </label>
        <input
          type="file"
          name="myFile"
          id="fileupload"
          accept=".jpeg, .png, .jpg"
          className="hidden"
          onChange={(e) => handlefileupload(e)}
        />
        <p>lorem</p>

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Home;
function convertobase64(file) {
  return new Promise((res, rej) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      res(fileReader.result);
    };
    fileReader.onerror = (err) => {
      rej(err);
    };
  });
}
