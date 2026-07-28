import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <NavLink to="/" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>Dashboard</NavLink>
            <NavLink to="/categories" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>Categories</NavLink>
            <NavLink to="/income" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>Income</NavLink>
            <NavLink to="/expenses" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>Expenses</NavLink>
            <NavLink to="/budgets" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>Budgets</NavLink>
        </nav>
  );
}

export default NavBar;