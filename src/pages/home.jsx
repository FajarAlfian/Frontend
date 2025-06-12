import Navbar from "../components/molecules/navbar";
import Footer from "../components/molecules/footer";
import Banner from "../components/molecules/banner";
import Statistics from "../components/molecules/statistics";
import Benefit from "../components/molecules/benefit";
const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Statistics />
      <Benefit />
      <Footer />
    </>
  );
};
export default Home;
