import Banner from "../components/molecules/banner";
import Statistics from "../components/molecules/statistics";
import CourseList from "../components/molecules/courseList";
import CategoryCourse from "../components/molecules/category";
import Benefit from "../components/molecules/benefit";
const Home = () => {
  return (
    <>
      <Banner />
      <Statistics />
      <CourseList name="Recommended Class" />
      <Benefit />
      <CategoryCourse />
    </>
  );
};
export default Home;
