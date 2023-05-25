import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

import Edituser from "../container/Usermanagement/EditUser/Edituser";
import Createuser from "../container/Usermanagement/CreateUser/Createuser";
import Userreport from "../container/Reports/Userreport";
import SecurityLogin from "../container/SecurityLogin/Login/SecurityLogin";
import MainPage from "../container/Pages/MainPage/MainPage";
import PrivateRoutes from "./PrivateRoute";
import Bankuser from "../container/Usermanagement/BankUser/Bankuser";
import Addcustomer from "../container/Usermanagement/AddCustomer/Addcustomer";
import Customerlist from "../container/Usermanagement/CustomerList/Customerlist";
export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<SecurityLogin />} />
      <Route element={<PrivateRoutes />}>
        <Route exact path="/JS/Admin/" element={<MainPage />}>
          <Route path="Home" element={<Edituser />} />
          <Route path="editUser" element={<Edituser />} />
          <Route path="" element={<Edituser />} />
          <Route path="createUser" element={<Createuser />} />
          <Route path="userReport" element={<Userreport />} />
          <Route path="bankUser" element={<Bankuser />} />
          <Route path="addCustomer" element={<Addcustomer />} />
          <Route path="customerList" element={<Customerlist />} />
        </Route>
      </Route>
    </>
  )
);
