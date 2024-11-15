import apiClient from "@/utils/api-client"
import { loginSchema, LoginSchema } from "@/utils/schema/login.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function LoginPage() {

  const { register, handleSubmit, } = useForm<LoginSchema>({
    defaultValues: {
      emailOrUsername: '',
      password: ''
    },
    resolver:zodResolver(loginSchema)
  })

  const onSubmit = handleSubmit(async(data) => {
    try {
    const feedback =await apiClient.post('/auth/login', data)
    console.log(( feedback).data);
    
    } catch (error) {
      console.error(error)
    }

})
  return (
    <div>
      {/* mail field and password */}
      <form onSubmit={onSubmit}>
        <input type="text" {...register('emailOrUsername')} />
        <input type="password" {...register('password')} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
