import React from 'react';
import {connect} from "react-redux";
import { ScrapingSort } from "../redux/actions/filter/scrapingProduct"

import storeLogo1 from "../assets/images/logo-icon1.png";
import storeLogo2 from "../assets/images/logo-icon2.svg";
import storeLogo3 from "../assets/images/logo-icon3.svg";

import storeLogoNoon from "../assets/images/noon_logo_black_english.svg";
import storeLogoSwsg from "../assets/images/storeLogoSwsg.png";
import redseaLogo from "../assets/images/redseaLogo.svg";
import extraLogo from "../assets/images/extraLogo.svg";
import blackBox from "../assets/images/rsz_logo.webp";
import virginLogo from "../assets/images/virginLogo.svg";
import samma3aLogo from "../assets/images/samma3aLogo.webp";

class SearchFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page_num: '',
            current_page: 1,
            page_neighbours: 2,
            pagination: 12,
            productsList: '',
            flag_sort: false,
            flag_view: true,
        }
    }
    componentDidMount() {
        this.onPageClick(1);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.scrapingSortList && prevProps.scrapingSortList !== this.props.scrapingSortList) {
            this.setState({
                productsList: this.props.scrapingSortList.list,
                page_num: this.props.scrapingSortList.page_num,
            })
        }

        if(this.state.flag_sort !== prevState.flag_sort) {
            this.onPageClick(this.state.current_page);
        }
    }

    gotoShop = (code) => {
        this.props.history.push(`/`);
    };

    onPageClick = (item) => {
        this.setState({
            current_page: item,
        });

        const {
            ScrapingSort
        } = this.props;

        const data = {
            category: localStorage.getItem('category'),
            current_page: item,
            page_neighbours: this.state.page_neighbours,
            pagination: this.state.pagination,
            flag_sort: this.state.flag_sort,
        };

        if (ScrapingSort) {
            ScrapingSort(data)
        }
    };

    toggleSort = () => {
        this.setState({
            flag_sort: !this.state.flag_sort,
        })
    };

    toggleView = () => {
        this.setState({
            flag_view: !this.state.flag_view,
        })
    };

    render() {
        const pageArray = [];
        if (this.state.page_num) {
            for (let k = this.state.page_num.start_page; k <= this.state.page_num.end_page; k++) {
                pageArray.push(k);
            }
        }

        const logoArray = {
            'noon.com': storeLogoNoon, // completed
            'blackbox.com.sa': blackBox, // completed
            'amazon.sa': storeLogo1,
            'extra.com': extraLogo, //completed
            'samma3a.com': samma3aLogo, //completed
            'bukhamsen.com': storeLogo2,
            'alsomah.com.sa': storeLogo3,
            'redsea.com': redseaLogo, // completed
            'mystore.com.sa': storeLogo1,
            'virginmegastore.sa': virginLogo, // completed
            'jarir.com': storeLogo3,
            'electrostores.com': storeLogo1,
            'swsg.co': storeLogoSwsg, // completed
            'xcite.com': storeLogo3,
            'ubuy.com': storeLogo1,
            'lowimart.com': storeLogo2
        };

        return (
            <>
                <div id="scrollSectionTop" className="search-page">
                    <div className="filter-title">Search Filter</div>

                    <div className="filter-btn">
                        <div className="">
                            <div className="max-center">
                                <select className="filters-option">
                                    <option selected disabled>Filters</option>
                                    <option>Name</option>
                                    <option>Price Low to</option>
                                    <option>Height</option>
                                    <option>Price Height to</option>
                                    <option>Low</option>
                                </select>
                            </div>

                            <div className="max-center">
                                <select className="filters-option">
                                    <option selected disabled>Location</option>
                                    <option>Saudi Arabia</option>
                                    <option>Italy</option>
                                    <option>Russia</option>
                                    <option>Poland</option>
                                    <option>India</option>
                                    <option>South Africa</option>
                                </select>
                            </div>

                            <div className="max-center">
                                <select className="filters-option">
                                    <option selected disabled>Price</option>
                                    <option>Name</option>
                                    <option>Price Low to</option>
                                    <option>Height</option>
                                    <option>Price Height to</option>
                                    <option>Low</option>
                                </select>
                            </div>

                            <div className="w3-bar phone-center justify-content">
                                <div className="w3-bar-item max-center" onClick={this.toggleView}>
                                    <span><img className="grid-icon" src={require("../assets/images/border-all-solid.svg")} alt="" /></span>
                                    <span className="w3-hover-text-blue view-left-padding">View</span>
                                </div>

                                <div className="w3-bar-item max-center mouse-cursor" onClick={this.toggleSort}>
                                    <span className="w3-hover-text-blue sort-right-padding">Sort</span>
                                    <span><img className="sort-icon" src={require("../assets/images/sort.svg")} alt="" /></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="best-product">
                        <div className="products-title">
                            Best Match
                            <span
                                style={{fontSize: 20, paddingLeft: 30}}>(The Total Pages - {this.state.page_num && this.state.page_num.total_page})</span>
                        </div>
                        <div className="flex-card-most">
                            {
                                this.state.productsList && this.state.flag_view ?
                                    this.state.productsList.map((item, key) => {
                                        return (
                                            <div key={key}>
                                                <div className="w3-card best-match" key={key}>
                                                    <div className="w3-row justify-filter-content">
                                                        <div className="w3-col img-width">
                                                            <a href={item.scraping_store_address}><img className="products-image" src={item.scraping_photo_link} alt="" /></a>
                                                        </div>

                                                        <div className="w3-col name-width">
                                                            <div className="product-name">{item.scraping_name}</div>
                                                            <div className="w3-row justify-filter-content">
                                                                <div className="w3-col l3 m2 s2">
                                                                    <img className="store-logo-icon" src={logoArray[item.scraping_store_address.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0]]} alt="" />
                                                                </div>
                                                                <div className="w3-col l9 m10 s10 description-product">{item.scraping_description}</div>
                                                            </div>
                                                        </div>

                                                        <div className="w3-col price-width">
                                                            <div className="product-price">SAR {item.scraping_price}</div>
                                                        </div>

                                                        <div className="w3-col shop-width">
                                                            <div onClick={this.gotoShop}><span className="link-shop">Go to Shop</span><img className="goToShop" src={require("../assets/images/next.png")} alt="" /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className="flex-grid3">
                                        {
                                            this.state.productsList && this.state.productsList.map((item, key) => {
                                                return (
                                                    <div className="w3-card best-match" key={key}>
                                                        <div className="justify-center">
                                                            <a href={item.scraping_store_address}><img className="products-image" src={item.scraping_photo_link} alt="" /></a>
                                                        </div>
                                                        <div className="product-name grid">{item.scraping_name}</div>
                                                        <div className="description-product">{item.scraping_description}</div>
                                                        <div className="product-price" style={{paddingTop: 20}}>SAR {item.scraping_price}</div>
                                                        <div className="justify-grid">
                                                            <div>
                                                                <img className="logo-icon-grid" src={logoArray[item.scraping_store_address.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0]]} alt="" />
                                                            </div>
                                                            <div onClick={this.gotoShop}><span className="link-shop">Go to Shop</span><img className="goToShop" src={require("../assets/images/next.png")} alt="" /></div>
                                                        </div>
                                                    </div>
                                                )

                                            })
                                        }
                                    </div>
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
                                id="scrollSectionBottom"
                                className="product-btn justify-center txt-14"
                                onClick={() => this.onPageClick(this.state.current_page < this.state.page_num.total_page ? this.state.current_page + 1 : 1)}
                            >
                                Next
                            </div>

                            <div className="product-btn justify-center" onClick={() => this.onPageClick(this.state.page_num.total_page)}>
                                <img className="icon-size"
                                     src={require("../assets/images/next.png")} alt=""/>
                            </div>

                            <a href="#scrollSectionTop" className="scrollPosition1"><img
                                className="upDownSize" src={require('../assets/images/up-arrow.svg')} alt=""/></a>
                            <br/><br/>
                            <a href="#scrollSectionBottom" className="scrollPosition2"><img
                                className="upDownSize" src={require('../assets/images/down-arrow.svg')} alt=""/></a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        scrapingSortList: state.scrapingProduct.scrapingSortList,
    }
};

export default connect(
    mapStateToProps,
    {
        ScrapingSort,
    }
)(SearchFilter);
