import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute(props) {
	const sessionUser = useSelector(state => state.session.user)
	return <Route {...props}>{sessionUser ? props.children : <Redirect to="/login" />}</Route>
}
