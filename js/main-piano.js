var logs=[]
function log(input) {
    window.logs.push(input)
}

var app = new Vue({
  el: '#app',
  data: {
    solution: 
`var result = app.playAudio(event.keyCode)
console.log(result)
return result`,
    function: null,
    courseName: 'Javascript Learning Course',
    taskName: 'Piano',
    taskDescription: 'Complete code above that listens to keyboard, you have to hook keys with piano sounds. Your working piano keys must be from "W" to "P" and from "A" to ";"',
    inputFormat: 'Input format will be a list of KeyboardEvents. we prepared function called app.playAudio(keyCode[keyboard\'s number represantation in ASCII table]). You have to return the result of calling that function. Don\'t take to consideration when some other key is typed' ,
    testExample: 'KeyboardEvent with "ADT" keys will be typed in series, the function app.playAudio() should be called 3 times with respective keyCode. In this example they are: 65,83,84',
    tested: false,
    alreadyRun: false,
    canBeRun: true,
    submitted: false,
    results:[],
    testCases:{
    	type: "functional",
        
        call: 'onKeyPress',
        arguments:[
            {
                name: 'event'
            }
        ],
    	cases: [
    		{
                beforeSubmit: true,
    			input:{
    				type: 'event',
    				value: {keycode:'65'},
    			},
    			output:{
    				type: 'string',
    				value: 'C',    			
    			},
    		},
    		{
                beforeSubmit: true,
                input:{
                    type: 'event',
                    value: {keycode:'70'},
                },
                output:{
                    type: 'string',
                    value: 'F',             
                },
            },
            {
                beforeSubmit: true,
                input:{
                    type: 'event',
                    value: {keycode:'186'},
                },
                output:{
                    type: 'string',
                    value: 'E',             
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
    run: function(){
        //resetting previous tests
        this.beforeRunInitiated()
        //window.logs=[]
        //validation solution
        //evaluating solution
        if(this.testCases.type=='functional'){
            this.function = new Function("return " + "function("+this.commaSeparated(this.testCases.arguments,"name")+"){ "+this.solution+" }")();
        }
        this.onRunInitiated()
    },
    test: function(){
        //resetting previous tests
        /*this.beforeTestInitiated()
        //window.logs=[]
        //validation solution

        //evaluating solution
        if(this.testCases.type=='functional'){
            this.function = new Function("return " + "function("+this.commaSeparated(this.testCases.arguments,"name")+"){ "+this.solution+" }")();
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
        this.onTestInitiated()
        if(this.testManualStop == false)
            this.onTestStopped()*/
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
    beforeRunInitiated: function(){
        this.submitted = false
        this.results = []
        this.alreadyRun = true
    },
    onRunInitiated: function(){
        if(this.testCases.type=='functional'){
            window.addEventListener("keydown", this.function)
        }
    },
    onRunStopped: function(){
        if(this.testCases.type=='functional'){
            window.removeEventListener("keydown", this.function)
        }
        this.alreadyRun = false
    },
    /*hintsOn: function(e, index) {
      e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
    },*/
    playAudio: function(keyCode){
      const note = document.querySelector(".nowplaying"),
      audio = document.querySelector(`audio[data-key="${keyCode}"]`),
        key = document.querySelector(`.key[data-key="${keyCode}"]`);
      if (!key) return -1;
      key.classList.add("playing");
      const keyNote = key.getAttribute("data-note");
      note.innerHTML = keyNote;
      audio.currentTime = 0;
      audio.play();
      return keyNote
    },
    removeTransition: function(e) {
      if (e.propertyName !== "transform") return;
      e.target.classList.remove("playing");
    },
  },
  created(){
    /*const keys = document.querySelectorAll(".key"),
      note = document.querySelector(".nowplaying"),
      hints = document.querySelectorAll(".hints");*/
    
  },
})

const keys = document.querySelectorAll(".key")
keys.forEach(key => key.addEventListener("transitionend", app.removeTransition));