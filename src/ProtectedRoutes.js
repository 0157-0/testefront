import React from 'react';
import UserServices from 'Services/UserService';
// import Routering from './routes'
import PageError from 'layouts/pageError';

const userService = new UserServices();

const ProtectedRoutes = ({children}) => {
  const usuarioAutenticado = userService.usuarioAutenticado()
  console.log('usuarioAutenticado', usuarioAutenticado)
  // return usuarioAutenticado ?    <PageError/>  : children
  return usuarioAutenticado ?    children :   <PageError/> 
}
 
export default ProtectedRoutes;