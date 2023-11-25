
import React from "react";
import Comments from "../../components/Comments/Comments";
import Layout from "../../components/layout/layout";
export default function Home() {

  return (
    <>
      <div>
        <Layout/>
      </div>
      <div style={{marginTop:'40px'}}>
       {/* <Comments/> */}
      </div>
    </>
  );
}