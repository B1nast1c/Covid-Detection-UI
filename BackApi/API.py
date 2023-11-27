from flask import Flask, request, send_from_directory
from flask_cors import CORS


import torch.nn as nn
from torchvision import transforms, datasets
import matplotlib.pyplot as plt
import numpy as np
import math, os, torchvision, torch
from torch.utils.data import Dataset, DataLoader, random_split, SubsetRandomSampler
from PIL import Image
from torchsummary import summary    


app = Flask(__name__)
CORS(app)


def setup():
    device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')
    # Parametros
    num_classes = 4
    learning_rate = 0.001
    num_epochs = 75
    batch_size = 128


    class CNN(nn.Module):
            def __init__(self, num_classes):
                    super(CNN, self).__init__()
                    # Capas de CONV
                    self.layer1 = nn.Sequential(
                            nn.Conv2d(in_channels=1, out_channels=32, kernel_size=3, stride=1, padding=1),
                            nn.ReLU(),
                            nn.MaxPool2d(kernel_size=2, stride=2))
                    self.layer2 = nn.Sequential(
                            nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, stride=1, padding=1),
                            nn.ReLU(),
                            nn.MaxPool2d(kernel_size=2, stride=2))
                    self.layer3 = nn.Sequential(
                            nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3, stride=1, padding=1),
                            nn.ReLU(),
                            nn.MaxPool2d(kernel_size=2, stride=2))
                    self.layer4 = nn.Sequential(
                            nn.Conv2d(in_channels=128, out_channels=256, kernel_size=3, stride=1, padding=1),
                            nn.ReLU(),
                            nn.MaxPool2d(kernel_size=2, stride=2)
                    )
                    self.layer5 = nn.Sequential(
                            nn.Conv2d(in_channels=256, out_channels=512, kernel_size=3, stride=1, padding=1),
                            nn.ReLU(),
                            nn.MaxPool2d(kernel_size=2, stride=2)
                    )
                    self.fc = nn.Linear(8*8*512, num_classes)

            def forward(self, x):
                    out = self.layer1(x)
                    out = self.layer2(out)
                    out = self.layer3(out)
                    out = self.layer4(out)
                    out = self.layer5(out)
                    out = out.reshape(out.size(0), -1)
                    out = self.fc(out)
                    return out

    model = CNN(4).to(device)

    model_path = 'classifier90.pth'
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()  # Set the model to evaluation mode
    summary(model, (1, 256, 256))
    return model, device


def AnalisisCovid(images_path):
    model.eval()

    transform = transforms.Compose([
                transforms.Grayscale(num_output_channels=1),
                transforms.ToTensor()
        ])

    with torch.no_grad():
                correct = 0
                total = 0
                #images_path = 'Lung_Opacity-20.png'
                imagen = Image.open(images_path)
                #imagen = imagen.crop((100, 100, 1024, 1024))
                grayscale = imagen.convert('L')
                resized = grayscale.resize((256, 256), Image.LANCZOS)
                resized.save(images_path)
                images = Image.open(images_path)
                images = transform(images)
                images = images.to(device)
                outputs = model(images.unsqueeze(0))
                _, predicted = torch.max(outputs.data, 1)

                print('El resultado es: ', predicted.item())
                return predicted.item()

@app.before_first_request
def before_first_request():
    global model, device
    model, device = setup()

@app.route('/')
def root():
    return "Hola"



@app.route('/cargarImagen', methods=['POST'])
def cargar():
    import os
    archivo = request.files['file']
    destino = os.path.join('imagenes/',archivo.filename)
    archivo.save(destino)
    Res = AnalisisCovid(destino)
    UrlImg = 'http://127.0.0.1:5000/'+destino
    return {'data': Res, 'img':UrlImg}

@app.route('/imagenes/<filename>')
def uploaded_file(filename):
    return send_from_directory(os.path.join(app.root_path, 'imagenes'), filename)


if __name__ == "__main__":
    app.run(debug=True)