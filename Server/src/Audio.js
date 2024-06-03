import React, { useState} from 'react';
import { Outlet} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// const fs = require('fs');
// import utf8 from "utf8";

const BASE_URL = 'http://127.0.0.1:8000'; // Replace with your FastAPI server URL

  const encodeAudio = async (Audio, inputValue) => {
    console.log(Audio)
    const formData = new FormData();
    formData.append("audio",Audio);
    formData.append("text",inputValue)
    console.log(formData)
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
  }

    try {
      const response = await axios.post(`${BASE_URL}/audio/encode`, formData);
      let data=response.data
      return data;
    } catch (error) {
      console.error('Error encoding text:', error);
      return null;
    }
  };
export default function Audio(){
    // const [selectedFile, setSelectedFile] = useState(null);
    // const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleclick = () => {
        navigate('Adecode');
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
    // const dataURLtoBlob = (dataURL) => {
    //     const byteString = atob(dataURL.split(',')[1]);
    //     const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    //     const ab = new ArrayBuffer(byteString.length);
    //     const ia = new Uint8Array(ab);
    //     for (let i = 0; i < byteString.length; i++) {
    //         ia[i] = byteString.charCodeAt(i);
    //     }
    //     return new Blob([ab], { type: mimeString });
    // };
    const [Audio, setAudio] = useState('');
    // var audioBlob={};
    const onAudioChange = (event) => {
        // if (event.target.files && event.target.files[0]) {
        //   let reader = new FileReader();
        //   reader.readAsDataURL(event.target.files[0]);
        //   reader.onload = (e) => {
        //     // setAudio(e.target.result);
        //     const audioDataUrl = e.target.result;
        //     const data= dataURLtoBlob(audioDataUrl);
        //     setAudio(data)
        //     // console.log(Audio)
        //     // console.log("hi")
        //   };
        // //   reader.readAsDataURL(event.target.files[0]);
        // }
        const file = event.target.files[0];
        setAudio(file);
      };
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
      console.log(inputValue)
      setInputValue(e.target.value);}
    // const [txt, settxt] = useState(null);
    const handleen = async() =>{
      // console.log(Audio)
      // console.log('blob')
      let encoded =  await encodeAudio(Audio, inputValue);
      console.log(encoded);
      if(encoded.data===0)
      {
        document.getElementsByClassName('out_audio')[0].style.display='block';
        document.getElementsByClassName('out_audio')[0].setAttribute('src',BASE_URL+'/audio/GET')
      }
      else{
          // const txt= "error"
      }

    }
    return(
        <>
        <div class="tdecode">
            {/* <Link style={{textDecoration: 'none'}}to="Adecode">Decode</Link> */}
            <button type="button" style={{ width: "100px", height: "30px",}}onClick={handleclick}>Decode</button>
        </div>
            <div className='h4'>
            <h4>Upload a File</h4>
            </div>
            <div className='iupload'>
            {/* <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <button onClick={handleUploadClick}>Upload</button>
            <button onClick={handleUpload}>Submit</button>
            <br></br> */}
            <input type="file" onChange={onAudioChange} className="filetype" />
            </div>
            <div className='h42'>
            <h4>Upload a File</h4>
            </div>
            <div className='tupload'>
            {/* <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <button onClick={handleUploadClick}>Upload</button>
            <button onClick={handleUpload}>Submit</button> */}
            <input
             type="text"
             style={{ width: "250px", height: "20px",}}
             value={inputValue}
             onChange={handleInputChange}
             placeholder="Enter your text"
            /><br></br>
            </div>
            <div className='out'>
            <button type="button" style={{ width: "100px", height: "30px",}}onClick={handleen}>submit</button><br></br>
            </div>
            <div className='outi'>
                <audio  controls  type="audio/wav"  className='out_audio'/>
                {/* <p>{txt}</p> */}
            </div>
        <Outlet/>
        </>
    );
}