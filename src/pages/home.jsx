import Navbar from "../components/molecules/navbar";
import Footer from "../components/molecules/footer";
import Banner from "../components/molecules/banner";
import Statistics from "../components/molecules/statistics";
import CourseList from "../components/molecules/courseList";
import CategoryCourse from "../components/molecules/category";
import Benefit from "../components/molecules/benefit";
const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Statistics />
      <CourseList name="Recommended Class" />
      <Benefit />
      <CategoryCourse />
      <Footer />
    </>
  );
};
export default Home;
