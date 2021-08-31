import React, { useEffect } from 'react';
import './App.css';
import './style.scss';
import HomePage from './presentation/HomePage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

function App() {
  const toaster = useSelector((state: any) => state.SignUpUser.toaster)

  useEffect(() => {
    if (toaster.status) {
      toasterModify(toaster.type, toaster.message)
    }
  }, [toaster])

  const toasterModify = (type: string, msg: string) => {
    if (type === "success") {
      toast.success(msg, { style: { backgroundColor: "#2dce89", color: "white", zIndex: 99999 } })
    } else {
      toast.error(msg, { style: { backgroundColor: "#f5365c", color: "white", zIndex: 99999 } })
    }
  }


  return (
    <>
      <ToastContainer />
    <div className="App">
        <HomePage />
    </div>
    </>
  );
}

export default App;
