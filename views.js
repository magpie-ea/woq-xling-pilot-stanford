let introView = babeViews.intro({
    name: 'intro',
    trials: 1,
    title: "Welcome!",
    text:
        'Thanks for taking part in this experiment. .... ',
    buttonText: "Begin Experiment"
});

let instructionsView = babeViews.instructions({
    name: 'instructions',
    trials: 1,
    title: "Instructions",
    text:
        "In this experiment we are interested in how you express quantity in your native language. There are several parts. ...",
    buttonText: "Go to first part."
});

//let practiceView = babeViews.forcedChoice({
//    name: 'practice',
//    trials: 2,
//    trial_type: "practice",
//    data: practice_trials
//});

let beginFirstPart = babeViews.begin({
    name: 'beginFirst',
    trials: 1,
    text:
        "In the first part, we will show you pictures of black or white dots on a gray background. Please provide a simple description of this picture, as if you were answering the question 'How many of the dots are COLOR' where COLOR could either be 'white' or 'black' as indicated on each screen. Possible English answers could be 'all/none/some/most ... of the dots are COLOR'. Please try to give a sentence in your native language that provides similar information. Please mark the part that in English would be expressed by words like 'all/none/some/most/ ...' by putting in between @XYZ@."
});

let beginSecondPart = babeViews.begin({
    name: 'Second',
    trials: 1,
    text:
        "Thanks for your answers. We will now show you similar pictures again. We will also show you some of the responses that you (or other speakers of your native language) have given so far. For each picture and sentence, please judge whether the sentence is a good description of the picture."
});

let mainView = babeViews.forcedChoice({
    name: 'main',
    trials: 2,
    trial_type: "main",
    data: main_trials
});

let postTestView = babeViews.postTest({
    name: 'posttest',
    trials: 1,
    title: "Additional Info",
    text:
        "Answering the following questions is optional, but will help us understand your answers."
});

let thanksView = babeViews.thanks({
    name: 'thanks',
    trials: 1,
    title: "Thank you for taking part in this experiment!"
});

babeViews.describePicture = function(config) {
    const _describePicture = {
        name: config.name,
        title: config.title,
        render(CT, _babe) {
            let startTime = Date.now();

            const viewTemplate =
            `<div class='view'>
                {{# title }}
                <h1 class="title">{{ title }}</h1>
                {{/ title }}
                
                Here will be a picure with  
				{{# nrTotal }}	{{ nrTotal }}  {{/ nrTotal }} balls 
				of which {{# nrFocal }}	{{ nrFocal }}  {{/ nrFocal }} 
				are  {{# focalColor }}	{{ focalColor }}  {{/ focalColor }}.
                
				TextBox input is missing.

                <button id="the-button">Press me!</button>
            </div>`;

            $("#main").html(
                Mustache.render(viewTemplate, {
                    title: this.title,
					focalColor: config.data[CT].focalColor,
					nrTotal: config.data[CT].nrTotal,
					nrFocal: config.data[CT].nrFocal
                })
            );
			
            $('#the-button').on('click', function(e) {
                _babe.trial_data.push({
                    trial_type: config.trial_type,
                    trial_number: CT+1,
                    RT: Date.now() - startTime
                });
                _babe.findNextView();
            });
        },
        CT: 0,
        trials: config.trials
    };

    return _describePicture;
};

let describePicture = babeViews.describePicture({
    name: 'describePicture',
    title: 'Describe the picture',
    trial_type: 'describePicture',
	data: main_trials,
    trials: 3 // set eventually to : main_trials.length
});

babeViews.truthValueJudgement = function(config) {
    const _truthValueJudgement = {
        name: config.name,
        title: config.title,
        render(CT, _babe) {
            let startTime = Date.now();

            const viewTemplate =
            `<div class='view'>
                {{# title }}
                <h1 class="title">{{ title }}</h1>
                {{/ title }}
                
                Here will be a picure with  
				{{# nrTotal }}	{{ nrTotal }}  {{/ nrTotal }} balls 
				of which {{# nrFocal }}	{{ nrFocal }}  {{/ nrFocal }} 
				are  {{# focalColor }}	{{ focalColor }}  {{/ focalColor }}.
                
				There should then be the usual binary forced choice task with two buttons and their labels

                <button id="the-button">Press me!</button>
            </div>`;

            $("#main").html(
                Mustache.render(viewTemplate, {
                    title: this.title,
					focalColor: config.data[CT].focalColor,
					nrTotal: config.data[CT].nrTotal,
					nrFocal: config.data[CT].nrFocal
                })
            );
			
            $('#the-button').on('click', function(e) {
                _babe.trial_data.push({
                    trial_type: config.trial_type,
                    trial_number: CT+1,
                    RT: Date.now() - startTime
                });
                _babe.findNextView();
            });
        },
        CT: 0,
        trials: config.trials
    };

    return _truthValueJudgement;
};

let truthValueJudgement = babeViews.truthValueJudgement({
    name: 'truthValueJudgement',
    title: 'is the sentence a good description of the picture',
    trial_type: 'truthValueJudgement',
	data: main_trials,
    trials: 3 // set eventually to : main_trials.length
});


// customize the experiment by specifying a view order and a trial structure
// specify view order
const views_seq = [
    introView,
    instructionsView,
//    practiceView,
    beginFirstPart,
    describePicture,
	beginSecondPart,
	truthValueJudgement,
    postTestView,
    thanksView
];

