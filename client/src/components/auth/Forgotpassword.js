import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forgot } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const Forgotpassword = ({ forgot, setAlert }) => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const { email } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    forgot(email);
  };
  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Forgot password</h1>
        <form
          className='form'
          onSubmit={e => onSubmit(e)}
          action='create-profile.html'
        >
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              required
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='forgot' />
        </form>
      </section>
    </Fragment>
  );
};
Forgotpassword.propTypes = {
  forgot: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { forgot, setAlert }
)(Forgotpassword);
