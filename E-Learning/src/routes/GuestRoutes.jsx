import { Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/guest/Home";
import About from "../pages/guest/About";
import Courses from "../pages/guest/Courses";
import CourseDetail from "../pages/guest/CourseDetail";
import Contact from "../pages/guest/Contact";

function GuestRoutes() {
  return (
    <>
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />

      <Route path="/courses" element={<Courses />} />

      <Route path="/courses/:id" element={<CourseDetail />} />

      <Route path="/contact" element={<Contact />} />
    </>
  );
}

export default GuestRoutes;
