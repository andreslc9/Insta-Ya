import { Footer } from '../components/Footer';
import Header from '../components/Header';
import Orderlist from '../components/Orderlist';
import CreateButton from '../components/Createbutton';
import './ListPackages.css';


function ListPackages() {
  return (
        <div className='ListPack'>
            <Header />
            <CreateButton />
            <Orderlist />
            <Footer />
        </div>
  );
}

export default ListPackages;