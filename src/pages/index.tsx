import React from "react";
import Layout from "../../components/layout/layout";
import { useDispatch, useSelector } from 'react-redux';
import GlobalLayout from "../../components/Gloabal/Global";

export default function Home(props:any) {

  const dispatch = useDispatch();

  return (
    <>
      <div>
        <GlobalLayout props={props}>
          <div>
          <Layout />
          </div>
        </GlobalLayout>
      </div>
    </>
  );
}
