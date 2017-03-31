$(document).ready(function(){
    //global variables
    var questionNum = 0,
        correctAnswers = 0,
        intro = $(".intro"),
        question = $(".question"),
        progressBar = $(".progressBar"),
        progressBarQuestion = $(".progressBar-question"),
        questionTracker = $(".qNum"),
        questionText = $("#quizQuestion"),
        questionOpts = $(".qOptions"),
        answerCount = $(".answerCount"),
        answerInfo = $(".answerInfo"),
        answer = $(".answer"),
        startBtn = $("#startBtn"),
        nextBtn = $("#nextBtn"),
        restartBtn = $("#restartBtn"),
        quizEnd = $(".end"),
        result = $(".result"),
        questionList = {
            items: [
                {
                    question: "Que tipo de transtorno é o Autismo?",
                    options: [
                        {choice: "Transtorno mental"},
                        {choice: "Transtorno de desenvolvimento"},
                        {choice: "Transtorno de personalidade"},
                        {choice: "Transtorno de ansiedade"}
                    ],
                    correctAnswer: {
                        choice: "Transtorno de desenvolvimento",
                        explanation: "Autismo (ou Transtorno do Espectro do Autismo) é classificado como um transtorno de desenvolvimento porque impacta na forma em que o cérebro se desenvolve e funciona. Isso muitas vezes resulta em características como défict de interação social, comportamentos repetitivos, hipersensibilidade à luz, texturas, sons, etc., e problemas de comunicação verbal."
                    }
                },
                {
                    question: "Como o Autismo é tratado?",
                    options: [
                        {choice: "Medicação"},
                        {choice: "Terapia comportamental (ABA)"},
                        {choice: "Terapia ocupacional"},
                        {choice: "Todas as anteriores"}
                    ],
                    correctAnswer: {
                        choice: "Todas as anteriores",
                        explanation: "Autismo é normalmente tratado através de vários métodos, incluindo (mas não limitado a) terapia comportamental, medicação, terapia ocupacional e terapia de fala. Quanto antes o tratamento for iniciado, maior é o impacto que ele pode ter, especialmente na terapia comportamental. Os tratamentos variam muito baseado nas necessidades de cada indivíduo."
                    }
                },
                {
                    question: "Qual é a prevalência de diagnósticos de Autismo nos Estados Unidos (usado como referência internacional)?",
                    options: [
                        {choice: "1 a cada 68 crianças"},
                        {choice: "1 a cada 110 crianças"},
                        {choice: "1 a cada 136 crianças"},
                        {choice: "1 a cada  240 crianças"}
                    ],
                    correctAnswer: {
                        choice: "1 a cada 68 crianças",
                        explanation: "A estatística atual mostra que 1 a cada 68 crianças são diagnosticas com Transtorno do Espectro do Autismo. Este número aumentou 119% desde 2000! Existem teorias sobre o motivo pelo qual houve um aumento na prevalência, mas a razão ainda é amplamente desconhecida. Há poucos dados sobre prevalência do Autismo no Brasil, mas em 2015 estimava-se que cerca de 2 milhões de pessoas, de crianças a adultos, apresentavam a condição."
                    }
                },
                {
                    question: "Em quem o Autismo é mais comum?",
                    options: [
                        {choice: "Meninas"},
                        {choice: "Meninos"},
                        {choice: "Sem discrepância de gênero"},
                        {choice: "Não há como dizer"}
                    ],
                    correctAnswer: {
                        choice: "Meninos",
                        explanation: "O Autismo é cerca de 5 vezes mais comum em meninos (1 a cada 42) do que em meninas (1 a cada 189)."
                    }
                },
                {
                    question: "O Autismo se manifesta da mesma forma em todos os indivíduos que são afetados por ele?",
                    options: [
                        {choice: "Sim"},
                        {choice: "Não"},
                        {choice: "Na maioria das vezes"},
                        {choice: "Não tenho certeza"}
                    ],
                    correctAnswer: { 
                        choice: "Não",
                        explanation: "Autismo é um espectro, assim, o impacto em cada indivíduo varia muito. Algumas pessoas podem ser profundamente impactadas e precisar de ajuda para atividades dos dia-a-dia. Outras pessoas são mais \"altamente funcionais\" e seus sintomos podem não ser perceptíveis para aqueles que não são cientes da condição dessas pessoas."
                    }
                }
            ]
        };
    
    //loop through questions, displaying 1 at a time on the dom
    var questionSource = "<p>{{question}}</p>";
    var template = Handlebars.compile(questionSource);
    questionText.empty().append(template({question: questionList.items[questionNum].question}));
    
    var answerSource = $("#answers-template").html();
    var answerTemplate = Handlebars.compile(answerSource);
    questionOpts.empty().append(answerTemplate(questionList.items[questionNum]));
    
    //begin quiz
    startBtn.on('click',function(){
        intro.hide();
        progressBarQuestion.removeClass("progressBar-question-current progressBar-question-correct progressBar-question-incorrect").html("");
        progressBarQuestion.first().addClass("progressBar-question-current");
        questionTracker.text(questionNum+1);
        progressBar.fadeIn(600);
        question.fadeIn(600);
        delayAnswers(500);
    });

    //get answer
    questionOpts.on("click", "li", function() {
        var selectedAnswer = $(this).text(),
            correctAnswer = questionList.items[questionNum].correctAnswer.choice,
            answerKeySource = "<p>{{answer}}</p>",
            answerKeyTemplate = Handlebars.compile(answerKeySource);
        if (selectedAnswer === correctAnswer) {
            result.text("Correto!");
            progressBarQuestion.eq(questionNum).removeClass("progressBar-question-current").addClass("progressBar-question-correct").html("<i class=\"fa fa-check\"></i>");
            correctAnswers++;
        } else {
            progressBarQuestion.eq(questionNum).removeClass("progressBar-question-current").addClass("progressBar-question-incorrect").html("<i class=\"fa fa-times\"></i>");
            result.html("Incorreto. A resposta correta era: <br/>"+correctAnswer);
        }
        answerCount.text(correctAnswers);
        question.hide();
        answerInfo.empty().append(answerKeyTemplate({answer: questionList.items[questionNum].correctAnswer.explanation}));
        answer.fadeIn();
    });

    //next question
    nextBtn.on("click",function() {
        questionNum++;
        progressBarQuestion.eq(questionNum).addClass("progressBar-question-current");
        if (questionNum === 4) {
            nextBtn.text("Finalizar Quiz");
        }
        if (questionNum <= 4) {
            questionTracker.empty().text(questionNum+1);
            questionText.empty().append(template({question: questionList.items[questionNum].question}));
            questionOpts.empty().append(answerTemplate(questionList.items[questionNum]));
            answer.hide();
            question.fadeIn(600);
            delayAnswers(500);
        } else {
            if (correctAnswers === 5) {
                var report = "Excelente! Você acertou "+correctAnswers+" questões. Você sabe muito sobre o Autismo!";
            } else if (correctAnswers >= 3 && correctAnswers < 5) {
                var report = "Está no caminho certo! Você acertou "+correctAnswers+" questões. Continue com os estudos sobre o Autismo!";
            } else {
                var report = "Boa tentativa, mas você acertou apenas "+correctAnswers+" questões. Talvez este assunto seja algo sobre o qual você precise aprender mais!";
            }
            $(".report").text(report);
            answer.hide();
            quizEnd.fadeIn();
        }
    });
    
    restartBtn.click(function() {
        nextBtn.text("Próxima Questão");
        questionNum = 0;
        correctAnswers = 0;
        questionTracker.empty().text(questionNum+1);
        progressBarQuestion.removeClass("progressBar-question-current progressBar-question-correct progressBar-question-incorrect").html("");
        progressBarQuestion.first().addClass("progressBar-question-current");
        questionText.empty().append(template({question: questionList.items[questionNum].question}));
        questionOpts.empty().append(answerTemplate(questionList.items[questionNum]));
        quizEnd.hide();
        question.fadeIn(600);
        delayAnswers(500);
    });

    function delayAnswers(delayTime) {
        $.each($(".qOptions li"), function() {
            $(this).delay(delayTime).fadeIn(800);
            delayTime+=800;
        });
    };


});