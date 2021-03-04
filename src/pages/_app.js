import React from "react";
import Theme from '@codeday/topo/Theme';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Theme brandColor="red">
        <Component {...pageProps} />
      </Theme>
    </>
  )
}

export default MyApp