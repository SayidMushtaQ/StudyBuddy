import { useRef, useState, useEffect } from "react";
import { Camera } from "lucide-react";

export default function FormST4({ handleSubmit, handleBack, setForm }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [imageCaptured, setImageCaptured] = useState(false);
  const [error, setError] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");

  // Detect available cameras when component mounts
  useEffect(() => {
    async function detectCameras() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          setError("Your browser doesn't support camera detection");
          return;
        }
        
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === "videoinput");
        
        setCameras(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0].deviceId);
        } else {
          setError("No cameras detected on your device");
        }
      } catch (err) {
        console.error("Error detecting cameras:", err);
        setError("Failed to detect cameras");
      }
    }

    detectCameras();
    
    return () => {
      // Clean up any active streams when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      // Reset any previous errors
      setError(null);
      
      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Your browser doesn't support camera access");
        return;
      }
      
      // Try to access camera with specific constraints
      const constraints = {
        video: selectedCamera ? { deviceId: { exact: selectedCamera } } : true
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(e => {
            console.error("Error playing video:", e);
            setError("Could not start video playback");
          });
        };
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      if (err.name === "NotAllowedError") {
        setError("Camera access was denied. Please allow camera access in your browser settings.");
      } else if (err.name === "NotFoundError") {
        setError("No camera found. Please check if your camera is connected properly.");
      } else if (err.name === "NotReadableError") {
        setError("Camera is in use by another application. Please close other apps using your camera.");
      } else {
        setError(`Unable to access the camera: ${err.message || "Unknown error"}`);
      }
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      try {
        // Convert canvas to image data
        const imageData = canvas.toDataURL('image/jpeg');
        
        // Update form data
        setForm(prevForm => ({
          ...prevForm,
          userImage: imageData
        }));
        
        // Stop camera stream
        stopCameraStream();
        
        setImageCaptured(true);
        setCameraActive(false);
      } catch (err) {
        console.error("Error capturing image:", err);
        setError("Failed to capture image. Please try again.");
      }
    }
  };

  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const retakeImage = () => {
    setImageCaptured(false);
    setForm(prevForm => ({
      ...prevForm,
      userImage: null
    }));
    setError(null);
    startCamera();
  };

  const handleCameraChange = (e) => {
    setSelectedCamera(e.target.value);
    // If camera is active, restart with new camera
    if (cameraActive) {
      stopCameraStream();
      setCameraActive(false);
      // Small delay to ensure previous stream is properly stopped
      setTimeout(() => {
        startCamera();
      }, 300);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
        Facial Recognition
      </h2>
      <p className="text-center mb-6">
        Please look directly at the camera for identity verification
      </p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
          {error.includes("denied") && (
            <p className="mt-2 text-sm">
              Tip: Check your browser settings to enable camera access. Look for the camera icon in your address bar.
            </p>
          )}
        </div>
      )}
      
      {cameras.length > 1 && (
        <div className="mb-4">
          <label htmlFor="camera-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Camera:
          </label>
          <select
            id="camera-select"
            value={selectedCamera}
            onChange={handleCameraChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={cameraActive}
          >
            {cameras.map((camera) => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label || `Camera ${camera.deviceId.substr(0, 5)}...`}
              </option>
            ))}
          </select>
        </div>
      )}
      
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
            disabled={cameras.length === 0}
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
            Submit & Verify
          </button>
        </div>
      </form>
    </>
  );
}