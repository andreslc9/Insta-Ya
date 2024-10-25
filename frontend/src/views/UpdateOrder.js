import EditForm from '../components/editForm/EditForm';
import { Footer } from '../components/Footer';
import Header from '../components/Header';
import './UpdateOrder.css';


function ListPackages() {
  return (
        <div className='ListPack'>
            <Header />
            <EditForm />
            <Footer />
        </div>
  );
}

export default ListPackages;