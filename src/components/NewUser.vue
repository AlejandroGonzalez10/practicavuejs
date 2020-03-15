<template>
<v-app>
      <v-content>
        <v-container>
            <v-row>
    <v-card class="col-12">
    <v-card-title>Registrar me</v-card-title>
    <v-card-text>
        <v-form v-on:submit.prevent="addUser" ref="form" lazy-validation>
            <v-row>
                <v-col cols="6">
                    <v-text-field id="t1" v-model="newUser.cedula"  label="Cedula" required></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field id="t1" v-model="newUser.nombre" label="Nombre" required></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field id="t1" v-model="newUser.apellidos" label="Apellidos" required></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field id="t1" v-model="newUser.edad" label="Edad" required></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field id="t1" v-model="newUser.password" label="Contraseña" type="password" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-btn color="info" type="submit">Guardar</v-btn>
                <!-- <v-btn color="info" type="submit"><router-link :to="{name: 'HelloWorld'}" tag="button">Guardar</router-link></v-btn> -->
                <!-- <router-link :to="{name: 'HelloWorld'}">
                    <v-btn color="info" type="submit">Guardar</v-btn>
                </router-link> -->
            </v-row>
        </v-form>
    </v-card-text>
    </v-card>
  </v-row>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
export default {
    data(){
        return{
            newUser:{}
        }
    },
    methods: {
        addUser(){
        this.$http.post('http://localhost:3000/users/post',{
            cedula: this.newUser.cedula,
            nombre: this.newUser.nombre,
            apellidos: this.newUser.apellidos,
            edad: this.newUser.edad,
            password: this.newUser.password
        } , {
            headers: {
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept ',
                "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE" ,
                "Access-Control-Max-Age": 3600 
            }
        })
        .then(response => {
            //this.newUser = {}
            router.push({name: 'Login'});
        })
        .catch(error => console.log(error));
        }
    }
}
</script>

<style>

</style>