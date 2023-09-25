import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Students from "./components/Students";
import PrivateRoute from "./components/PrivateRoute";
import UpdateForm from "./components/UpdateForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<PrivateRoute />}>
          <Route path="/students" element={<Students />} />
          <Route path="/update/:id" element={<UpdateForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
