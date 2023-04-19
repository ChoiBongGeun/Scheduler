import {BrowserRouter, Navigate, Route,Routes } from "react-router-dom"
import SchedulerPage from "../pages/scheduler/SchedulerPage"



const Routers = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/main"  element={<SchedulerPage />} />
                    <Route path="*" element={<Navigate replace to="/main"/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Routers;