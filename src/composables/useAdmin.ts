import { LocalStorage } from 'quasar'
import { me } from 'src/services/auth'
import { useRouter } from 'vue-router'


export const useAdmin = () => {
  const router = useRouter()

  const checkAuth = async () => {
    const token = LocalStorage.getItem('token')

    if (token === null) {
      return false
    }

    try {
      await me()
    } catch (error) {
      LocalStorage.clear()
      router.push('/auth/login')
    }

    return token
  }

  return {
    checkAuth,
  }
}