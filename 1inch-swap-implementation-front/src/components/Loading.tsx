const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        zIndex: "999",
        backgroundColor: "rgba(0,0,0,0.8)",
        top: 0,
        left: 0,
      }}
    >
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
