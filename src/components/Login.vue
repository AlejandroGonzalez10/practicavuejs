<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="6"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                
              </v-toolbar>
              <!-- <v-form v-on:submit.prevent="loginUser" ref="form" lazy-validation> -->
              <v-card-text>
                <v-form>
                  <v-text-field label="Login" name="login" prepend-icon="person" type="text" v-model="login.usuario" />
                  <v-text-field id="password" label="Password" name="password" prepend-icon="lock" type="password" v-model="login.contrasena" />
                  {{ mensaje }}
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" type="button" @click="loginUser">Login</v-btn>&nbsp;&nbsp;&nbsp;
                <router-link to="/add">Registrar</router-link>
                <br>
                <facebook-login class="button"
                    appId="200225161090431"
                    @login="onLogin"
                    @logout="onLogout"
                    @get-initial-status="getUserData"
                    @sdk-loaded="sdkLoaded">
                  </facebook-login>
                  <!-- <div v-if="isConnected" class="information">
                    <h1>My Facebook Information</h1>
                    <div class="well">
                      <div class="list-item">
                        <img :src="picture">
                      </div>
                      <div class="list-item">
                        <i>{{name}}</i>
                      </div>
                      <div class="list-item">
                        <i>{{email}}</i>
                      </div>
                      <div class="list-item">
                        <i>{{personalID}}</i>
                      </div>
                      <div class="list-item">
                        <i>{{password}}</i>
                      </div>
                    </div>
                  </div> -->
              </v-card-actions>
              <!-- </v-form> -->
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import facebookLogin from 'facebook-login-vuejs';
  import router from '../router/index.js'

  export default {
    props: {
      source: String,
    },
    data() {
      return {
        isConnected: false,
        name: '',
        email: '',
        personalID: '',
        picture: '',
        FB: undefined,
        login: {},
        mensaje: ''
      }
    },
    components: {
      facebookLogin
    },
    methods: {
      getUserData() {
        if (!this.FB) return;
        var objG = this;
        this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
          user => {
            this.personalID = user.id;
            this.email = user.email;
            this.name = user.name;
            this.picture = user.picture.data.url;

            objG.$http.get('http://localhost:3000/login/token', {
              headers: {
                  "Access-Control-Allow-Origin": '*',
                  "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept ',
                  "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE" ,
                  "Access-Control-Max-Age": 3600 
              }
            })
            .then(response => {
              if(response.data.token){
                router.push({name: 'HelloWorld'});
              }
              else{
                this.mensaje = response.data.mensaje;
              }
            })
            .catch(error => console.log(error));
          }
        )
      },
      sdkLoaded(payload) {
        this.isConnected = payload.isConnected
        this.FB = payload.FB
        if (this.isConnected) this.getUserData()
      },
      onLogin() {
        this.isConnected = true
        this.getUserData()
      },
      onLogout() {
        this.isConnected = false;
      },
      loginUser(){
        this.$http.post('http://localhost:3000/login/autenticar', this.login, {
            headers: {
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept ',
                "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE" ,
                "Access-Control-Max-Age": 3600 
            }
        })
        .then(response => {
          if(response.data.token){
            router.push({name: 'HelloWorld'});
          }
          else{
            this.mensaje = response.data.mensaje;
          }
        }
        )
        .catch(error => console.log(error));
      }
    }
  }
</script>
<style>
  /* #app {
    display: flex;
    flex-direction: column;
    align-items: flex-start
  }
  .information {
    margin-top: 100px;
    margin: auto;
    display: flex;
    flex-direction: column;
  }
  .well {
    background-color: rgb(191, 238, 229);
    margin: auto;
    padding: 50px 50px;
    ;
    border-radius: 20px;
  }
  .login {
    width: 200px;
    margin: auto;
  }
  .list-item:first-child {
    margin: 0;
  }
  .list-item {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .button {
    margin: auto;
  } */
</style>