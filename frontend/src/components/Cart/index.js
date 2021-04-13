import React,{ useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    CartArea, 
    CartHeader, 
    CartIcon, 
    CartText, 
    CartBody, 
    ProducstArea, 
    ProductItem, 
    ProductInfoArea, 
    ProductPhoto, 
    ProductPrice, 
    ProductQuantityArea, 
    ProductName, 
    ProductQtIcon,
    ProductQtText
} from './styled';

export default () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products);

    const [show, setShow] = useState(true);

    const handleCardClick = () => {
        setShow(!show);
    }
    
    const handleProductChange = (key, type) => {
        dispatch({
            type: 'CHANGE_PRODUCT',
            payload: { key, type }
        });
    }

    return (
        <CartArea>
            <CartHeader onClick={handleCardClick}>
                <CartIcon src="/assets/cart.png" />
                <CartText>Meu Carrinho ({products.length})</CartText>
                {show && 
                    <CartIcon src="/assets/down.png" />
                }
            </CartHeader>
            <CartBody show={show}>
               <ProducstArea>
                   {products.map((i, k) => {
                     return  <ProductItem key={k}>
                                <ProductPhoto src={i.image} />
                                <ProductInfoArea>
                                        <ProductName>{i.name}</ProductName>
                                        <ProductPrice>R$ {i.price.toFixed(2)}</ProductPrice>
                                </ProductInfoArea>
                                <ProductQuantityArea>
                                    <ProductQtIcon 
                                        src="/assets/minus.png"
                                        onClick={() => handleProductChange(k, '-')}
                                        />
                                    <ProductQtText>{i.qt}</ProductQtText>
                                    <ProductQtIcon 
                                        src="/assets/plus.png"
                                        onClick={() => handleProductChange(k, '+')}
                                        />
                                </ProductQuantityArea>
                            </ProductItem>
                   })}  
               </ProducstArea>
            </CartBody>
        </CartArea>
    );
}