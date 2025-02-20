import React from 'react';
import useRole from '../hooks/useRole';  

type RoleBasedRouteProps = {
  petOwnerComponent: React.ReactNode;
  vetComponent: React.ReactNode;
};

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  petOwnerComponent,
  vetComponent,
}) => {

  
  const { role } = useRole();  
  
  // Conditionally render based on role
  return role == 'User' ? <>{petOwnerComponent}</> : <>{vetComponent}</>;
};

export default RoleBasedRoute;
