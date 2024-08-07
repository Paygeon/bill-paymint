import React from 'react';
import './styles.css';

interface PhotoCaptureComponentProps {
  handleCapture: (file: File) => void;
}

const PhotoCaptureComponent: React.FC<PhotoCaptureComponentProps> = ({ handleCapture }) => {
  // Handling photo capture of the invoice using camera
  const handleTakePhoto = () => {
    if (typeof window !== 'undefined') {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;

      const newWindow = window.open(
        '',
        'CameraWindow',
        `width=${screenWidth},height=${screenHeight},left=0,top=0`
      );

      // Defining and styling the video stream and the button to capture photos
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <style>
                body {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  margin: 0;
                  height: 100%;
                  background-color: #f0f0f0;
                }
                #camera-root {
                  display: flex; 
                  flex-direction: column; 
                  align-items: center; 
                  justify-content: center;
                  height: 97%;
                }
                #video {
                  height: 100%;
                }
                #capture-button {
                  margin-top: 10px;
                  padding: 10px 20px;
                  font-size: 16px;
                  background-color: #4CAF50;
                  color: white;
                  border: none;
                  cursor: pointer;
                  border-radius: 5px;
                  align-self: center;
                }
                #capture-button:hover {
                  background-color: #45a049;
                }
              </style>
            </head>
            <body>
              <div id="camera-root">
                <video id="video" autoplay></video>
                <button id="capture-button">Capture Photo</button>
                <canvas id="canvas" style="display:none;"></canvas>
              </div>
            </body>
          </html>
        `);
        newWindow.document.close();

        // Handling message from new window
        const handleMessage = (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;
          if (event.data.type === 'CAPTURED_PHOTO') {
            const dataUrl = event.data.photo;
            fetch(dataUrl)
              .then(res => res.blob())
              .then(blob => {
                const file = new File([blob], 'captured-photo.png', { type: 'image/png' });
                handleCapture(file);
              });
            window.removeEventListener('message', handleMessage);
            newWindow.close();
          }
        };

        window.addEventListener('message', handleMessage);

        // Script for the new window to capture photo using the camera
        const cameraScript = `
          (function() {
            const video = document.getElementById('video');
            const canvas = document.getElementById('canvas');
            const captureButton = document.getElementById('capture-button');
  
            navigator.mediaDevices.getUserMedia({ video: true })
              .then((stream) => {
                video.srcObject = stream;
              })
              .catch((error) => {
                console.error('Error accessing the camera: ', error);
              });
  
            captureButton.onclick = () => {
              const context = canvas.getContext('2d');
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              const dataUrl = canvas.toDataURL('image/png');
              window.opener.postMessage({ type: 'CAPTURED_PHOTO', photo: dataUrl }, window.location.origin);
            };
          })();
        `;

        const scriptElement = newWindow.document.createElement('script');
        scriptElement.innerHTML = cameraScript;
        newWindow.document.body.appendChild(scriptElement);
      }
    }

  };

  return (
    <button className='custom-button' onClick={handleTakePhoto}>Take Photo</button>
  );
};

export default PhotoCaptureComponent;