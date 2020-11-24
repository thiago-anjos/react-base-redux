import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';

function useSelectorLogin() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn;
}
export default useSelectorLogin;
