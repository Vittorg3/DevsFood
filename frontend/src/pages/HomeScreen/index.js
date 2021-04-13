import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { 
    Container, 
    CategoryArea, 
    CategoryList, 
    ProductArea, 
    ProductList, 
    ProductPaginationArea, 
    ProductPaginationItem 
} from './styled';

import ReactTolltip from 'react-tooltip';

import api from '../../api';

import Header from '../../components/Header';
import CategoryItem from '../../components/CategoryItem';
import ProductItem from '../../components/ProductItem';
import Modal from '../../components/Modal';
import ModalProduct from '../../components/ModalProduct';

let searchTime = null;

export default () => {
    const history = useHistory();

    const [headerSearch, setHeaderSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [totalPages, setTotalPages] = useState(0);
    const [activePage, setActivePage] = useState(1);
 
    const [activeCategory, setActiveCategory] = useState(0);
    const [activeSearch, setActiveSearch] = useState('');

    const [modalStatus, setModalStatus] = useState(false);
    const [modalData, setModalData] = useState({});

    const getProducts = async () => {
        const prods = await api.getProducts(activeCategory, activePage, activeSearch);
        if(prods.error == '') {
            setProducts(prods.result.data);
            setTotalPages(prods.result.pages);
            setActivePage(prods.result.page);
        }
    }

    useEffect(() => {
        clearTimeout(searchTime);
        searchTime = setTimeout(() => {
                setActiveSearch(headerSearch);
        }, 2000);
    }, [headerSearch]);

    useEffect(() => {
        const getCategories = async () => {
            const cat = await api.getCategories();
            if(cat.error == '') {
                setCategories(cat.result);
            }

            ReactTolltip.rebuild();
        };

        getCategories();
    }, [])

    useEffect(() => {
        setProducts([]);
        getProducts();
    }, [activeCategory, activePage, activeSearch]);

    const handleProductClick = (data) => {
        setModalData(data);
        setModalStatus(true);
    }

    return (
        <Container>
            <Header search={headerSearch} onSearch={setHeaderSearch} />

            {categories.length > 0 &&
                <CategoryArea>
                    Selecione uma categoria
                    <CategoryList>
                        <CategoryItem 
                            data={{
                                id: 0, 
                                name: 'Todas as categorias', 
                                image: '/assets/food-and-restaurant.png'}} 
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                        />
                        {categories.map((i, k) => {
                            return <CategoryItem 
                                        key={k} 
                                        data={i}
                                        activeCategory={activeCategory}
                                        setActiveCategory={setActiveCategory}
                                    />
                        })}
                    </CategoryList>
                </CategoryArea>
            }

            {products.length > 0 &&
                <ProductArea>
                    <ProductList>
                        {products.map((i, k) =>{
                            return <ProductItem 
                                        key={k}
                                        data={i}
                                        onClick={handleProductClick}
                                    />
                        })}
                    </ProductList>
                </ProductArea>
            }
            
            {totalPages > 0 &&
                <ProductPaginationArea>
                    {Array(totalPages).fill(0).map((i, k) => {
                        return <ProductPaginationItem 
                                        key={k} 
                                        active={activePage}
                                        current={i + 1}
                                        onClick={() => setActivePage(i + 1)}
                                        >
                                    {i + 1}
                               </ProductPaginationItem>
                    })}
                </ProductPaginationArea>
            }

            <Modal status={modalStatus} setStatus={setModalStatus}>
                <ModalProduct data={modalData} setStatus={setModalStatus}/>
            </Modal>
        </Container>
    );
}