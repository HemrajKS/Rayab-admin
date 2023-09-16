import PrivateRoute from '@/contexts/PrivateRoute';

export default function Layout({ children }) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
