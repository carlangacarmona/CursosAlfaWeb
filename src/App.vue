<!-- Plantilla General -->
<template>
  <v-app>
    <v-app-bar color="purple darken-1" dark>
      <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" icon="mdi-home" text></v-btn>
      <v-btn to="/administracion" icon="mdi-cog" text></v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>