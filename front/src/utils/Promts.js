export default function Prompts(emotion) {
  const basePromts = [`I'm feeling ${emotion} now.`];

  const additonalPromts = [
    "Any recommendations on food to refresh my feeling?",
    "Can you suggest a travel destination that can improve my mood?",
    "What exercise will help me?",
    "Please give me music that suits my mood",
    "Please recommend a movie that makes me feel better",
    "What is the cause of my current mood?",
    "Please introduce me to a helpful phrase",
    "Are you feeling the same way?",
    "Do you understand what this feeling like?",
    "What do I need?",
  ];

  let random_index = Math.floor(Math.random() * additonalPromts.length);
  let rand_promt = additonalPromts[random_index];
  let resPromt = basePromts + " " + rand_promt;

  //console.log(resPromt);
  return resPromt;
}

Prompts();
