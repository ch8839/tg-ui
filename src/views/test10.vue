<template>
  <div id="identify-container">
        <div class="identify-box">
            <s-identify :identifyCode="identifyCode" @refresh="refreshCode"></s-identify>
        </div>
  </div>
</template>

<script>
import identify from '../components/identify/index'
export default {
	name: 'test10',
	components: {
		's-identify': identify
	},
	data() {
		return {
			// identifyCodes: '1234567890',
			identifyCode: '',
			text: '123' //input框
		}
	},

	created() {
		// this.refreshCode()
    },


	mounted() {
		this.identifyCode = ''
		this.makeCode(4)
	},

	methods: {
		randomNum(min, max) {
			return Math.floor(Math.random() * (max - min) + min)
		},

		refreshCode() {
            console.log('identifyCodes', this.identifyCodes)
			this.identifyCode = ''
			this.makeCode(4)
		},

		makeCode(l) {
			for (let i = 0; i < l; i++) {
				this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
			}
			console.log(this.identifyCode)
		}
    },
    
    computed: {
        identifyCodes(){           
            let str = ''
            for(let i=48;i<123; i++){
                if((i>57&& i<65) || (i>90 && i<97)){
                    continue
                }else {
                    str +=String.fromCharCode(i)
                }
            }
            console.log('str', str)
            return str
        }
    }
}
</script>

<style scoped lang="scss" >
#identify-container {
	width: 100%;
	height: 600px;

	.identify-box {
		cursor: pointer;
	}
}
</style>
