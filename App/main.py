# Fast API
from fastapi import FastAPI,UploadFile,File,Form
from fastapi.responses import FileResponse
from pydantic import BaseModel

# Algo
from TextSteganography import TextSteganography
from ImageSteganography import ImageSteganography
from helper import Helper
from AudioSteg import AudioSteganography
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
import cv2
import os

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def hello_world():
    return {"Msg": "hello world"}

@app.post("/text/encode")
async def text_encode(data: dict):
    
    # Inputs
    bytes = data.get("image") # image
    # print(bytes)
    img = Helper.bytes_2_img(bytes) 
    # print(img)
    text = data.get("text") # text
    # print(text)

    res, enc_img = TextSteganography.encode(text, img)

    if(not res):
        return {"Message" : "Invalid Input"}
    
    enc_img=cv2.cvtColor(enc_img, cv2.COLOR_BGR2RGB)
    enc_img = Helper.img_2_bytes(enc_img)

    return {"image": enc_img}

@app.post("/text/decode")
async def text_decode(data: dict):

    # Inputs
    bytes = data.get("image") # image
    img = Helper.bytes_2_img(bytes) 
    # print(img)
    text = TextSteganography.decode(img)
    # print(text)
    return {"text": text}

@app.post("/image/encode")
async def image_encode(data: dict):
    
    # Inputs
    bytes_secret = data.get("secret") # secret image
    secret = Helper.bytes_2_img(bytes_secret)
    # print(secret)
    bytes_cover = data.get("cover")
    cover = Helper.bytes_2_img(bytes_cover)
    # print(cover)
    res, enc_img = ImageSteganography.encode(cover, secret)

    if(not res):
        return {"Message" : "Invalid Hide Image Shape"}
    enc_img=cv2.cvtColor(enc_img, cv2.COLOR_BGR2RGB)
    enc_img = Helper.img_2_bytes(enc_img)

    return {"image": enc_img}

@app.post("/image/decode")
async def image_encode(data: dict):
    
    # Inputs
    bytes = data.get("image") # image
    img = Helper.bytes_2_img(bytes) 

    dec_img = ImageSteganography.decode(img)
    dec_img = Helper.img_2_bytes(dec_img)
    
    return {"image": dec_img}

class AudioData(BaseModel):
    audio: UploadFile=File(...)
    text: str 
     
flag=1
AUDIO = AudioSteganography("outmsg.txt","outsound.wav")
@app.post("/audio/encode")
async def audio_encode(audio:UploadFile = File(...), text: str = Form(...)):
    audio_content = await audio.read()
    text_content = text
    save_dir = "/App/"

    # Create the directory if it doesn't exist
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)

    # Specify the file path to save the audio file
    file_path = os.path.join(save_dir, f"originalll.wav")

    # Write the audio content to the file
    with open(file_path, "wb") as f:
        f.write(audio_content)
    # AUDIO = AudioSteganography("outmsg.txt","outsound.wav")
    flag = AUDIO.ENCRYPT(file_path,text_content)
    return {"data":flag}

@app.get("/audio/GET")
async def GET():
    return FileResponse('outsound.wav', media_type='audio/wav')

@app.post("/audio/decode")
async def audio_decode(audio:UploadFile = File(...)):
    audio_con = await audio.read()
    # encoded_audio=bytes(audio_con, "utf-8")
    save_dir = "/App"

    # Create the directory if it doesn't exist
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)

    # Specify the file path to save the audio file
    file_path = os.path.join(save_dir, f"outsoundd.wav")
    with open(file_path, "wb") as f:
        f.write(audio_con)
    
    AUDIO.Extractor(file_path)
    msg_path="App\outmsg.txt"
    return FileResponse(msg_path, media_type="Text")