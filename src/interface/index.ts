export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}
