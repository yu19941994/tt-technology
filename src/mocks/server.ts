import { delay, http, HttpResponse, type ResponseResolver } from 'msw'
import { setupWorker } from 'msw/browser'

const mockAuthToken = 'mock-auth-token'
const otpVerifyResolver: ResponseResolver<Record<string, unknown>, {
  code: string
}, { valid: boolean, token?: string }> = async ( { request } ) => {
  const body = await request.json()
  await delay(3000)
  if (body.code === '1359') {
    return HttpResponse.json({ valid: true, token: mockAuthToken })
  }
  return HttpResponse.json({ valid: false })
}

interface UserInfo {
  username: string
  quote: string
  photo: string
}

type AuthResponse = UserInfo | { message: string }
const authResolver: ResponseResolver<Record<string, unknown>, Record<string, any>, AuthResponse> = async ( { request } ) => {
  await delay(500)
  const authorization = request.headers.get('Authorization')
  if (authorization && authorization === mockAuthToken) {
    return HttpResponse.json({
      username: 'Homer Simpson',
      quote: "I believe the children are the future... Unless we stop them now!",
      photo: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939"
    })
  }
  return HttpResponse.json({
    message: 'not authorized'
  })
}
const handlers = [
  http.post('/api/verify', otpVerifyResolver),
  http.get('/api/auth', authResolver)
]

export default setupWorker(...handlers)
