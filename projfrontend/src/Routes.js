import React from 'react'
import {BrowserRouter as Router, Switch, Route}  from  'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup'
import Signin from './user/Signin'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import Cart from './core/Cart'

const Routes = ()=> {
  return (
    <div>
      <Router>
        <Switch>
          <Route  path='/' exact component={Home} />
          <Route  path='/signup' exact component={Signup} />
          <Route  path='/signin' exact component={Signin} />
          <Route  path='/cart' exact component={Cart} />
<PrivateRoute path='/user/dashboard' exact component={UserDashboard}  />
<AdminRoute path='/admin/dashboard' exact component={AdminDashboard}  />
<AdminRoute path='/admin/create/category' exact component={AddCategory}  />
<AdminRoute path='/admin/categories' exact component={ManageCategories}  />
<AdminRoute path='/admin/create/product' exact component={AddProduct}  />
<AdminRoute path='/admin/products' exact component={ManageProducts}  />
<AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct}  />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;