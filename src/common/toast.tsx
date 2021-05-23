import { toast, ToastOptions } from 'react-toastify'

export const toastTemplate = (props: { message: string; type: string }) => {
  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  switch (props.type) {
    case 'success':
      toast.success(props.message, options)
      break
    case 'error':
      toast.error(props.message, options)
      break

    default:
      break
  }
}

export const toastCaughtFailure = () =>
  toastTemplate({ message: 'Oh no 😭, pokemon failed to catch', type: 'error' })
export const toastCcaughtSuccess = () =>
  toastTemplate({
    message: 'Gotcha 😎, the pokemon will be register in the Pokédex',
    type: 'success',
  })
export const toastNicknameNotAvailable = () =>
  toastTemplate({ message: 'Sorry 😓, your pokemon nickname has been used', type: 'error' })
export const toastRegisterSuccess = () =>
  toastTemplate({ message: 'Mantap 😎, the pokemon on your Pokédex', type: 'success' })
