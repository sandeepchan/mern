import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ForgotPassword from '../auth/Forgotpassword';
import NotFound from '../layout/notFound';
import ResetPassword from '../auth/ResetPassword';
import Dashboard from '../dashboard/dashboard';
import PrivateRoute from '../ROUTING/PrivateRoute';
import CreateProfile from '../profile-forms/Createprofile';
import Editprofile from '../profile-forms/Editprofile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/Addeducatiom';
import Profiles from '../Profiles/Profile';
import Profile from '../profile/profile';
import Post from '../post/post';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import Posts from '../posts/posts';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/forgot' component={ForgotPassword} />
        <Route exact path='/reset/:token' component={ResetPassword} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/createprofile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={Editprofile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
