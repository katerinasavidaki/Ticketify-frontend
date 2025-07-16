import {BrowserRouter, Route, Routes} from "react-router";
import {AuthProvider} from "@/context/AuthProvider.tsx";
import {Toaster} from "sonner";
import RouterLayout from "@/components/RouterLayout.tsx";
import HomePage from "@/pages/HomePage.tsx";


function App() {

  return (
    <>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
                <Route element={<RouterLayout/>}>
                    <Route index element={<HomePage/>} />
                </Route>
            </Routes>
          </BrowserRouter>
          <Toaster richColors/>
        </AuthProvider>
    </>
  )
}

export default App
