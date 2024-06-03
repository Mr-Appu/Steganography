# Image Steganography - Hide Image in Image

import cv2
import numpy as np

class ImageSteganography():

    @staticmethod
    def encode(img, hide):

        # img = cv2.imread(img_file)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_shape = img.shape

        # hide = cv2.imread(hide_file)
        hide = cv2.cvtColor(hide, cv2.COLOR_BGR2RGB)
        hide_shape = hide.shape

        if(hide_shape[0] > img_shape[0] or hide_shape[1] > img_shape[1]):
            return False, None

        enc_image = np.copy(img)

        for i in range(hide_shape[0]):
            for j in range(hide_shape[1]):
                for k in range(hide_shape[2]):
                    enc_image[i][j][k] = (enc_image[i][j][k] & 248) | ((hide[i][j][k] & 224) >> 5)

        return True, enc_image
    
    @staticmethod
    def decode(img):

        # img = cv2.imread(enc_img)
        img_shape = img.shape

        for i in range(img_shape[0]):
            for j in range(img_shape[1]):
                for k in range(img_shape[2]):
                    img[i][j][k] = (img[i][j][k] << 5) & 224

        return img