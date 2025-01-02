<!-- Plantilla del Home y Cards del sitio -->
<template>
  <v-container>
    <h1 class="text-h3 text-center mb-6">Lista de Cursos</h1>
    <v-row>
      <v-col v-for="curso in cursos" :key="curso.id" cols="12" md="4">
        <v-card class="mx-auto" max-width="400">
          <v-img :src="curso.img" height="200px"></v-img>
          <v-card-title>{{ curso.nombre }}</v-card-title>
          <v-card-text>
            <div class="mb-2">
              <v-icon>mdi-currency-usd</v-icon>
              Costo: {{ curso.costo }}
            </div>
            <div class="mb-2">
              <v-icon>mdi-clock-outline</v-icon>
              Duración: {{ curso.duracion }}
            </div>
            <div class="mb-2">
              <v-icon>mdi-account-group</v-icon>
              Cupos: {{ curso.cupos }}
            </div>
            <div class="mb-2">
              <v-icon>mdi-calendar</v-icon>
              Fecha: {{ curso.fecha_registro }}
            </div>
            <p>{{ curso.descripcion }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['cursos'])
  }
}
</script>