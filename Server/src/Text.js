import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

// import { encodeText } from './api';
// import { encodeText } from './api';
import axios from "axios";
import utf8 from "utf8";
const BASE_URL = "http://127.0.0.1:8000"; // Replace with your FastAPI server URL

const encodeText = async (text, image) => {
  try {
    console.log(image.slice(24));
    const response = await axios.post(`${BASE_URL}/text/encode`, {
      text: text,
      image: utf8.decode(image.slice(23)),
    });

    return response.data.image;
  } catch (error) {
    console.error("Error encoding text:", error);
    return null;
  }
};

// const encodeText = async (text, image) => {
//   try {
//     // console.log(text)
//     const response = await axios.post(`${BASE_URL}/text/encode`, {'text':text, 'image':utf8.decode(image) });

//     return response.data.image;
//   } catch (error) {
//     console.error('Error encoding text:', error);
//     return null;
//   }
// };

export default function Text() {
  // const [selectedFile, setSelectedFile] = useState(null);
  // const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleclick = () => {
    navigate("decode");
  };

  // const handleFileChange = (event) => {
  //     setSelectedFile(event.target.files[0]);
  // };
  // const handleUploadClick = () => {
  //     fileInputRef.current.click();
  // };
  // const handleUpload = () => {
  //     if (selectedFile) {
  //         // You can now handle the selected file (selectedFile) here, for example, send it to the server using fetch or axios
  //         console.log('Selected File:', selectedFile);
  //     }
  // };
  const [image, setImage] = useState("");

  //     const onImageChange = (event) => {
  //     if (event.target.files && event.target.files[0]) {
  //       let reader = new FileReader();
  //       reader.onload = (e) => {
  //         setImage(e.target.result);
  //       };
  //       reader.readAsDataURL(event.target.files[0]);
  //     }
  // }
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      //   reader.readAsDataURL(event.target.files[0]);
    }
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    console.log(inputValue);
    setInputValue(e.target.value);
  };
  // const handlesub=(e) => {
  //     setInputValue(e.target.value)
  //     console.log(inputValue)
  //     console.log('konichiva')
  // }

  const [encodedImage, setEncodedImage] = useState(null);
  const handleen = async () => {
    let encoded = await encodeText(inputValue, image);
    encoded = utf8.encode(encoded);
    setEncodedImage("data:image/jpeg;base64," + encoded);
    console.log(encodedImage);
  };
  // const encoded =  encodeText(inputValue, image);
  // console.log(utf8.decode(image))
  // setEncodedImage(encoded);

  return (
    <>
      <div class="tdecode">
        {/* <Link style={{textDecoration: 'none'}}to="decode">Decode</Link> */}
        <button
          type="button"
          style={{ width: "100px", height: "30px" }}
          onClick={handleclick}
        >
          Decode
        </button>
      </div>
      <div className="h4">
        <h4>Upload a File</h4>
      </div>
      <div className="iupload">
        {/* <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <button onClick={handleUploadClick}>Upload</button>
            <button onClick={handleUpload}>Submit</button><br></br> */}
        <input type="file" onChange={onImageChange} className="filetype" />
        <br />
        <br />
        {/* <div className='imag'>
            {image && <img alt="" style={{ width: "200px", height: "150px",}}  src={image} />}
            </div> */}
      </div>
      <div className="h41">
        <h4>enter text to encode</h4>
      </div>
      <div className="tupload">
        <input
          type="text"
          style={{ width: "250px", height: "20px" }}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your text"
        />
        <br></br>
        {/* <button onClick={handlesub}>Submit</button><br></br> */}

        {/* <h3>Encode Image</h3> */}
      </div>
      <div className="out">
        {/* <h3>Encode Image</h3> */}
        <button
          type="button"
          style={{ width: "100px", height: "30px" }}
          onClick={handleen}
        >
          Submit
        </button>
        <br></br>
      </div>
      <div className="outi">{image && <img alt="" src={encodedImage} />}</div>
      <Outlet />
    </>
  );
}
