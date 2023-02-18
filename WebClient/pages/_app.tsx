import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import { parseCookies } from 'nookies';
import { setUserData } from '../redux/slices/user';
import { setProjectListData } from "../redux/slices/project";
import { UserApi } from "../redux/api/user-api";
import { ProjectApi } from "../redux/api/project-api";

function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) => async ({ ctx, Component}) => {
    try {
      const { token } = parseCookies(ctx);

      if (token) {
        const userData = await UserApi.getUser(token);
        const projectListData = await ProjectApi.getByUserId(userData.id);
        store.dispatch(setUserData(userData));
        store.dispatch(setProjectListData(projectListData));
      }
    } catch (err) {
      console.error(err);
    }

    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}
    };
  });

export default wrapper.withRedux(App);