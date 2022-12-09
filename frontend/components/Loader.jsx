 import BarLoader from "react-spinners/BarLoader";

 // static full screen loader
 const Loader = () => (
  <>
    <section 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 1)",
      }}
    >
      <BarLoader color="#E95F8D" />
    </section>
  </>
 )

export default Loader;
      