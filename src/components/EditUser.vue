<template>
<v-app>
      <v-content>
        <v-container>
            <v-row>
    <v-card class="col-12">
    <v-card-title>Editar usuario</v-card-title>
    <v-card-text>
        <v-form v-on:submit.prevent="editarUser" ref="form" lazy-validation>
            <v-row>
                <v-col cols="6">
                    <v-text-field id="t1" v-model="editUser.cedula"  label="Cedula" required></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field id="t1" v-model="editUser.nombre" label="Nombre" required></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field id="t1" v-model="editUser.apellidos" label="Apellidos" required></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field id="t1" v-model="editUser.edad" label="Edad" required></v-text-field>
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
            editUser:{}
        }
    },
    methods: {
        editarUser(){
        this.$http.put('http://localhost:3000/users/' + this.editUser._id,{
            cedula: this.editUser.cedula,
            nombre: this.editUser.nombre,
            apellidos: this.editUser.apellidos,
            edad: this.editUser.edad,
        } , {
            headers: {
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept ',
                "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE" ,
                "Access-Control-Max-Age": 3600 
            }
        })
        .then(response => (response.data))
        .catch(error => console.log(error));
        }
    },
    created() {
        this.editUser = this.$route.params;
    }
}
</script>

<style>

</style>