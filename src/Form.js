import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      formErrors: {email: '', password: '', username: '', confirmPassword: ''},
      usernameValid: false,
      emailValid: false,
      passwordValid: false,
      confirmPassValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confirmPassValid = this.state.confirmPassValid;

    switch(fieldName) {
      case 'username':
        usernameValid = value.length >= 6 && value.length < 12;
        fieldValidationErrors.username = usernameValid ? '' : ' mora biti izmedju 6 i 12';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' nije validan';
        break;
      case 'password':
        passwordValid = value.length >= 8;
        fieldValidationErrors.password = passwordValid ? '': ' kratak ';
        break;
      case 'confirmPassword':
        confirmPassValid = confirmPassValid !== passwordValid;
        fieldValidationErrors.confirmPassword = confirmPassValid ? '': 'mora biti isti';
        break;
      default:
        break;  
    }
    
    this.setState({formErrors: fieldValidationErrors,
                    usernameValid: usernameValid,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    confirmPassValid: confirmPassValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.usernameValid && this.state.confirmPassValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleSubmit = (event) => {
    // alert('forma je submitovana: ' + this.state);

    fetch('https://jsonblob.com/', {
        method: 'POST',
        
      }).then(function(response) {
        console.log(response)
        return response.json();
      });

    event.preventDefault();
}

  render () {
    return (
      <div className="signupFrm">
      <form className="form" onSubmit={this.handleSubmit}>
        <h2>Registration</h2>
        <div className="panel">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={`inputContainer `}>
          <label htmlFor="text">First name</label>
          <input type="text" required className="input" name=""
            placeholder=""
            // value={this.state.firstName}
             />
        </div>
        <div className={`inputContainer `}>
          <label htmlFor="text">Last name</label>
          <input type="text" required className="input" name=""
            placeholder=""
            // value={this.state.lastName}
             />
        </div>
        <div className={`inputContainer ${this.errorClass(this.state.formErrors.username)}`}>
          <label htmlFor="text">Username</label>
          <input type="text" required className="input" name="username"
            placeholder=""
            value={this.state.username}
            onChange={this.handleUserInput}  />
        </div>

        <div className={`inputContainer ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="input" name="email"
            placeholder=""
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`inputContainer ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="input" name="password"
            placeholder=""
            value={this.state.password}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`inputContainer ${this.errorClass(this.state.formErrors.confirmPassword)}`}>
          <label htmlFor="confirmPassword">Password confirm</label>
          <input type="password" className="input" name="confirmPassword"
            placeholder=""
            value={this.state.confirmPassword}
            onChange={this.handleUserInput}  />
        </div>
        
        
        <button type="submit" className="submitBtn" disabled={!this.state.formValid}>Register</button>
      </form>
      </div>
    )
  }
}

export default Form;
