import { ref } from 'vue'
import { toast } from 'vue-sonner'

// export async function usefetch(url, options) {
//   const apiUrl = import.meta.env.VITE_API_URL

//   const data = ref(null)
//   const error = ref(null)

//   options.credentials = options.credentials || 'include'

//   try {
//     data.value = await fetch(`${apiUrl}${url}`, options).then((res) => res.json())
//   } catch (err) {
//     error.value = err
//     console.log(err)
//     // toast.error(`Error: ${err}`)
//   }

//   return data
// }

export async function usefetch(url, options = {}) {
  const apiUrl = import.meta.env.VITE_API_URL
  const data = ref(null)
  const error = ref(null)

  // Asegúrate de que options.credentials esté configurado
  options.credentials = options.credentials || 'include'

  try {
    const response = await fetch(`${apiUrl}${url}`, options)

    // Verificar si la respuesta es exitosa
    data.value = await response.json()

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (err) {
    error.value = err
    console.error(err)
    toast.error(`Error: ${err.message}`)
  }

  return data
}

/*const fetchData = (url, options = {}) => {
  const data = ref(null)
  const response = ref(null)
  const error = ref(null)

  const fetch = async () => {
    try {
      const result = fetch(url, options)
        .then((response.value = result))
        .then((data.value = result.data))
    } catch (ex) {
      error.value = ex
    }
  }

  fetch()
  return { response, error, data }
}*/

export default usefetch
