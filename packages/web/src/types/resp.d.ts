import type { ResponseObject } from "./utils"

interface CreateAccountResponseDataType{
  id: number
  name: string
  email: string
}

export type CreateAccountResponseType = ResponseObject<CreateAccountResponseDataType>
