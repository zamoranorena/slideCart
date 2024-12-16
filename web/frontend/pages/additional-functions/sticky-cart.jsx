import React from 'react';
import { TitleBar } from '@shopify/app-bridge/actions';
import {
    Collapsible,
    Toast,
    Card,
    BlockStack,
    InlineStack,
    Checkbox,
    Select,
    InlineGrid,
    Button,
    TextField,
    Popover,
    ColorPicker,
    hexToRgb,
    hsbToHex,
    rgbToHsb,
    Modal,
    Text,
    Badge,
    Box,
} from "@shopify/polaris";
import { Context, Loading, ContextualSaveBar } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { SkeletonLoad } from '../../components';
import { makeGetRequest, makePutPostRequest } from '../../utils/Services';
//import colorconvert from 'color-convert';
//import BannerHead from '../components/BannerHead';
//import Skeleton from '../components/Skeleton';
class StickyCart extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.yourRef = React.createRef();
        this.state = {
            data: [],

            modal: 0,

            loading: false,
            toastMarkup: false,
            toastError: false,
            messageError: null,

            popover1: null,
            popover2: null,
            popover3: null,
            popover4: null,
            popover5: null,
            popover6: null,

            arr_options_position: [],
            arr_options_distance: [],
            arr_options_redirect: [],


            enabled_sticky_cart: null,
            sticky_cart_show_mobile: null,
            sticky_cart_show_desktop: null,
            sticky_cart_hide_page: null,
            sticky_cart_hide_empty: null,
            sticky_cart_show_countdown: null,
            sticky_cart_position: null,
            sticky_cart_distance: null,
            sticky_cart_redirect: null,
            sticky_cart_icon: null,
            sticky_cart_total_color: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            sticky_cart_total_color_hex: null,
            sticky_cart_total_background_color: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            sticky_cart_total_background_color_hex: null,
            sticky_cart_icon_color: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            sticky_cart_icon_color_hex: null,
            sticky_cart_background_color: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            sticky_cart_background_color_hex: null,

            sticky_cart_countdown_color: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            sticky_cart_countdown_color_hex: null,

            sticky_cart_countdown_background_color: {
                hue: null,
                saturation: null,
                brightness: null,
            },
            sticky_cart_countdown_background_color_hex: null,
            sticky_cart_icon_svg: null,
        };
    };

    /* demo = (ids) =>{
        const demo = document.querySelectorAll("#buttongroup .Polaris-ButtonGroup .Polaris-ButtonGroup__Item .Polaris-Button");
        const path = document.querySelectorAll("#buttongroup .Polaris-ButtonGroup .Polaris-ButtonGroup__Item .Polaris-Button svg path");
        for (var i = 0; i < demo.length; i++) {
            demo[i].classList.add('bold');
            path[i].classList.add('path');
        }
        const elementId = document.getElementById("demo2");
        elementId.classList.remove('bold')
        console.log(path)
    }; */

    /*  hasClass = (element, className) => {
         if (element.classList) {
             return element.classList.contains(className);
         } else {
             return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
         }
     };
 
     addClass = (element, className) => {
         if (!this.hasClass(element, className)) {
             if (element.classList) {
               element.classList.add(className);
             }
             else {
               element.className += ' ' + className;
             }
         }
     };
     
     removeClass =(element, className) => {
         if (element.classList) {
             return element.classList.remove(className);
         } else {
             return element.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
         }
     }; */

    getStickyCartData = async () => {
        const app = this.context;
        const data = await makeGetRequest('/api/get_sticky_cart', app);
        if (data.dataStickyCart && Object.keys(data).length > 0 && data.dataStickyCart !== undefined && data.dataStickyCart !== null) {
            /*const statusPlan = data.statusPlan.data[0].status;
             if (statusPlan == 0) {
                const redirect = Redirect.create(app);
                redirect.dispatch(Redirect.Action.APP, '/plans?status=0');
                return false;
            }; */
            var arr_options_position = [
                { label: 'Top Right', value: 'hs-top-right' },
                { label: 'Bottom Right', value: 'hs-bottom-right' },
                { label: 'Top Left', value: 'hs-top-left' },
                { label: 'Bottom Left', value: 'hs-bottom-left' },
            ];

            var arr_options_distance = [];
            for (let i = 1; i <= 100; i++) {
                arr_options_distance.push(
                    { label: i + '%', value: i.toString() }
                );
            };

            var arr_options_redirect = [
                { label: 'Go To Slide Cart', value: 'no-redirect' },
                { label: 'Go To Cart', value: 'cart' },
                { label: 'Go To Checkout', value: 'checkout' },
            ];

            const sticky_cart = data.dataStickyCart[0];
            const sticky_cart_icon = data.iconsStickyCart.find(element => {
                return element.id === data.dataStickyCart[0].sticky_cart_icon;
            });
            this.setState({
                data: data,
                loading: false,
                arr_options_position: arr_options_position,
                arr_options_distance: arr_options_distance,
                arr_options_redirect: arr_options_redirect,
                enabled_sticky_cart: sticky_cart.enabled_sticky_cart,
                sticky_cart_show_mobile: sticky_cart.sticky_cart_show_mobile,
                sticky_cart_show_desktop: sticky_cart.sticky_cart_show_desktop,
                sticky_cart_hide_page: sticky_cart.sticky_cart_hide_page,
                sticky_cart_hide_empty: sticky_cart.sticky_cart_hide_empty,
                sticky_cart_show_countdown: sticky_cart.sticky_cart_show_countdown,
                sticky_cart_position: sticky_cart.sticky_cart_position,
                sticky_cart_distance: sticky_cart.sticky_cart_distance,
                sticky_cart_redirect: sticky_cart.sticky_cart_redirect,
                sticky_cart_icon: sticky_cart.sticky_cart_icon,
                sticky_cart_total_color: {
                    hue: sticky_cart.sticky_cart_total_color_h,
                    saturation: sticky_cart.sticky_cart_total_color_s,
                    brightness: sticky_cart.sticky_cart_total_color_b
                },
                sticky_cart_total_color_hex: sticky_cart.sticky_cart_total_color_hex.replace(/\#/, ""),
                sticky_cart_total_background_color: {
                    hue: sticky_cart.sticky_cart_total_background_color_h,
                    saturation: sticky_cart.sticky_cart_total_background_color_s,
                    brightness: sticky_cart.sticky_cart_total_background_color_b
                },
                sticky_cart_total_background_color_hex: sticky_cart.sticky_cart_total_background_color_hex.replace(/\#/, ""),
                sticky_cart_icon_color: {
                    hue: sticky_cart.sticky_cart_icon_color_h,
                    saturation: sticky_cart.sticky_cart_icon_color_s,
                    brightness: sticky_cart.sticky_cart_icon_color_b
                },
                sticky_cart_icon_color_hex: sticky_cart.sticky_cart_icon_color_hex.replace(/\#/, ""),
                sticky_cart_background_color: {
                    hue: sticky_cart.sticky_cart_background_color_h,
                    saturation: sticky_cart.sticky_cart_background_color_s,
                    brightness: sticky_cart.sticky_cart_background_color_b
                },
                sticky_cart_background_color_hex: sticky_cart.sticky_cart_background_color_hex.replace(/\#/, ""),

                sticky_cart_countdown_color: {
                    hue: sticky_cart.sticky_cart_countdown_color_h,
                    saturation: sticky_cart.sticky_cart_countdown_color_s,
                    brightness: sticky_cart.sticky_cart_countdown_color_b
                },
                sticky_cart_countdown_color_hex: sticky_cart.sticky_cart_countdown_color_hex.replace(/\#/, ""),

                sticky_cart_countdown_background_color: {
                    hue: sticky_cart.sticky_cart_countdown_background_color_h,
                    saturation: sticky_cart.sticky_cart_countdown_background_color_s,
                    brightness: sticky_cart.sticky_cart_countdown_background_color_b
                },
                sticky_cart_countdown_background_color_hex: sticky_cart.sticky_cart_countdown_background_color_hex.replace(/\#/, ""),

                sticky_cart_icon_svg: sticky_cart_icon.icon
            });
            //this.titles();
        } else {
            if (typeof data.plan_status !== 'undefined') {
                if (!data.plan_status) {
                    const app = this.context;
                    const redirect = Redirect.create(app);
                    redirect.dispatch(Redirect.Action.APP, '/plans?status=0');
                    return false;
                };
            };
        }
    };

    validateData = () => {
        const w = this.state;
        const stateData = {
            enabled_sticky_cart: w.enabled_sticky_cart,
            sticky_cart_show_mobile: w.sticky_cart_show_mobile,
            sticky_cart_show_desktop: w.sticky_cart_show_desktop,
            sticky_cart_hide_page: w.sticky_cart_hide_page,
            sticky_cart_hide_empty: w.sticky_cart_hide_empty,
            sticky_cart_show_countdown: w.sticky_cart_show_countdown,
            sticky_cart_position: w.sticky_cart_position,
            sticky_cart_distance: w.sticky_cart_distance,
            sticky_cart_redirect: w.sticky_cart_redirect,
            sticky_cart_icon: w.sticky_cart_icon,
            sticky_cart_total_color_h: w.sticky_cart_total_color.hue,
            sticky_cart_total_color_s: w.sticky_cart_total_color.saturation,
            sticky_cart_total_color_b: w.sticky_cart_total_color.brightness,
            sticky_cart_total_background_color_h: w.sticky_cart_total_background_color.hue,
            sticky_cart_total_background_color_s: w.sticky_cart_total_background_color.saturation,
            sticky_cart_total_background_color_b: w.sticky_cart_total_background_color.brightness,
            sticky_cart_icon_color_h: w.sticky_cart_icon_color.hue,
            sticky_cart_icon_color_s: w.sticky_cart_icon_color.saturation,
            sticky_cart_icon_color_b: w.sticky_cart_icon_color.brightness,
            sticky_cart_background_color_h: w.sticky_cart_background_color.hue,
            sticky_cart_background_color_s: w.sticky_cart_background_color.saturation,
            sticky_cart_background_color_b: w.sticky_cart_background_color.brightness,

            sticky_cart_countdown_color_h: w.sticky_cart_countdown_color.hue,
            sticky_cart_countdown_color_s: w.sticky_cart_countdown_color.saturation,
            sticky_cart_countdown_color_b: w.sticky_cart_countdown_color.brightness,
            sticky_cart_countdown_background_color_h: w.sticky_cart_countdown_background_color.hue,
            sticky_cart_countdown_background_color_s: w.sticky_cart_countdown_background_color.saturation,
            sticky_cart_countdown_background_color_b: w.sticky_cart_countdown_background_color.brightness
        };
        const posts = this.state.data.dataStickyCart;
        if (typeof posts !== 'undefined') {
            const ps = posts[0];
            const arr2 = {
                enabled_sticky_cart: ps.enabled_sticky_cart,
                sticky_cart_show_mobile: ps.sticky_cart_show_mobile,
                sticky_cart_show_desktop: ps.sticky_cart_show_desktop,
                sticky_cart_hide_page: ps.sticky_cart_hide_page,
                sticky_cart_hide_empty: ps.sticky_cart_hide_empty,
                sticky_cart_show_countdown: ps.sticky_cart_show_countdown,
                sticky_cart_position: ps.sticky_cart_position,
                sticky_cart_distance: ps.sticky_cart_distance,
                sticky_cart_redirect: ps.sticky_cart_redirect,
                sticky_cart_icon: ps.sticky_cart_icon,
                sticky_cart_total_color_h: ps.sticky_cart_total_color_h,
                sticky_cart_total_color_s: ps.sticky_cart_total_color_s,
                sticky_cart_total_color_b: ps.sticky_cart_total_color_b,
                sticky_cart_total_background_color_h: ps.sticky_cart_total_background_color_h,
                sticky_cart_total_background_color_s: ps.sticky_cart_total_background_color_s,
                sticky_cart_total_background_color_b: ps.sticky_cart_total_background_color_b,
                sticky_cart_icon_color_h: ps.sticky_cart_icon_color_h,
                sticky_cart_icon_color_s: ps.sticky_cart_icon_color_s,
                sticky_cart_icon_color_b: ps.sticky_cart_icon_color_b,
                sticky_cart_background_color_h: ps.sticky_cart_background_color_h,
                sticky_cart_background_color_s: ps.sticky_cart_background_color_s,
                sticky_cart_background_color_b: ps.sticky_cart_background_color_b,

                sticky_cart_countdown_color_h: ps.sticky_cart_countdown_color_h,
                sticky_cart_countdown_color_s: ps.sticky_cart_countdown_color_s,
                sticky_cart_countdown_color_b: ps.sticky_cart_countdown_color_b,
                sticky_cart_countdown_background_color_h: ps.sticky_cart_countdown_background_color_h,
                sticky_cart_countdown_background_color_s: ps.sticky_cart_countdown_background_color_s,
                sticky_cart_countdown_background_color_b: ps.sticky_cart_countdown_background_color_b,
            };

            const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
            const a = arr2;
            const b = stateData;
            if (equals(a, b)) {
                return true;
            } else {
                return false;
            }
        }
    };

    discard = () => {
        const posts = this.state.data.dataStickyCart[0];
        const sticky_cart_icon = this.state.data.iconsStickyCart.find(element => {
            return element.id === (this.state.data.dataStickyCart[0].sticky_cart_icon)
        });
        this.setState({
            loading: false,
            enabled_sticky_cart: posts.enabled_sticky_cart,
            sticky_cart_show_mobile: posts.sticky_cart_show_mobile,
            sticky_cart_show_desktop: posts.sticky_cart_show_desktop,
            sticky_cart_hide_page: posts.sticky_cart_hide_page,
            sticky_cart_hide_empty: posts.sticky_cart_hide_empty,
            sticky_cart_show_countdown: posts.sticky_cart_show_countdown,
            sticky_cart_position: posts.sticky_cart_position,
            sticky_cart_distance: posts.sticky_cart_distance,
            sticky_cart_redirect: posts.sticky_cart_redirect,
            sticky_cart_icon: posts.sticky_cart_icon,
            sticky_cart_total_color: {
                hue: posts.sticky_cart_total_color_h,
                saturation: posts.sticky_cart_total_color_s,
                brightness: posts.sticky_cart_total_color_b
            },
            sticky_cart_total_color_hex: hsbToHex({
                hue: posts.sticky_cart_total_color_h,
                saturation: posts.sticky_cart_total_color_s,
                brightness: posts.sticky_cart_total_color_b
            }).replace(/\#/, ""),

            sticky_cart_total_background_color: {
                hue: posts.sticky_cart_total_background_color_h,
                saturation: posts.sticky_cart_total_background_color_s,
                brightness: posts.sticky_cart_total_background_color_b
            },
            sticky_cart_total_background_color_hex: hsbToHex({
                hue: posts.sticky_cart_total_background_color_h,
                saturation: posts.sticky_cart_total_background_color_s,
                brightness: posts.sticky_cart_total_background_color_b
            }).replace(/\#/, ""),

            sticky_cart_icon_color: {
                hue: posts.sticky_cart_icon_color_h,
                saturation: posts.sticky_cart_icon_color_s,
                brightness: posts.sticky_cart_icon_color_b
            },
            sticky_cart_icon_color_hex: hsbToHex({
                hue: posts.sticky_cart_icon_color_h,
                saturation: posts.sticky_cart_icon_color_s,
                brightness: posts.sticky_cart_icon_color_b
            }).replace(/\#/, ""),
            sticky_cart_background_color: {
                hue: posts.sticky_cart_background_color_h,
                saturation: posts.sticky_cart_background_color_s,
                brightness: posts.sticky_cart_background_color_b
            },
            sticky_cart_background_color_hex: hsbToHex({
                hue: posts.sticky_cart_background_color_h,
                saturation: posts.sticky_cart_background_color_s,
                brightness: posts.sticky_cart_background_color_b
            }).replace(/\#/, ""),

            sticky_cart_countdown_color: {
                hue: posts.sticky_cart_countdown_color_h,
                saturation: posts.sticky_cart_countdown_color_s,
                brightness: posts.sticky_cart_countdown_color_b
            },
            sticky_cart_countdown_color_hex: hsbToHex({
                hue: posts.sticky_cart_countdown_color_h,
                saturation: posts.sticky_cart_countdown_color_s,
                brightness: posts.sticky_cart_countdown_color_b
            }).replace(/\#/, ""),
            sticky_cart_countdown_background_color: {
                hue: posts.sticky_cart_countdown_background_color_h,
                saturation: posts.sticky_cart_countdown_background_color_s,
                brightness: posts.sticky_cart_countdown_background_color_b
            },
            sticky_cart_countdown_background_color_hex: hsbToHex({
                hue: posts.sticky_cart_countdown_background_color_h,
                saturation: posts.sticky_cart_countdown_background_color_s,
                brightness: posts.sticky_cart_countdown_background_color_b
            }).replace(/\#/, ""),

            cart_bar_button_background_color_hex: hsbToHex({
                hue: posts.cart_bar_button_background_color_h,
                saturation: posts.cart_bar_button_background_color_s,
                brightness: posts.cart_bar_button_background_color_b,
            }).replace(/\#/, ""),
            sticky_cart_icon_svg: sticky_cart_icon.icon,
            popover1: false,
            popover2: false,
            popover3: false,
            popover4: false,
            popover5: false,
            popover6: false
        });
        this.props.updateGridItemsAddOns({ sticky_cart: posts.enabled_sticky_cart });
    };

    save = async () => {
        this.setState({
            loading: true
        });
        const {
            enabled_sticky_cart,
            sticky_cart_show_mobile,
            sticky_cart_show_desktop,
            sticky_cart_hide_page,
            sticky_cart_hide_empty,
            sticky_cart_show_countdown,
            sticky_cart_position,
            sticky_cart_distance,
            sticky_cart_redirect,
            sticky_cart_icon,
            sticky_cart_total_color,
            sticky_cart_total_color_hex,
            sticky_cart_total_background_color,
            sticky_cart_total_background_color_hex,
            sticky_cart_icon_color,
            sticky_cart_icon_color_hex,
            sticky_cart_background_color,
            sticky_cart_background_color_hex,
            sticky_cart_countdown_color,
            sticky_cart_countdown_color_hex,
            sticky_cart_countdown_background_color,
            sticky_cart_countdown_background_color_hex,
        } = this.state;

        const requestBody = {
            enabled_sticky_cart: enabled_sticky_cart,
            sticky_cart_show_mobile: sticky_cart_show_mobile,
            sticky_cart_show_desktop: sticky_cart_show_desktop,
            sticky_cart_hide_page: sticky_cart_hide_page,
            sticky_cart_hide_empty: sticky_cart_hide_empty,
            sticky_cart_show_countdown: sticky_cart_show_countdown,
            sticky_cart_position: sticky_cart_position,
            sticky_cart_distance: sticky_cart_distance,
            sticky_cart_redirect: sticky_cart_redirect,
            sticky_cart_icon: sticky_cart_icon,
            sticky_cart_total_color_h: sticky_cart_total_color.hue,
            sticky_cart_total_color_s: sticky_cart_total_color.saturation,
            sticky_cart_total_color_b: sticky_cart_total_color.brightness,
            sticky_cart_total_color_hex: '#' + sticky_cart_total_color_hex,
            sticky_cart_total_background_color_h: sticky_cart_total_background_color.hue,
            sticky_cart_total_background_color_s: sticky_cart_total_background_color.saturation,
            sticky_cart_total_background_color_b: sticky_cart_total_background_color.brightness,
            sticky_cart_total_background_color_hex: '#' + sticky_cart_total_background_color_hex,
            sticky_cart_icon_color_h: sticky_cart_icon_color.hue,
            sticky_cart_icon_color_s: sticky_cart_icon_color.saturation,
            sticky_cart_icon_color_b: sticky_cart_icon_color.brightness,
            sticky_cart_icon_color_hex: '#' + sticky_cart_icon_color_hex,
            sticky_cart_background_color_h: sticky_cart_background_color.hue,
            sticky_cart_background_color_s: sticky_cart_background_color.saturation,
            sticky_cart_background_color_b: sticky_cart_background_color.brightness,
            sticky_cart_background_color_hex: '#' + sticky_cart_background_color_hex,

            sticky_cart_countdown_color_h: sticky_cart_countdown_color.hue,
            sticky_cart_countdown_color_s: sticky_cart_countdown_color.saturation,
            sticky_cart_countdown_color_b: sticky_cart_countdown_color.brightness,
            sticky_cart_countdown_color_hex: '#' + sticky_cart_countdown_color_hex,
            sticky_cart_countdown_background_color_h: sticky_cart_countdown_background_color.hue,
            sticky_cart_countdown_background_color_s: sticky_cart_countdown_background_color.saturation,
            sticky_cart_countdown_background_color_b: sticky_cart_countdown_background_color.brightness,
            sticky_cart_countdown_background_color_hex: '#' + sticky_cart_countdown_background_color_hex
        };
        const method = 'PUT';
        const app = this.context;
        await makePutPostRequest('/api/sticky_cart', method, requestBody, app).then(response => {
            if (response) {
                this.getStickyCartData();
                this.setState({ toastMarkup: true });
            }
        }).catch(err => {
            this.notifyError(err, 'updateStickyCart');
        });
    };

    titles = () => {
        const app = this.context;
        const datas = { title: 'Sticky Cart' };
        const titleBarOptions = {
            title: datas.title
        };
        TitleBar.create(app, titleBarOptions);
    };

    iconChange = (icon_svg, icon_id) => {
        this.setState({
            modal: 0,
            sticky_cart_icon: icon_id,
            sticky_cart_icon_svg: icon_svg
        });
        /* const color = '#'+this.state.sticky_cart_icon_color_hex;
        setTimeout(function(){ 
            const icon_svg_color = document.querySelector("#content svg path");
            icon_svg_color.setAttribute("fill",color)
        }, 80); */

    };

    iconPreview = () => {
        if (this.state.data.iconsStickyCart != undefined) {
            if (this.state.enabled_sticky_cart) {
                /* const sticky_cart_icon = this.state.data.iconsStickyCart.find(element => {
                    return element.id === (this.state.data.dataStickyCart[0].sticky_cart_icon)
                });
                console.log(this.state.sticky_cart_icon_svg) */
                const a = this.state.sticky_cart_icon_svg;
                const b = '#' + this.state.sticky_cart_icon_color_hex
                /*const sticky_cart_icon = this.state.data.dataStickyCart[0].sticky_cart_icon - 1;
                const a = this.state.data.iconsStickyCart[sticky_cart_icon.icon].icon */
                setTimeout(function () {
                    if (document.getElementById('content') != null) {
                        document.getElementById('content').innerHTML = "";
                        var doc = new DOMParser().parseFromString(a, 'application/xml');
                        var el = document.getElementById("content")
                        var isEmpty = document.getElementById('content').innerHTML === "";
                        if (isEmpty) {
                            el.appendChild(
                                el.ownerDocument.importNode(doc.documentElement, true)
                            )
                            /* const icon_svg_color = document.querySelector("#content svg path");
                            icon_svg_color.setAttribute("fill",b) */

                            const paths = document.querySelectorAll("#content svg path");
                            for (let i = 0; i < paths.length; i++) {
                                paths[i].setAttribute("style", "fill:" + b + ";")
                                paths[i].setAttribute("fill", b)
                            };
                            const paths2 = document.querySelectorAll("#content svg circle");
                            for (let i = 0; i < paths2.length; i++) {
                                paths2[i].setAttribute("style", "fill:" + b + ";");
                            };

                        }
                    }
                }, 50);
            };
        };
    };

    async componentDidMount() {
        this.getStickyCartData();
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    };

    render() {
        const ButtonColor = ({ height = '100%', width = '100%', background = '#000000', border = "1px solid #898f94", borderRadius = "0.3rem", }) => {
            return (
                <div
                    style={{
                        background: background,
                        height: height,
                        width: width,
                        borderRadius: borderRadius,
                        border: border,
                    }}
                />
            );
        };

        this.iconPreview();
        const loading = this.state.loading ? (
            <div>
                <Loading />
            </div>
        ) : null;

        var active = this.validateData();
        const contextualSaveBarMarkup = !active ? (
            <ContextualSaveBar
                message="Unsaved changes"
                saveAction={{
                    loading: this.state.loading,
                    onAction: () => this.save(),
                }}
                discardAction={{
                    onAction: () => this.discard(),
                }}
                visible
                alignContentFlush
                fullWidth={true}
            />
        ) : null;

        const hexcolor_sticky_cart_total_color = hsbToHex(this.state.sticky_cart_total_color);
        const activator_sticky_cart_total_color = (
            <Button onClick={() => { this.handlePopover("popover1") }} id='sticky_cart_button_color'>
                <ButtonColor background={hexcolor_sticky_cart_total_color} />
            </Button>
        );

        const hexcolor_sticky_cart_total_background_color = hsbToHex(this.state.sticky_cart_total_background_color);
        const activator_sticky_cart_total_background_color = (
            <Button onClick={() => { this.handlePopover("popover2") }} id='sticky_cart_button_color2'>
                <ButtonColor background={hexcolor_sticky_cart_total_background_color} />
            </Button>
        );

        const hexcolor_sticky_cart_icon_color = hsbToHex(this.state.sticky_cart_icon_color);
        const activator_sticky_cart_icon_color = (
            <Button onClick={() => { this.handlePopover("popover3") }} id='sticky_cart_button_color3'>
                <ButtonColor background={hexcolor_sticky_cart_icon_color} />
            </Button>
        );

        const hexcolor_sticky_cart_background_color = hsbToHex(this.state.sticky_cart_background_color);
        const activator_sticky_cart_background_color = (
            <Button onClick={() => { this.handlePopover("popover4") }} id='sticky_cart_button_color4'>
                <ButtonColor background={hexcolor_sticky_cart_background_color} />
            </Button>
        );

        const hexcolor_sticky_cart_countdown_color = hsbToHex(this.state.sticky_cart_countdown_color);
        const activator_sticky_cart_countdown_color = (
            <Button onClick={() => { this.handlePopover("popover5") }} id='sticky_cart_button_color5'>
                <ButtonColor background={hexcolor_sticky_cart_countdown_color} />
            </Button>
        );
        const hexcolor_sticky_cart_countdown_background_color = hsbToHex(this.state.sticky_cart_countdown_background_color);
        const activator_sticky_cart_countdown_background_color = (
            <Button onClick={() => { this.handlePopover("popover6") }} id='sticky_cart_button_color6'>
                <ButtonColor background={hexcolor_sticky_cart_countdown_background_color} />
            </Button>
        );


        var textPosition =
            this.state.sticky_cart_position === 'hs-top-right' ?
                textPosition = 'Top Right' :
                this.state.sticky_cart_position === 'hs-bottom-right' ?
                    textPosition = 'Bottom Right' :
                    this.state.sticky_cart_position === 'hs-bottom-right' ?
                        textPosition = 'Top Left' : 'Bottom Left'
        const activator = <div ref={this.yourRef} ><Button variant='primary' tone="success" onClick={() => this.handleChange("modal")}>Select Icon</Button></div>;

        const properties_countdown_sticky = this.state.sticky_cart_show_countdown ?
            <div>
                <Card>
                    <BlockStack gap={200}>
                        <Text as="h1" variant="headingMd">
                            CountDown Sticky Cart
                        </Text>
                        <InlineGrid gap="400" columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                            <TextField
                                label="Sticky Cart Countdown Color"
                                value={this.state.sticky_cart_countdown_color_hex || '222222'}
                                onChange={(value) => { this.handleOnChangeColor(value, "sticky_cart_countdown_color_hex", "sticky_cart_countdown_color") }}
                                prefix='#'
                                maxLength={6}
                                connectedRight={
                                    <Popover
                                        active={this.state.popover5}
                                        activator={activator_sticky_cart_countdown_color}
                                        onClose={() => { this.handlePopover("popover5", 0) }}
                                    >
                                        <Popover.Section>
                                            <ColorPicker
                                                onChange={(value) => { this.handleColors(value, "sticky_cart_countdown_color", "sticky_cart_countdown_color_hex") }}
                                                color={this.state.sticky_cart_countdown_color}
                                            />
                                        </Popover.Section>
                                        <Popover.Section>
                                            <TextField value={hexcolor_sticky_cart_countdown_color} />
                                        </Popover.Section>
                                    </Popover>
                                }
                            />
                            <TextField
                                label="Sticky Cart Background Color"
                                value={this.state.sticky_cart_countdown_background_color_hex || 'ffffff'}
                                onChange={(value) => { this.handleOnChangeColor(value, "sticky_cart_countdown_background_color_hex", "sticky_cart_countdown_background_color") }}
                                prefix='#'
                                maxLength={6}
                                connectedRight={
                                    <Popover
                                        active={this.state.popover6}
                                        activator={activator_sticky_cart_countdown_background_color}
                                        onClose={() => { this.handlePopover("popover6", 0) }}
                                    >
                                        <Popover.Section>
                                            <ColorPicker
                                                onChange={(value) => { this.handleColors(value, "sticky_cart_countdown_background_color", "sticky_cart_countdown_background_color_hex") }}
                                                color={this.state.sticky_cart_countdown_background_color}
                                            />
                                        </Popover.Section>
                                        <Popover.Section>
                                            <TextField value={hexcolor_sticky_cart_countdown_background_color} />
                                        </Popover.Section>
                                    </Popover>
                                }
                            />
                        </InlineGrid>
                    </BlockStack>
                </Card>
            </div>
            : '';
        const sticky_cart = (
            <BlockStack gap="500">
                <Card>
                    <InlineGrid alignItems="center" gap="400" columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}>
                        <InlineStack gap="400" /* blockAlign="center" align="center" */>
                            <Checkbox
                                label="Show on tablets and mobile devices"
                                checked={this.state.sticky_cart_show_mobile}
                                onChange={() => this.handleChange("sticky_cart_show_mobile")}
                            />
                        </InlineStack>
                        <InlineStack gap="400" /* blockAlign="center" align="center" */>
                            <Checkbox
                                label="Show on desktop computers"
                                checked={this.state.sticky_cart_show_desktop}
                                onChange={() => this.handleChange("sticky_cart_show_desktop")}
                            />
                        </InlineStack>
                        <InlineStack gap="400" /* blockAlign="center" align="center" */>
                            <Checkbox
                                label="Hide Sticky Cart on Cart page"
                                checked={this.state.sticky_cart_hide_page}
                                onChange={() => this.handleChange("sticky_cart_hide_page")}
                            />
                        </InlineStack>
                        <InlineStack gap="400"/*  blockAlign="center" align="center" */>
                            <Checkbox
                                label="Hide Sticky Cart if it's empty"
                                checked={this.state.sticky_cart_hide_empty}
                                onChange={() => this.handleChange("sticky_cart_hide_empty")}
                            />
                        </InlineStack>
                        <InlineStack gap="400"/*  blockAlign="center" align="center" */>
                            <Checkbox
                                label="Show CountDown Sticky Cart"
                                checked={this.state.sticky_cart_show_countdown}
                                onChange={() => this.handleChange("sticky_cart_show_countdown")}
                            />
                        </InlineStack>
                    </InlineGrid>
                </Card>
                <Card>
                    <Text as="h1" variant="headingMd">Sticky Cart Icon</Text>
                    <div className='icon'>
                        <InlineStack gap="400" wrap={false} blockAlign="center" align="center">
                            <InlineStack gap="400" wrap={false} blockAlign="center" align="center">
                                <div id='content'>
                                </div>
                                <Modal
                                    activator={activator}
                                    open={this.state.modal}
                                    onClose={() => this.handleChange("modal")}
                                    title="Select the icon of your preference"
                                    secondaryActions={[
                                        {
                                            content: 'Cancel',
                                            onAction: () => this.handleChange("modal"),
                                        },
                                    ]}
                                >
                                    <Modal.Section>
                                        <InlineGrid gap="400" columns={11}>
                                            {typeof this.state.data.iconsStickyCart !== 'undefined' ? this.state.data.iconsStickyCart.map((el, i) => (
                                                <Button key={i} id={'button' + i} icon={el.icon} onClick={() => this.iconChange(el.icon, el.id)}></Button>
                                            )) : ''}
                                        </InlineGrid>
                                    </Modal.Section>
                                </Modal>
                            </InlineStack>
                            <TextField
                                label="Sticky Cart Button Icon Color"
                                value={this.state.sticky_cart_icon_color_hex || '000000'}
                                onChange={(value) => { this.handleOnChangeColor(value, "sticky_cart_icon_color_hex", "sticky_cart_icon_color") }}
                                prefix='#'
                                maxLength={6}
                                connectedRight={
                                    <Popover
                                        active={this.state.popover3}
                                        activator={activator_sticky_cart_icon_color}
                                        onClose={() => { this.handlePopover("popover3", 0) }}
                                    >
                                        <Popover.Section>
                                            <ColorPicker
                                                onChange={(value) => { this.handleColors(value, "sticky_cart_icon_color", "sticky_cart_icon_color_hex") }}
                                                color={this.state.sticky_cart_icon_color}
                                            />
                                        </Popover.Section>
                                        <Popover.Section>
                                            <TextField value={hexcolor_sticky_cart_icon_color} />
                                        </Popover.Section>
                                    </Popover>
                                }
                            />
                        </InlineStack >
                    </div>
                </Card>
                <Card>
                    <BlockStack gap={200}>
                        <Text as="h1" variant="headingMd">
                            Sticky Cart Properties
                        </Text>
                        <InlineGrid gap="400" columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}>
                            <Select
                                label="Sticky Cart position"
                                options={this.state.arr_options_position}
                                value={this.state.sticky_cart_position}
                                onChange={(value) => { this.handleOnChange(value, "sticky_cart_position") }}
                            />
                            <Select
                                label={`Sticky Cart distance (` + textPosition + `)`}
                                options={this.state.arr_options_distance}
                                value={this.state.sticky_cart_distance}
                                onChange={(value) => { this.handleOnChange(value, "sticky_cart_distance") }}
                            />
                            <Select
                                label="Click on Sticky Cart takes User to"
                                options={this.state.arr_options_redirect}
                                value={this.state.sticky_cart_redirect}
                                onChange={(value) => { this.handleOnChange(value, "sticky_cart_redirect") }}
                            />
                            <TextField
                                label="Sticky Cart Total Quantity Color"
                                value={this.state.sticky_cart_total_color_hex || '000000'}
                                onChange={(value) => { this.handleOnChangeColor(value, "sticky_cart_total_color_hex", "sticky_cart_total_color") }}
                                prefix='#'
                                maxLength={6}
                                connectedRight={
                                    <Popover
                                        active={this.state.popover1}
                                        activator={activator_sticky_cart_total_color}
                                        onClose={() => { this.handlePopover("popover1", 0) }}
                                    >
                                        <Popover.Section>
                                            <ColorPicker
                                                onChange={(value) => { this.handleColors(value, "sticky_cart_total_color", "sticky_cart_total_color_hex") }}
                                                color={this.state.sticky_cart_total_color}
                                            />
                                        </Popover.Section>
                                        <Popover.Section>
                                            <TextField value={hexcolor_sticky_cart_total_color} />
                                        </Popover.Section>
                                    </Popover>
                                }
                            />
                            <TextField
                                label="Sticky Cart Total Qty. Background Color"
                                value={this.state.sticky_cart_total_background_color_hex || '000000'}
                                onChange={(value) => { this.handleOnChangeColor(value, "sticky_cart_total_background_color_hex", "sticky_cart_total_background_color") }}
                                prefix='#'
                                maxLength={6}
                                connectedRight={
                                    <Popover
                                        active={this.state.popover2}
                                        activator={activator_sticky_cart_total_background_color}
                                        onClose={() => { this.handlePopover("popover2", 0) }}
                                    >
                                        <Popover.Section>
                                            <ColorPicker
                                                onChange={(value) => { this.handleColors(value, "sticky_cart_total_background_color", "sticky_cart_total_background_color_hex") }}
                                                color={this.state.sticky_cart_total_background_color}
                                            />
                                        </Popover.Section>
                                        <Popover.Section>
                                            <TextField value={hexcolor_sticky_cart_total_background_color} />
                                        </Popover.Section>
                                    </Popover>
                                }
                            />
                            <TextField
                                label="Sticky Cart Background Color"
                                value={this.state.sticky_cart_background_color_hex || '000000'}
                                onChange={(value) => { this.handleOnChangeColor(value, "sticky_cart_background_color_hex", "sticky_cart_background_color") }}
                                prefix='#'
                                maxLength={6}
                                connectedRight={
                                    <Popover
                                        active={this.state.popover4}
                                        activator={activator_sticky_cart_background_color}
                                        onClose={() => { this.handlePopover("popover4", 0) }}
                                    >
                                        <Popover.Section>
                                            <ColorPicker
                                                onChange={(value) => { this.handleColors(value, "sticky_cart_background_color", "sticky_cart_background_color_hex") }}
                                                color={this.state.sticky_cart_background_color}
                                            />
                                        </Popover.Section>
                                        <Popover.Section>
                                            <TextField value={hexcolor_sticky_cart_background_color} />
                                        </Popover.Section>
                                    </Popover>
                                }
                            />
                        </InlineGrid>
                    </BlockStack>
                </Card>
                {properties_countdown_sticky}
            </BlockStack>
        );

        const toastMarkup = this.state.toastMarkup ? <Toast content="Sticky Cart updated successfully!" onDismiss={() => { this.handlePopover("toastMarkup", 0) }} duration={2500} /> : null;
        const toastError = this.state.toastError ? <Toast content={this.state.messageError} error onDismiss={() => { this.handlePopover("toastError", 0) }} duration={2500} /> : null;


        const stickyCartToogle =
            <InlineStack gap="200" wrap={false}>
                <InlineStack gap="200" align="start" blockAlign="baseline">
                    <label htmlFor="hs-active">
                        <Text as="p" fontWeight="medium" tone={this.state.enabled_sticky_cart ? "success" : 'critical'}>The Sticky Cart is {this.state.enabled_sticky_cart ? 'enabled' : 'disabled'}.</Text>
                    </label>
                </InlineStack>
            </InlineStack>;

        const actionMarkup = (
            <Button
                role="switch"
                id="hs-active"
                ariaChecked={this.state.enabled_sticky_cart ? 'false' : 'true'}
                onClick={() => this.toggleIsDirty("enabled_sticky_cart")}
                size="slim"
                variant="primary"
                tone={!this.state.enabled_sticky_cart ? "success" : "critical"}
            >
                {!this.state.enabled_sticky_cart ? "Turn on" : "Turn off"}
            </Button>
        );

        return (typeof this.state.data.dataStickyCart === 'undefined' ? <SkeletonLoad></SkeletonLoad> :
            <div>
                {loading}
                {/*  {<BannerHead {...this.props}/>} */}
                <BlockStack gap="500">
                    <Card roundedAbove="xs">
                        <BlockStack gap={{ xs: '400', sm: '500' }}>
                            <Box width="100%">
                                <BlockStack gap={{ xs: '200', sm: '400' }}>
                                    <Box width="100%">
                                        <InlineStack
                                            gap="1200"
                                            align="space-between"
                                            blockAlign="center"
                                            wrap={false}
                                        >
                                            {stickyCartToogle}
                                            <Box minWidth="fit-content">
                                                <InlineStack align="end">{actionMarkup}</InlineStack>
                                            </Box>
                                        </InlineStack>
                                    </Box>
                                </BlockStack>
                            </Box>
                        </BlockStack>
                    </Card>
                    {/* <Collapsible
                        open={this.state.enabled_sticky_cart}
                        id="basic-collapsible"
                        transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                    >
                    </Collapsible> */}
                    <Box paddingBlockEnd="400">
                        {sticky_cart}
                    </Box>
                    {contextualSaveBarMarkup}
                    {toastMarkup}
                    {toastError}
                </BlockStack>
            </div>);
    }

    toggleIsDirty = (toggle) => {
        const isDirty = this.state[`${toggle}`];
        if (isDirty == 1) {
            this.setState({ [`${toggle}`]: 0, });
            this.props.updateGridItemsAddOns({ sticky_cart: false });
        } else {
            this.setState({ [`${toggle}`]: 1, });
            this.props.updateGridItemsAddOns({ sticky_cart: true });
        }
    };

    handleChange = (id) => {
        var validate = this.state[id];
        if (validate) {
            validate = 0;
        } else {
            validate = 1;
        }
        this.setState({ [id]: validate });
    };

    handleOnChange = (value, second) => {
        this.setState({ [second]: value });
    };

    handlePopover = (popover, val = 1) => {
        this.setState({ [popover]: val })
    };

    handleColors = (value, colorhsb, colorhex) => {
        this.setState({ [colorhsb]: value, [colorhex]: hsbToHex(value).replace(/\#/, "") });
        /*  const color = hsbToHex(value);
         if(colorhsb === 'sticky_cart_icon_color'){
             setTimeout(function(){ 
                 const icon_svg_color = document.querySelector("#content svg path");
                 icon_svg_color.setAttribute("fill",color)
             }, 80);
         }; */
    };

    handleOnChangeColor = (value, hex, hsb) => {
        //const hextorgb = colorconvert.hex.rgb(value)
        //const rgbtohsb = rgbToHsb({ red: hextorgb[0], green: hextorgb[1], blue: hextorgb[2] })
        const hextorgb = hexToRgb('#' + value);
        const rgbtohsb = rgbToHsb({ red: hextorgb.red, green: hextorgb.green, blue: hextorgb.blue })
        this.setState({
            [hex]: value,
            [hsb]: {
                hue: rgbtohsb.hue,
                saturation: rgbtohsb.saturation,
                brightness: rgbtohsb.brightness
            }
        })
    };

    notifyError = (err, name) => {
        switch (name) {
            case 'updateStickyCart':
                this.setState({ toastError: true, messageError: JSON.stringify(err) });
                break;
        }
    };
}

export default StickyCart;