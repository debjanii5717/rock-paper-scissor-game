let userScore =0;
let compScore =0;


const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

//function for cumputer's turn
const gencompchoice = () =>{
    const options =["rock" , "paper", "scissors"];
    const randomindex = Math.floor(Math.random()*3);
    return options[randomindex];
}

const drawgame = () =>{
    // console.log("game was draw");
    msg.innerText = "Game was draw!";
    msg.style.backgroundColor = "rgb(8, 8, 41)";
}

const showWinner=(userwin , userchoice , compchoice)=>{
    if(userwin){
        userScore++;
        msg.innerText = `You win ! Your ${userchoice} beats ${compchoice} `;
        msg.style.backgroundColor = "green";
        userScorePara.innerText=userScore;
    }
    else{
        compScore++;
        msg.innerText = `You lose !  ${compchoice} beats your ${userchoice} `;
        msg.style.backgroundColor = "red";
        compScorePara.innerText=compScore;
    }

}

//function for playing the game or merging comp's and users move together
const playGame = (userchoice)=>{
    const compchoice = gencompchoice();
    // console.log("user's choice", userchoice);
    // console.log("computer choice", compchoice);


    //--------------------------------------------------------------------------------------------------------------
    //printing the moves
    const compTurnElement = document.querySelector('#compturn');
    compTurnElement.innerHTML = 
        `User's choice is: ${userchoice} <br> Computer generated: ${compchoice} <br>`;
        compTurnElement.classList.add('highlight');  
        
        // Create a button element
    const clearButton = document.createElement('button');
    clearButton.classList.add('clear');
    clearButton.textContent = 'Reset';

    // Eventlistener to the button to clear the innerHTML on click
    clearButton.addEventListener('click', () => {
        //smooth removal
        userScore=0; compScore=0;
        userScorePara.innerText=userScore;
        compScorePara.innerHTML=compScore;
        msg.innerText = "Play Your move";
        msg.style.backgroundColor = "rgb(8, 8, 41)";

        compTurnElement.classList.add('fade-out');
        setTimeout(() => {
            compTurnElement.innerHTML = ''; // Clear the innerHTML
            compTurnElement.classList.remove('highlight'); 
            compTurnElement.classList.remove('fade-out'); 
        }, 300);
       
    });

    // Appending the button to the compTurnElement
    compTurnElement.appendChild(clearButton);


    //---------------------------------------------------------------------------------------------------------
    //evaluating winner
    if(userchoice==compchoice){drawgame();}

    else{
        let userwin = true;
        //case1
        if(userchoice=="rock"){
            userwin = (compchoice=="paper")?false:true;
        }

        //case2
        else if(userchoice=="paper"){
            userwin = (compchoice=="scissors")?false:true;
        }

        //case3 (userchoice=="scissor")
        else{
            userwin = (compchoice=="rock")?false:true;
        }
        showWinner(userwin , userchoice , compchoice);
    }
    
};


//function to note down choice of the user
choices.forEach((choice)=>{
    choice.addEventListener("click", ()=>{
        const userchoice = choice.getAttribute("id");
        playGame(userchoice);
        // console.log("Choice was clicked",userchoice);
    });
});

