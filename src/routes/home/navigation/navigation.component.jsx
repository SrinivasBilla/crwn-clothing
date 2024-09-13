import { Fragment } from "react"
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from '../../../assets/crown.svg'
import './navigation.styles.scss';


const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-contaoner" to='/'>
        <CrownLogo className="logo"/>
        </Link>
        <div className="nav-links-conatiner">
          <div className="nav-links">
            <Link className="nav-link" to='/shop'>
            Shop
            </Link>
            <Link className="nav-link" to='/signin'>
            Signin</Link>
          </div>
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;