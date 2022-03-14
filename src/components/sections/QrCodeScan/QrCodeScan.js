import React, { useEffect, useState } from "react";
//icons
import { QrcodeOutlined } from "@ant-design/icons/lib/icons";
import { QrReader } from 'react-qr-reader';
import * as classes from "./QrCodeScan.module.css";
import { Input } from "antd";
import { useHistory } from "react-router-dom";
const QrCodeScan = ({ setLocalisation, EvaluationData, setEvaluationData }) => {
  const [qrCodeScanner, setqrCodeScanner] = useState(null);

  let history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(qrCodeScanner);
    setLocalisation(true);

    setEvaluationData({
      ...EvaluationData,
      ptVenteID: qrCodeScanner,
    });
    history.push("/steps/" + qrCodeScanner);
  };
  useEffect(() => {
    qrCodeScanner && setLocalisation(null);
  }, []);
  return (
    <div align="center" className={classes.qrCodeScannerContainer}>
      <QrcodeOutlined className={classes.qrCodeScanner} />
      <h5 className={classes.description} style={{ margin: 0 }} >Scanner QR Code </h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          autoFocus
          placeholder="Tpaez le code de Gourmandise"
          type="password"
          className={classes.qrcodeScannerInput}
          value={qrCodeScanner}
          onChange={(e) => setqrCodeScanner(e.target.value)}
        />
        <div style={{ width: '200px', height: "200px" }} >
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setqrCodeScanner(result?.text);
              }
              if (!!error) {
                console.info(error);
              }
            }}
          />
        </div>
      </form>
    </div>
  );
};
export default QrCodeScan;
