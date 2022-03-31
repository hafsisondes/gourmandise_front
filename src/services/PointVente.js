import axios from "./axios";

export const getPointVente = () =>
  new Promise((res, rej) => {
    axios
      .get("pt_de_vente/read.php")
      .then((data) => res(data.data))
      .catch((err) => rej(err));
  });

export const getQuestion = () =>
  new Promise((res, rej) => {
    axios
      .get("question/read_qts.php")
      .then((data) => res(data.data))
      .catch((err) => rej(err));
  });



  // useEffect(() => {
  //   const request = async () => {
  //     const data = await getPointVente();
  //     setPointVente(data);
  //   };

  //   request();
  // }, []);