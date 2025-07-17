import {BrowserRouter, Route, Routes} from "react-router";
import {AuthProvider} from "@/context/AuthProvider.tsx";
import {Toaster} from "sonner";
import RouterLayout from "@/components/RouterLayout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";


function App() {

  return (
    <>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
                <Route element={<RouterLayout/>}>
                    <Route index element={<HomePage/>} />
                    <Route path="register" element={<RegisterPage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                </Route>
            </Routes>
          </BrowserRouter>
          <Toaster richColors/>
        </AuthProvider>
    </>
  )
}

export default App
