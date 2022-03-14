import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getPointVente } from "../../services/PointVente";
import * as classes from "./Login.module.css";
import { GoogleOutlined, UserOutlined } from '@ant-design/icons'
import { GoogleLogin } from 'react-google-login';


const Login = ({ setIdentified, EvaluationData, setEvaluationData }) => {
  let history = useHistory();
  const [login, setlogin] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIdentified(true);

    setEvaluationData({
      ...EvaluationData,
      login: login,
    });
  };

  const responseGoogle = (response) => {
    console.log(response);
    setIdentified(true);
    setEvaluationData({
      ...EvaluationData,
      login: response.profileObj.email,
    });
  }

  useEffect(() => {
    history.push("/steps");
    login && setIdentified(null);
  }, []);

  return (
    <div className={classes.space} align="center">
      <UserOutlined className={classes.logo} />
      <h5 className={classes.description}>Identifier-Vous</h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          autoFocus
          // disabled={login ? true : false}
          placeholder="Email or N° Tél"
          type="text"
          className={classes.loginInput}
          value={login}
          onChange={(e) => setlogin(e.target.value)}
        />
      </form>
      <h4 className={classes.description}>Ou</h4>
      <GoogleLogin
        clientId="838820427014-vot40gof7htmf8ceo5il1db0ps67up40.apps.googleusercontent.com"
        buttonText="Login"
        icon={<GoogleOutlined />}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />

    </div>
  );
};

export default Login;
/* <Link
        to="#0"
        className="button button-primary button-wide-mobile button-sm"
        style={{
          width: "80%",
          borderRadius: "5px",
          height: "45px",
          fontSize: "1em",
          padding: "10px",
        }}
      >
        Envoyer
      </Link> */
