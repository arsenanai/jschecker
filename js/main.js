var logs=[]
function log(input) {
    window.logs.push(input)
}

var app = new Vue({
  el: '#app',
  data: {
    solution: 
`var flag = true
for(i = 2; i <= n - 1; i++)
    if (n % i == 0) {
        flag = false;
        break;
    }
window.log('flag value is: '+flag)
// Check and display alert message
if (flag == true)
    return true
else
    return false`,
    function: null,
    courseName: 'Javascript Learning Course',
    taskName: 'Prime number',
    taskDescription: 'In this task, you have to define function, that detects whether number is prime or not.',
    inputFormat: 'Input format is one number from 0-9007199254740991(max safe integer), output must be a boolean, returning true or false',
    testExample: 'For example, calling isPrimeNumber(5) must return true and calling isPrimeNumber(6) must return false',
    tested: false,
    submitted: false,
    results:[],
    testCases:{
    	type: "functional",
        call: 'isPrimeNumber',
    	cases: [
    		{
                beforeSubmit: true,
    			input:{
    				type: 'number',
    				value: 5,
    			},
    			output:{
    				type: 'boolean',
    				value: true,    			
    			},
    		},
    		{
                beforeSubmit: true,
    			input:{
    				type: 'number',
    				value: 6,
    			},
    			output:{
    				type: 'boolean',
    				value: false,    			
    			},
    		},
    		{
                beforeSubmit: true,
    			input:{
    				type: 'number',
    				value: 1000003,
    			},
    			output:{
    				type: 'boolean',
    				value: true,    			
    			},
    		},
            {
                beforeSubmit: false,
                input:{
                    type: 'number',
                    value: 1000004,
                },
                output:{
                    type: 'boolean',
                    value: false,                
                },
            },
            {
                beforeSubmit: false,
                input:{
                    type: 'number',
                    value: 10007,
                },
                output:{
                    type: 'boolean',
                    value: true,                
                },
            },
    	]
    }
  },
  methods:{
    prefix: function(){
        return `function `+this.testCases.call+`(n){`
    },
    postfix: function(){
        return `}`
    },
    test: function(){
        //resetting previous tests
        this.tested = false
        this.submitted = false
        this.results = []
        //window.logs=[]
        //validation solution

        //evaluating solution
        
        if(this.testCases.type=='functional'){
            var func = new Function("return " + "function(n){ "+this.solution+" }")();
            var result
            this.testCases.cases.forEach((cas)=>{
                if(cas.beforeSubmit==true){
                    result = func(cas.input.value)
                    cas.logs = window.logs
                    this.results.push(result);
                    window.logs=[]
                }
            })
        }
        this.tested = true
    },
    submit: function(){
        //send to backend
        if(confirm('Are you sure to submit this answer?')){
            alert('Done');
        }
    },
  },
})