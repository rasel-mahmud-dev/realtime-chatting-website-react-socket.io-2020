import React from 'react'
import { connect } from "react-redux"
import { logout } from 'actions/authAction'

import Button from 'components/Button/Button'
import Preload from 'components/Preload/Preload'
import { Container } from 'components/Layout'

import Dropdown from 'components/Dropdown/Dropdown'



import "./Navigation.scss"

import A from "../asserts/avatar/img_avatar3.png"
import {NavLink} from "react-router-dom";

const Navigation  = (props)=>{ 

  const { auth } = props

  const [ isShow_authMenuPanelId, set_authMenuPanelId ] = React.useState(null)

  function toggleAuthMenuPanel(e){   
    if(e.target.dataset.set === isShow_authMenuPanelId){
      set_authMenuPanelId(null)
    }else{
      set_authMenuPanelId(e.target.dataset.set ? e.target.dataset.set : null)
    }
  }

  // console.log(auth);

  return (
    <div className="d">
      <Container fluid className="navigation" >
      <div className="left_nav">
        <li className="nav_item">
          <Preload exact to="/"><Button waves="green" text>Home</Button></Preload>
        </li>
        <li className="nav_item">
          <Preload to="/products"> <Button waves="green" text>Products</Button></Preload>
        </li>
        
        { auth && auth.isAuthenticated && (
          <li className="nav_item">
            <Preload to={`/products/${auth._id}`}> <Button waves="green" text>Admin Product</Button></Preload>
          </li>
        )}
       
        <li className="nav_item">
          <Preload to="/add-product"> <Button waves="green" text>Add Product</Button></Preload>
        </li>
        
        <li className="nav_item">
          <NavLink to="/messenger"> <Button waves="green" text>Messenger</Button></NavLink>
        </li>
        
      </div>

      <div className="right_nav">

      
      { auth && auth.isAuthenticated ? (
        <li onClick={toggleAuthMenuPanel} data-set={0} className="nav_item" style={{display: 'inline-flex'}}>
          <span>{auth._id + "....."}  </span>
          <img className="user-avatar" src={ auth.avatar ? auth.avatar : A } alt="" srcset=""/>
          <span>{auth.username}</span>
          {
            <Dropdown isShow={isShow_authMenuPanelId == 0}  > 
                <ul 
                  style={{right: 0, top: 25, boxShadow: '#797979 1px 1px 4px 0px, darkgrey 1px 1px 3px 0px'}} className="dropdown_panel">
                  { auth && auth.isAuthenticated ? (
                    <React.Fragment>
                      <li>{ auth.isAdmin && <Preload to="/admin/admin-panel">Admin Panel</Preload> }</li>
                      <li><Preload to={`/auth/profile`}>Profile</Preload></li>
                      <li><Preload to="/auth/dashboard">Dashboard</Preload></li>
                      <li onClick={(e)=>props.logout(auth._id)}>Logout</li>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <li><Preload to="/auth/register">Register</Preload></li>
                      <li><Preload to="/auth/login">Login</Preload></li>
                    </React.Fragment>
                  ) }
                </ul>
              </Dropdown>

              // <Panel right={-8} > 
              //   <ul className="panel_list">
              //     { auth && auth._id ? (
              //       <React.Fragment>
              //         <li><Link to={`/auth/profile/${auth._id}`}>Profile</Link></li>
              //         <li><Link to="/auth/dashboard">Dashboard</Link></li>
              //         <li onClick={(e)=>props.logOut(auth._id)}>Logout</li>
              //       </React.Fragment>
              //     ) : (
              //       <React.Fragment>
              //         <li><Link to="/auth/register">Register</Link></li>
              //         <li><Link to="/auth/login">Login</Link></li>
              //       </React.Fragment>
              //     ) }
              //   </ul>
              // </Panel>
          }
        </li>
      ) : (
        <React.Fragment>
          <li className="nav_item">
            <Preload to="/auth/login"><i class="far fa-sign-in-alt"></i></Preload>
          </li>
        </React.Fragment>
      )}
      
       
      </div>
    </Container>
    </div>
  )
}

function Panel(props){
  const { style, className, left, right } = props
  const styles = {...style}
  if(left){
    styles.left = `${left}px`
  } else if(right){
    styles.right = `${right}px`
  }

  return(
    <div data-test='panel' style={styles} className="panel">
      {props.children}
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth  
})




export default connect(mapStateToProps, {logout})(Navigation)