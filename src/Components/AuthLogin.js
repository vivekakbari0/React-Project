import { redirect } from 'react-router-dom';

// Add function to retrieve authenticated user's role
export function getAuthRole() {
  const LoginData = JSON.parse(localStorage.getItem('data'));
  if (!LoginData || LoginData.role === null) {
    return null;
  }
  return LoginData.role;
}

// Add role loader and redirect to login if user is not authenticated
export function RoloeLoader() {
  const role = getAuthRole();
  if (!role) {
    return redirect('/login');
  }
  return null;
}
