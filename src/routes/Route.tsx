import React,{useContext} from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import {ContextLogin} from '../context/ContextLogin'

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
    const {user, logged, loginUser} = useContext(ContextLogin);


  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
            />
          );
        }}
      />
    );
  };
  
  export default Route;