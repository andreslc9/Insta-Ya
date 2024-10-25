import CreateForm from '../components/CreateForm';
import { Footer } from '../components/Footer';
import Header from '../components/Header';
import './CreateOrder.css';


function ListPackages() {
  return (
        <div className='ListPack'>
            <Header />
            <CreateForm />
            <Footer />
        </div>
  );
}

export default ListPackages;