import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

//create an order
const createOrder = async (order: TOrder) => {
  const orderId = order.productId;
  const ProductData = await Product.findById(orderId);

  const updateQuantity =
    (ProductData?.inventory.quantity as number) - order.quantity;

  if (!ProductData) {
    throw new Error("Could not found the product");
  } else {
    if (
      ProductData.inventory.inStock &&
      ProductData.inventory.quantity > 0 &&
      ProductData.inventory.quantity >= order.quantity
    ) {
      const result = await Order.create(order);

      const updateData = await Product.updateOne(
        { _id: ProductData.id },
        {
          "inventory.quantity": updateQuantity,
          "inventory.inStock": updateQuantity > 0,
        }
      );
      console.log(updateData);
      return result;
    } else {
      throw new Error("Insufficient quantity in inventory");
    }
  }
};

const getOrders = async (email: string) => {
  //eslint-disable-next-line
  const filter: any = {};
  if (email) {
    filter.email = email;
  }
  const result = await Order.find(filter);
  return result;
};

export const OrderServices = {
  createOrder,
  getOrders,
};
