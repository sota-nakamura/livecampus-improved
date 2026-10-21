<template>
  <h1>Login</h1>
  <input type="text" placeholder="Username" v-model="account" />
  <input type="password" placeholder="Password" v-model="password" />
  <button @click="login">Login</button>
  {{ userName }}
</template>
<script setup>
import { ref } from 'vue';

const account = ref("");
const password = ref("");
const userName = ref("");

const getCSRF = async () => {
  const response = await fetch("/lcu-web/csrf", {
    credentials: "include"
  })
  if(response.ok) {
    const token = await response.text()
    console.log(token)
    return token
  }
}
const getName = async () => {
  const response = await fetch("/lcu-web/SC_01002B00_00/userInformation", {
    credentials: "include"
  })
  if (response.ok) {
    const info = await response.json()
    console.log(info)
    return info.userName
  }
}
const login = async () => {
  const csrf = await getCSRF()

  const params = new URLSearchParams()
  params.append("account", account.value)
  params.append("password", password.value)
  params.append("_csrf", csrf)

  const response = await fetch("/lcu-web/webLogin", {
    method: "POST",
    credentials: "include",
    body: params
  })

  if (response.ok) {
    userName.value = await getName()
  }
}
</script>