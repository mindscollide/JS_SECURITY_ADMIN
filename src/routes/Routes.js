import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

// import allUser from "../container/Usermanagement/AllUser/AllUsers";
import Alluser from "../container/Usermanagement/AllUser/AllUsers";
import PendingUserRequest from "../container/Usermanagement/PendingRequest/PendingUserRequest";
import Userreport from "../container/Reports/Userreport";
import SecurityLogin from "../container/SecurityLogin/Login/SecurityLogin";
import MainPage from "../container/Pages/MainPage/MainPage";
import PrivateRoutes from "./PrivateRoute";
import Bankuser from "../container/Usermanagement/BankUser/Bankuser";
import Addcustomer from "../container/Usermanagement/AddCustomer/Addcustomer";
import Userlist from "../container/Usermanagement/Userlist/UserList";
import NatureofBus from "../container/Setup/NatureofBus";
export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<SecurityLogin />} />
      <Route element={<PrivateRoutes />}>
        <Route exact path="/JS/Admin/" element={<MainPage />}>
          <Route path="Home" element={<Bankuser />} />
          <Route path="bankUser" element={<Bankuser />} />
          <Route path="" element={<Bankuser />} />
          <Route path="pendingRequest" element={<PendingUserRequest />} />
          <Route path="userReport" element={<Userreport />} />
          <Route path="allUser" element={<Alluser />} />
          <Route path="addCustomer" element={<Addcustomer />} />
          <Route path="userList" element={<Userlist />} />
          <Route path="natureofBusiness" element={<NatureofBus />} />
        </Route>
      </Route>
    </>
  )
);
