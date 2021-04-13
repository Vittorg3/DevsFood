import React from 'react';
import { 
    Container, 
    ProductPhotoArea, 
    ProductPhoto,
    ProductInfoArea, 
    ProductName,
    ProductPrice,
    ProductIngredients, 
    ProductButtonArea, 
    ProductButton
 } from './styled';

export default ({ data, onClick }) => {
    const handleClick = () => {
        onClick(data);
    }
    
    return (
        <Container onClick={handleClick}>
            <ProductPhotoArea>
                <ProductPhoto src={data.image} />
            </ProductPhotoArea>
            <ProductInfoArea>
                <ProductName>{data.name}</ProductName>
                <ProductPrice>R$ {data.price}</ProductPrice>
                <ProductIngredients>{data.ingredients}</ProductIngredients>
            </ProductInfoArea>
            <ProductButtonArea>
                <ProductButton src="/assets/plus.png" />
            </ProductButtonArea>
        </Container>
    );
}