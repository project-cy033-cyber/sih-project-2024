const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;
let queryCount = 0; // Variable to count user queries

// List of cyber crime incidents
const cyberCrimeIncidents = [
  "Phishing",
  "Malware",
  "Ransomware",
  "Denial-of-Service (DoS) Attacks",
  "SQL Injection",
  "Man-in-the-Middle Attacks"
];

// API configuration
const API_KEY = "AIzaSyA-EG9Rn-A_COouCu9c5OqA2b2dnu-6Qk4"; // Your API key here
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
};

const generateResponse = async (chatElement) => {
  const messageElement = chatElement.querySelector("p");

  // Define the properties and message for the API request
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      contents: [{ 
        role: "user", 
        parts: [{ text: userMessage }] 
      }] 
    }),
  }

  // Send POST request to API, get response and set the response as paragraph text
  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);
    
    // Get the API response text and update the message element
    messageElement.textContent = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
  } catch (error) {
    // Handle error
    messageElement.classList.add("error");
    messageElement.textContent = error.message;
  } finally {
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }
};

const showMainMenu = () => {
  const suggestionText = "Main Menu - Please choose an option:";
  const suggestionList = document.createElement("div");
  suggestionList.classList.add("suggestions");

  const option1 = document.createElement("button");
  option1.textContent = "Cyber Crime Incidents";
  option1.addEventListener("click", showCyberCrimeTopics);

  const option2 = document.createElement("button");
  option2.textContent = "Connect with Team";
  option2.addEventListener("click", showContactInfo);

  const backToChat = document.createElement("button");
  backToChat.textContent = "Back to Chat";
  backToChat.addEventListener("click", handleChat);

  suggestionList.append(option1, option2, backToChat);
  chatbox.appendChild(createChatLi(suggestionText, "incoming"));
  chatbox.appendChild(suggestionList);
  chatbox.scrollTo(0, chatbox.scrollHeight);
};

const showCyberCrimeTopics = () => {
  const topicText = "Please select a cyber crime incident:";
  const topicList = document.createElement("div");
  topicList.classList.add("topics");

  // Add back button
  const backButton = document.createElement("button");
  backButton.textContent = "Back to Main Menu";
  backButton.addEventListener("click", showMainMenu);

  // Create buttons for each cyber crime incident
  cyberCrimeIncidents.forEach((incident) => {
    const incidentBtn = document.createElement("button");
    incidentBtn.textContent = incident;
    incidentBtn.addEventListener("click", () => showIncidentDetail(incident));
    topicList.appendChild(incidentBtn);
  });

  topicList.appendChild(backButton);
  chatbox.appendChild(createChatLi(topicText, "incoming"));
  chatbox.appendChild(topicList);
  chatbox.scrollTo(0, chatbox.scrollHeight);
};

const showIncidentDetail = (incident) => {
  // Show details about the selected cyber crime incident
  const incidentDetailText = `You selected: ${incident}. Here is more information about ${incident}.`;

  // Append the incident detail message to the chatbox
  chatbox.appendChild(createChatLi(incidentDetailText, "incoming"));

  // Add a back button to return to the topic list
  const backButton = document.createElement("button");
  backButton.textContent = "Back to Cyber Crime Topics";
  backButton.addEventListener("click", showCyberCrimeTopics);
  
  const backDiv = document.createElement("div");
  backDiv.appendChild(backButton);
  chatbox.appendChild(backDiv);
  
  chatbox.scrollTo(0, chatbox.scrollHeight);
};

const showContactInfo = () => {
  const contactInfo = `
    Contact Information:
    Name - Vir
    Phone no - 54354656746756
    Email - ktm@gmail.com
  `;
  chatbox.appendChild(createChatLi(contactInfo, "incoming"));

  // Add a back button to return to the main menu
  const backButton = document.createElement("button");
  backButton.textContent = "Back to Main Menu";
  backButton.addEventListener("click", showMainMenu);
  
  const backDiv = document.createElement("div");
  backDiv.appendChild(backButton);
  chatbox.appendChild(backDiv);
  
  chatbox.scrollTo(0, chatbox.scrollHeight);
};

const handleChat = () => {
  userMessage = chatInput.value.trim().toLowerCase(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Predefined responses for specific questions
  if (userMessage === "what is your name" || userMessage === "what's your name?") {
    chatbox.appendChild(createChatLi("I am Help assistant. You can call me Cyber Assistant.", "incoming"));
  } else if (userMessage === "what's your owner's name" || userMessage === "who created you?") {
    chatbox.appendChild(createChatLi("I am made up to help and guide incidents related to cyber crime.", "incoming"));
  } else {
    // If not a predefined question, handle the chat normally
    queryCount++;

    if (queryCount >= 3) {
      // Show main menu after the third user query
      showMainMenu();
      queryCount = 0; // Reset the counter after showing suggestions
    } else {
      setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Typing.....", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
      }, 600);
    }
  }
};

chatInput.addEventListener("input", () => {
  const responses = [
    "Hello, how can I help you today? 😊",
    "I'm sorry, I didn't understand your question. Could you please rephrase it? 😕",
    "I'm here to assist you with any questions or concerns you may have. 📩",
    "I'm sorry, I'm not able to browse the internet or access external information. Is there anything else I can help with? 💻",
    "What would you like to know? 🤔",
    "I'm sorry, I'm not programmed to handle offensive or inappropriate language. Please refrain from using such language in our conversation. 🚫",
    "I'm here to assist you with any questions or problems you may have. How can I help you today? 🚀",
    "Is there anything specific you'd like to talk about? 💬",
    "I'm happy to help with any questions or concerns you may have. Just let me know how I can assist you. 😊",
    "I'm here to assist you with any questions or problems you may have. What can I help you with today? 🤗",
    "Is there anything specific you'd like to ask or talk about? I'm here to help with any questions or concerns you may have. 💬",
    "I'm here to assist you with any questions or problems you may have. How can I help you today? 💡",
  ];

  // Return a random response
  return responses[Math.floor(Math.random() * responses.length)];
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
