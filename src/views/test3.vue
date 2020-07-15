<!--基于阿里云的文件云存储-->
<template>
    <div id="upLoad-container">
        <div>
            <input type="file" ref="uploader" @change="handleFileChange">
            <img :src="img_url" alt="头像">
        </div>

        <div>
            <input type="file" class="input2" id="fileElem" ref="uploader2" @change="handleFileChange2">
            <a href="#" id="fileSelect">Select some files</a>
            <img src="" alt="头像2">
        </div>

        <div>
            <input type="file" ref="uploader3" @change="handleFileChange3">
            <img :src="img_url3" alt="头像3">
        </div>
        <button @click="downLoad">get</button>


    </div>
</template>

<script>
    // let OSS = require('ali-oss');
    export default {
        name: 'Test3',
        data() {
            return {
                img_url:"#",
                image_url:'',
                img_url3:'#'
            }
        },

        async mounted() {
            let _this = this
            let img = 'https://img12.360buyimg.com/cms/jfs/t1/80071/27/14467/306657/5dbfa4e2Ee5b2bb3d/bc5d3c19c36bc6d3.jpg'
            const image = new Image()
            image.crossOrigin = '*' // 允许跨域图片
            image.src = img + '?v=' + Math.random() // 清除图片缓存
            image.onload = function () {
               console.log(2,_this.getBase64Image(image))
            }

            var fileSelect = document.getElementById("fileSelect"),
                fileElem = document.getElementById("fileElem");
            fileSelect.addEventListener("click", function (e) {
                if (fileElem) {
                    fileElem.click();
                }
                e.preventDefault(); // prevent navigation to "#"
            }, false);
        },

        methods: {
            handleFileChange(e) {
                let files = e.target.files
                let isImg = files[0].type.indexOf('image/')
                console.log('isImg', isImg)
                if (isImg > -1) {
                    let size = files[0].size
                    console.log(size)
                }
                this.preview(files[0])
            },

            handleFileChange2(e) {
                let files = e.target.files
                let isImg = files[0].type.indexOf('image/')
                if (isImg == -1) {
                   return
                }
                this.preview2(files[0])
            },

            handleFileChange3(e) {
                let files = e.target.files
                let isImg = files[0].type.indexOf('image/')
                if (isImg == -1) {
                    return
                }
                this.preview3(files[0])
            },

            preview(file){
                console.log('file', file)
                let _this = this
                let reader = new FileReader()
                reader.onload = function(e){
                    console.log(e)
                    let base64_url = e.target.result
                    _this.img_url =base64_url
                    let str = _this.binarySystem(base64_url)
                    console.log(str)

                }
                reader.readAsDataURL(file)
            },

            preview2(file){
                let fileImg = new FormData()
                fileImg.append("file", file)
                console.log('fileImg', fileImg)

            },

            async preview3(file){
                console.log("file", file)
                let client = new OSS.Wrapper({
                    region: 'oss-cn-shanghai',
                    accessKeyId: 'LTAI4FsDc3UdJF6oNbNr5sZv',
                    accessKeySecret: 'LpZtCHwK4eKcY9n5AxrbEsPZu36tKc',
                    bucket: 'shu-project1'
                });
                // var blob = new Blob([file], {type: "image/jpeg"});
                // console.log('blob', blob)
                // try {
                //     let result = await client.put(file.name, blob);
                //     console.log('result', result);
                // } catch(err){
                //     console.log('err', err)
                // }

                let result = await client.multipartUpload('aab/'+file.name, file, {
                    progress: async function (p, checkpoint) {
                        // 断点记录点。 浏览器重启后无法直接继续上传，需用户手动触发进行设置。
                        console.log('p',p)
                    }
                });
                console.log('result', result);
                this.image_url = result.url
            },

            ///图片的base64格式编码转换为二进制
            binarySystem (baseurl) {
                let arr = baseurl.split(',')
                baseurl = arr[0].match(/:(.*?);/)[1]
                let bstr = atob(arr[1])
                let n = bstr.length
                let u8arr = new Uint8Array(n)
                let nameImg = []
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                    nameImg.push(bstr.charCodeAt(n))
                }
                return nameImg
            },

            getBase64Image(img){
                const canvas = document.createElement('canvas')
                canvas.width = img.width
                canvas.height = img.height
                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                var dataURL = canvas.toDataURL()
                // document.querySelector('#upLoad-container').appendChild(canvas)
                return dataURL
            },

            // 获得图片的url,之前result的url无权访问
            downLoad(){
                let client = new OSS.Wrapper({
                    region: 'oss-cn-shanghai',
                    accessKeyId: 'LTAI4FsDc3UdJF6oNbNr5sZv',
                    accessKeySecret: 'LpZtCHwK4eKcY9n5AxrbEsPZu36tKc',
                    bucket: 'shu-project1'
                })
                let url = client.signatureUrl('aab/avatar1.jpg',{
                    expires: 360000000,
                    process: 'image/resize,w_200'
                })
                this.img_url3 = url
                console.log(url);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .input2 {
        opacity: 0;
    }

</style>
