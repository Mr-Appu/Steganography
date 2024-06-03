import wave
import numpy as np



class AudioSteganography() : 
    def __init__(self,outFile_msg,outFile_audio) -> None:
        self.outFile_msg = outFile_msg
        self.outFile_audio = outFile_audio
        self.fileinfo = {}
    
    def Process_msg(self,msg):
        temp = [bin(ord(i))[2:] for i in list(msg)]
        for i in range(len(temp)):
            if (len(temp[i])!=7):
                temp[i] = '0'*(7-len(temp[i]))+temp[i]
            
        bin_format_msg = ''.join(temp)
        return bin_format_msg
    
    def __Encrypt(self,audio,msg):
        for i in range(len(msg)):
            audio[i] = (audio[i] & 254) | int(msg[i])

    def __Decrypt(self,enc_audio):
        MSG = ''.join([str(i) for i in list(np.bitwise_and(np.array(enc_audio),1))])
        return MSG
    def __Msg_Extract(self,bin_msg):
        MSG = [chr(int(bin_msg[i:i+8],2)) for i in range(0,len(bin_msg),8)]
        MSG = ''.join(MSG)
        return MSG
    
    def ENCRYPT(self,Audio,msg):
        f = wave.open(Audio,'rb')  
        audio = bytearray(list(f.readframes(f.getnframes())))
        padded_msg = msg + "###" 
        if(len(audio)>len(padded_msg)):
            msg = [bin(ord(i))[2:] for i in list(padded_msg)]
            msg = ['0' * (8- len(i)) + i for i in msg ]
            msg = ''.join(msg)
            self.__Encrypt(audio,msg)
            with wave.open(self.outFile_audio,'wb') as g :
                g.setparams(f.getparams())
                g.writeframes(audio)
            f.close()
            return 0
        else:
            print("Can't Encrypt audio file size too small to hold data")
            return -1


    def Extractor(self,Audio):
        with wave.open(Audio, 'rb') as f:
            audio = bytearray(list(f.readframes(f.getnframes())))

        MSG = self.__Decrypt(audio)
        MSG = self.__Msg_Extract(MSG)
        X = open(self.outFile_msg,'w')
        X.write(MSG.split("###")[0])
        X.close()

