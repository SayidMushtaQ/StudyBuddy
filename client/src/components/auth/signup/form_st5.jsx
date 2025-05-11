import { useRef, useState } from "react";
import { Camera } from "lucide-react";

export default function FormST5({ handleSubmit, handleBack, setForm }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [imageCaptured, setImageCaptured] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access the camera. Please check your permissions.");
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the current video frame to the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get the image data as base64 string
      const imageData = canvas.toDataURL('image/jpeg');
      
      // Store the image in the form state
      setForm(prevForm => ({
        ...prevForm,
        userImage: imageData
      }));
      
      // Stop the camera stream
      const stream = video.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
      }
      
      setImageCaptured(true);
      setCameraActive(false);
    }
  };

  const retakeImage = () => {
    setImageCaptured(false);
    // Remove the image from form state when retaking
    setForm(prevForm => ({
      ...prevForm,
      userImage: null
    }));
    startCamera();
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
        Facial Recognition
      </h2>
      <p className="text-center mb-6">
        Please look directly at the camera for identity verification
      </p>
      
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden mb-4">
          {!cameraActive && !imageCaptured && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
          )}
          
          <video 
            ref={videoRef}
            className={`w-full h-full object-cover ${!cameraActive ? 'hidden' : ''}`}
            autoPlay
            playsInline
            muted
          />
          
          <canvas 
            ref={canvasRef}
            className={`w-full h-full object-cover ${!imageCaptured ? 'hidden' : ''}`}
          />
        </div>
        
        {!cameraActive && !imageCaptured && (
          <button
            type="button"
            onClick={startCamera}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700"
          >
            Start Camera
          </button>
        )}
        
        {cameraActive && (
          <button
            type="button"
            onClick={captureImage}
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700"
          >
            Capture
          </button>
        )}
        
        {imageCaptured && (
          <button
            type="button"
            onClick={retakeImage}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600"
          >
            Retake
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="w-1/3 bg-gray-200 text-gray-800 py-3 rounded-xl shadow-md hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!imageCaptured}
            className={`w-2/3 py-3 rounded-xl shadow-md ${
              imageCaptured 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Complete Signup
          </button>
        </div>
      </form>
    </>
  );
}