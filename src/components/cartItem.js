import {useRef, useState} from "react";
import {fetchAddProductToCart, fetchDeleteProductFromCart, fetchRemoveProductFromCart} from "../middleware/api";
function CartItem({product, onDelete, onAdd, onRemove}) {

    const [quantity, setQuantity] = useState(product.quantity);
    const plusRef = useRef(null);
    const minusRef = useRef(null);
    const handlePlusClick = () => {
        plusRef.current.disabled = true;
        onAdd(product);
        localStorage.removeItem('cart')
        setQuantity((prevQuantity) => prevQuantity + 1);
        fetchAddProductToCart(product.id, 1).then(
            () => plusRef.current.disabled = false
        );

    }

    const handleMinusClick = () => {
        minusRef.current.disabled = true;
        localStorage.removeItem('cart')

        if (quantity === 1) {
            const id = product.id;
            onDelete(product);
            fetchDeleteProductFromCart(id);


        }
        else {
            onRemove(product);
            setQuantity((prevQuantity) => prevQuantity - 1);
            fetchRemoveProductFromCart(product.id, -1).then(
                () => minusRef.current.disabled = false
            );
        }
    }

    return (
        <div className="cart-page-item" data-id={product.id}>
            <img className="cart-page-item-image" src={product.images[0]} alt={product.title}/>
            <h3 className="cart-page-item-title">{product.title}</h3>
            <h3 className="cart-page-item-price">${product.price}</h3>
            <div className="edit-container">
                <button
                    className="cart-page-item-edit-quantity"
                    onClick={handleMinusClick}
                    ref={minusRef}
                >-
                </button>
                <h3 className="cart-page-item-counter">{quantity}</h3>
                <button
                    className="cart-page-item-edit-quantity"
                    onClick={handlePlusClick}
                    ref={plusRef}>+
                </button>
            </div>
        </div>
    )
}

export default CartItem;