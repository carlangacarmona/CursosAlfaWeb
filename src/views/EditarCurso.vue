<!-- Formulario de edición de curso -->
<template>
  <v-container>
    <h1 class="text-h3 text-center mb-6">Editar Curso</h1>
    <v-form @submit.prevent="guardarCambios">
      <v-text-field
        v-model="curso.nombre"
        label="Nombre"
        required
      ></v-text-field>

      <v-text-field
        v-model="curso.img"
        label="URL de la imagen"
        required
      ></v-text-field>

      <v-text-field
        v-model.number="curso.cupos"
        label="Cupos del curso"
        type="number"
        required
      ></v-text-field>

      <v-text-field
        v-model.number="curso.inscritos"
        label="Inscritos en el curso"
        type="number"
        required
      ></v-text-field>

      <v-text-field
        v-model="curso.duracion"
        label="Duración del curso"
        required
      ></v-text-field>

      <v-text-field
        v-model.number="curso.costo"
        label="Costo del curso"
        type="number"
        required
      ></v-text-field>

      <v-textarea
        v-model="curso.descripcion"
        label="Descripción"
        required
      ></v-textarea>

      <v-switch
        v-model="curso.completado"
        label="Terminado"
      ></v-switch>

      <div class="d-flex gap-2">
        <v-btn color="success" type="submit">Guardar</v-btn>
        <v-btn color="error" @click="volver">Cancelar</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'EditarCurso',
  data() {
    return {
      curso: {
        nombre: '',
        img: '',
        cupos: 0,
        inscritos: 0,
        duracion: '',
        costo: 0,
        descripcion: '',
        completado: false
      }
    }
  },
  created() {
    const cursoId = parseInt(this.$route.params.id)
    const cursoEncontrado = this.$store.state.cursos.find(c => c.id === cursoId)
    if (cursoEncontrado) {
      this.curso = { ...cursoEncontrado }
    }
  },
  methods: {
    guardarCambios() {
      if (this.curso.inscritos > this.curso.cupos) {
        alert('La cantidad de inscritos no puede ser mayor que los cupos disponibles')
        return
      }

      if (this.curso.completado) {
        this.curso.inscritos = 0
      }

      this.$store.commit('actualizarCurso', this.curso)
      this.volver()
    },
    volver() {
      this.$router.push('/administracion')
    }
  }
}
</script>