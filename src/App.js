import "./App.css";
import Cart from "./Cart";
import DisplayMedicine from "./DisplayMedicine";
import MedicineForm from "./MedicineForm";
import { StoreContextProvider } from "./storeContext";

function App() {
  return (
    <StoreContextProvider>
      <MedicineForm />
      <hr />
      <Cart />
      <DisplayMedicine />
    </StoreContextProvider>
  );
}

export default App;
