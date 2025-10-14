import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";

const HomePage = () => {

  

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex">
        <Sidebar />
        
      </div>
    </div>
  );
};

export default HomePage;
