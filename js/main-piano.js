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
    taskName: 'Piano',
    taskDescription: 'Complete code above to bind piano keys with keyboard and play sound.',
    inputFormat: 'Complete function below to play piano keys. Use keys from "A" to ";" and from "W" to "O", that should sound from notes accordingly. To make this task easier, we prepared sound files, which can be accessed by path "/assets/piano/a.mp3" files has names ["a"-"\\"].mp3',
    testExample: 'On pressing keys in series "ADG" a.mp3, d.mp3, g.mp3 files has to be played',
    tested: false,
    submitted: false,
    results:[],
    testCases:{
    	type: "functional",
        call: 'onKeyPress',
        arguments:[
            {
                name: 'key'
            }
        ],
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
        return `function `+this.testCases.call+`(`+this.commaSeparated(this.testCases.arguments,"name")+`){`
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
            var func = new Function("return " + "function("+this.commaSeparated(this.testCases.arguments,"name")+"){ "+this.solution+" }")();
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
    commaSeparated: function(a/*array*/,attr/*field*/){
        return a.map((e)=>e[attr]).join(", ")
    },
    submit: function(){
        //send to backend
        if(confirm('Are you sure to submit this answer?')){
            alert('Done');
        }
    },
    removeTransition: function(e) {
      if (e.propertyName !== "transform") return;
      this.classList.remove("playing");
    },
    hintsOn: function(e, index) {
      e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
    },
    debug: function(event){
        console.log(event)
    }
  },
  created(){
    const keys = document.querySelectorAll(".key"),
      note = document.querySelector(".nowplaying"),
      hints = document.querySelectorAll(".hints");
      //hints.forEach(this.hintsOn);

    
    /*keys.forEach(key => key.addEventListener("transitionend", this.removeTransition));*/
  },
})