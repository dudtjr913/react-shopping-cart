import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog as ShoppingCartDialog, DIALOG_TYPE } from '../components';
import { insertItemToShoppingCart } from '../redux/actions/shoppingCartActions';
import useDialog from './useDialog';

const ADD_SUCCESS = 'ADD_SUCCESS';
const ADD_FAILURE = 'ADD_FAILURE';

const useInsertingItemToShoppingCart = ({ product_id }) => {
  const { isDialogOpen, setIsDialogOpen, clickConfirm, clickCancel, type, setType } = useDialog();
  const shoppingCartItemList = useSelector((state) => state.shoppingCart.shoppingCartItemList.data);
  const dispatch = useDispatch();

  const isExistedInShoppingCart = () =>
    shoppingCartItemList.some((shoppingCartItem) => shoppingCartItem.product_id === product_id);

  const insertShoppingCart = () => {
    if (isExistedInShoppingCart()) {
      setType(ADD_FAILURE);
      setIsDialogOpen(true);

      return;
    }

    setType(ADD_SUCCESS);
    setIsDialogOpen(true);
    dispatch(insertItemToShoppingCart({ product_id }));
  };

  const Dialog = () => (
    <ShoppingCartDialog type={DIALOG_TYPE.ALERT} onConfirm={() => clickConfirm()} onClose={() => clickCancel()}>
      {type === ADD_FAILURE ? '이미 장바구니에 추가되어 있습니다.' : '장바구니에 추가되었습니다.'}
    </ShoppingCartDialog>
  );

  return { insertShoppingCart, isDialogOpen, Dialog };
};

useInsertingItemToShoppingCart.propTypes = {
  product_id: PropTypes.number.isRequired,
};

export default useInsertingItemToShoppingCart;