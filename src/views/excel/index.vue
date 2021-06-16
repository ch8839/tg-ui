<template>
  <div>
    <button @click="handleDownload">download1</button>

    <button @click="handleDownload2">download2</button>

    <button @click="handleDownloadCsv">download_csv</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            exportData: '',
        }
    },
    mounted() {
        // this.init()
    },
    methods: {
        initData() {
            return [
                {
                    name: 'Tom',
                    age: 12,
                    school: 'school1',
                },
                {
                    name: 'Jerry',
                    age: 9,
                    school: 'school2',
                },
                {
                    name: 'Peter',
                    age: 18,
                    school: 'school3',
                },
            ]
        },
        handleDownload() {
            let exportData = this.initData()
            let tableData = this.generateTableData(exportData)
            let template = this.generateTemplate(tableData)

            let uri =
                'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'
            //下载模板
            var template1 = uri + btoa(unescape(encodeURIComponent(template)))
            this.dataURIToBlob(template1, this.callback)
        },

        handleDownload2() {
            let exportData = this.initData()
            let tableData = this.generateTableData(exportData)
            let template = this.generateTemplate2(tableData)
            const uri = 'data:application/vnd.ms-excel;base64,'

            // 下载模板
            window.location.href =
                uri + btoa(unescape(encodeURIComponent(template)))
        },

        handleDownloadCsv() {
            let exportData = this.initData()
            let tableData = this.generateTableDataCsv(exportData)

            const uri = 'data:text/csv;charset=utf-8,\ufeff'
            // 下载模板  encodeURIComponent解决中文乱码
            window.location.href = uri + encodeURIComponent(tableData)
        },

        generateTableData(exportData) {
            let str =
                '<tr><td>数据时间</td><td>指标编号</td>' +
                '<td>指标名称</td><td>机构号</td><td>机构名称</td><td>机构层级</td>' +
                '<td>父机构号</td><td>父机构名称</td><td>实时完成值</td><td>实时目标值</td><td>实时完成比</td><td>实时目标值差值</td>' +
                '<td>实时完成比排名</td><td>实时完成比红绿字</td><td>实时完成预警值</td><td>上周实时</td><td>同比上周实时差值</td>' +
                '<td>同比上周实时</td><td>同比上周实时红绿字</td></tr>'
            //循环遍历，每行加入tr标签，每个单元格加td标签
            for (let i = 0; i < exportData.length; i++) {
                str += '<tr>'
                for (let item in exportData[i]) {
                    //增加\t为了不让表格显示科学计数法或者其他格式
                    str += `<td>${exportData[i][item] + '\t'}</td>`
                }
                str += '</tr>'
            }
            return str
        },

        generateTableDataCsv(exportData) {
            // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
            let str = `姓名,年龄,学校\n`
            // 增加\t为了不让表格显示科学计数法或者其他格式
            for (let i = 0; i < exportData.length; i++) {
                for (const key in exportData[i]) {
                    str += `${exportData[i][key] + '\t'},`
                }
                str += '\n'
            }
            return str
        },

        generateTemplate(str) {
            //Worksheet名
            let worksheet = 'Sheet1'

            //下载的表格模板数据
            let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel"
          xmlns="http://www.w3.org/TR/REC-html40">
          <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
            <x:Name>${worksheet}</x:Name>
            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
            </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
            </head><body><table>${str}</table></body></html>`
            return template
        },

        generateTemplate2(str) {
            //Worksheet名
            let worksheet = 'Sheet1'

            // 下载的表格模板数据
            const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:x="urn:schemas-microsoft-com:office:excel" 
            xmlns="http://www.w3.org/TR/REC-html40">
            <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
            <x:Name>${worksheet}</x:Name>
            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
            </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
            </head><body><table>${str}</table></body></html>`
            return template
        },

        dataURIToBlob(dataURI, callback) {
            var binStr = atob(dataURI.split(',')[1]),
                len = binStr.length,
                arr = new Uint8Array(len)
            console.log('>>>binStr', binStr)
            for (var i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i)
            }

            callback(new Blob([arr]))
        },

        callback(blob) {
            var a = document.createElement('a')
            a.download = '数据' + '.xls'
            a.innerHTML = 'download'
            // the string representation of the object URL will be small enough to workaround the browser‘s limitations
            a.href = URL.createObjectURL(blob)
            // you must revoke the object URL,
            //   but since we can‘t know when the download occured, we have to attach it on the click handler..
            a.click()
        },
    },
}
</script>

<style>
</style>