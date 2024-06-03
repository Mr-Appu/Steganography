import { Outlet} from "react-router-dom";
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import utf8 from "utf8";
const BASE_URL = 'http://127.0.0.1:8000'; // Replace with your FastAPI server URL

  const decodeText = async (image) => {
    try {
      console.log(image)
      const response = await axios.post(`${BASE_URL}/text/decode`, {'image':utf8.decode(image.slice(23)) });
  
      return response.data.text;
    } catch (error) {
      console.error('Error encoding text:', error);
      return null;
    }
  };
export default function Tdecode(){
    // const [selectedFile, setSelectedFile] = useState(null);
    // const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleclick = () => {
        navigate('/');
    } 

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
    const [decodedText, setDecodedText] = useState(null);
    const handleen = async() =>{
      let decoded =  await decodeText(image);
    //   decoded=utf8.encode(decoded)
      setDecodedText(decoded);
      console.log(decoded)
    }
    return (
        <>
        <div class="tencode">
                {/* <Link style={{textDecoration: 'none'}}to="/">Encode</Link> */}
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
            /> */}
            <input type="file" onChange={onImageChange} className="filetype" />
            {/* {image && <img alt="preview" sizes='100' src={image} />} */}
            {/* <button onClick={handleUploadClick}>Upload</button> */}
            {/* <button onClick={handleUpload}>Submit</button> */}
            
        </div>
        <div className="sub">
            <button type="button" style={{ width: "100px", height: "30px",}}onClick={handleen}>submit</button><br></br>
        </div>
        {/* <button type="button" style={{ width: "100px", height: "30px",}}onClick={handleen}>encode</button><br></br> */}
        <div className="txt">
        <h2>Decoded text</h2>
        <h3>{decodedText}</h3>
        </div>
        <Outlet/>
        </>
    )
}