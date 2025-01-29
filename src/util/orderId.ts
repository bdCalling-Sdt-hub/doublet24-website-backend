const getOrderID = () => {
  const date = new Date();
  const orderId =
    (date.getMonth() + 1).toString() + date.getDate().toString() + Date.now();

  return `Order #${orderId}`;
};

export default getOrderID;
