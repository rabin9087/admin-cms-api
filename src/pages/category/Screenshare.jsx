import { Button } from "react-bootstrap";

const Screenshare = () => {
  const startSharing = async () => {
    await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    //video.srcObject = screen
  };
  return (
    <div>
      <Button onClick={startSharing}>Start Screenshare</Button>
    </div>
  );
};

export default Screenshare;
