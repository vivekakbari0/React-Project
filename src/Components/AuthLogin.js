import { redirect } from 'react-router-dom';

export function getAuthRole() {
  const LoginData = JSON.parse(localStorage.getItem('data'));
  if (!LoginData || LoginData.role === null) {
    return null;
  }
  return LoginData.role;
}

export function RoloeLoader() {
  const role = getAuthRole();
  if (!role) {
    return redirect('/login');
  }
  return null;
}
