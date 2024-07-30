import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {

  let token = request.cookies.get('token')
  console.log(token,"qwertyuiopoigfdfghjkl;ufdfy") 
  // if(!token){
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
 
  const response = NextResponse.next()
  return response
}


export const config = {
  matcher: ['/', "/addcar"],
};