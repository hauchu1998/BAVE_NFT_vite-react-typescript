import React, { useState } from "react";
import { getCouponsApi, TokensInfo } from '../AxiosAPIs';

interface GetCouponsProps {
    defaultAccount: string| null;
}

var getCouponsTestData = {
    "address": "0xf16e9b0d03470827a95cdfd0cb8a8a3b46969b90",
    "token_ids": [1,2,3,4]
  }

export default function GetCoupons(props: GetCouponsProps) {
    const [take, setTake] = useState(false);
    const [coupons, setCoupons] = useState<TokensInfo[]>([])
    const [tokenSelection, setTokenSelection] = useState<number[]>([])

    const getCoupons = async () => {
        if (props.defaultAccount != null) {
            var getCouponsData = {
                "address": props.defaultAccount,
                "token_ids": tokenSelection,
            }
            await getCouponsApi(getCouponsTestData)
            .then((res) => {
                if (res.data.op_code == 1) {
                    console.log('成功取得折扣碼');
                    console.log(res.data.results);
                    setCoupons(res.data.results);
                    setTake(true)
                } else {
                    console.log('Token已過期，請重新進入綁定頁面');
                }
            })
            .catch(err => {
                console.log(err);
            })
            

        } else {
            alert('Connect Wallet');
        }
    }
    
    return  (
    <div>
        <button type="button" className='mt-5 p-5 bg-gray-400 text-xl rounded-md text-center' onClick={() => getCoupons()}>領取折扣碼</button>
        {take? 
        <div className='bg-gray-200 justify-center items-center'>
            <p className='text-center font-bold'>折扣碼：</p>
            <ul>
            {coupons.map((coupon, index) => (
                <li key={coupon.tokenId+'_'+index}>{coupon.guppon}</li>
            ))}
            </ul>
        </div> : null}
    </div>
    )
}