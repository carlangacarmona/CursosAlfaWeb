import { createStore } from 'vuex'

export default createStore({
  state: {
    cursos: [
      { 
        id: 1, 
        img: 'https://i.blogs.es/545cf8/es6-logo/450_1000.png',
        nombre: 'JavaScript Avanzado',
        costo: 30000,
        duracion: '2 meses',
        cupos: 20,
        inscritos: 10,
        completado: false,
        fecha_registro: '06/03/2022',
        descripcion: 'Curso con las nuevas actualizaciones de JavaScript.'
      },
      {
        id: 2,
        img: 'https://lineadecodigo.com/wp-content/uploads/2014/04/css.png',
        nombre: 'CSS para principiantes',
        costo: 10000,
        duracion: '1 mes',
        cupos: 35,
        inscritos: 23,
        completado: false,
        fecha_registro: '05/03/2022',
        descripcion: 'Aprendiendo estilos con CSS desde el nivel más básico.'
      },
      { 
        id: 3, 
        img: 'https://1000marcas.net/wp-content/uploads/2020/11/JavaScript-logo-768x480.png', 
        nombre: 'JavaScript Básico de 0 a 100', 
        costo: 20000, 
        duracion: '2 meses', 
        cupos: 25,
        inscritos: 0, 
        completado: true, 
        fecha_registro: '05/03/2022',
        descripcion: 'Programando para la web con JavaScript.' 
      },
      { 
        id: 4, 
        img: 'https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png', 
        nombre: 'HTML Básico', 
        costo: 10000, 
        duracion: '1 mes', 
        cupos: 35, 
        inscritos: 0, 
        completado: true, 
        fecha_registro: '31/01/2022', 
        descripcion: 'Aprende HTML 5 y crea tus primeras páginas web paso a paso con decenas de ejercicios.' 
      },
      { id: 5, 
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGgyp0cGPFS4V3HEtHeE2hO0udk6QbTA5Kcg&s', 
        nombre: 'Vue JS de 0 a 100', 
        costo: 85500, 
        duracion: '5 meses', 
        cupos: 35, 
        inscritos: 35, 
        completado: false, 
        fecha_registro: '06/03/2022', 
        descripcion: 'Aprende desde cero como usar VueJS, cómo usarlo en aplicaciones pequeñas y ver lo que ofrece el framework.' 
      },
      { id: 6, 
        img: 'https://miro.medium.com/max/512/1*9U1toerFxB8aiFRreLxEUQ.png',
        nombre: 'Estilos con SASS', 
        costo: 45000, 
        duracion: '1 mes', 
        cupos: 40,
        inscritos: 35, 
        completado: false, 
        fecha_registro: '06/03/2022',
        descripcion: 'Con SASS aprenderás a escribir mejor código de CSS con todas las funciones necesarias.' },
      // ... (resto de los cursos)
    ]
  },
  getters: {
    totalAlumnos: state => {
      return state.cursos.reduce((total, curso) => total + curso.cupos, 0)
    },
    totalInscritos: state => {
      return state.cursos.reduce((total, curso) => total + curso.inscritos, 0)
    },
    cuposRestantes: (state, getters) => {
      return getters.totalAlumnos - getters.totalInscritos
    },
    cursosTerminados: state => {
      return state.cursos.filter(curso => curso.completado).length
    },
    cursosActivos: state => {
      return state.cursos.filter(curso => !curso.completado).length
    },
    totalCursos: state => {
      return state.cursos.length
    }
  },
  mutations: {
    agregarCurso(state, curso) {
      state.cursos.push(curso)
    },
    eliminarCurso(state, id) {
      state.cursos = state.cursos.filter(curso => curso.id !== id)
    },
    actualizarCurso(state, cursoActualizado) {
      const index = state.cursos.findIndex(curso => curso.id === cursoActualizado.id)
      if (index !== -1) {
        state.cursos[index] = cursoActualizado
      }
    }
  }
})