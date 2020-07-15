<template>
  <div class="center-container">
    <div class="map-container">
      <div id="map-container"></div>
    </div>
  </div>
</template>

<script>
  var map
  export default {
    name: "Center",
    components: {

    },
    data: function () {
      return {

      }
    },

    mounted() {
      this.init()

    },

    methods: {
      init() {
        let that = this
        // 创建底图
        map = new AMap.Map('map-container', {
          mapStyle: 'amap://styles/darkblue',
          pitch: 10,
          features: ['bg', 'point'],
          zoom: 9,
          viewMode: '3D'
        })
        // map.on('click', function(e) {
        //   console.log('e',e)
        //   that.$store.dispatch('SwitchDisplayLevel', 'area')
        // })


        var adCode = 310000;
        var depth = 2;
        this.initPro(adCode, depth)

        // this.initHeatMap()

        let markerList = []
        for(let i=0;i<this.districts.length;i++){

          let  marker = new AMap.Marker({
            position: this.districts[i].center.split(','),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            content:"<div class='marker-box' data-markerId="+this.districts[i].name+">\
              <div class='marker-content'>\
                <p>异常设备数："+15+"</p><p>在线设备数："+205+"</p>\
              </div>\
              <img class='marker-icon' src='http://localhost:9528/static/img/point_marker.png'>\
              </div>"
          });
          markerList.push(marker)

        }
        map.add(markerList);

      },

      async initPro(code, dep){

        let data = await this.$request.get('http://a.amap.com/Loca/static/mock/tourist_attractions.csv')
        // var map = new AMap.Map('container', {
        //   mapStyle: 'amap://styles/1de318cbb8d12c02303a22c550b9ccc9',
        //   viewMode: '2D',
        //   pitch: 0,
        //   features: ['bg', 'road'],
        //   zoom: 3.8,
        //   center: [107.4976, 32.1697]
        // });

        map.on('mapload', function () {
          map.getMap().plugin(['AMap.ControlBar'], function () {
            var controlBar = new AMap.ControlBar();
            map.getMap().addControl(controlBar);
          });
        });

        var layer = new Loca.DistrictLayer({
          map: map,
          // fitView: true
        });

        layer.setData(data, {
          type: 'csv',
          lnglat: '经纬度',
          value: '知名景区数量'
        });

        layer.setOptions({
          mode: 'count',
          style: {
            color: ['#0c2c84', '#225ea8', '#225ea8', '#41b6c4', '#7fcdbb', '#c7e9b4', '#ffffcc'],
            height: [0, 300000],
            opacity: 0.86
          }
        });

        layer.render();


      },

      //区域颜色设置
      getColorByAdcode(adcode){
        let index =Math.floor(Math.random() * 4 + 0)

        let adcode_color = colors[index]
        return adcode_color
      },

      // 热力图生成
      initHeatMap(){
        let layer = new Loca.HeatmapLayer({
          map:map
        })
        let list = []
        this.heatmapData.forEach(item =>{
          list.push({
            coordinate: [item.lng, item.lat],
            count: item.count
          })
        })

        layer.setData(list, {
          lnglat: 'coordinate',
          value: 'count'
        })

        layer.setOptions({
          style: {
            // 热力半径，单位：像素
            radius: 30,
            // 颜色范围
            color: {
              0.5: '#2c7bb6',
              0.65: '#abd9e9',
              0.7: '#ffffbf',
              0.9: '#fde468',
              1.0: '#d7191c'
            }
          }
        })

        layer.render()

      }

    },
    computed: {
      districts() {
        return [{
          'name': '大宁音乐广场',
          'center': '121.473662,31.230372',
          'data': [{
            type: '消防报警系统',
            value: 111,
          },
            {
              type: '楼宇水系统',
              value: 165,
            },
            {
              type: '防烟排系统',
              value: 281,
            },
          ]
        },
          {
            'name': '奉贤区',
            'center': '121.474017,30.916479',
            'data': [{
              type: '消防报警系统',
              value: 111,
            },
              {
                type: '楼宇水系统',
                value: 165,
              },
              {
                type: '防烟排系统',
                value: 281,
              },
            ]
          },
          {
            'name': '浦东新区',
            'center': '121.662158,31.142419',
            'data': [{
              type: '消防报警系统',
              value: 111,
            },
              {
                type: '楼宇水系统',
                value: 165,
              },
              {
                type: '防烟排系统',
                value: 281,
              },
            ]
          }, ];
      },

      list(){
        return [
          {
            name: 'G表',
            total_count: 230,
            abnormal_count: 56
          },
          {
            name: 'Z表',
            total_count: 296,
            abnormal_count: 98
          },
          {
            name: 'LG表',
            total_count: 128,
            abnormal_count: 56
          },
          {
            name: 'NB表',
            total_count: 196,
            abnormal_count: 36
          },
          {
            name: 'LoRa表',
            total_count: 58,
            abnormal_count: 18
          }
        ]
      },

      heatmapData() {
        return  [{
          "lng": 121.505501,
          "lat": 30.963188,
          "count": 10
        }, {
          "lng": 121.5364,
          "lat": 30.888381,
          "count": 11
        }, {
          "lng": 121.603005,
          "lat": 31.036759,
          "count": 12
        }, {
          "lng": 121.318047,
          "lat": 31.34631,
          "count": 13
        }, {
          "lng": 121.654503,
          "lat": 31.23365,
          "count": 14
        }, {
          "lng": 121.728661,
          "lat": 31.14319,
          "count": 15
        }, {
          "lng": 121.389801,
          "lat": 31.302701,
          "count": 16
        }, {
          "lng": 116.39671,
          "lat": 31.387147,
          "count": 17
        }]
      }
    }
  };

</script>

<style lang="scss">
  .center-container {





      #map-container {
        height: 500px;
        width: 500px

    }


    .marker-box {
      color:#A0A7B4;
      // border: 1px solid blue;
      width: auto;
      .marker-content {
        padding: 5px;
        border-radius: 10px;
        background: rgba(23, 46, 83, 0.5);;
        width: 100%;
        font-size: 5px;
        transform: translateX(-35%);
        p {
          margin: 2px;
          white-space: nowrap;
          // color: #cc8c69
        }
      }
      .marker-icon{
        width: 20px;
        height: 20px
      }
    }
  }

</style>
