const video = document.createElement("video");

const videoGrid = document.getElementById("video_grid");

const socket = io("/");
const myPeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});

const myVideo = document.createElement("video");
myVideo.muted = true;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    myPeer.on("call",  (call) => {
       call.answer(stream);

      call.on("stream", (userVideoStream) => {
        console.log("In stream");
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
       connectNewUser(userId, stream);
    });
  });
myPeer.on("open", (peerId) => {
  socket.emit("join-room", roomId, peerId);
});

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};

socket.on("user-disconnected", (userId)=>{
   
})

const connectNewUser =  (userId, stream) => {
  const call =  myPeer.call(userId, stream);

  call.on("stream", (userVideoStream) => {
    console.log("In check");

    addVideoStream(video, userVideoStream);
  });
  call.on("close", () => {
    video.remove();
  });
};
