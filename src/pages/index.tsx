
import React from "react";
import Comments from "../../components/Comments/Comments";
export default function Home() {

  return (
    <>
      <div>
        <h1>Lets Start Building </h1>
      </div>
      <div style={{marginTop:'40px'}}>
       <Comments/>
      </div>
    </>
  );
}