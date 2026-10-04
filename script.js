/* =========================================================
   UNIVERSITY EXAM TRACKER
   Main Application Logic
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const setupScreen =
    document.getElementById("setupScreen");

const dashboardScreen =
    document.getElementById("dashboardScreen");

const semesterScreen =
    document.getElementById("semesterScreen");

const subjectScreen =
    document.getElementById("subjectScreen");


const setupForm =
    document.getElementById("setupForm");

const studentName =
    document.getElementById("studentName");

const studentFullName =
    document.getElementById("studentFullName");

const studentFaculty =
    document.getElementById("studentFaculty");

const studentIdDisplay =
    document.getElementById("studentIdDisplay");

const currentSemesterDisplay =
    document.getElementById("currentSemesterDisplay");


const overallAverage =
    document.getElementById("overallAverage");

const semesterProgress =
    document.getElementById("semesterProgress");


const semesterTitle =
    document.getElementById("semesterTitle");

const semesterAverage =
    document.getElementById("semesterAverage");

const subjectList =
    document.getElementById("subjectList");


const backToDashboardButton =
    document.getElementById("backToDashboardButton");

const addSubjectButton =
    document.getElementById("addSubjectButton");

const cancelSubjectButton =
    document.getElementById("cancelSubjectButton");

const profileButton =
    document.getElementById("profileButton");


const subjectForm =
    document.getElementById("subjectForm");

const subjectName =
    document.getElementById("subjectName");

const examType =
    document.getElementById("examType");

const examMarks =
    document.getElementById("examMarks");

const marksHint =
    document.getElementById("marksHint");

const totalPreview =
    document.getElementById("totalPreview");

const subjectNotes =
    document.getElementById("subjectNotes");



/* =========================================================
   DATA
========================================================= */

let studentProfile =
    JSON.parse(
        localStorage.getItem("studentProfile")
    ) || null;


let subjects =
    JSON.parse(
        localStorage.getItem("subjects")
    ) || [];


let selectedSemester = null;



/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (studentProfile) {

        showDashboard();

    } else {

        showSetup();

    }

});



/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function hideAllScreens() {

    setupScreen.classList.add("hidden");

    dashboardScreen.classList.add("hidden");

    semesterScreen.classList.add("hidden");

    subjectScreen.classList.add("hidden");

}


function showSetup() {

    hideAllScreens();

    setupScreen.classList.remove("hidden");

}


function showDashboard() {

    hideAllScreens();

    dashboardScreen.classList.remove("hidden");

    loadStudentProfile();

    updateOverallAverage();

    createSemesterList();

}


function showSemesterScreen(semester) {

    selectedSemester = semester;

    hideAllScreens();

    semesterScreen.classList.remove("hidden");

    semesterTitle.textContent = semester;

    updateSemesterPage();

}


function showSubjectScreen() {

    hideAllScreens();

    subjectScreen.classList.remove("hidden");

    resetSubjectForm();

}



/* =========================================================
   STUDENT PROFILE
========================================================= */

setupForm.addEventListener("submit", (event) => {

    event.preventDefault();


    studentProfile = {

        firstName:
            document
                .getElementById("firstName")
                .value
                .trim(),

        lastName:
            document
                .getElementById("lastName")
                .value
                .trim(),

        studentId:
            document
                .getElementById("studentId")
                .value
                .trim(),

        faculty:
            document
                .getElementById("faculty")
                .value
                .trim(),

        department:
            document
                .getElementById("department")
                .value
                .trim(),

        academicYear:
            document
                .getElementById("academicYear")
                .value
                .trim(),

        semester:
            document
                .getElementById("currentSemester")
                .value

    };


    localStorage.setItem(
        "studentProfile",
        JSON.stringify(studentProfile)
    );


    showDashboard();

});


function loadStudentProfile() {

    if (!studentProfile) return;


    const fullName =
        `${studentProfile.firstName} ${studentProfile.lastName}`;


    studentName.textContent =
        fullName;


    studentFullName.textContent =
        fullName;


    studentFaculty.textContent =
        studentProfile.faculty || "Faculty";


    studentIdDisplay.textContent =
        studentProfile.studentId || "—";


    currentSemesterDisplay.textContent =
        studentProfile.semester
            ? `Semester ${studentProfile.semester}`
            : "—";

}



/* =========================================================
   SEMESTER LIST
========================================================= */

function createSemesterList() {

    semesterProgress.innerHTML = "";


    for (let i = 1; i <= 8; i++) {

        const semester =
            `Semester ${i}`;


        const semesterSubjects =
            subjects.filter(
                subject =>
                    subject.semester === semester
            );


        const average =
            calculateAverage(
                semesterSubjects
            );


        const subjectCount =
            semesterSubjects.length;


        const button =
            document.createElement("button");


        button.type = "button";

        button.className =
            "semester-item";


        button.innerHTML = `

            <div class="semester-number">
                ${i}
            </div>


            <div class="semester-info">

                <h3>
                    ${semester}
                </h3>

                <p>
                    ${
                        subjectCount === 0
                            ? "No subjects recorded yet"
                            : `${subjectCount} ${
                                subjectCount === 1
                                    ? "subject"
                                    : "subjects"
                              } recorded`
                    }
                </p>

            </div>


            <div class="semester-progress">

                <div class="semester-progress-bar">

                    <div
                        class="semester-progress-fill"
                        style="width: ${average}%"
                    ></div>

                </div>

                <span class="semester-percentage">
                    ${average}%
                </span>

            </div>


            <div class="semester-average">
                ${average}%
            </div>


            <div class="semester-arrow">
                →
            </div>

        `;


        button.addEventListener(
            "click",
            () => {

                showSemesterScreen(
                    semester
                );

            }
        );


        semesterProgress.appendChild(
            button
        );

    }

}



/* =========================================================
   AVERAGES
========================================================= */

function calculateAverage(subjectArray) {

    if (!subjectArray.length) {

        return 0;

    }


    const total =
        subjectArray.reduce(
            (sum, subject) => {

                return sum +
                    Number(
                        subject.total || 0
                    );

            },
            0
        );


    return Math.round(
        total / subjectArray.length
    );

}


function updateOverallAverage() {

    const average =
        calculateAverage(subjects);


    overallAverage.textContent =
        `${average}%`;

}



/* =========================================================
   SEMESTER PAGE
========================================================= */

function updateSemesterPage() {

    const semesterSubjects =
        subjects.filter(
            subject =>
                subject.semester ===
                selectedSemester
        );


    const average =
        calculateAverage(
            semesterSubjects
        );


    semesterAverage.textContent =
        `${average}%`;


    renderSubjects(
        semesterSubjects
    );

}



/* =========================================================
   SUBJECT LIST
========================================================= */

function renderSubjects(
    semesterSubjects
) {

    subjectList.innerHTML = "";


    if (!semesterSubjects.length) {

        subjectList.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    📚
                </div>

                <h3>
                    No subjects yet
                </h3>

                <p>
                    Add your first subject to start
                    tracking this semester.
                </p>

            </div>

        `;

        return;

    }


    semesterSubjects.forEach(
        (subject) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "subject-card";


            const status =
                getSubjectStatus(
                    subject
                );


            card.innerHTML = `

                <div class="subject-info">

                    <div class="subject-icon">
                        📘
                    </div>


                    <div class="subject-details">

                        <h3>
                            ${escapeHTML(
                                subject.name
                            )}
                        </h3>

                        <p>
                            ${getExamDescription(
                                subject
                            )}
                        </p>

                    </div>

                </div>


                <div class="subject-result">

                    <span class="subject-status">
                        ${status}
                    </span>

                    <strong class="subject-score">
                        ${subject.total || 0}
                    </strong>

                </div>

            `;


            subjectList.appendChild(
                card
            );

        }
    );

}



/* =========================================================
   SUBJECT STATUS
========================================================= */

function getSubjectStatus(subject) {

    const total =
        Number(
            subject.total || 0
        );


    if (
        subject.exam20 !== null &&
        subject.final80 !== null
    ) {

        if (total >= 50) {

            return "Passed";

        }

        return "Failed";

    }


    return "In Progress";

}



/* =========================================================
   EXAM DESCRIPTION
========================================================= */

function getExamDescription(
    subject
) {

    if (
        subject.exam20 !== null &&
        subject.final80 !== null
    ) {

        return `
            20% Exam: ${subject.exam20}
            &nbsp; • &nbsp;
            Final Exam: ${subject.final80}
        `;

    }


    if (
        subject.exam20 !== null
    ) {

        return `
            20% Exam: ${subject.exam20}
            &nbsp; • &nbsp;
            Final exam not entered
        `;

    }


    if (
        subject.final80 !== null
    ) {

        return `
            Final Exam: ${subject.final80}
            &nbsp; • &nbsp;
            20% exam not entered
        `;

    }


    return "No marks entered";

}



/* =========================================================
   ADD SUBJECT
========================================================= */

addSubjectButton.addEventListener(
    "click",
    () => {

        showSubjectScreen();

    }
);



/* =========================================================
   EXAM TYPE
========================================================= */

examType.addEventListener(
    "change",
    () => {

        const selected =
            examType.value;


        if (selected === "20") {

            examMarks.max =
                "20";


            examMarks.placeholder =
                "Enter marks out of 20";


            marksHint.textContent =
                "Maximum: 20 marks";

        }


        else if (
            selected === "80"
        ) {

            examMarks.max =
                "80";


            examMarks.placeholder =
                "Enter marks out of 80";


            marksHint.textContent =
                "Maximum: 80 marks";

        }


        else {

            examMarks.removeAttribute(
                "max"
            );


            examMarks.placeholder =
                "Enter your marks";


            marksHint.textContent =
                "Select an exam first";

        }


        updateMarksPreview();

    }
);



/* =========================================================
   MARKS PREVIEW
========================================================= */

examMarks.addEventListener(
    "input",
    updateMarksPreview
);


function updateMarksPreview() {

    const type =
        examType.value;


    const marks =
        Number(
            examMarks.value
        );


    if (
        !type ||
        examMarks.value === ""
    ) {

        totalPreview.textContent =
            "—";

        return;

    }


    const maximum =
        Number(type);


    if (
        marks < 0 ||
        marks > maximum
    ) {

        totalPreview.textContent =
            `Maximum ${maximum}`;

        return;

    }


    totalPreview.textContent =
        `${marks} / ${maximum}`;

}



/* =========================================================
   SAVE SUBJECT
========================================================= */

subjectForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        if (!selectedSemester) {

            return;

        }


        const name =
            subjectName.value.trim();


        const type =
            examType.value;


        const marks =
            Number(
                examMarks.value
            );


        if (!name) {

            alert(
                "Please enter the subject name."
            );

            return;

        }


        if (!type) {

            alert(
                "Please select the exam."
            );

            return;

        }


        const maximum =
            Number(type);


        if (
            Number.isNaN(marks) ||
            marks < 0 ||
            marks > maximum
        ) {

            alert(
                `Please enter a valid mark between 0 and ${maximum}.`
            );

            return;

        }


        let existingSubject =
            subjects.find(
                subject =>
                    subject.name
                        .toLowerCase() ===
                    name.toLowerCase() &&

                    subject.semester ===
                    selectedSemester
            );


        if (!existingSubject) {

            existingSubject = {

                id: Date.now(),

                name: name,

                semester:
                    selectedSemester,

                exam20: null,

                final80: null,

                notes: "",

                total: 0

            };


            subjects.push(
                existingSubject
            );

        }


        if (type === "20") {

            existingSubject.exam20 =
                marks;

        }


        if (type === "80") {

            existingSubject.final80 =
                marks;

        }


        if (
            subjectNotes.value.trim()
        ) {

            existingSubject.notes =
                subjectNotes.value.trim();

        }


        existingSubject.total =
            Number(
                existingSubject.exam20 || 0
            ) +
            Number(
                existingSubject.final80 || 0
            );


        localStorage.setItem(
            "subjects",
            JSON.stringify(
                subjects
            )
        );


        showSemesterScreen(
            selectedSemester
        );

    }
);



/* =========================================================
   BACK BUTTONS
========================================================= */

backToDashboardButton.addEventListener(
    "click",
    () => {

        showDashboard();

    }
);


cancelSubjectButton.addEventListener(
    "click",
    () => {

        if (selectedSemester) {

            showSemesterScreen(
                selectedSemester
            );

        } else {

            showDashboard();

        }

    }
);



/* =========================================================
   PROFILE BUTTON
========================================================= */

profileButton.addEventListener(
    "click",
    () => {

        if (!studentProfile) {

            showSetup();

            return;

        }


        showProfileSummary();

    }
);


function showProfileSummary() {

    const name =
        `${studentProfile.firstName} ${studentProfile.lastName}`;


    const message =

        `Student Profile\n\n` +

        `Name: ${name}\n` +

        `Student ID: ${
            studentProfile.studentId
        }\n` +

        `Faculty: ${
            studentProfile.faculty
        }\n` +

        `Department: ${
            studentProfile.department
        }\n` +

        `Academic Year: ${
            studentProfile.academicYear
        }\n` +

        `Current Semester: ${
            studentProfile.semester
        }`;


    alert(message);

}



/* =========================================================
   RESET SUBJECT FORM
========================================================= */

function resetSubjectForm() {

    subjectForm.reset();


    examMarks.removeAttribute(
        "max"
    );


    examMarks.placeholder =
        "Enter your marks";


    marksHint.textContent =
        "Select an exam first";


    totalPreview.textContent =
        "—";

}



/* =========================================================
   HTML SAFETY
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}
