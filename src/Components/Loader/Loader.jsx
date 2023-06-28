import { useEffect } from "react"
import { gsap } from "gsap"
import "./Styles/Loader.css"

function Loader({ visibility }) {
    useEffect(() => {
        let tl = gsap.timeline()
        tl.to(".Loader_el", {
            scale: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.3)",
            delay: 0
        })
        if (visibility) {
            tl.to(".Loader_el", {
                scale: 1,
                duration: 1.5,
                ease: "elastic.out(1, 0.3)",
                delay: 0
            })
        } else {
            tl.to(".Loader_el", {
                scale: 0,
                duration: 1.5,
                ease: "elastic.in(1, 0.3)",
                delay: 0
            })
        }
    }, [visibility])
    return (
        <div className="Loader Loader_el">
            <div className="Loader__image-group">
                <div className="Loader__circle-group">
                    <div className="Loader__circle Loader__circle_1"></div>
                    <div className="Loader__circle Loader__circle_2"></div>
                </div>
                <div className="Loader__circle-group">
                    <div className="Loader__circle Loader__circle_3"></div>
                    <div className="Loader__circle Loader__circle_4"></div>
                </div>
                <svg className="Loader__image" width="130" height="130" viewBox="0 0 50 50" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M39.8253 42.9433L39.8562 43.0056C38.5363 45.9052 35.6058 47.9215 32.2178 47.9215C29.1102 47.9215 26.3978 46.2274 24.9428 43.7227C23.4874 46.2274 20.775 47.9215 17.6678 47.9215C14.5499 47.9215 11.8371 46.2274 10.3821 43.702L10.3928 43.64C6.298 43.1097 3.11778 39.597 3.11778 35.3358C3.11778 33.1116 3.98 31.0747 5.41461 29.5782C4.37764 28.7999 3.53626 27.7908 2.95718 26.6308C2.3781 25.4708 2.07725 24.1918 2.0785 22.8953C2.0785 20.1935 3.36695 17.782 5.35225 16.2648C5.23793 15.7243 5.18571 15.1738 5.18571 14.6019C5.18571 9.97733 8.93753 6.22563 13.5524 6.22563C14.8925 6.22563 16.1506 6.53716 17.2725 7.10864C18.5615 4.14706 21.513 2.07861 24.9428 2.07861C28.2267 2.07861 31.0746 3.98051 32.4254 6.73462C33.3442 6.39712 34.3154 6.2248 35.2941 6.22563C39.9187 6.22563 43.6603 9.97733 43.6603 14.6018C43.6603 15.9424 43.3589 17.2106 42.7873 18.3332C45.7495 19.6217 47.8072 22.5735 47.8072 26.0031C47.8072 28.8092 46.4249 31.2929 44.3149 32.8102C44.5644 33.6003 44.6994 34.4523 44.6994 35.3358C44.6994 38.7034 42.7041 41.6232 39.8253 42.9433Z"
                        fill="#FF8906" />
                    <path
                        d="M1.03916 35.3358C1.03916 40.2226 4.43867 44.4275 9.09974 45.5146C11.0515 48.2949 14.2455 50 17.6678 50C20.4081 50 23.0094 48.9059 24.9428 47.0445C26.8758 48.9069 29.4771 50 32.2178 50C36.0995 50 39.6426 47.82 41.4476 44.4168C44.7015 42.5809 46.7781 39.1179 46.7781 35.3358C46.777 34.7461 46.7262 34.1576 46.6263 33.5764C48.6841 31.6141 49.8858 28.8778 49.8858 26.003C49.8858 22.5193 48.1446 19.3349 45.347 17.4121C45.5967 16.5123 45.7378 15.5757 45.7378 14.6017C45.7378 8.83693 41.0528 4.14702 35.293 4.14702C34.6445 4.14702 34.0041 4.20989 33.3733 4.32863C31.4394 1.66195 28.2967 0 24.9426 0C21.4619 0 18.2777 1.74263 16.3538 4.5439C15.4516 4.29005 14.5173 4.14546 13.5522 4.14546C7.79245 4.14546 3.10695 8.83602 3.10695 14.6007C3.10695 14.887 3.12683 15.1591 3.14761 15.4315C1.15946 17.3791 0 20.0864 0 22.8952C0 25.4564 0.965239 27.9162 2.62498 29.7994C1.59479 31.4395 1.03916 33.3466 1.03916 35.3358ZM13.5522 8.30417C14.5392 8.30417 15.4736 8.52541 16.3292 8.96087C16.3489 8.96996 16.3687 8.97399 16.3885 8.9836C16.4078 8.9927 16.4236 9.00543 16.4433 9.01465C16.487 9.03336 16.5326 9.04193 16.5772 9.05726C16.6494 9.08208 16.7199 9.10845 16.7915 9.12482C16.8569 9.1404 16.9214 9.15015 16.9868 9.1582C17.0573 9.1673 17.1284 9.17704 17.1989 9.18003C17.2228 9.18107 17.2476 9.18717 17.2715 9.18717C17.2988 9.18717 17.3238 9.17704 17.3496 9.176C17.4997 9.17039 17.6487 9.14879 17.7942 9.11157C17.8237 9.1039 17.8526 9.10091 17.882 9.09169C18.047 9.04102 18.2027 8.96697 18.3514 8.87656C18.3879 8.85473 18.4209 8.82888 18.4564 8.80511C18.5791 8.71987 18.692 8.62151 18.7933 8.51177C18.8172 8.48682 18.842 8.465 18.8649 8.43902C18.9623 8.32145 19.0522 8.19452 19.1247 8.0524C19.1374 8.02863 19.1425 8.00278 19.1537 7.97731C19.1602 7.96302 19.1724 7.9525 19.1785 7.93834C20.1778 5.64138 22.44 4.15715 24.9428 4.15715C27.3142 4.15715 29.5186 5.52771 30.56 7.65007C30.5747 7.68047 30.5955 7.70437 30.6117 7.73321C30.6788 7.85458 30.7575 7.96914 30.8467 8.07526C30.8935 8.13061 30.9415 8.1814 30.9934 8.23012C31.0896 8.32292 31.1948 8.40587 31.3075 8.47773C31.3613 8.51177 31.4145 8.54424 31.4713 8.57308C31.5337 8.60504 31.5973 8.63349 31.6636 8.65934C31.721 8.68221 31.7779 8.70299 31.8373 8.72079C31.9057 8.74158 31.9752 8.75678 32.0473 8.77055C32.1078 8.78224 32.1666 8.79133 32.2279 8.7964C32.2995 8.80407 32.3706 8.80602 32.4432 8.80602C32.5076 8.80602 32.571 8.80303 32.6355 8.79536C32.7737 8.78102 32.9102 8.75317 33.043 8.71222C33.077 8.70196 33.1125 8.69793 33.1469 8.6852C33.8336 8.43148 34.5572 8.30417 35.2962 8.30417C38.7631 8.30417 41.5836 11.1297 41.5836 14.6017C41.5836 15.6101 41.3664 16.5474 40.9372 17.3892C40.9269 17.4091 40.9239 17.4289 40.9143 17.4487C40.9052 17.4674 40.8925 17.4842 40.8844 17.5034C40.8645 17.5481 40.8563 17.5953 40.8406 17.64C40.8158 17.7086 40.791 17.777 40.7742 17.8465C40.7585 17.911 40.7503 17.9754 40.7407 18.0409C40.7296 18.1098 40.722 18.1793 40.7179 18.249C40.7149 18.3154 40.7189 18.3808 40.7231 18.4464C40.7275 18.5139 40.7306 18.5813 40.7407 18.6478C40.7514 18.7133 40.768 18.7767 40.7833 18.8401C40.8001 18.9056 40.8158 18.97 40.8387 19.0335C40.8605 19.0959 40.8884 19.1543 40.9162 19.2132C40.9457 19.2745 40.9737 19.3349 41.0081 19.3932C41.0411 19.4501 41.0808 19.5024 41.1203 19.5561C41.1598 19.6104 41.1989 19.6653 41.245 19.7155C41.2897 19.7662 41.3405 19.8109 41.3903 19.8575C41.4406 19.9033 41.4893 19.949 41.544 19.9895C41.6003 20.0321 41.6618 20.0677 41.7232 20.1052C41.7657 20.1301 41.8018 20.1621 41.8465 20.1839C41.8642 20.1926 41.882 20.1956 41.8998 20.2038C41.9216 20.2144 41.9393 20.2284 41.9611 20.2382C44.2483 21.2359 45.7285 23.4982 45.7285 26.003C45.7285 28.0253 44.7461 29.9399 43.101 31.1222C43.0781 31.1391 43.0613 31.1599 43.0395 31.1766C42.9807 31.2223 42.9265 31.272 42.8745 31.3234C42.8279 31.3688 42.7823 31.4136 42.7407 31.4624C42.696 31.5146 42.6574 31.5684 42.6189 31.6247C42.5803 31.6806 42.5417 31.7358 42.5087 31.7936C42.4762 31.851 42.4493 31.9104 42.4235 31.9708C42.3966 32.0316 42.3697 32.092 42.3489 32.1556C42.3271 32.22 42.3124 32.2855 42.2965 32.3519C42.2819 32.4154 42.2687 32.4767 42.2602 32.5411C42.2509 32.6087 42.2489 32.6762 42.2469 32.7457C42.2442 32.813 42.2445 32.8804 42.2478 32.9476C42.252 33.011 42.2616 33.0735 42.2717 33.1364C42.2834 33.2115 42.2977 33.2851 42.3175 33.3592C42.3245 33.3841 42.3255 33.4099 42.333 33.4348C42.5244 34.0407 42.6209 34.6791 42.6209 35.3347C42.6209 37.7875 41.1837 40.0334 38.9585 41.0529V41.0539C38.3845 41.3096 37.9599 41.8233 37.802 42.4423C36.7201 44.5137 34.5715 45.8428 32.2178 45.8428C30.1413 45.8428 28.1996 44.7964 27.0213 43.0959V14.3526C27.0213 13.2052 26.0901 12.274 24.9428 12.274C23.7954 12.274 22.8642 13.2052 22.8642 14.3526V43.0959C21.6854 44.7964 19.7444 45.8428 17.6678 45.8428C15.5466 45.8428 13.5705 44.7548 12.4025 42.9925C12.174 42.3073 11.601 41.7796 10.8886 41.6213C10.8131 41.603 10.7367 41.5887 10.6597 41.5787C7.54497 41.1757 5.19631 38.4922 5.19631 35.3358C5.19631 34.2656 5.48406 33.2471 5.97993 32.3387C7.37359 33.0061 8.89936 33.3519 10.4446 33.3506C11.592 33.3506 12.5232 32.4194 12.5232 31.272C12.5232 30.1247 11.592 29.1935 10.4446 29.1935C9.06726 29.1935 7.76413 28.755 6.66027 27.9151C5.09225 26.7398 4.15702 24.8648 4.15702 22.8954C4.15702 20.9542 5.07549 19.0929 6.61468 17.916C6.65131 17.8881 6.67911 17.8542 6.71367 17.8238C6.77148 17.773 6.82994 17.7232 6.88164 17.6658C6.92789 17.6162 6.96596 17.5628 7.00545 17.51C7.04611 17.4557 7.08664 17.404 7.12224 17.3466C7.15731 17.2883 7.18771 17.2274 7.21655 17.166C7.24552 17.1067 7.27501 17.0473 7.29775 16.9848C7.32061 16.923 7.33737 16.8605 7.35361 16.7971C7.37141 16.7306 7.38908 16.6651 7.40038 16.5966C7.4109 16.5306 7.41506 16.4641 7.41908 16.3978C7.42363 16.3312 7.4287 16.2647 7.42662 16.1973C7.42467 16.1226 7.41298 16.0475 7.40285 15.9729C7.39622 15.9273 7.39726 15.8811 7.38817 15.8345C7.30593 15.4493 7.26631 15.0459 7.26631 14.6008C7.26423 11.1296 10.0847 8.30404 13.5523 8.30404L13.5522 8.30417Z"
                        fill="white" />
                </svg>

            </div>
            <p className="Loader__text">Just a second!</p>
        </div>
    )
}

export default Loader