import {
  Links,
  type LinksFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

export const Layout = ({
  children,
}: {
  readonly children: React.ReactNode
}) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf8" />
        <meta
          content="width=device-width, initial-scale=1.0"
          name="viewport"
        />
        <link
          href="/protorix.png"
          rel="icon"
        />
        <title>Proctorix</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return <Outlet />
}
