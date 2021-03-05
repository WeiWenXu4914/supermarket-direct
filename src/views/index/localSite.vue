<template>
    <div>
        123
    </div>
</template>
<script>
import AMap from 'AMap';
export default {
    data () {
    return {
      lng: '',
      lat: '',
      address: '',
      initEdit: false,
      lngLat: '',
      fullAdress: '天津市西青区', // 可填写默认地址，下边填写默认的坐标
      district: '',
      province: ''
    }
  },
  methods() {
      
  }
}
</script>