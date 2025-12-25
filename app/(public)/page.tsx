import HeroSection from "./_components/HeroSection";
import LatestProperties from "./_components/LatestProperties";
import PropertyByArea from "./_components/PropertiesByArea";
import SearchBar from "./_components/SearchBar";


export default function Page() {
  return (
    <>
      
      <HeroSection />
      <SearchBar />
      < PropertyByArea />
      < LatestProperties />
      
    </>
  );
}
