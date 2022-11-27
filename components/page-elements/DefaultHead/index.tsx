import Head from "next/head";

interface DefaultHeadProps {
  title?: string;
  description?: string;
}

/**
  * A more concise way of declaring the <head>
  */
function DefaultHead(props: DefaultHeadProps) {
  return (
    <Head>
      <title>{props.title ? props.title : "Development App"}</title>
      <meta name="description" content={props.description ? props.description : "Development app"} />
    </Head>
  )
}

export default DefaultHead;
