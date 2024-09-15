import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function AuthAdmin() {
  const navigate = useNavigate();

  const getRole = () => Cookies.get('role');

  useEffect(() => {
    console.log(Cookies.get('role'));
    if (getRole() !== 'Admin') {
      console.log('You are not admin');
      navigate('/');
    }
  }, [navigate]);

  const role = getRole();

  return role === 'Admin' ? <Outlet /> : null;
}

export default AuthAdmin;
