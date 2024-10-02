import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export const useAuthorization = () => {
  const loggedInUser = useSelector((state: RootState) => state.systemModule.loggedInUser)

  function isUserLoggedIn() {
    return !!loggedInUser
  }

  function isAuthorized() {
    return loggedInUser && loggedInUser.isAdmin
  }

  return { loggedInUser, isUserLoggedIn, isAuthorized }
}
