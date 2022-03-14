import React, { useEffect, useState } from "react";
import QrCodeScan from "../../components/sections/QrCodeScan/QrCodeScan";
import MultiStep from "react-multistep";
import Login from "../Login/Login";
import logo from "../../assets/images/gourmandise.png";

import * as classes from "./Steps.module.css";
import Evaluation from "../../components/sections/Evaluation/Evaluation";
import { Col, Row, Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons/lib/icons";
const Steps = () => {
  const btnNextStyles = {
    color: "#bf9a62",
    backgroundColor: "#0000000a",
    borderRadius: "5px",
    height: "45px",
    fontSize: "0.8em",
    padding: "10px",
    border: "none",
    float: "right",
    marginTop: "10px",
    width: "20%",
  };

  const btnPrevStyles = {
    color: "#bf9a62",
    backgroundColor: "#0000000a",
    borderRadius: "5px",
    height: "45px",
    fontSize: "0.8em",
    border: "none",
    padding: "10px",
    float: "left",
    marginTop: "10px",
    width: "20%",
  };
  const [currentStep, setCurrentStep] = useState(0);
  const [identified, setIdentified] = useState(null);
  const [localisation, setLocalisation] = useState(null);
  const [evalution, setEvalution] = useState(false);

  const [EvaluationData, setEvaluationData] = useState({});

  const [steps, setSteps] = useState([
    {
      name: "Identifiez Vous 1",
      component: (
        <Login
          EvaluationData={EvaluationData}
          setEvaluationData={setEvaluationData}
          setIdentified={setIdentified}
        />
      ),
    },
  ]);

  useEffect(() => {
    identified === true &&
      setSteps([
        ...steps,
        {
          name: "Trouvez votre Gourmandise",
          component: (
            <QrCodeScan
              EvaluationData={EvaluationData}
              setEvaluationData={setEvaluationData}
              identified={identified}
              setLocalisation={setLocalisation}
            />
          ),
        },
      ]);
    setCurrentStep(1);
  }, [identified]);

  useEffect(() => {
    localisation === true &&
      setSteps([
        ...steps,

        {
          name: "Evaluez",
          component: (
            <Evaluation
              EvaluationData={EvaluationData}
              setEvaluationData={setEvaluationData}
              setEvalution={setEvalution}
            />
          ),
        },
      ]);
    setCurrentStep(2);
  }, [localisation]);

  return (
    <Row className={classes.stepsContainer} align={"center"}>
      <Col xs={{ span: 20 }} md={{ span: 16 }}>
        <img className={classes.appLogo} src={logo}></img>
        <br />
        <br />
        {!evalution ? (
          <MultiStep
            activeStep={currentStep}
            prevStyle={btnPrevStyles}
            nextStyle={btnNextStyles}
            showNavigation={identified ? true : false}
            steps={steps}
          ></MultiStep>
        ) : (
          <Result
            icon={<SmileOutlined style={{ color: "#bf9a62b5" }} />}
            title="Great, we have done all the operations!"
            extra={
              <Button
                style={{ color: "#bf9a62" }}
                onClick={() => window.open("https://www.gourmandise.com.tn/")}
              >
                Visitez le site
              </Button>
            }
          />
        )}
      </Col>
      <br />
      <br />
    </Row>
  );
};
export default Steps;

// activeStep;
// showNavigation;
