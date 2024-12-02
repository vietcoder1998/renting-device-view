/**
 * Copyright © 2019 contains code contributed by Orange SA, authors: Denis Barbaron - Licensed under the Apache license 2.0
 **/

import { loadUser, saveUserAfterLogin } from '../api/auth';
import jwtutil from '../util/jwtutil';

export function decodeDataToken(redirectUrl: string, ip: string) {
    const jwt = new URLSearchParams(redirectUrl).get('jwt')
    const secret = new URLSearchParams(redirectUrl).get('secret')
    var data = jwtutil.decode(jwt, secret);

    if (jwt && data) {
      // Coming from auth client

        console.log("Decode token in here" + data.toString());


        // Redirect once to get rid of the token
        saveUserAfterLogin()
          .then(function (responseData: unknown) {
            console.log("Save it success", ip)
          })
          .catch((error) => {
            console.log("Error update that" + error.toString())
          });
    
    } 
    
    if (data.email) {
        loadUser(data.email)
        .then(function (user) {
          if (user) {
            console.log('user')
          }})

    } 
};
