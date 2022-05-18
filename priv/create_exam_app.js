'use strict';

class CreateExamApp{
    constructor(){
        let _this = this;

        
        this.auth = null;

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
        this.prepareOptionDialogWindow();

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
                _this.auth = auth;
            }
            else{
                alert("This is not a admin account!");
            }
        }
        RestAPIClient.get("/api/auth/my_account", f1, function(){
            alert("Incorrect username or password!");
        }, auth);
    }

    

    getQuestionTypeDescription(question){
        switch(question.type){
        case 0:
            return "Single-choice";
        case 1:
            return "Multiple-choice";
        default:
            return "Unknown";
        }
    }

    createQuestion(question){
        let _this = this;
        let internal_id = null;

        if(question.hasOwnProperty("id")){
            internal_id = `Q${question.id}`;
        }
        else{
            internal_id = `NQ${this.question_internal_id_counter}`;
            ++this.question_internal_id_counter;
        }

        question.internal_id = internal_id;
        this.questions.push(question);
        let row = this.questions_table.insertRow(-1);
        let cell0 = row.insertCell(0);
        cell0.innerText = question.text;

        let cell1 = row.insertCell(1);
        cell1.innerText = this.getQuestionTypeDescription(question);

        let cell2 = row.insertCell(2);
        cell2.style.padding = "0px";

        let tmp = document.createElement("div");
        tmp.setAttribute("name", "options_list");
        cell2.appendChild(tmp);

        let div1 = document.createElement("div");
        div1.style.padding="5px";

        let btn = document.createElement("button");
        btn.type = "button";
        btn.innerText = "Add option";
        btn.onclick = function(){
            _this.showOptionsDialogWindow(internal_id);
        }

        div1.appendChild(btn);
        cell2.appendChild(div1);

        let cell3 = row.insertCell(3);
        let delete_button = document.createElement("button");
        delete_button.type = "button";
        delete_button.innerText = "delete question";
        delete_button.onclick = function(){
            _this.deleteQuestion(internal_id);
        }

        cell3.appendChild(delete_button);

        

        row.setAttribute("name", internal_id);

        if(question.hasOwnProperty("options")){
            for(let o of question.options){
                this.createQuestionOption(o, internal_id, row);
            }
        }
        else{
            question.options = [];
        }

    }

    createQuestionOption(question_option, q_internal_id, table_row=null){
        //let q_internal_id = this._selected_question_internal_id;
        let o_internal_id = null;
        if(question_option.hasOwnProperty("id")){
            o_internal_id = `${q_internal_id}O${question_option.id}`;
        }
        else{
            o_internal_id = `QO${this.question_option_internal_id_counter}`;
            ++this.question_option_internal_id_counter;
        }

        question_option.internal_id = o_internal_id;

        let question = this.questions.find(a=>a.internal_id==q_internal_id);
        question.options.push(question_option);
        if(table_row==null){
            table_row = this.questions_table.querySelector(`tr[name='${q_internal_id}']`);
        }

        if(table_row!=null){
            let options_list_div = table_row.cells[2].querySelector("div[name='options_list']");

            let option_div = document.createElement("div");
            option_div.classList.add("border_bottom1");
            option_div.setAttribute("name", o_internal_id);

            let s = document.createElement("span");
            if(question_option.correct){
                s.classList += "good";
            }
            else{
                s.classList += "bad";
            }

            s.innerText = question_option.text;

            let delete_button = document.createElement("button");
            delete_button.style.marginLeft="15px";
            delete_button.type="button";
            delete_button.innerText = "Delete";
            let _this = this;
            delete_button.onclick = function(){
                _this.deleteQuestionOption(q_internal_id, o_internal_id);
            }

            option_div.appendChild(s);
            option_div.appendChild(delete_button);

            options_list_div.appendChild(option_div);
        }
    }

    deleteQuestion(question_internal_id){
        this.questions = this.questions.filter(q => q.internal_id!=question_internal_id);
        let row = this.questions_table.querySelector(`tr[name='${question_internal_id}']`);
        row.remove();
    }



    deleteQuestionOption(question_internal_id, option_internal_id){
        let question = this.questions.find(q=>q.internal_id==question_internal_id);
        question.options = question.options.filter(o=>o.internal_id!=option_internal_id);

        let row = this.questions_table.querySelector(`tr[name='${question_internal_id}']`);
        let option_div = row.querySelector(`div[name='${option_internal_id}']`);
        option_div.remove();
    }


    prepareQuestionDialogWindow(){
        let _this = this;
        this.question_dialog_window = $("#question_dialog_window");
        let form = this.question_dialog_window.find("form")[0];
        form.onsubmit = function(event){
            event.preventDefault();
            let fd = new FormData(event.target);
            let text = fd.get("text");
            let type = Number.parseInt(fd.get("type"));

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

            _this.createQuestionOption(q_option, _this._selected_question_internal_id);
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

    onIncorrectQuestion(question, message){
        alert(`Cannot create exam, incorrect question: "${question.text}"\n${message}`);
    }


    examFormOnSubmit(event){
        event.preventDefault();
        let fd = new FormData(event.target);
        let title = fd.get("title");
        let max_approaches = fd.get("max_approaches");
        if(max_approaches==null || max_approaches=="")max_approaches=-1;

        function getTimeParam(p_name){
            let result_string = fd.get(p_name);
            if(result_string==null || result_string=="")return null;
            return Date.parse(result_string);//new Date(result_string).getTime();
        }

        let start_time = getTimeParam("start_time");
        let end_time = getTimeParam("end_time");

        let questions = this.questions;
        let exam = {title, max_approaches, start_time, end_time, questions};


        function isQuestionWithoutCorrectOption(question){
            return question.options.find(o=>o.correct)==null;
        }

        function isIncorrectSingleChoiceQuestion(question){
            if(question.type!=0)return false;
            return question.options.filter(o=>o.correct).length!=1;
        }

        let incorrect_question = exam.questions.find(isQuestionWithoutCorrectOption);
        if(incorrect_question!=null){
            this.onIncorrectQuestion(incorrect_question,"There is no correct answer."); 
            return;
        }

        incorrect_question = exam.questions.find(isIncorrectSingleChoiceQuestion);
        if(incorrect_question!=null){
            this.onIncorrectQuestion(incorrect_question, "This question is single-choice, but multiple correct answers provided.");
            return;
        }

        this.postExam(exam);
    }

    postExam(exam){
        console.log(exam);
        function onSuccess(exam, status_code){
            alert("Successfully created exam");
            console.log(exam);
        }

        function onFailure(message, status_code){
            alert(`Error with code: ${status_code}`);

        }
        RestAPIClient.post("/api/admin/exams", exam, onSuccess, onFailure, this.auth);
    }

}