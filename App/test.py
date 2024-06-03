import cv2
import json
import requests

from helper import Helper
import matplotlib.pyplot as plt

# Testing - TextSteganography

# Image - PayLoad
image_file = r"C:\Users\Sharath Prasaath\OneDrive\Pictures\Saved Pictures\imgprocessing.jpg"
text = "Hi Rahul !!!"

payload = json.dumps({'image': Helper.img_2_bytes(cv2.imread(image_file)), 'text': text})
print(Helper.img_2_bytes(cv2.imread(image_file)))
# Req
url_enc = "http://127.0.0.1:8000/text/encode"
url_dec = "http://127.0.0.1:8000/text/decode"

res = requests.post(url_enc, payload).json()
res = requests.post(url_dec, json.dumps(res)).json()
print(res)

# Testing - ImageSteganography
hide_file = r"C:\Users\Sharath Prasaath\OneDrive\Pictures\Saved Pictures\image processing.jpeg"

payload = json.dumps({'cover': Helper.img_2_bytes(cv2.imread(image_file)), 'secret': Helper.img_2_bytes(cv2.imread(hide_file))})

# Req
url_enc = "http://127.0.0.1:8000/image/encode"
url_dec = "http://127.0.0.1:8000/image/decode"

res = requests.post(url_enc, payload).json()
plt.imshow(Helper.bytes_2_img(res["image"]))
plt.show()
res = requests.post(url_dec, json.dumps(res)).json()

plt.imshow(Helper.bytes_2_img(res["image"]))
plt.show()