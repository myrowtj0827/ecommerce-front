import React from 'react';
import {connect} from "react-redux";
import {fetchAllProducts} from "../redux/actions/filter/filter";

import {
    scrapingAllProducts,
    gettingPopularProducts,
    getProductPage,
} from "../redux/actions/filter/scrapingProduct";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: '',
            scraping_id: '',


            nProduct: 0,
            popularList: '',

            page_num: '',
            current_page: 1,
            page_neighbours: 2,
            pagination: 12,
            productsList: '',
        };
    }

    componentDidMount() {
        const {
            fetchAllProducts,
            scrapingAllProducts,
            gettingPopularProducts,
        } = this.props;

        if (gettingPopularProducts) {
            gettingPopularProducts();
        }

        // if (fetchAllProducts) {
        //     fetchAllProducts();
        // }
        //
        // if (scrapingAllProducts) {
        //     scrapingAllProducts();
        // }

        this.onPageClick(1);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.popularList && prevProps.popularList !== this.props.popularList) {
            this.setState({
                popularList: this.props.popularList,
            })
        }

        if (this.props.pageList && prevProps.pageList !== this.props.pageList) {
            this.setState({
                productsList: this.props.pageList.list,
                page_num: this.props.pageList.page_num,
            })
        }
    }

    navigatePage = (code) => {
        if (code === 13) {
            localStorage.setItem('category', this.state.categoryName);

            this.props.history.push(`/searchFilter`);
        }
    };
    // registerData = () => {
    //     const {
    //         createProduct
    //     } = this.props;
    //
    //     createProduct(this.state);
    // };


    onPageClick = (item) => {
        this.setState({
            current_page: item,
        });

        const {
            getProductPage
        } = this.props;

        const data = {
            current_page: item,
            page_neighbours: this.state.page_neighbours,
            pagination: this.state.pagination,
        };

        if (getProductPage) {
            getProductPage(data)
        }
    };

    render() {
        const pageArray = [];
        if (this.state.page_num) {
            for (let k = this.state.page_num.start_page; k <= this.state.page_num.end_page; k++) {
                pageArray.push(k);
            }
        }

        return (
            <>
                <section id="scrollSectionTop" className="landing-header">
                    <div className="w3-row min-width">
                        <div className="w3-bar">
                            <div className="w3-bar-item w3-left">
                                <div className="w3-container">
                                    <div className="w3-dropdown-hover">
                                        <span className=""><i className="fa fa-bars menu-size"
                                                              aria-hidden="true"></i></span>
                                        <div className="w3-dropdown-content w3-bar-block w3-border w3-text-white">
                                            <a href="/" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <i className="far fa-user icon-padding"></i>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">Login/Register</div>
                                                </div>
                                            </a>

                                            <a href="/" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <i className="fas fa-list-ul icon-padding"></i>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9"> Categories</div>
                                                </div>
                                            </a>

                                            <a href="/" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <img className="offer-size"
                                                             src={require('../assets/images/offers.svg')} alt=""/>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">Offers</div>
                                                </div>
                                            </a>

                                            <div className="w3-bar-item w3-border-bottom"></div>

                                            <a href="/" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <i className="far fa-heart icon-padding"></i>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">WishList</div>
                                                </div>
                                            </a>

                                            <a href="/" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <img className="percent-size"
                                                             src={require('..//assets/images/notification.svg')}
                                                             alt=""/>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">Notifications</div>
                                                </div>
                                            </a>

                                            <a href="/" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <img className="offer-size"
                                                             src={require('../assets/images/history.svg')} alt=""/>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">History</div>
                                                </div>
                                            </a>

                                            <a href="/" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <img className="percent-size"
                                                             src={require('..//assets/images/star.svg')} alt=""/>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">Reviews</div>
                                                </div>
                                            </a>

                                            <div className="w3-bar-item w3-border-bottom"></div>

                                            <a href="/" className="w3-bar-item w3-btn w3-hover-text-amber btnUnderLine">
                                                <div className="w3-row">
                                                    <div className="w3-col l3 m3 s3">
                                                        <img className="percent-size"
                                                             src={require('..//assets/images/language.png')} alt=""/>
                                                    </div>
                                                    <div className="w3-col l9 m9 s9">Language</div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w3-bar-item w3-right contact-us-max">
                                <div className="w3-btn w3-hover-orange w3-hover-text-white btnHome">
                                    <div className="btnUnderLine">Contact us</div>
                                </div>
                            </div>

                            <div className="w3-bar-item w3-right header-item-padding">
                                <div className="w3-btn w3-hover-orange w3-hover-text-white btnHome">
                                    <div className="btnUnderLine">How to use</div>
                                </div>
                            </div>

                            <div className="w3-bar-item w3-right header-item-padding">
                                <div className="w3-btn w3-hover-orange w3-hover-text-white btnHome">
                                    <div className="btnUnderLine">About</div>
                                </div>
                            </div>

                            <div className="w3-bar-item w3-right header-item-padding">
                                <div className="w3-btn w3-hover-orange w3-hover-text-white btnHome">
                                    <div className="btnUnderLine">Home</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*<div className="w3-btn w3-yellow w3-hover-blue" onClick={this.registerData} style={{marginTop: '40px'}}>Register</div>*/}
                <section className="logo-search min-width">
                    <img className="logo-size" src={require('../assets/images/E-Commerce-Software-logo.png')} alt=""/>

                    <div className="input-align">
                        <input className="w3-input" type="text" placeholder="Search the categories"
                               onChange={(event) => this.setState({categoryName: event.target.value})}
                               onKeyUp={event => this.navigatePage(event.keyCode)}
                               required/>
                    </div>
                </section>

                <section className="featured-products min-width">
                    <div className="w3-row products-title">
                        Featured Products
                    </div>

                    <div className="w3-row slider-banner">
                        <OwlCarousel items={1}
                                     className="owl-theme"
                                     loop
                                     nav
                                     margin={4}
                                     autoplay={true}
                        >
                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1585904841/N32868797V_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Royal Complete 3.0 Sneakers</div>
                                    <div className="red-txt">SAR 192</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1566937648/N29220476A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Women's Corral Watch RB-0193
                                    </div>
                                    <div className="red-txt">SAR 227.7</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1585918018/N32869624V_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Royal Complete 3.0 Sneakers</div>
                                    <div className="red-txt">SAR 192</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1585594362/N29023143V_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Pump Supreme Running Shoes</div>
                                    <div className="red-txt">SAR 262</div>
                                </div>
                            </div>


                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1578638783/N33649173A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">The Book Of Unwritten Tales 2 - Xbox One - Adventure - Xbox One</div>
                                    <div className="red-txt">SAR 97.9</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1581668866/N34313828A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Hellblade Senuas Sacrifice - Adventure - Xbox One</div>
                                    <div className="red-txt">SAR 148</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1535547595/N16659380A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Styx: Shards Of Darkness - Adventure - Xbox One - Adventure - Xbox One</div>
                                    <div className="red-txt">SAR 249</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1509969266/N12700351A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Ben 10 (Intl Version) - Adventure - Xbox One</div>
                                    <div className="red-txt">SAR 199</div>
                                </div>
                            </div>

                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1589715672/N11292764A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Skin Refining Clear-Up Strips</div>
                                    <div className="red-txt">SAR 19</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1513172074/N12874978A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Body And Face Scrubbing Cream 500ml</div>
                                    <div className="red-txt">SAR 45</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1557487643/N15658822A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Vitamin E Oil Clear 75ml</div>
                                    <div className="red-txt">SAR 17.2</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1583837534/N29905109A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Facial Serum Vitamin C 30ml</div>
                                    <div className="red-txt">SAR 19</div>
                                </div>
                            </div>


                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1525757135/N13714689A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Multipurpose Foldable Table White 74centimeter</div>
                                    <div className="red-txt">SAR 89</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1556468124/N24214884A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">9-Layer Shoe Rack Grey/Black 60x108x30centimeter</div>
                                    <div className="red-txt">SAR 158</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1522418998/N14004197A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Inflatable Pull Out Sofa Bed Black 221x66x193centimeter
                                    </div>
                                    <div className="red-txt">SAR 359</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1556468124/N24214879A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">12-Layer Shoe Rack Black/White 118x120x30centimeter</div>
                                    <div className="red-txt">SAR 140</div>
                                </div>
                            </div>


                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1590059570/N37750239V_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Smash V2 Max</div>
                                    <div className="red-txt">SAR 223</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1590562286/N38379738V_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Pack of 9 Sensitive Baby Wipes, 540 Counts</div>
                                    <div className="red-txt">SAR</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1589996076/N35699194V_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Bountiful Quick Path Sports Shoes</div>
                                    <div className="red-txt">SAR 212</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1536065876/N16898584A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">6-Piece Compressed Two-Sided Comforter Set Microfibre Dark
                                        Purple King
                                    </div>
                                    <div className="red-txt">SAR 144.85</div>
                                </div>
                            </div>


                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1571728731/N30883728V_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Suede Belt 56Navy
                                    </div>
                                    <div className="red-txt">SAR 60.25</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1569584309/N30384324A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">https://k.nooncdn.com/t_desktop-pdp-v1/v1574581610/N29808152A_1.jpg
                                    </div>
                                    <div className="red-txt">SAR 23.5</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1574581598/N29808137A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Spacious Leather Wallet
                                    </div>
                                    <div className="red-txt">SAR 28</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1588675025/N29808140A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Spacious Leather Wallet
                                    </div>
                                    <div className="red-txt">SAR 28.5</div>
                                </div>
                            </div>


                            <div className="flex-card">
                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1530517723/N15481308A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Pair Of Shirt Holder Black</div>
                                    <div className="red-txt">SAR 42</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1574581605/N29808146A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Spacious Leather Wallet</div>
                                    <div className="red-txt">SAR 19.5</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1581426640/N25507521A_1.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Breath Run Tank Top Black</div>
                                    <div className="red-txt">SAR 39</div>
                                </div>

                                <div className="card-bg-slider">
                                    <img className="img-item"
                                         src={'https://k.nooncdn.com/t_desktop-pdp-v1/v1568185890/N29801020A_2.jpg'}
                                         alt=""/>
                                    <div className="blue-txt">Charged Cotton Training T-Shirt Light Blue</div>
                                    <div className="red-txt">SAR 34</div>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>

                    <a href="#scrollSectionBottom" className="w3-row w3-right see-all show-more">See All</a>
                </section>

                <section className="most-popular-product min-width">
                    <div className="w3-row products-title">
                        Most Popular Products
                    </div>

                    <div className="flex-card">
                        {
                            this.state.popularList && this.state.popularList.map((item, key) => {
                                if (typeof (item.scraping_price) !== "undefined") {
                                    return (
                                        <div className="w3-card card-bg-padding" key={key}>
                                            <a href={item.scraping_store_address}><img className="img-item" key={key}
                                                                                       src={item.scraping_photo_link}
                                                                                       alt=""/></a>
                                            <div className="scraping-name text-nowrap">{item.scraping_name}</div>
                                            <div className="blue-txt text-nowrap">{item.scraping_description}</div>
                                            <div className="red-txt">SAR {item.scraping_price}</div>
                                        </div>
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                    </div>

                    <span id="productsSeeAll" className="w3-row collapse">
                        <div className="w3-row products-title" style={{paddingTop: 50}}>
                            All Products <span
                            style={{fontSize: 20}}>(The total pages - {this.state.page_num && this.state.page_num.total_page})</span>
                        </div>
                        <div className="flex-card">
                        {
                            this.state.productsList && this.state.productsList.map((item, key) => {
                                if (typeof (item.scraping_price) !== "undefined") {
                                    return (
                                        <div className="w3-card card-bg-padding">
                                            <a href={item.scraping_store_address}><img className="img-item" key={key}
                                                                                       src={item.scraping_photo_link}
                                                                                       alt=""/></a>
                                            <div className="scraping-name text-nowrap">{item.scraping_name}</div>
                                            <div className="blue-txt text-nowrap">{item.scraping_description}</div>
                                            <div className="red-txt">SAR {item.scraping_price}</div>
                                        </div>
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                        </div>

                        <div className="justify-btn" style={{paddingTop: 30, paddingBottom: 40}}>
                            <div className="product-btn justify-center" onClick={() => this.onPageClick(1)}>
                                <img className="icon-size"
                                     src={require("../assets/images/back.png")} alt=""/>
                            </div>

                             <div
                                 className="product-btn justify-center txt-14"
                                 onClick={() => this.onPageClick(this.state.current_page > 1 ? this.state.current_page - 1 : this.state.page_num.total_page)}
                             >
                                Prev
                            </div>

                            {
                                this.state.page_num && pageArray && pageArray.map((item, key) => {
                                    return (
                                        <div
                                            className={this.state.current_page && this.state.current_page === item ? "product-btn justify-center btn-search" : "product-btn justify-center col-darkBlue"}
                                            key={key}
                                            onClick={() => this.onPageClick(item)}
                                        >
                                            {item}
                                        </div>
                                    )
                                })
                            }

                            <div
                                className="product-btn justify-center txt-14"
                                onClick={() => this.onPageClick(this.state.current_page < this.state.page_num.total_page ? this.state.current_page + 1 : 1)}
                            >
                                Next
                            </div>

                            <div className="product-btn justify-center" onClick={() => this.onPageClick(this.state.page_num.total_page)}>
                                <img className="icon-size"
                                     src={require("../assets/images/next.png")} alt=""/>
                            </div>
                        </div>
                    </span>

                    <div id="scrollSectionBottom" className="w3-row w3-right see-all" data-toggle="collapse"
                         data-target="#productsSeeAll">
                        See All
                    </div>
                </section>

                <a href="#scrollSectionTop" className="scrollPosition1"><img
                    className="upDownSize" src={require('../assets/images/up-arrow.svg')} alt=""/></a>
                <br/><br/>
                <a href="#scrollSectionBottom" className="scrollPosition2"><img
                    className="upDownSize" src={require('../assets/images/down-arrow.svg')} alt=""/></a>

                <section className="landing-footer">
                    <div className="">All prices are in USD</div>
                </section>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        popularList: state.scrapingProduct.popularList,
        scrapingList: state.scrapingProduct.scrapingList,
        pageList: state.scrapingProduct.pageList,

    }
};

export default connect(
    mapStateToProps,
    {
        fetchAllProducts,
        scrapingAllProducts,
        gettingPopularProducts,

        getProductPage,
    }
)(Home);
