import { Outlet} from "react-router-dom";
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import utf8 from "utf8";
const BASE_URL = 'http://127.0.0.1:8000'; // Replace with your FastAPI server URL

  const decodeImage = async (image) => {
    try {
      console.log(image)
      const response = await axios.post(`${BASE_URL}/image/decode`, {'image':utf8.decode(image.slice(23)) });
  
      return response.data.image;
    } catch (error) {
      console.error('Error encoding text:', error);
      return null;
    }
  };
export default function Idecode(){
    // const [selectedFile, setSelectedFile] = useState(null);
    // const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleclick = () => {
        navigate('../Image');
    } 

    // 
    const [image, setImage] = useState('');
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
      const [decodedImage, setDecodedImage] = useState(null);
      const handleen = async() =>{
        let decoded =  await decodeImage(image);
        decoded=utf8.encode(decoded)
        setDecodedImage('data:image/jpeg;base64,'+decoded);
        console.log(decodedImage)
      }
    return (
        <>
        <div class="tencode">
                {/* <Link style={{textDecoration: 'none'}}to="../Image">Encode</Link> */}
                <button type="button" style={{ width: "100px", height: "30px",}}onClick={handleclick}>Encode</button>
        </div>
        <div className="h">
        <h4>upload file to decode</h4>
        </div>
        <div className="en">
        {/* <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <button onClick={handleUploadClick}>Upload</button>
            <button onClick={handleUpload}>Submit</button> */}
            <input type="file" onChange={onImageChange} className="filetype" />
            {/* {image && <img alt="preview" sizes='100' src={image} />} */}
            </div>
            <div className="sub">
            <button type="button" style={{ width: "100px", height: "30px",}}onClick={handleen}>submit</button><br></br>
            </div>
            <div className="txt">
                <h3>Decoded Image</h3>
                <div className="oimg">
                {image && <img alt="" src={decodedImage} />}
                </div>
            </div>
            
        <Outlet/>
        </>
    )
}