import { AuthResult } from "@/models/OkutepData"
import { PasswordResult } from "@/models/PortfolioData"

export async function postAuth(password: string): Promise<AuthResult> {
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password }),
  })
  return await res.json() as AuthResult
}

export async function postJudge(session: string): Promise<PasswordResult> {
  const res = await fetch('/api/judge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ session }),
  })
  return await res.json() as PasswordResult
}

export async function postEncrypt(password: string): Promise<AuthResult> {
  const res = await fetch('/api/encrypt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password }),
  })
  return await res.json() as AuthResult
}

export async function postDecrypt(encryped: string): Promise<AuthResult> {
  const res = await fetch('/api/decrypt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ encryped }),
  })
  return await res.json() as AuthResult
}
