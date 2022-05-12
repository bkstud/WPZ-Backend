'use strict';

class CreateExamApp{
    constructor(){
        let _this = this;

        
        this.auth = null;

        console.log("Hello world");
        this.startDiv = document.getElementById("start");
        this.examDiv = document.getElementById("exam_div");

        /*this.desc1 = document.getElementById("desc1");
        this.desc2 = document.getElementById("desc2");*/




        let start_form = this.startDiv.querySelector("form");
        start_form.onsubmit = function(event){
            event.preventDefault();
            let fd = new FormData(start_form);
            let username = fd.get("username");
            let password = fd.get("password");
            let auth = {username, password};

            let f1 = function(user){
                if(user.admin){
                    _this.startDiv.style.display="none";
                    _this.examDiv.style.display=null;
                }
                else{
                    alert("This is not a admin account!");
                }
            }
            RestAPIClient.get("/api/auth/my_account", f1, function(){
                alert("Incorrect username or password!");
            }, auth);
        }

        this.questions = [];
        this.options = [];

        let title_form = this.examDiv.querySelector("form[name='exam']");
        title_form.onsubmit = function(event){
            event.preventDefault();
            let fd = new FormData();
            let title = fd.get("title");
            let max_approaches = fd.get("max_approaches");
            if(max_approaches==null)max_approaches=-1;

            let start_time = fd.get("start_time");
            let end_time = fd.get("end_time");

            let exam = {title, max_approaches, start_time, end_time};
            _this.postExam(exam);
            
        }



        /*let question_form = this.examDiv.querySelector("form[name='question']");
        question_form.onsubmit = function(event){
            event.preventDefault();
            let fd = new FormData(question_form);
            let text = fd.get("text");
            let type = fd.get("type");
            let options = _this.options;

            let question = {text, type, options};
            console.log(question);
            _this.options = [];
            _this.desc2.innerText="";
        }

        let question_option_form = this.examDiv.querySelector("form[name='question_option']");
        question_option_form.onsubmit = function(event){
            event.preventDefault();
            let fd = new FormData(question_option_form);
            let text = fd.get("text");
            let correct = fd.get("correct")=="on";

            let option = {text, correct};
            _this.options.push(option);
            console.log(option);
        }*/
    }

    postExam(exam){
        console.log(_this.exam);
    }

    addQuestionDescription(){

    }

    _addQuestionOptionDescription(o){
        let s = document.createElement("span");
        s.classList.add(s.correct? "good": "bad");
        s.innerText = o.text;
        this.desc2.appendChild(s);
    }

}