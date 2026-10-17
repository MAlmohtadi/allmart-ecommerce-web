// application
import { useEffect } from 'react';
import AccountLayout from '../../../components/account/AccountLayout';
import AccountPageOrders from '../../../components/account/AccountPageOrders';
import { useAccount } from '../../../store/account/accountHooks';
import { useOrderInit } from '../../../store/order/orderHooks';
import { useSale } from '../../../store/sale/saleHooks';

function Page() {
    const orderInit = useOrderInit();
    const isWholeSale = useSale();
    const account = useAccount();
    useEffect(() => {
        orderInit(false, false);
    }, [isWholeSale, account.id]);
    return <AccountPageOrders />;
}

Page.Layout = AccountLayout;

export default Page;
