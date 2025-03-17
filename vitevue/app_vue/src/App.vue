<template>
  <div>
    <h1>Reto Tecnico Interseguro</h1>
    <!-- <div v-if="data"> {{ data }} </div>
    <div v-if="error" class="error">{{ error }}</div> -->
    <h4>API RESTFUL GOLANG</h4>
    <p>
      Documentacion:<a :href="`${apiGoBaseURL}/swagger`" target="_blank"
        >Swagger</a
      >
    </p>
    <div v-if="authenticatedApiGo"></div>
  </div>
  <div>
    <h4>API RESTFUL NODE</h4>
    <p>
      Documentacion:<a :href="`${apiNodeBaseURL}/api-docs`" target="_blank"
        >Swagger</a
      >
    </p>
    <div v-if="authenticatedApiNode"></div>
  </div>
</template>

<script>
import axios from "axios";
import { goApiClient } from "./services/api/apiClient";
import tokenGeneration from "./components/tokenGeneration.vue";

export default {
  data() {
    return {
      data: null,
      error: null,
      apiGoBaseURL: import.meta.env.VITE_GO_API_URL,
      apiNodeBaseURL: import.meta.env.VITE_NODE_API_URL,
      usernameApiGo: import.meta.env.VITE_GO_API_USERNAME,
      passwordApiGo: import.meta.env.VITE_GO_API_PASSWORD,
      usernameApiNode: import.meta.env.VITE_NODE_API_USERNAME,
      passwordApiNode: import.meta.env.VITE_NODE_API_PASSWORD,
      authenticatedApiGo: false,
      authenticatedApiNode: false,
    };
  },
  mounted() {
    this.authApiGo();
    this.authApiNode();
  },
  methods: {
    async authApiGo() {
      try {
        const response = await axios.post(`${this.apiGoBaseURL}/api/login`, {
          username: this.usernameApiGo,
          password: this.passwordApiGo,
        });

        if (response.data && response.data.token) {
          this.authenticatedApiGo = true;
          this.data = `Token generado: ${response.data.token}`;
        } else {
          this.error = "No se recibió un token válido.";
        }
      } catch (error) {
        this.error = "Error al intentar autenticar. Intenta nuevamente.";
        console.error(error);
      }
    },
    async authApiNode() {
      try {
        const response = await axios.post(
          `${this.apiNodeBaseURL}/api/public/token`,
          {
            username: this.usernameApiNode,
            password: this.passwordApiNode,
          }
        );

        if (response.data && response.data.token) {
          this.authenticatedApiGo = true;
          this.data = `Token generado: ${response.data.token}`;
        } else {
          this.error = "No se recibió un token válido.";
        }
      } catch (error) {
        this.error = "Error al intentar autenticar. Intenta nuevamente.";
        console.error(error);
      }
    },
  },
  components: {
    tokenGeneration,
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
