<template>
<div>
<v-app id ="app">
  <v-container>
  <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Cedula</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Apellidos</th>
            <th class="text-left">Edad</th>
            <th class="text-left">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.nombre">
            <td>{{ user.cedula }}</td>
            <td>{{ user.nombre }}</td>
            <td>{{ user.apellidos }}</td>
            <td>{{ user.edad }}</td>
            <td>
              
                <router-link :to="{ name: 'EditUser', params: user, query: { debug: true }}">
                  <v-icon class="mr-2" >edit
                  </v-icon>
                </router-link>
              
              <v-icon @click="showDialogDeleteUser(user)">delete</v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-layout>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Usuario?</v-card-title>
            <v-card-text>Desea eliminar el Usuario {{ userDelete.nombre }} ?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
              <v-btn color="green darken-1" text @click="deleteUser(userDelete)">Aceptar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-layout>
  </v-container>
</v-app>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      users:[],
      newUser: {},
      dialog: false,
      userDelete: {}
    }
  },
  methods: {
    getData(){
      this.$http.get('http://localhost:3000/users',{
        // headers: {
        //     "Access-Control-Allow-Origin": '*',
        //     "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept ',
        //     "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE" ,
        //     "Access-Control-Max-Age": 3600 
        // }
      })
      .then(response => (this.users = response.data.data))
      .catch(error => console.log(error));
    },
    showDialogDeleteUser(user){
      console.log(user);
      this.userDelete = user;
      this.dialog = true;
    },
    deleteUser(user){
      this.dialog = false;
      console.log(user);
      var id = user._id;
      this.$http.delete('http://localhost:3000/users/' + id, {
        headers: {
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept ',
            "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE" ,
            "Access-Control-Max-Age": 3600 
        }
      })
      .then(response => {
        console.log(response.data);
        console.log(user);
        if (response.data.success){
          for(var i = 0; i < this.users.length; i++){
            if (this.users[i]._id === user._id) 
              this.users.splice(i, 1);
          }
        }
      })
      .catch(error => console.log(error));
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
