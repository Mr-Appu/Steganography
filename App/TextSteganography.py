# Image Steganography - Hide Text in Image

import cv2
import numpy as np

class TextSteganography():
    
    @staticmethod
    def encode(text, img, delimiter="~"):

        # Add Delimiter
        text += delimiter

        # Convert Text to Binary
        text = "".join([format(ord(i), "08b") for i in text])

        # Open Image
        # img = cv2.imread(img_file)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # No of Bits
        size = img.shape[0] * img.shape[1] * min(3, img.shape[2])
        if(len(text) > size):
            return False, False
        
        # Encode Text in Image
        index = 0
        encoded_img = np.copy(img)

        flag = 0

        for i in range(img.shape[0]):
            for j in range(img.shape[1]):
                for k in range(min(3, img.shape[2])):
                    if(len(text) == index):
                        flag = 1
                        break
                    encoded_img[i][j][k] = encoded_img[i][j][k] & ~1 | int(text[index])
                    index += 1
                if(flag):
                    break
            if(flag):
                break

        return True, encoded_img
    
    @staticmethod
    def decode(encoded_img, delimiter="~"):

        # Open Image
        # encoded_img = cv2.imread(img_file)
        encoded_img = cv2.cvtColor(encoded_img, cv2.COLOR_BGR2RGB)
        shape = encoded_img.shape

        # Extract Text from Image

        index = 0
        temp = ""
        text = ""

        flag = 0

        for i in range(shape[0]):
            for j in range(shape[1]):
                for k in range(min(3, shape[2])):
                    if(index%8 == 0 and index != 0):
                        char = chr(int(temp, 2))
                        if(char == delimiter):
                            flag = 1
                            break
                        else:
                            text += char
                            temp = ""
                    temp += str(encoded_img[i][j][k] & 1)
                    index += 1
                if(flag):
                    break
            if(flag):
                break
        print(text)    
        return text