import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.3/morph/bootstrap.min.css"
          integrity="sha512-Nd3lZDftpGFIyfIz/Snlz7SzhEycjmHkNn3s2dmhrVyY55uJnTE+UiK75+CeXltD5GmU7c9n/JMDWaEwGQjowQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          async
          defer
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
