/* =================================
   University Exam Tracker
   Application Logic
================================= */


// =================================
// Elements
// =================================

const studentForm = document.getElementById("studentForm");

const setupScreen = document.getElementById("setupScreen");
const dashboardScreen = document.getElementById("dashboardScreen");

const studentName = document.getElementById("studentName");
const dashboardFaculty = document.getElementById("dashboardFaculty");
const dashboardId = document.getElementById("dashboardId");
const dashboardSemester = document.getElementById("dashboardSemester");

const semesterProgress = document.getElementById("semesterProgress");

const overallAverage = document.getElementById("overallAverage");
const subjectCount = document.getElementById("subjectCount");
const passedCount = document.getElementById("passedCount");
const failedCount = document.getElementById("failedCount");
const subjectScreen =
    document.getElementById("subjectScreen");

const subjectForm =
    document.getElementById("subjectForm");

const addSubjectButton =
    document.getElementById("addSubjectButton");

const cancelSubjectButton =
    document.getElementById("cancelSubjectButton");

const exam20Input =
    document.getElementById("exam20");

const final80Input =
    document.getElementById("final80");

const totalPreview =
    document.getElementById("totalPreview");

const statusPreview =
    document.getElementById("statusPreview");


// =================================
// Application Data
// =================================

let studentProfile = JSON.parse(
    localStorage.getItem("studentProfile")
) || null;


let subjects = JSON.parse(
    localStorage.getItem("subjects")
) || [];


// =================================
// Start Application
// =================================

document.addEventListener("DOMContentLoaded", () => {

    if (studentProfile) {

        showDashboard();

    } else {

        showSetup();

    }

});


// =================================
// Setup Screen
// =================================

function showSetup() {

    setupScreen.classList.remove("hidden");

    dashboardScreen.classList.add("hidden");

}


// =================================
// Dashboard
// =================================

function showDashboard() {

    setupScreen.classList.add("hidden");

    dashboardScreen.classList.remove("hidden");

    loadStudentProfile();

    updateStatistics();

    createSemesterProgress();

}


// =================================
// Save Student Profile
// =================================

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();


    studentProfile = {

        firstName:
            document.getElementById("firstName").value.trim(),

        lastName:
            document.getElementById("lastName").value.trim(),

        studentId:
            document.getElementById("studentId").value.trim(),

        faculty:
            document.getElementById("faculty").value.trim(),

        department:
            document.getElementById("department").value.trim(),

        academicYear:
            document.getElementById("academicYear").value.trim(),

        semester:
            document.getElementById("semester").value

    };


    // Save profile to device

    localStorage.setItem(
        "studentProfile",
        JSON.stringify(studentProfile)
    );


    showDashboard();

});


// =================================
// Load Student Profile
// =================================

function loadStudentProfile() {

    if (!studentProfile) return;


    studentName.textContent =
        `${studentProfile.firstName} ${studentProfile.lastName}`;


    dashboardFaculty.textContent =
        studentProfile.faculty;


    dashboardId.textContent =
        studentProfile.studentId;


    dashboardSemester.textContent =
        studentProfile.semester;

}


// =================================
// Statistics
// =================================

function updateStatistics() {

    subjectCount.textContent =
        subjects.length;


    let passed = 0;

    let failed = 0;

    let totalMarks = 0;


    subjects.forEach(subject => {

        const total =
            Number(subject.exam20 || 0) +
            Number(subject.final80 || 0);


        totalMarks += total;


        if (total >= 50) {

            passed++;

        } else {

            failed++;

        }

    });


    passedCount.textContent =
        passed;


    failedCount.textContent =
        failed;


    if (subjects.length > 0) {

        const average =
            totalMarks / subjects.length;

        overallAverage.textContent =
            average.toFixed(1);

    } else {

        overallAverage.textContent =
            "0";

    }

}


// =================================
// Semester Progress
// =================================

function createSemesterProgress() {

    semesterProgress.innerHTML = "";


    for (let i = 1; i <= 8; i++) {

        const semesterName =
            `Semester ${i}`;


        const semesterSubjects =
            subjects.filter(
                subject =>
                    subject.semester === semesterName
            );


        let average = 0;


        if (semesterSubjects.length > 0) {

            let total = 0;


            semesterSubjects.forEach(subject => {

                total +=
                    Number(subject.exam20 || 0) +
                    Number(subject.final80 || 0);

            });


            average =
                total / semesterSubjects.length;

        }


        const item =
            document.createElement("div");

        item.className =
            "semester-item";


        item.innerHTML = `

            <div class="semester-top">

                <span class="semester-name">
                    ${semesterName}
                </span>

                <span class="semester-average">
                    ${
                        semesterSubjects.length > 0
                            ? average.toFixed(1) + " / 100"
                            : "No marks yet"
                    }
                </span>

            </div>

            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width: ${average}%">
                </div>

            </div>

        `;


        semesterProgress.appendChild(item);

    }

}
// =================================
// Subject Screen
// =================================

function showSubjectScreen() {

    setupScreen.classList.add("hidden");

    dashboardScreen.classList.add("hidden");

    subjectScreen.classList.remove("hidden");

}


function hideSubjectScreen() {

    subjectScreen.classList.add("hidden");

    dashboardScreen.classList.remove("hidden");

}
// =================================
// Open / Close Subject Form
// =================================

addSubjectButton.addEventListener("click", () => {

    subjectForm.reset();

    totalPreview.textContent =
        "0 / 100";

    statusPreview.textContent =
        "Enter your marks";

    statusPreview.className =
        "status-preview";

    showSubjectScreen();

});


cancelSubjectButton.addEventListener("click", () => {

    hideSubjectScreen();

});
// =================================
// Calculate Total Marks
// =================================

function calculateTotal() {

    const exam20 =
        Number(exam20Input.value) || 0;

    const final80 =
        Number(final80Input.value) || 0;

    const total =
        exam20 + final80;


    totalPreview.textContent =
        `${total} / 100`;


    if (
        exam20Input.value === "" &&
        final80Input.value === ""
    ) {

        statusPreview.textContent =
            "Enter your marks";

        statusPreview.className =
            "status-preview";

        return;

    }


    if (total >= 50) {

        statusPreview.textContent =
            "✓ PASS";

        statusPreview.className =
            "status-preview pass";

    } else {

        statusPreview.textContent =
            "✕ FAIL";

        statusPreview.className =
            "status-preview fail";

    }

}


exam20Input.addEventListener(
    "input",
    calculateTotal
);


final80Input.addEventListener(
    "input",
    calculateTotal
);
// =================================
// Save Subject
// =================================

subjectForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const subject = {

            id: Date.now(),

            name:
                document
                    .getElementById("subjectName")
                    .value
                    .trim(),

            semester:
                document
                    .getElementById("subjectSemester")
                    .value,

            exam20:
                Number(exam20Input.value),

            final80:
                Number(final80Input.value),

            notes:
                document
                    .getElementById("subjectNotes")
                    .value
                    .trim()

        };


        subjects.push(subject);


        // Save to device

        localStorage.setItem(
            "subjects",
            JSON.stringify(subjects)
        );


        // Update dashboard

        updateStatistics();

        createSemesterProgress();


        // Return to dashboard

        hideSubjectScreen();


        // Reset form

        subjectForm.reset();

    }
);

