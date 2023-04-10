// import { UserRole } from "./../../shared/enums/UserRole";
// import { HTTP } from "./../../../api/http-common";
// import DonatorEntity from "../models/DonatorEntity";
// import { DonatorDetailDTO } from "../dtos/DonatorDetailDTO";

// export function createDonator(place) {
//   return HTTP.post("/place", {
//     nome: donator.name,
//     email: donator.email,
//     senha: donator.password
//   })
//     .then(() => {
//       return Promise.resolve();
//     })
//     .catch(({ response }) => {
//       if (!response) {
//         return Promise.reject("Erro Inesperado");
//       }
//       const data = response.data;
//       return Promise.reject((data && data.informacao) || "Erro Inesperado");
//     });
// }
