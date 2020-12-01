import request from '@/utils/request';

export const getLocation = () => {
    return new Promise((res, rej) => {
        // if (localStorage.getItem('mapLocal')) res(JSON.parse(localStorage.getItem('mapLocal')))
        AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
            })
            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete);
            AMap.event.addListener(geolocation, 'error', onError);


            function onComplete(data) {
                // data是具体的定位信息
                getLngLatLocation();
                console.log('定位成功信息：', data);
                const local = {
                    country: data.addressComponent.country,
                    province: data.addressComponent.province,
                    district: data.addressComponent.district,
                    township: data.addressComponent.township
                }
                const mapJson = {
                    data: data,
                    local: local
                }
                res(mapJson)
            }

            function onError(data) {
                // 定位出错
                rej(data)
                console.log('定位失败错误：', data);
                const local = {
                        country: '定位中',
                        province: '定位中',
                        district: '定位中',
                        township: '定位中'
                    }
                    // 调用ip定位
                getLngLatLocation();
            }
        })
    })
}

export const getLngLatLocation = (lnglat) => {
    return new Promise((res, rej) => {
        // if (localStorage.getItem('mapLocal')) res(JSON.parse(localStorage.getItem('mapLocal')))
        //逆向地理编码
        AMap.plugin('AMap.Geocoder', function() {
            var geocoder = new AMap.Geocoder()
            geocoder.getAddress(lnglat, function(status, data) {
                if (status === 'complete' && data.info === 'OK') {
                    // result为对应的地理位置详细信息
                    console.log(data)
                    const result = data.regeocode.addressComponent
                    const local = {
                        country: result.country,
                        province: result.province,
                        district: result.district,
                        township: result.township,
                        street: result.street,
                        formattedAddress: data.regeocode.formattedAddress,
                        localText: result.province + '-' + result.district + '-' + result.street
                    }
                    const mapJson = {
                        data: data,
                        local: local
                    }
                    res(mapJson)
                }
            })

            function onError(data) {
                // 定位出错
                rej(data)
                console.log('定位失败错误：', data);
                const local = {
                    country: '定位失败',
                    province: '定位失败',
                    district: '定位失败',
                    township: '定位失败'
                }
            }
        })
    })
}

