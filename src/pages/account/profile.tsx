// application
import AccountPageProfile from '../../components/account/AccountPageProfile';
import { wrapper } from '../../store/store';

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = wrapper.getServerSideProps(() => async () => ({ props: {} }));

function Page() {
    return <AccountPageProfile />;
}

export default Page;
