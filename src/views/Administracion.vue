<template>
  <v-container>
    <h1 class="text-h3 text-center mb-6">Administración</h1>
    
    <!-- Botón Agregar Curso -->
    <div class="text-center mb-4">
      <v-btn color="primary" @click="mostrarModalAgregar = true">
        Agregar Curso
      </v-btn>
    </div>

    <!-- Tabla de Cursos -->
    <v-table>
      <thead>
        <tr>
          <th>Curso</th>
          <th>Cupos</th>
          <th>Inscritos</th>
          <th>Duración</th>
          <th>Costo</th>
          <th>Terminado</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="curso in cursos" :key="curso.id">
          <td>{{ curso.nombre }}</td>
          <td>{{ curso.cupos }}</td>
          <td>{{ curso.inscritos }}</td>
          <td>{{ curso.duracion }}</td>
          <td><span class="costo-badge">${{ curso.costo }}</span></td>
          <td>
            <span :class="curso.completado ? 'estado-si' : 'estado-no'">
              {{ curso.completado ? 'Sí' : 'No' }}
            </span>
          </td>
          <td><span class="fecha-badge">{{ curso.fecha_registro }}</span></td>
          <td>
            <v-btn icon="mdi-pencil" size="small" class="mr-2" color="warning" @click="editarCurso(curso.id)"></v-btn>
            <v-btn icon="mdi-delete" size="small" color="error" @click="confirmarEliminar(curso.id)"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Información Estadística -->
    <v-card class="mt-4 pa-4">
      <div class="d-flex flex-column gap-2">
        <div class="info-item">
          <v-icon color="primary">mdi-account-group</v-icon>
          Cantidad total de alumnos permitidos: {{ totalAlumnos }} alumnos
        </div>
        <div class="info-item">
          <v-icon color="info">mdi-account-check</v-icon>
          Cantidad total de alumnos inscritos: {{ totalInscritos }} alumnos
        </div>
        <div class="info-item">
          <v-icon color="success">mdi-account-multiple-plus</v-icon>
          Cantidad total de cupos restantes: {{ cuposRestantes }} alumnos
        </div>
        <div class="info-item">
          <v-icon color="error">mdi-check-circle</v-icon>
          Cantidad total de cursos terminados: {{ cursosTerminados }} cursos
        </div>
        <div class="info-item">
          <v-icon color="warning">mdi-clock-outline</v-icon>
          Cantidad total de cursos activos: {{ cursosActivos }} cursos
        </div>
        <div class="info-item">
          <v-icon>mdi-book-open-variant</v-icon>
          Cantidad total de cursos: {{ totalCursos }} cursos
        </div>
      </div>
    </v-card>

    <!-- Modal de Confirmación para Eliminar -->
    <v-dialog v-model="dialogoEliminar" max-width="400">
      <v-card>
        <v-card-title>Confirmar eliminación</v-card-title>
        <v-card-text>¿Está seguro que desea eliminar este curso?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="eliminarCurso">Eliminar</v-btn>
          <v-btn color="grey" @click="dialogoEliminar = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal para Agregar Curso -->
    <v-dialog v-model="mostrarModalAgregar" max-width="600">
      <v-card>
        <v-card-title>Agregar Curso</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="agregarCurso">
            <v-text-field v-model="nuevoCurso.nombre" label="Nombre" required></v-text-field>
            <v-text-field v-model="nuevoCurso.img" label="URL de la imagen" required></v-text-field>
            <v-text-field v-model.number="nuevoCurso.cupos" label="Cupos" type="number" required></v-text-field>
            <v-text-field v-model.number="nuevoCurso.inscritos" label="Inscritos" type="number" required></v-text-field>
            <v-text-field v-model="nuevoCurso.duracion" label="Duración" required></v-text-field>
            <v-text-field v-model.number="nuevoCurso.costo" label="Costo" type="number" required></v-text-field>
            <v-textarea v-model="nuevoCurso.descripcion" label="Descripción" required></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="agregarCurso">Agregar</v-btn>
          <v-btn color="warning" @click="limpiarFormulario">Limpiar</v-btn>
          <v-btn color="error" @click="mostrarModalAgregar = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Administracion',
  data() {
    return {
      dialogoEliminar: false,
      mostrarModalAgregar: false,
      cursoSeleccionado: null,
      nuevoCurso: {
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
  computed: {
    ...mapState(['cursos']),
    ...mapGetters([
      'totalAlumnos',
      'totalInscritos',
      'cuposRestantes',
      'cursosTerminados',
      'cursosActivos',
      'totalCursos'
    ])
  },
  methods: {
    editarCurso(id) {
      this.$router.push(`/editar/${id}`)
    },
    confirmarEliminar(id) {
      this.cursoSeleccionado = id
      this.dialogoEliminar = true
    },
    eliminarCurso() {
      this.$store.commit('eliminarCurso', this.cursoSeleccionado)
      this.dialogoEliminar = false
      this.cursoSeleccionado = null
    },
    agregarCurso() {
      if (this.nuevoCurso.inscritos > this.nuevoCurso.cupos) {
        alert('La cantidad de inscritos no puede ser mayor que los cupos disponibles')
        return
      }

      const curso = {
        ...this.nuevoCurso,
        id: Date.now(),
        fecha_registro: new Date().toLocaleDateString()
      }

      this.$store.commit('agregarCurso', curso)
      this.mostrarModalAgregar = false
      this.limpiarFormulario()
    },
    limpiarFormulario() {
      this.nuevoCurso = {
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
  }
}
</script>

<style scoped>
.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: #f5f5f5;
}

.costo-badge, .fecha-badge {
  background-color: #e8f5e9;
  padding: 4px 8px;
  border-radius: 4px;
}

.estado-no {
  background-color: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
}

.estado-si {
  background-color: #e3f2fd;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>