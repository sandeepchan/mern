import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Reset extends Component {
  state = {
    password: '',
    password2: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { password, password2 } = this.state;
    if (password !== password2) {
      console.log('not matched');
    } else {
      const newUser = {
        password
      };
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const body = JSON.stringify(newUser);
        await axios.put(
          `/api/auth/reset/${this.props.match.params.token}`,
          body,
          config
        );
        console.log('password updated', 'success');
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  render() {
    const { password, password2 } = this.state;
    return (
      <Fragment>
        <section className='container'>
          <h1 className='large text-primary'>Reset Password</h1>
          <p className='lead'>
            <i className='fas fa-user' /> Create your new password
          </p>
          <form
            className='form'
            onSubmit={this.handleSubmit}
            action='create-profile.html'
          >
            <div className='form-group'>
              <input
                name='password'
                placeholder='Password'
                type='password'
                value={password}
                onChange={this.handleChange('password')}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={this.handleChange('password2')}
                required
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Reset' />
          </form>
        </section>
      </Fragment>
    );
  }
}

export default Reset;
