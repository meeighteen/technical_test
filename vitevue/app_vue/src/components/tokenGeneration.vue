<template>
  <h5>Generacion de token API</h5>
  <form @submit.prevent="handleLogin">
    <div>
      <label for="username">Username:</label>
      <input type="text" v-model="username" id="username" />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" v-model="password" id="password" />
    </div>
    <button type="submit">Generar</button>
  </form>
  <span>
    <div v-if="data">{{ data }}</div>
    <div v-if="error" class="error">{{ error }}</div>
  </span>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      data: "",
      error: "",
    };
  },
  props: {
    apiBaseURL: {
      type: String,
      required: true,
    },
  },
  emits: ["loginSuccess"],
  methods: {
    async handleLogin() {
      try {
        this.data = null;
        this.error = null;

        const url = `${this.apiBaseURL}/api/login`;

        const response = await axios.post(url, {
          username: this.username,
          password: this.password,
        });

        if (response.data && response.data.token) {
          this.data = `Token generado: ${response.data.token} | duracion: 1h`;
          this.username = null;
          this.password = null;

          this.$emit("login-success");
        } else {
          this.error = "No se recibió un token válido.";
        }
      } catch (err) {
        this.error = "Error al intentar generar el token. Intenta nuevamente.";
        console.error(err);
      }
    },
  },
};
</script>
