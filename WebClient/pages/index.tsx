import React from 'react';
import { wrapper } from "../redux/store";

const Home = () => {
  return (
    <>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (ctx) => {
      const user = store.getState().user.data;
      
      if (!user) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          }
        };
      }

      return {
        redirect: {
          destination: '/projects',
          permanent: false,
        }
      };
    }
);
export default Home;
