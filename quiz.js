// Authors: Becky and Lian

function grading (target) {
    var $elt = $(target);

    //find correct answer
    var correct = $elt.closest('[data-answer]').attr('data-answer');
    //find the radio button user checked
    var given = $elt.closest('.questionInfo').find('input[type=radio]:checked').val();
    //console.log(correct,given);

    //makes sure that one option is selected before grading
    if (given !== undefined){
        if (correct === given) {
            //change output message to correct
            $elt.closest('.questionInfo').find('output').text('Correct!');
            //change background color correspondingly
            $elt.closest('div').removeClass('wrong');
            $elt.closest('div').addClass('correct');
        } else {
            //change output message to wrong
            $elt.closest('.questionInfo').find('output').text('Wrong!');
            //change background color correspondingly
            $elt.closest('div').removeClass('correct');
            $elt.closest('div').addClass('wrong');
        }
    }                           
}

//delegated button click handler
$('#quizContainer').on('click', 'button', function(event) {
    grading(event.target);
});

//dynamically add the questions
questions.forEach(function (elt, index) {
    //create new Question object
    var newQ = new Question(elt, index+1);
    if (index <= 1) {
        //append to either left or right column
        newQ.addToDOM('#leftCol');
    } else {
        newQ.addToDOM('#rightCol');
    }
});

