// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Dashboard from "./pages/Dashboard";
// import Scenarios from "./pages/Scenarios";
// import Login from "./pages/Login";
//
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="scenarios" element={<Scenarios />} />
//         </Route>
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }
//
// export default App;


// import React from 'react';
//
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Dashboard from "./pages/Dashboard";
// import Scenarios from "./pages/Scenarios";
// import Login from "./pages/Login";
//
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="scenarios" element={<Scenarios />} />
//         </Route>
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }
//
// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogoAnimation from "./components/LogoAnimation";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoAnimation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
