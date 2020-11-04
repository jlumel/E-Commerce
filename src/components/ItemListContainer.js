import React, { useState, useEffect } from 'react'
import ItemList from './ItemList'
import ItemDetailContainer from './ItemDetailContainer'
import products from '../productos.json'


const ItemListContainer = ({ title }) => {

    const stock = 10

    const [items, setItems] = useState(null)

    const [actualStock, setStock] = useState(stock)

    const getItems = () => new Promise(res => {
        setTimeout(() => {
            res(products)
        }, 2000)
    })

    const initial = () => {
        if (actualStock > 0) {
            return 1
        } else {
            return 0
        }
    }

    const onAdd = (count, setCount) => {
        if (actualStock > 0) {
            setStock(actualStock - count)
            if (actualStock - count < count) {
                setCount(actualStock - count)
            }
            console.log(`${count} items agregados`)
        } else {
            setCount(0)

        }
    }

    useEffect(() => {
        getItems().then(res => {
            setItems(res)
        })
    },[])

    useEffect(() => { console.log(`El stock actual es ${actualStock}`) }, [actualStock])

    return (
        <>
            <h2 style={{ fontFamily: 'Roboto', textAlign: 'center', marginBottom: '3vw' }}>{title}</h2>
            {items && <ItemList items={items} onAdd={onAdd} initial={initial} stock={actualStock} />}
            {items && <ItemDetailContainer items={items}/>}
            
        </>
    )

}

export default ItemListContainer