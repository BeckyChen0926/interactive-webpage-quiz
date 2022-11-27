// Authors: Lian Liu and Becky Chen

class Question {

    //$elt;
    
    constructor (questionDescription, num) {
        this.$elt = helper(questionDescription, num);
    }

    addToDOM(des) {
        $(des).append(this.$elt);
    }
}

//the modular code for the constructor
//similar concept as make row elt
function helper(questionDescription, num) {
    //the big div that contains one entire question
    $questionDiv = $('<div>', {
        'class': 'questionInfo',
        //store the correct answer in data-answer attribute
        'data-answer': questionDescription['ANS'],
    });

    //check whether the argument taken in are valid
    if (!questionDescription && !num) {
        throw new Error ('No question provided');
    }

    //append the question prompt to the big div
    $questionDiv.append('Q' + num + ': ' + questionDescription['Q']);
    // $questionDiv.append('<br>');
    $questionDiv.append('<br>');


    //use forEach to dynamically create the questions
    Object.keys(questionDescription).forEach(function(key) {
        if (key != 'Q' && key != 'ANS'){
            //create the div with four answers
            let $qdiv = $('<div>', {
                'data-question-answer': 'radio',
                'class': 'radio'
            }); 

            //create radio buttons
            let $radio = $('<input>', {
                type: 'radio',
                'name': 'question' + num,
                'value': key
            });

            //create label element, which is the answers text
            let $label = ($('<label>'), questionDescription[key]);

            //append above elements into right places
            $qdiv.append($radio).append($label);
            $qdiv.addClass('qFormat')
            $questionDiv.append($qdiv);
        }
    })

    //create Grade button
    let $button = $('<button>', {
        type: 'button',
        class: 'grade'+num,
        'value': 'Grade'
    }) 
    $button.text('Grade');

    //create the <output> element, which is where 'correct' or 'wrong' will dynamically show
    let $rightWrong = $('<output>', {
        'name': 'rightWrong'
    })
    $rightWrong.text('');

    //append above DOM elements to the big div
    $questionDiv.append($button).append($rightWrong);

    //set up default white background view
    $questionDiv.addClass('normal');

    return $questionDiv;
 }

