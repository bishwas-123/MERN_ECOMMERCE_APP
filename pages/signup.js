import React from 'react';
import {Button,Form,Icon,Message,Segment} from 'semantic-ui-react';
import Link from 'next/link';
import CatchErrors from '../utils/catchErrors';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import {handleLogin} from '../utils/auth';
const INITIAL_USER={
  name:'',
  email:'',
  phone:'',
  password:''

}
function signup(){
  const [user,setUser]=React.useState(INITIAL_USER);
  const[disabled,setDisabled]=React.useState(true);
  const[loading,setLoading]=React.useState(false);
  const[error,setError]=React.useState('');
  const[success,setSuccess]=React.useState(false);
  React.useEffect(()=>{
    const isUser=Object.values(user).every(el=>Boolean(el));
    isUser?setDisabled(false):setDisabled(true);
  },[user]);
  function handleChange(event){
    const {name,value}=event.target
    setUser(prevState=>({...prevState,[name]:value}))

  }
  async function handleSubmit(event){
    try{
      event.preventDefault();
      setError('');
      setLoading(true);
      const payload={...user};
      const url=`${baseUrl}/api/signup`;
      await axios.post(url,payload);
      setSuccess(true);

    }
    catch(error){
      CatchErrors(error,setError);

    }
    finally{
      setLoading(false);

    }


  }
    return<>
        <Message
        attached
        icon="settings"
        header="Get Started!"
        content="Create a new account"
        color="teal"
      />
      <Form error={Boolean(error)} success={success} loading={loading} onSubmit={handleSubmit}>
        <Message error header="Oops!" content={error} />
        <Message
          success
          icon="check"
          header="Success!"
          content="signup successfully !"
        />
        <Segment>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
           fluid
           icon="phone"
           iconPosition="left"
           label="Phone"
           placeholder="Phone"
           name="phone"
           type="phone"
           value={user.phone}
           onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button
            disabled={disabled || loading}
            icon="signup"
            type="submit"
            color="orange"
            content="Signup"
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Existing user?{" "}
        <Link href="/login">
          <a>Log in here</a>
        </Link>{" "}
        instead.
      </Message>
    </>
}
export default signup;