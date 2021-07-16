import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { use100vh } from 'react-div-100vh'

function Landing(props) {
    let history = useHistory();
    const [groupCode, setGroupCode] = useState(0)
    const height = use100vh()

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            history.push(`/${event.target.value}`)
        }
    }

    const handleChange = (event) => {
        setGroupCode(event.target.value)
    }

    return (
        <div style={{ backgroundColor: '#FB686B' }} class="flex w-screen justify-center flex-col">
            <div class="w-full bg-white flex px-24 py-4">
                <svg width="48" height="47" viewBox="0 0 48 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4997 37.9994C31.6122 37.9994 38.9994 30.6122 38.9994 21.4997C38.9994 12.3872 31.6122 5 22.4997 5C13.3872 5 6 12.3872 6 21.4997C6 30.6122 13.3872 37.9994 22.4997 37.9994ZM22.3843 27.6157C25.6979 27.6157 28.3842 24.9294 28.3842 21.6158C28.3842 18.3021 25.6979 15.6159 22.3843 15.6159C19.0706 15.6159 16.3844 18.3021 16.3844 21.6158C16.3844 24.9294 19.0706 27.6157 22.3843 27.6157Z" fill="#F4AC6A" />
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M33.3254 28.5069C33.0886 27.1907 32.9093 26.1945 35.2946 24.7103C39.7325 21.9491 38.572 17.7378 36.5136 16.292C35.5068 15.585 34.6192 15.4952 33.7136 15.4035C32.9651 15.3278 32.2042 15.2508 31.3536 14.823C29.1362 13.7074 29.0048 12.8956 28.83 11.8153C28.7331 11.2164 28.6228 10.535 28.1364 9.67364C26.7725 7.25846 15.2735 0.196213 14.0306 13.8725C13.5331 15.188 12.4622 15.7654 11.3181 16.3822C10.0059 17.0897 8.59725 17.8492 7.84664 19.8339C7.435 20.9223 7.65851 21.848 7.88715 22.7951C8.12657 23.7867 8.37162 24.8017 7.89904 26.0513C7.2257 27.8317 8.3471 31.2226 10.3772 30.2036C12.0035 29.4983 12.5381 30.5113 13.0783 31.5352C13.6943 32.7026 14.3176 33.8841 16.5756 32.5478C19.1828 31.6755 19.4207 33.6238 19.4207 33.6238C19.6997 36.3301 20.6528 36.9267 25.4555 37.1682C29.3043 37.3617 30.8446 35.7612 32.4675 33.13C33.7757 31.0089 33.5292 29.6395 33.3254 28.5069ZM22.6798 27.5691C25.9934 27.5691 28.6797 24.8828 28.6797 21.5692C28.6797 18.2555 25.9934 15.5693 22.6798 15.5693C19.3661 15.5693 16.6799 18.2555 16.6799 21.5692C16.6799 24.8828 19.3661 27.5691 22.6798 27.5691Z" fill="#89664C" />
                    <g filter="url(#filter1_d)">
                        <path d="M23.5488 32.2757C23.952 32.6171 24.1161 32.8667 24.1101 33.5895" stroke="#FEE976" stroke-width="2" />
                        <path d="M27.1406 12.4087C26.7374 12.7501 26.5734 12.9997 26.5794 13.7224" stroke="#C195C7" stroke-width="2" />
                        <path d="M20.3018 9.67596C20.1781 10.1896 20.1932 10.4879 20.6249 11.0675" stroke="#C195C7" stroke-width="2" />
                        <path d="M28.5352 25.7393C29.0568 25.823 29.353 25.7849 29.8976 25.3097" stroke="#C195C7" stroke-width="2" />
                        <path d="M14.082 19.7026C14.6037 19.7863 14.8999 19.7482 15.4445 19.273" stroke="#C195C7" stroke-width="2" />
                        <path d="M28.2471 34.9969C27.7902 34.7316 27.5 34.6609 26.8212 34.909" stroke="#C195C7" stroke-width="2" />
                        <path d="M10.1025 25.8686C10.0525 26.3946 10.1095 26.6877 10.6187 27.2007" stroke="#C195C7" stroke-width="2" />
                        <path d="M27.5264 28.1776C27.2945 28.6523 27.2447 28.9468 27.5409 29.6061" stroke="#E87689" stroke-width="2" />
                        <path d="M30.7354 32.7665C31.2359 32.5975 31.4803 32.4258 31.7408 31.7516" stroke="#E87689" stroke-width="2" />
                        <path d="M14.6816 24.5309C14.2784 24.8723 14.1144 25.1219 14.1204 25.8447" stroke="#E87689" stroke-width="2" />
                        <path d="M15.3408 15.4392C15.1862 15.9444 15.1832 16.2431 15.579 16.8479" stroke="#E87689" stroke-width="2" />
                        <path d="M23.8213 9.63687C23.4743 9.23844 23.2225 9.07791 22.4999 9.09391" stroke="#E87689" stroke-width="2" />
                        <path d="M28.1504 14.7658C27.7472 15.1072 27.5832 15.3568 27.5891 16.0796" stroke="#E87689" stroke-width="2" />
                        <path d="M35.2236 18.1331C34.8204 18.4744 34.6564 18.724 34.6624 19.4468" stroke="#E87689" stroke-width="2" />
                        <path d="M32.0957 22.1329C31.9653 22.6449 31.9764 22.9433 32.4005 23.5286" stroke="#FEE976" stroke-width="2" />
                        <path d="M11.1348 21.5793C11.3413 21.093 11.3754 20.7963 11.0449 20.1535" stroke="#FEE976" stroke-width="2" />
                        <path d="M18.2188 12.4087C18.3365 12.9237 18.4828 13.1841 19.1274 13.5111" stroke="#FEE976" stroke-width="2" />
                        <path d="M17.791 8.03937C17.3042 8.24474 17.0732 8.43396 16.863 9.12551" stroke="#FEE976" stroke-width="2" />
                        <path d="M13.8418 29.5819C13.9596 30.0969 14.1058 30.3573 14.7504 30.6843" stroke="#FEE976" stroke-width="2" />
                        <path d="M18.4473 27.0703C18.1404 27.5004 18.0428 27.7826 18.2264 28.4817" stroke="#C195C7" stroke-width="2" />
                    </g>
                    <g filter="url(#filter2_dd)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.8034 5.9733C17.6691 5.99925 17.5127 6.03499 17.332 6.08283L17.2696 5.84709C18.1522 5.55229 19.068 5.33005 20.0099 5.18744C20.0355 5.35626 20.0332 5.51998 20.016 5.665C19.9707 6.04766 19.8152 6.42985 19.6435 6.76957C19.2939 7.46154 18.7055 8.30327 18.0194 9.21578C17.4895 9.92051 16.8722 10.705 16.2167 11.5381L16.2167 11.5381C16.0138 11.7959 15.8074 12.0583 15.5987 12.3244C13.817 14.5966 11.841 17.1836 10.331 19.7834C8.80582 22.4094 7.84584 24.9011 7.9218 27.0027C7.93517 27.3726 7.9797 27.6016 8.02008 27.7331C8.09535 27.704 8.20356 27.6531 8.3487 27.5646C8.65342 27.3787 9.02939 27.0833 9.47298 26.6717C11.267 25.0071 13.6935 21.8948 16.2129 18.4703C17.2474 17.0643 18.2978 15.6053 19.3151 14.1921C20.7393 12.2139 22.099 10.3253 23.2605 8.7965C24.2563 7.48599 25.15 6.38075 25.8514 5.67814C25.9444 5.58495 26.0404 5.49225 26.1385 5.40309C27.0797 5.6149 27.9905 5.90715 28.8633 6.27224C28.8523 6.43959 28.825 6.59466 28.796 6.72638C28.7075 7.12793 28.5413 7.57398 28.3344 8.03714C27.9183 8.96855 27.268 10.1217 26.4853 11.4002C25.7278 12.6375 24.8257 14.0251 23.8542 15.4885C23.4895 15.4207 23.1134 15.3852 22.729 15.3852C22.282 15.3852 21.8462 15.4331 21.4265 15.5242C22.6798 13.6517 23.8431 11.8856 24.7796 10.3559C25.0228 9.95871 25.2484 9.58095 25.4548 9.22447C25.2621 9.47128 25.0613 9.73228 24.853 10.0065C23.6994 11.5247 22.373 13.3675 20.9675 15.3202L20.9674 15.3204L20.9673 15.3205L20.6633 15.7429C20.0252 15.9718 19.4362 16.3039 18.9163 16.7189C17.3908 17.8012 16.3929 19.5786 16.3843 21.5894C14.372 24.2553 12.4137 26.6714 10.8333 28.1378C10.3394 28.5961 9.85366 28.9892 9.39036 29.2719C9.04269 29.484 8.63751 29.6779 8.20578 29.7462C7.24705 28.0877 6.56865 26.2469 6.23535 24.2885C6.6829 22.4458 7.56156 20.5695 8.60155 18.7789C10.1889 16.0459 12.2441 13.3613 14.0248 11.0903C14.2398 10.8162 14.4502 10.5487 14.6554 10.288L14.6554 10.2879C15.3074 9.45935 15.9054 8.69933 16.4209 8.01382C17.0608 7.16271 17.5309 6.48135 17.8034 5.9733ZM13.5695 35.3764C12.6835 34.805 11.8557 34.151 11.0971 33.4253C11.0978 33.416 11.0986 33.4067 11.0994 33.3975C11.1389 32.9389 11.2672 32.4412 11.4433 31.9326C11.7963 30.9134 12.399 29.69 13.142 28.3609C14.0661 26.7079 15.2438 24.828 16.5168 22.876C16.6884 23.6791 17.0208 24.4226 17.4786 25.0713C16.5006 26.5959 15.6114 28.0425 14.8877 29.3369C14.1633 30.6327 13.6283 31.735 13.3332 32.5871C13.2234 32.9041 13.1547 33.1645 13.1184 33.372C13.153 33.352 13.1899 33.3299 13.2289 33.3056C13.8763 32.9032 14.7724 32.1327 15.8671 31.0523C17.0093 29.925 18.3092 28.5198 19.6835 26.975C20.3338 27.3033 21.0519 27.5167 21.8112 27.5887C20.1867 29.4331 18.6281 31.1375 17.272 32.4758C16.1618 33.5715 15.1333 34.4768 14.2847 35.0042C14.0611 35.1432 13.8199 35.2755 13.5695 35.3764ZM21.9784 37.992C20.8258 37.9562 19.703 37.8022 18.6217 37.5416C18.5577 37.1023 18.6681 36.6462 18.7917 36.2757C19.0587 35.4751 19.6133 34.4425 20.3076 33.304C21.327 31.6325 22.7433 29.5811 24.2846 27.4161C26.9085 26.728 28.8442 24.3403 28.8442 21.5005C28.8442 21.366 28.8399 21.2325 28.8313 21.1002C30.0751 19.3652 31.2424 17.7087 32.2045 16.2541C32.7036 15.4996 33.1402 14.8102 33.4998 14.2006C33.1964 14.5117 32.8681 14.859 32.5168 15.2395C31.3663 16.486 30.0212 18.0322 28.5792 19.714C28.365 19.0117 28.0278 18.363 27.5927 17.7931C28.8459 16.3372 30.022 14.9937 31.0472 13.883C32.0866 12.7569 33.0123 11.8242 33.7277 11.2535C34.0645 10.9848 34.4566 10.7114 34.8492 10.5898C34.8566 10.5875 34.8642 10.5852 34.872 10.5829C35.4494 11.2367 35.9758 11.9367 36.445 12.6765C36.4425 12.6849 36.4401 12.6932 36.4376 12.7014C36.3203 13.0966 36.1276 13.5387 35.8929 14.0029C35.4213 14.9356 34.7132 16.0867 33.8726 17.3575C32.3991 19.5853 30.4574 22.2719 28.5217 24.9501L28.5204 24.9519L28.5202 24.9522C28.2444 25.3338 27.9687 25.7152 27.6945 26.0952C25.4823 29.1605 23.3721 32.1204 22.0151 34.3454C21.5509 35.1065 21.1951 35.7496 20.9546 36.2623C21.0009 36.2274 21.0487 36.1906 21.0979 36.1518C21.7891 35.6081 22.6417 34.7883 23.6134 33.7772C24.7427 32.6022 25.9666 31.2408 27.2319 29.8333C28.1637 28.7968 29.118 27.7353 30.0734 26.705C32.2555 24.3517 34.4659 22.1349 36.1789 21.1611C36.6194 20.9108 37.0854 20.7073 37.5534 20.6242C38.0085 20.5434 38.518 20.5694 38.9869 20.8325C38.9957 21.0541 39.0002 21.2767 39.0002 21.5004C39.0002 22.3236 38.9399 23.1327 38.8235 23.9235H38.2296C38.2296 23.3672 38.1713 23.0033 38.0983 22.7801C38.061 22.6663 38.027 22.6089 38.0083 22.5835C37.9886 22.5827 37.955 22.5842 37.903 22.5934C37.746 22.6213 37.5039 22.7085 37.1673 22.8998C35.7723 23.6928 33.7711 25.6587 31.5399 28.0649C30.636 29.0397 29.6956 30.0852 28.7644 31.1206L28.7643 31.1206C27.4696 32.5601 26.1925 33.9799 25.0554 35.1631C24.0692 36.1892 23.1387 37.0911 22.3345 37.7238C22.2157 37.8172 22.0969 37.907 21.9784 37.992ZM18.3927 5.9208C18.3926 5.9209 18.3901 5.9205 18.3855 5.91931C18.3905 5.9201 18.3928 5.9207 18.3927 5.9208ZM27.8037 6.63324C27.8095 6.6304 27.8083 6.63156 27.8005 6.63481L27.8037 6.63324ZM38.031 22.5864L38.0297 22.5862C38.0288 22.5861 38.0272 22.5856 38.0252 22.5849L38.0291 22.5857C38.0304 22.586 38.031 22.5863 38.031 22.5864ZM37.996 22.5685C37.9942 22.567 37.9933 22.5662 37.9933 22.5661C37.9933 22.566 37.9943 22.5667 37.996 22.5685Z" fill="#463426" />
                    </g>
                    <defs>
                        <filter id="filter0_d" x="3" y="2" width="44.9994" height="44.9994" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                            <feMorphology radius="3" operator="dilate" in="SourceAlpha" result="effect1_dropShadow" />
                            <feOffset dx="3" dy="3" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                        </filter>
                        <filter id="filter1_d" x="8.08789" y="6.11801" width="30.7818" height="32.7437" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                            <feOffset dx="1" dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                        </filter>
                        <filter id="filter2_dd" x="0.235352" y="0.187439" width="46.7648" height="46.8046" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                            <feMorphology radius="3" operator="dilate" in="SourceAlpha" result="effect1_dropShadow" />
                            <feOffset dx="1" dy="2" />
                            <feGaussianBlur stdDeviation="2" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                            <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
                        </filter>
                    </defs>
                </svg>
                <p class="font-extrabold text-2xl" style={{color: '#FB686B'}}>consensus</p>
            </div>
            <div class="p-40 w-1/2">
                <p class="font-bold text-white text-5xl">group decisions<br></br>make sense with<br></br>Consensus</p>
                <p class="text-white">write some shit about some shit about some shit about some shit about some shit about consensus yassssaaaaaaaa waiyutttt</p>
                <div class="w-full flex flex-col mt-10">
                    {groupCode != 0 ? 
                    <svg style={{ color: 'rgba(255, 255, 255, 0.2)'}} onClick={() => history.push(`/${groupCode}`)} class="absolute self-end mt-1" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 32C24.8367 32 32 24.8365 32 16C32 7.16345 24.8367 0 16 0C7.16333 0 0 7.16345 0 16C0 24.8365 7.16333 32 16 32ZM26.3535 15.6465L23.1716 12.4645C22.9763 12.2692 22.6597 12.2692 22.4644 12.4645C22.2693 12.6597 22.2693 12.9763 22.4644 13.1716L24.793 15.5H7V16.5H24.793L22.4644 18.8284C22.2693 19.0237 22.2693 19.3402 22.4644 19.5355C22.6597 19.7308 22.9763 19.7308 23.1716 19.5355L26.3535 16.3535C26.5488 16.1583 26.5488 15.8417 26.3535 15.6465Z" fill="white" />
                    </svg> : null}
                    <input placeholder='# enter group code' style={{ background: 'rgba(255, 255, 255, 0.2)' }} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e)} class="mb-8 h-12 w-4/5 rounded-full text-md"></input>
                    <div style={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white', fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.75rem' }} onClick={() => history.push('/qs')} class="h-12 w-4/5 cursor-pointer rounded-full flex items-center justify-center">create a group</div>
                </div>
            </div>
        </div>
    )

}

export default Landing;
