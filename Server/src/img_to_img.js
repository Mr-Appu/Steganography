import React, { useState} from 'react';
import { Outlet} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import utf8 from "utf8";
const BASE_URL = 'http://127.0.0.1:8000'; // Replace with your FastAPI server URL

  const encodeImage = async (enimage, image) => {
    try {
      console.log(image.slice(24))
      const response = await axios.post(`${BASE_URL}/image/encode`, {'secret':utf8.decode(enimage.slice(23)), 'cover':utf8.decode(image.slice(23)) });
  
      return response.data.image;
    } catch (error) {
      console.error('Error encoding text:', error);
      return null;
    }
  };
export default function Image_to_image(){
    // const [selectedFile, setSelectedFile] = useState(null);
    // const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleclick = () => {
        navigate('idecode');
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
    const [enimage, setEnimage] = useState('');
    const onimageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (e) => {
            setEnimage(e.target.result);
          };
        //   reader.readAsDataURL(event.target.files[0]);
        }
      };
    const [encodedImage, setEncodedImage] = useState(null);
    const handleen = async() =>{
      let encoded =  await encodeImage(enimage, image);
      encoded=utf8.encode(encoded)
      setEncodedImage('data:image/jpeg;base64,'+encoded);
      console.log(encodedImage)
    }
    return(
        <>
        <div class="tdecode">
            {/* <Link style={{textDecoration: 'none'}}to="idecode">Decode</Link> */}
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
            <button onClick={handleUpload}>Submit</button><br> */}
            {/* </br> */}
            <input type="file" onChange={onImageChange} className="filetype" />
            {/* {image && <img alt="preview" sizes='100' src={image} />} */}
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
            <input type="file" onChange={onimageChange} className="filetype" />
            {/* {image && <img alt="preview" sizes='100' src={enimage} />} */}

            </div>
            <div className='out'>
            <button type="button" style={{ width: "100px", height: "30px",}}onClick={handleen}>submit</button><br></br>
            </div>
            <div className='outi'>
            {image && <img alt='' src={encodedImage} />}
            </div>
        <Outlet/>
        </>
    );
}