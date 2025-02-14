import Swal from 'sweetalert2'
export function useNotification() {
  const $swal = Swal
  const $_swal = Swal.mixin({
    animation: true,
  })

  return { $swal, $_swal }
}
