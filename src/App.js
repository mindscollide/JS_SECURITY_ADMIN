import "./App.css";
import "./assets/custom-icons/custom-icon.css";
import Header from "./components/layout/Header/Header";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Edituser from "./container/Usermanagement/EditUser/Edituser";
import Createuser from "./container/Usermanagement/CreateUser/Createuser";
import Userreport from "./container/Reports/Userreport";
function App() {
  return (
    <>
      <Sidebar />
      <Header />
      <Edituser />
      {/* {<Createuser />} */}
      {/* <Userreport /> */}
    </>
  );
}

export default App;
