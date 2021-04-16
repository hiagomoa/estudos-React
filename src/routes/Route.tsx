import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import { ContextLogin } from '../context/ContextLogin'
import { IState } from '../store';
import { Data } from '../store/modules/auth/types';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user, logged, loginUser } = useContext(ContextLogin);
  const auth = useSelector<IState, Data>(state => state.auth);
  console.log("Valor do token: "+ auth.token+" Negado: "+ !!auth.token)


  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!auth.token ? (
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