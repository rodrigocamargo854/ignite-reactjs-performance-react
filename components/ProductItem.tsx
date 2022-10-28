import { memo, useState } from "react";
import { AddProductToWishListProps } from "./AddProductToWishList";
import dynamic from "next/dynamic";
//or we can use lazy to in any react aplication
// import { AddProductToWishList } from "./AddProductToWishList";

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return (
    import("./AddProductToWishList").then((mod) => mod.AddProductToWishList),
    {
      loading: () => <span>...carregando</span>
    }
  );
});

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted?: string;
    title?: string;
  };
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingWishList, setIsAddingWishList] = useState(false);
  return (
    //wen the button has been clicked the inital state will be changed for true
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingWishList(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          //setting initial state isAddingWishlist to false and the Component disappear
          onRequestClose={() => setIsAddingWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);
