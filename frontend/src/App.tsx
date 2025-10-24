import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form90C } from './components/Form90C';
import { faClock, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import Home from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ViewTransactions } from './components/ViewTransactions';
import { MyProfile } from './components/MyProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sessionTime, setSessionTime] = useState<number>(300); // 5 minutes session time
  const [showPopup, setShowPopup] = useState<boolean>(false);
  let uName = useSelector((state: any) => state.login.username);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAuthenticated) {
      timer = setInterval(() => {
        setSessionTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setShowPopup(true);
            setIsAuthenticated(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setSessionTime(300);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setSessionTime(0);
    window.location.href = "/login";
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setSessionTime(0);
    window.location.href = "/login";
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav">
          <Link className="navbar-brand" to="/home">Tax Tracker</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {!isAuthenticated &&
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">Login</Link>
                </li>
              </ul>
            }
            {isAuthenticated &&
             <ul className='navbar-nav ms-auto me-4'>
              <li className='nav-item'>
                <Link className='nav-link active me-4' to='/view-transactions'>
                  View Yearly Transactions</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link active me-4' to='/form90C'>
                  Tax Benefit Form 90C</Link>
              </li>
              <li className='nav-item'>
                <span className="nav-link active me-4">Hi, {uName}</span>
              </li>
              <li className='nav-item me-4'>
                    <Link className="nav-link active" to="/my-profile">
                      <FontAwesomeIcon icon={faUser} className='mx-2'/>
                      My Profile
                    </Link>
              </li>
              <li className='nav-item'>
                <span className="nav-link active me-4">
                <FontAwesomeIcon icon={faClock} className='mx-2'/>
                  Session Time: {formatTime(sessionTime)}</span>
              </li>
              <li className='nav-item'>
                <Link className='nav-link active' to='/login' onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className='mx-2'/>
                Logout</Link>
              </li>
            </ul>
            }
          </div>
        </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login setIsAuthenticated={handleLogin} />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/view-transactions' element={<ViewTransactions showPopup={showPopup} handlePopupClose={handlePopupClose} />} />
          <Route path='/form90C' element={<Form90C showPopup={showPopup} handlePopupClose={handlePopupClose} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;