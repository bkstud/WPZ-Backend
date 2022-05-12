'use strict';

class CreateExamApp{
    constructor(){
        let _this = this;

        
        this.auth = null;

        console.log("Hello world");
        this.startDiv = document.getElementById("start");
        this.examDiv = document.getElementById("exam_div");


        let start_form = this.startDiv.querySelector("form");
        start_form.onsubmit = function(event){
            _this.loginFormOnSubmit(event);
        }

        this.question_internal_id_counter = 0;
        this.question_option_internal_id_counter = 0;

        this.questions = [];
        this.options = [];

        let title_form = this.examDiv.querySelector("form[name='exam']");
        title_form.onsubmit = function(event){
            _this.examFormOnSubmit(event);            
        }

        this.prepareQuestionDialogWindow();

        this.questions_div = this.examDiv.querySelector("div[name='questions']");
        this.questions_table = this.questions_div.querySelector("table");

        let new_question_button = this.questions_div.querySelector("button[name='new_question']");
        new_question_button.onclick = function(){
            _this.showQuestionDialogWindow();
        }
    }

    loginFormOnSubmit(event){
        event.preventDefault();
        let fd = new FormData(event.target);
        let username = fd.get("username");
        let password = fd.get("password");
        let auth = {username, password};

        let _this = this;
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

    examFormOnSubmit(event){
        event.preventDefault();
        let fd = new FormData(event.target);
        let title = fd.get("title");
        let max_approaches = fd.get("max_approaches");
        if(max_approaches==null || max_approaches=="")max_approaches=-1;

        let start_time = fd.get("start_time");
        let end_time = fd.get("end_time");

        let exam = {title, max_approaches, start_time, end_time};
        this.postExam(exam);
    }

    createQuestion(question){

        let internal_id = null;

        if(question.hasOwnProperty("id")){
            internal_id = `Q${question.id}`;
        }
        else{
            internal_id = `NQ${this.question_internal_id_counter}`;
            ++this.question_internal_id_counter;
        }

        if(question.hasOwnProperty("options")){

        }
        else{
            question.options = [];
        }

        question.internal_id = internal_id;
        this.questions.push(question);
        let row = this.questions_table.insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerText = question.text;
        let cell2 = row.insertCell(1);

        let tmp = document.createElement("div");
        tmp.setAttribute("name", "options_list");
        tmp.innerText = "Sample text";
        cell2.appendChild(tmp);

        let btn = document.createElement("button");
        btn.innerText = "Add option";
        cell2.appendChild(btn);

        //cell2.innerText = "Sample text";

        row.setAttribute("name", internal_id);
        console.log(question);
    }

    createQuestionOption(question_option){
        let q_internal_id = this._selected_question_internal_id;
        let internal_id = null;
        if(question_option.hasOwnProperty("id")){
            internal_id = `${q_internal_id}O${question_option.id}`;
        }
        else{
            internal_id = `QO${this.question_option_internal_id_counter}`;
            ++this.question_option_internal_id_counter;
        }

        let question = this.questions.find(a=>a.internal_id==q_internal_id);
        question.options.push(question_option);

        let row = this.questions_table.querySelector(`tr[name='${q_internal_id}']`);
        if(row!=null){
            let options_list_div = row.cells[1].querySelector("div[name='options_list']");
            let s = document.createElement("span");
            if(question_option.correct){
                s.classList += "good";
            }
            else{
                s.classList += "bad";
            }
            s.innerText = question_option.text;
            options_list_div.appendChild(s);
        }
    }


    prepareQuestionDialogWindow(){
        let _this = this;
        this.question_dialog_window = $("#question_dialog_window");
        let form = this.question_dialog_window.find("form")[0];
        form.onsubmit = function(event){
            event.preventDefault();
            let fd = new FormData(event.target);
            let text = fd.get("text");
            let type = fd.get("type");

            let question = {text, type};
            _this.createQuestion(question);
            _this.question_dialog_window.dialog("close");            
        }

        this.question_dialog_window.dialog({
            "autoOpen":false,
            "modal":true,
            "height": 220,
            "width": 350,

            close: function() {
                form.reset();
            }
        });
    }

    showQuestionDialogWindow(){
        this.question_dialog_window.dialog("open");
    }


    prepareOptionDialogWindow(){
        let _this = this;
        this.question_option_dialog_window = $("#question_option_dialog_window");
        let form = this.question_option_dialog_window.find("form")[0];
        form.onsubmit = function(event){
            event.preventDefault();
            let fd = new FormData(event.target);
            let text = fd.get("text");
            let correct = fd.get("correct")=="on";

            let q_option = {text, correct};

            _this.createQuestionOption(q_option);
            _this.question_option_dialog_window.dialog("close");
        }

        this.question_option_dialog_window.dialog({
            "autoOpen":false,
            "modal":true,
            "height": 220,
            "width": 350,

            close: function() {
                form.reset();
            }
        });
    }


    showOptionsDialogWindow(selected_question_internal_id){
        this._selected_question_internal_id = selected_question_internal_id;
        this.question_option_dialog_window.dialog("open");
    }

    postExam(exam){
        console.log(exam);
    }


    _addQuestionOptionDescription(o){
        let s = document.createElement("span");
        s.classList.add(s.correct? "good": "bad");
        s.innerText = o.text;
        this.desc2.appendChild(s);
    }

}