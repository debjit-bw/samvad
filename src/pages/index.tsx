
import React from "react";
import Comments from "../../components/Comments/Comments";
import Layout from "../../components/layout/layout";
export default function Home() {

  return (
    <>
      <div>
        <h1>Lets Start Building </h1>
      </div>
      <div>
        <Layout/>
      </div>
      <div style={{marginTop:'40px'}}>
       <Comments/>
      </div>
    </>
  );
}