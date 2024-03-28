import "./App.css";
import { Route, Routes } from "react-router-dom";
import CustomerForm from "./Customer/CustomerForm";
import Customer from "./Customer/Customer";
import Header from "./Common/Header";
import CustomerList from "./Customer/CustomerList";
function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/:id" element={<Customer />} />
            <Route path="/create-customer" element={<CustomerForm />} />
            <Route path="/edit-customer/:id" element={<CustomerForm onEdit={true}/>} />
          </Routes>
          
        </div>
      </header>
    </div>
  );
}

export default App;