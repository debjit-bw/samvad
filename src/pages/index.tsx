import React from "react";
import Layout from "../../components/layout/layout";

import GlobalLayout from "../../components/Gloabal/Global";

export default function Home(props:any) {



  return (
    <>
      <div>
        <GlobalLayout props={props}>
          <Layout />
        </GlobalLayout>
      </div>
    </>
  );
}
