const chatWindow = document.querySelector(".chatWindow");

function scrollToBottom() {
    const targetScroll = chatWindow.scrollHeight - chatWindow.clientHeight;
    let currentScroll = chatWindow.scrollTop;

    const scrollInterval = setInterval(() => {
        if (currentScroll < targetScroll) {
            currentScroll += 2; // You can adjust the scrolling speed here
            chatWindow.scrollTop = currentScroll;
        } else {
            clearInterval(scrollInterval);
        }
    }, 10); // Adjust the interval to control the smoothness
}

/**
 * Function to add reponse as user clicks on what they want to see
 * Every time an option is chosen, it will be removed from the screen
 */
function addResponse(type) {
    const paragraph = document.createElement("p");
    paragraph.className = ("chatBubbleResponse");
    let insideText = "";

    let imgPath = "";
    let imgAlt = "";

    //Education 
    if (type === "highschool") {
        insideText = "For High School, I attended Fiorello H. LaGuardia Arts High School of Music & Arts, from 2011 - 2015. I majored in Fine Arts.";
    } if (type === "college") {
        insideText = "For College, I attended Fashion Institute of Technology, from 2015 - 2019. I graduated with both A.A.S and B.F.A, majoring in Interior Design.";
    }

    //Technical Stack
    if (type === "frontend") {
        insideText = "I know Angular, JavaScript, HTML, and CSS. This portfolio was created with JavaScript, HTML, and CSS.";
    } if (type === "backend") {
        insideText = "I know Java leveraging Spring Boot, and SQL for database structure.";
    } if (type === "otherSkills") {
        insideText = "I know Java leveraging Spring Boot, and SQL for database structure.";
    }

    //Projects
    if (type === "deadbird") {
        insideText = "Deadbird Warranty is inspired by my time in retail at an outdoor gear brand, they had limited warranty on most proudct. Now, limited warranty sounded amazing until customers had to file a claim themelves, then the system showed its lack of a friendly user interface. The system did not allow customers to check on the status, or if customer decided that they no longer wanted the claim, and be able to delete it. This led to calls the retail stores of customers asking us, how long will this take, and if there was any update, which all we could do was apologize to the customer that we couldn't answer any of those questions. It really sucked to keep apologizing. In this app, I tackled just that, created an app where customers can file a warranty, where they will be given a warranty number, which they can use to look up the status or if they wish to no longer go on with the claim, they can also delete the claim.";

        imgPath="resources/deadbirdwarranty.png";
        imgAlt="Image of Deadbird Main Menu";
    }

    if (type === "chitchat") {
        insideText = "chitcat is an anonymous forum application, where users can post a message for other users to see and comment on. They can chit-chat with each other. This project's aesthetics was inspired by the good old days of AIM messaging before texting or Facebook messaging was popular. I wanted to practice my CSS skills and be able to match how AIM looked.";

        imgPath = "resources/chitchat.png";
        imgAlt = "Image of chit chat";
    }

    if(type === "liamAndCo"){
        insideText = "Liam & Co is an application I created for my sister, she wanted a simple to-do list. Something where she could split the house chores with my brother-in-law, and for them to be able to assign the chore, so they knew who was responsible. It's named Liam & Co, because my nephew's name and he is the CEO of the household. You do as he says."

        imgPath = "resources/LiamAndCo - 2.png";
        imgAlt = "Image of Liam & Co To-Do List";
    }


    paragraph.textContent = insideText;
    chatWindow.appendChild(paragraph);

    if (imgPath && imgAlt) {
        const img = document.createElement("img");
        img.className = "chatBubbleImg";
        img.src = imgPath;
        img.alt = imgAlt;
        img.onload = () => {
            chatWindow.appendChild(img); // Add the image to the container
            scrollToBottom();
        };
    } 

    document.getElementById(type).remove();
    scrollToBottom();
}

const techRespondBox = document.querySelector("#techRespondBox");
const experienceRespondBox = document.querySelector("#experienceRespondBox")

document.addEventListener('click', function () {
    const isTechPage = document.body.classList.contains("technicalPage");
    const isExpPage = document.body.classList.contains("experiencePage");

    if (isTechPage) {
        checkToAddDialog("tech");
    } else if (isExpPage) {
        checkToAddDialog("exp");
    }
});

/**
 * This is to create a new chat bubble, for when we have exhuasted the number of options
 * @param {*} className 
 * @param {*} text 
 * @returns 
 */
function createChatBubble(className, text) {
    const bubble = document.createElement("p");
    bubble.className = className;
    bubble.textContent = text;
    return bubble;
}

function addNextDialog(type) {
    if (type === "tech") {
        const question = createChatBubble("chatBubbleQuestion", "Do you have any other skills?");
        chatWindow.appendChild(question);

        // response
        const responseText = "Some of my other skills related to software engineering are: Figma, Git, Jira, and Postman. I have graphic design skills in applications like Affinity Photo, Affinity Designer, and Affinity Publisher (equivalents to Adobe software). I also have experience with AutoCAD, Revit, and Rhino.";
        const response = createChatBubble("chatBubbleResponse", responseText);
        chatWindow.appendChild(response);
    } if (type === "exp") {
        const question = createChatBubble("chatBubbleQuestion", "Do you have any other experiences?");
        chatWindow.appendChild(question);

        //response needs to call on createExo
        createExperience("other");
    }
}

/**
 * Funciton to check if all options have been picked, and if it has, add new dialog
 */
function checkToAddDialog(pageType) {
    if (pageType === "tech" && techRespondBox.childElementCount === 0) {
        addNextDialog("tech");
    } else if (pageType === "exp" && experienceRespondBox.childElementCount === 0) {
        addNextDialog("exp");
    }
}


/** Experiences */

// Function to create the role description
function createDescription(descriptionText) {
    const li = document.createElement("li");
    li.className = "description";
    li.textContent = descriptionText;
    return li;
}

// Function to create the experience div dynamically
function createExperienceDiv(company, role, descriptions) {
    const experienceDiv = document.createElement("div");
    experienceDiv.className = "chatBubbleResponse";

    const companyAndRoleDiv = document.createElement("div");
    companyAndRoleDiv.className = "companyAndRole";

    const companyName = document.createElement("h1");
    companyName.className = "company";
    companyName.textContent = company;

    const roleDes = document.createElement("h2");
    roleDes.className = "role";
    roleDes.textContent = role;

    const ul = document.createElement("ul");
    descriptions.forEach(descriptions => {
        ul.appendChild(createDescription(descriptions));
    });

    companyAndRoleDiv.appendChild(companyName);
    companyAndRoleDiv.appendChild(roleDes);

    experienceDiv.appendChild(companyAndRoleDiv);
    experienceDiv.appendChild(ul);

    return experienceDiv;
}

// Function to create the entire tech experience section
function createExperience(type) {
    // const techExperience = document.getElementById("techExperience");

    if (type === "tech") {
        const InfosysDescriptions = [
            "Developed full-stack applications using Java with Spring Boot framework, along with Lombok and JPA dependencies, to create RESTful APIs and integrated them with SQL databases",
            "Collaborated in a small team setting with agile methodology, completing sprints and participating in daily scrum meetings with the team lead to report on progress and plan future work"
        ];

        const RevDescriptions = [
            "Developed full-stack applications using Java with Spring Boot framework, along with Lombok and JPA dependencies, to create RESTful APIs and integrated them with SQL databases",
            "Built a user-friendly front-end interface with Angular and applied CSS styling to enhance the overall user experience",
            "Proficient in creating automated tests for both front-end (Jasmine and Karma) and back-end (JUnit and Mockito) using test-driven development (TDD) principles to ensure the functionality of the code",
            "Have practical experience using Azure cloud services to build, deploy, and maintain web applications",
            "Utilized GitHub as a central repository for the codebase, where team members could share code and collaborate on development tasks",
            "Implemented a CI/CD pipeline using Git actions to automate the build, test, and deployment process of the application, improving the efficiency of the development workflow",
            "Collaborated in a small team setting with agile methodology, completing sprints and participating in daily scrum meetings with the team lead to report on progress and plan future work"
        ];

        const infoExperience = createExperienceDiv("Infosys", "Assosciate Software Engineer", InfosysDescriptions);
        const revExperience = createExperienceDiv("Revature", "Full Stack Software Engineer", RevDescriptions);

        chatWindow.appendChild(infoExperience);
        chatWindow.appendChild(revExperience);

        document.getElementById(type).remove();
        scrollToBottom();

    } if (type === "retail") {
        const arcteryxDes = ["Managed stock room appearance and inventory levels in accordance to store requirements", "Conducted cycle counts in order to maintain accurate stock levels and minimize LP occurrences", "Received incoming product transfers and processed outgoing transfers to other stores and warehouse", "Worked in conjunction with the Store Managers in maintaining up-to-date visual standards and enforcing guidelines set by the VM department", "Greeted and conversed with customers to understand their product needs, answered/resolved any product-related questions, and guided them toward products that best fit their needs", "Educated new customers about ARC’TERYX using product knowledge and personal experience with the brand", "Partnered and worked with supervisors on store visual merchandising by attending calls with the VM team, following through with changes to the sales floor as discussed on the calls, and updated the sales floor in regard to current promotions", "Utilized the CEGID system to identify stock availability and close sales", "Maintained proper standards on the sales floor by ensuring all sizes and colors are represented as well as maintained cleanliness of the sales floor and stockroom"];

        const mujiDes = [
            "Performed store opening operations: balanced cash registers, informed associates of store promotions, daily goals, and messages from upper management as well as created the daily store schedule", "Managed store operations and oversaw part-time associates to ensure optimal performance", "Continued my duties as part-time sales associate as well",
            "Maintained a master list of product descriptions and prices in Excel and updated physical price displays as needed", "Implemented new processes in creating and printing price displays to ensure maximum efficiency", "Assisted customers with product knowledge, responded to customer inquiries, and utilized a POS system to close a sale", "Ensured all products were fully stocked and organized displays based on stock availability", "Assisted management to ensure a smooth store operation: maintain sales floor, office cleanliness, and organization"
        ];

        const arcteryxExperience = createExperienceDiv("Arc'teryx", "Operations Lead + Product Guide", arcteryxDes);
        const mujiExperience = createExperienceDiv("MUJI", "Key Holder + Sales Associate", mujiDes);

        chatWindow.appendChild(arcteryxExperience);
        chatWindow.appendChild(mujiExperience);

        document.getElementById(type).remove();
        scrollToBottom();


    } if (type === "other") {
        const freelanceDes = ["Recolor garments to precisely match client requirements, guaranteeing accurate representation and visual appeal. Utilize advanced photo editing techniques and software tools to achieve desired color variations", "Conceptualized and design captivating collages and images for email marketing campaigns, effectively promoting upcoming products. Incorporating brand elements, product highlights, and compelling graphics", "Actively seek feedback from clients on completed work and promptly make adjustments to meet their expectations. Maintain a client-focused approach to ensure the highest level of satisfaction", "Demonstrate strong time management skills by effectively following tight deadlines. Thrive in a fast-paced environment and deliver high-quality work within designated timeframes"];

        const otjDes = ["Primarily assisted Project Designers with different phases of projects including but not limited to blocking diagrams, testing fits, maintaining client presentation", "Collaborated with designers to source sample materials", "Communicated with vendors to ensure the timely return of sample materials", "Assisted office managers in clerical tasks including but not limited to arranging/ shipping packages, maintaining office cleanliness, and maintaining the materials library"];

        const swimDes = ["Taught children proper swim and water safety techniques", "Trained newly hired instructors with skills needed to teach and improve student techniques", "Created and documented detailed lesson plans for time management and weekly improvements"]

        const freelanceExperience = createExperienceDiv("Freelance", "Digital Content Creator", freelanceDes);
        const otjExperience = createExperienceDiv("OTJ Architects", "Intern", otjDes);
        const swimExperience = createExperienceDiv("United Aquatics", "Digital Senior Swimming Instructor", swimDes);

        chatWindow.appendChild(freelanceExperience);
        chatWindow.appendChild(otjExperience);
        chatWindow.appendChild(swimExperience);

        scrollToBottom();
    }
}







