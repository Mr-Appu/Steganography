import { Outlet,Link} from "react-router-dom";
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import utf8 from "utf8";
const BASE_URL = 'http://127.0.0.1:8000'; // Replace with your FastAPI server URL

  const decodeAudio = async (Audio) => {
    console.log(Audio)
    // Audio=utf8.encode(Audio)
    const formData = new FormData();
    formData.append("audio",Audio);
    console.log(formData)
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
  }

    try {
      const response = await axios.post(`${BASE_URL}/audio/decode`, formData);
      return response.data;
    } catch (error) {
      console.error('Error encoding text:', error);
      return null;
    }
  };
export default function Adecode(){
   
    const navigate = useNavigate();

    const handleclick = () => {
        navigate('../Audio');
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
    const [Audio, setAudio] = useState('');
    const onAudioChange = (event) => {
        
        const file = event.target.files[0];
        setAudio(file);
      };
      const [result,setresult]=useState('')
      const handleen = async() =>{
        let decoded =  await decodeAudio(Audio);
      //   decoded=utf8.encode(decoded)
        setresult(decoded);
        console.log(decoded)
      }
    return (
        <>
        <div class="tencode">
                {/* <Link style={{textDecoration: 'none'}}to="../Audio">Encode</Link> */}
                <button type="button" style={{ width: "100px", height: "30px",}}onClick={handleclick}>Encode</button>
        </div>
        <div className="h">
        <h4>upload file to decode</h4>
        </div>
        <div className="en">
            <input type="file" onChange={onAudioChange} className="filetype" />
            </div>
        <div className="sub">
            <button type="button" style={{ width: "100px", height: "30px",}}onClick={handleen}>submit</button><br></br>
        </div>
        <div className="txt">
        <h2>Decoded text</h2>
        <h3>{result}</h3>
        </div>
        <Outlet/>
        </>
    )
}