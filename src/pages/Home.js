import {useRef, useEffect, useState} from 'react'

import Navbar from '../components/Navbar'
import homeBg from '../images/homeBg.png'
import {BiSearch} from 'react-icons/bi'
import {useGlobalContext} from '../context'
import Products from '../components/Products'
import CartSlider from '../components/CartSlider'

function Home() {
    const {title, subtitle, searchInput, searchButton, isThere, setIsThere, stickList, closeSmall, setCloseSmall, filterInfo, filterList} = useGlobalContext();
    const x = useRef(null);
    const y = useRef(null);
    const z = useRef(null);
    const phoneNav = useRef(null);

    useEffect(() => {
        window.onscroll = () => {
        if (window.pageYOffset > (z.current.offsetTop+z.current.offsetHeight)-180) {
           setIsThere(true);
        } else {
            setIsThere(false);
        }
    }
    }, [isThere])

    return (
        <>
        <section className='main-section' style={{backgroundImage: `url(${homeBg})`}}>
            <article className={isThere ? 'sticky-navbar' : null} ref={y} >
                <Navbar/>
            </article>
            <div className="main-section-content" ref={z}>
                <h1>{title}</h1>
                <p>{subtitle}</p>
                <form>
                    <div className="form-control">
                        <span className="title">Grocery</span>
                        <input type="text" placeholder={searchInput} onChange={(e) => filterList(e.target.value.toLowerCase())} />
                        <button type='submit'><BiSearch className='icon' />
                        <p>{searchButton}</p></button>
                    </div>
                </form>
            </div>
        </section>
        
        <section className="main-section-phone">
            <Navbar />
            <header className='phone-header'>
                <div className="text">
                    <p>Groceries Delivered in 90 Minutes</p>
                    <ul>
                        <li>Grocery</li>
                    </ul>
                </div>
                <form>
                    <div className="form-control">
                        <div className="icon">
                            <BiSearch />
                        </div>
                        <input type="text" placeholder='Search your products from here' onChange={(e) => filterList(e.target.value.toLowerCase())} />
                    </div>
                </form>
                <div className="filter-info" ref={phoneNav}>
                    <p>{filterInfo}</p>
                    <span onClick={() => setCloseSmall(true)}>Filter</span>
                </div>
            </header>
        </section>

        <div ref={x}>
            <Products/>
        </div>

        <CartSlider />
        </>
    )
}

export default Home
