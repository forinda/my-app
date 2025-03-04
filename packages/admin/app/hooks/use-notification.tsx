import Swal from 'sweetalert2'
export  function useNotification() {
  const notify = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });
  return (
    {notify,
    swal: Swal}
  )
}
