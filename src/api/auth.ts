/**
 * Copyright © 2019 contains code contributed by Orange SA, authors: Denis Barbaron - Licensed under the Apache license 2.0
 **/

import jwtutil from '../util/jwtutil'
import urlutil from '../util/urlutil'

export function saveUserAfterLogin() {
    return fetch(`${process.env.REACT_APP_API_URI}/api/v1/user`, { method: 'POST'}).then(data => data.json())
}

export function loadUser(email: string) {
    return fetch(`${process.env.REACT_APP_API_URI}/api/v1/user`, { method: 'GET', headers: {
        'Content-Type': 'application/json'
    }, body: JSON.stringify({email})}).then(data => data.json())
}

export type LoginUserDataPayload = {
    name: string
    email: string
    directUrl?: string
}
export function loginUser(payload: LoginUserDataPayload) {
    return fetch(`${process.env.REACT_APP_API_URI}/auth/api/v1/mock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
}