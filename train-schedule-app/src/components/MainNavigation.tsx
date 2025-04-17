import { Form, Link, NavLink, useRouteLoaderData } from 'react-router-dom';
import classes from './MainNavigation.module.css';

export default function MainNavigation() {
  const userData = useRouteLoaderData('root');

  return (
    <nav className={classes.mainNav}>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/train-schedule" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Train Schedules
          </NavLink>
        </li>
      </ul>

      <div className={classes.authButtons}>
        {userData ? (
          <Form className={classes.logoutForm} action="logout" method="post">
            <button className={classes.logoutButton} type="submit">
              Logout
            </button>
          </Form>
        ) : (
          <Link to="/auth" className={classes.loginLink}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}