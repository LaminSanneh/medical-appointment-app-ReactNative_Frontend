import React from 'react';
import {RootState} from '../store';
import UnauthorizedScreen from '../screens/UnauthorizedScreen';
import {useAppSelector} from '../store/hooks';

const withAuthorization =
  (allowedRoles: string[]) => (WrappedComponent: React.ComponentType<any>) => {
    const WithAuthorization: React.FC = props => {
      const isAuthenticated = useAppSelector(
        (state: RootState) => state.auth.isAuthenticated,
      );
      const user = useAppSelector((state: RootState) => state.auth.user);

      if (
        !isAuthenticated ||
        (user &&
          !allowedRoles.every(role => {
            return user.roles?.includes(role);
          }))
      ) {
        return <UnauthorizedScreen />;
      }

      return <WrappedComponent {...props} />;
    };

    return WithAuthorization;
  };

export default withAuthorization;
