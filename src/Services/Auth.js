import Api from "@/Services/Api";

class Auth {
  static login(userCredentials) {
    return new Promise((res, rej) => {
      console.log("auth login", userCredentials);
      // if (!userCredentials.email) {
      //   console.error("Pas d'email");
      //   return rej();
      // }
      // if (!userCredentials.password) {
      //   console.error("Pas de mot de passe");
      //   return rej();
      // }
      Api.post("/auth/login", userCredentials).then(res).catch(rej);
    });
  }

  static register(userCredentials) {
    return Api.post("/auth/register", userCredentials);
  }
}

export default Auth;
