import Navigation from "../components/Navigation/Navigation";
import Head from "next/head";
const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Cheolog</title>
        <meta name="description" content="cheolog" />
      </Head>
      <Navigation />
      {children}
    </div>
  );
};

export default DefaultLayout;
