import Navbar from "../components/molecules/navbar";
import Footer from "../components/molecules/footer";
import Banner from "../components/molecules/banner";
import Statistics from "../components/molecules/statistics";
import CourseList from "../components/molecules/courseList";
const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <CourseList name="Recommended Class" />
      <Statistics />
      <Footer />
    </>
  );
};
export default Home;
