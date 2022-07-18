import React, {Component} from 'react';
import { Form, Button, FormGroup, Label, Input, Col, FormFeedback} from 'reactstrap';
import { TableComponent } from './TableComponent';


class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isSubmitted: false,
            touched: {
                email: false,
                password: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }
    handleSubmit(event) {
        let result = JSON.parse(JSON.stringify(this.state));
        //console.log("Current State is: "+ JSON.stringify(this.state));
        //alert("Current State is: "+ JSON.stringify(this.state));
        if(result.email !== '' && result.password !== '') {
            this.setState({isSubmitted: true})
        }
        event.preventDefault();
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        })
    }
    validate(email, password) {
        const errors = {
            email: '',
            password: ''
        }
       
        if(this.state.touched.password && password.length <= 8) {
            errors.password = 'Password should contain <=8 characters';
        }
        if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
           errors.email = 'Email should contain a @';
        return errors;
    }
    render() {
        const errors = this.validate(this.state.email, this.state.password);
        return(
            <div className="container" style={{backgroundImage: "url(images/app_bg.png)"}} >
                <div className='row row-content'>
                    <div className='col-12'>
                        <h3 style={{textAlign: 'center'}}>Login Page</h3>
                    </div>
                    <div className='col-12 col-md-9'>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} 
                                    valid={errors.email === ''}
                                    invalid={errors.email !== ''}
                                    onBlur={this.handleBlur('email')}/>
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="password" md={2}>Password</Label>
                                <Col md={10}>
                                    <Input type="password" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} valid={errors.password === ''} 
                                    invalid={errors.password !== ''}
                                    onBlur={this.handleBlur('password')}/>
                                    <FormFeedback>{errors.password}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary" >Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        {this.state.isSubmitted && <TableComponent/>}
                    </div>
                </div>
            </div>
        );
    }
    
}

export default LoginPage;