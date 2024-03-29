import React, { useState, useEffect, useRef, useContext, useReducer} from 'react'
import usa from './images/us.svg'
import {data} from './data'
import reducer from './reducer'

const AppContext = React.createContext();

const getLocalStorage = () => {
    let list = localStorage.getItem('list');
    if (list) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return [];
    }
}

const initialState = {
    prods: getLocalStorage(),
    total: 0,
}

function AppProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [amount, setAmount] = useState(state.prods.length)

      useEffect(() => {
        localStorage.setItem('list', JSON.stringify(state.prods));
      }, [state.prods])

    useEffect(() => {
        setAmount(state.prods.length)
    }, [state.prods])

    const addItem = (id) => {
        dispatch({type: 'ADD_ITEM', payload: id})
    }

    const removeItem = (id) => {
        dispatch({type: 'REMOVE_ITEM', payload: id})
    }

    const getTotal = () => {
        dispatch({type: 'GET_TOTAL'})
    }

    const increase = (id) => {
        dispatch({type: 'INCREASE', payload: id})
    }

    const decrease = (id) => {
        dispatch({type: 'DECREASE', payload: id})
    }

    useEffect(() => {
        getTotal()
    }, [state.prods])

    // translation
    const [title, setTitle] = useState('Join Groceries Delivered in 90 Minutes')
    const [subtitle, setSubtitle] = useState('Get your healthy foods & snacks delivered at your doorsteps all day everyday')
    const [mainFlag, setMainFlag] = useState(usa)
    const [mainLang, setMainLang] = useState('English')
    const [searchInput, setSearchInput] = useState('Search your products from here')
    const [searchButton, setSearchButton] = useState('Search')
    const [offer, setOffer] = useState('Offer')
    const [help, setHelp] = useState('Need Help')
    const [join, setJoin] = useState('Join')
    const [load, setLoad] = useState('Load More')
    const [cart, setCart] = useState('Cart');

    const [isThere, setIsThere] = useState(false)

    const [mainPage, setMainPage] = useState([]);

    const xy = [];

    let tempArr = []

    // products
    const [products, setProducts] = useState(data);
    
    const [preciseProduct, setPreciseProduct] = useState([]);

    const [number, setNumber]  = useState(0);

    const [num, setNum] = useState(20);

    const [showMore, setShowMore] = useState(true);

    const stickList = useRef();

    const [closeSmall, setCloseSmall] = useState(false);

    const [filterInfo, setFilterInfo] = useState('No category was selected') 

    const [yy, setYY] = useState([])

    let mainProductsList = []

    const [cartSlider, setCartSlider] = useState(false)
 
    data.map(product => {
        product.details.map(detail => {
            detail.details.map(singleitem => {
                mainProductsList.push(singleitem)
            })
        })
    })

    useEffect(() => {
        products.map(product => {
        product.details.map(detail => {
            detail.details.map(singleitem => {
                xy.push(singleitem);
                if (tempArr.length < num) {
                    tempArr.push(singleitem)
                }
            })
        })
    })
    }, [num])

    useEffect(() => {
        setPreciseProduct(tempArr)
        setMainPage(xy)
        setYY(tempArr)
    }, [num])

    const filterList = (x) => {
        
        let filteredList = mainProductsList.filter(item => item.name.toLowerCase().includes(x))
        if (x.length > 0) {
            setPreciseProduct(filteredList)
        } else if (x.length === 0) {
            // setNum(20)
            setShowMore(true)
            console.log(num);
            setPreciseProduct(yy)
            console.log(yy);
        }
    }

    return (
        <AppContext.Provider value={{
            title,
            setTitle,
            mainFlag,
            setMainFlag,
            mainLang,
            setMainLang,
            subtitle,
            setSubtitle,
            searchInput,
            setSearchInput,
            searchButton,
            setSearchButton,
            offer,
            setOffer,
            help,
            setHelp,
            join,
            setJoin,
            isThere,
            setIsThere,
            products,
            preciseProduct,
            setPreciseProduct,
            number,
            setNumber,
            stickList,
            num,
            setNum,
            mainPage,
            load,
            setLoad,
            showMore,
            setShowMore,
            cart,
            setCart,
            closeSmall,
            setCloseSmall,
            filterInfo,
            setFilterInfo,
            filterList,
            cartSlider,
            setCartSlider,
            addItem,
            removeItem,
            increase,
            decrease,
            amount,
            ...state
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }
