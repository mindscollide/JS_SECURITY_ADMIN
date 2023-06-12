import logo from "./logo.svg";
import "./App.css";
import "./assets/custom-icons/custom-icon.css";
import Header from "./components/layout/Header/Header";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Bankuser from "./container/Usermanagement/BankUser/Bankuser";
import Userreport from "./container/Reports/Userreport";
function App() {
  return (
    <>
      <Sidebar />
      <Header />
      <Bankuser />
      {/* {<Createuser />} */}
      {/* <Userreport /> */}
    </>
  );
}

export default App;
