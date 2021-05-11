import { httpClient } from '../request/httpClient';

const INSERT_ORDER_ITEM_LIST = 'orderList/INSERT_ORDER_ITEM_LIST';
const INSERT_ORDER_ITEM_LIST_SUCCESS = 'orderList/INSERT_ORDER_ITEM_LIST_SUCCESS';
const INSERT_ORDER_ITEM_LIST_FAILURE = 'orderList/INSERT_ORDER_ITEM_LIST_FAILURE';

export const insertOrderItemList = (orderItemList) => async (dispatch) => {
  dispatch({ type: INSERT_ORDER_ITEM_LIST });
  try {
    await httpClient.post({ uri: 'http://localhost:4000/orderItemList', body: orderItemList });

    dispatch({ type: INSERT_ORDER_ITEM_LIST_SUCCESS, payload: orderItemList });
  } catch (error) {
    console.error(error);
    dispatch({ type: INSERT_ORDER_ITEM_LIST_FAILURE, payload: error });
  }
};

const initialState = {
  orderItemList: {
    loading: false,
    data: [],
    error: null,
  },
};

const orderList = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_ORDER_ITEM_LIST:
      return {
        ...state,
        orderItemList: {
          loading: true,
          data: state.orderItemList.data,
          error: null,
        },
      };
    case INSERT_ORDER_ITEM_LIST_SUCCESS:
      return {
        ...state,
        orderItemList: {
          loading: false,
          data: [
            {
              orderNumber: new Date().getTime(),
              itemList: action.payload,
            },
            ...state.orderItemList.data,
          ],
          error: null,
        },
      };
    case INSERT_ORDER_ITEM_LIST_FAILURE:
      return {
        ...state,
        orderItemList: {
          loading: false,
          data: state.orderItemList.data,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default orderList;
