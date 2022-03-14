import axios from "./axios";

export const getPointVente = () =>
  new Promise((res, rej) => {
    axios
      .get("pt_de_vente/read.php")
      .then((data) => res(data.data))
      .catch((err) => rej(err));
  });
