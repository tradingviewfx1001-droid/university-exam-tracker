/* =========================================================
   UNIVERSITY EXAM TRACKER
   Application Logic
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

const profileScreen =
    document.getElementById("profileScreen");


/* Setup */

const setupForm =
    document.getElementById("setupForm");


/* Dashboard */

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

const profileButton =
    document.getElementById("profileButton");

const dashboardProfilePhoto =
    document.getElementById("dashboardProfilePhoto");

const headerProfilePhoto =
    document.getElementById("headerProfilePhoto");


/* Semester */

const semesterTitle =
    document.getElementById("semesterTitle");

const semesterAverage =
    document.getElementById("semesterAverage");

const subjectList =
    document.getElementById("subjectList");

const backToDashboardButton =
    document.getElementById(
        "backToDashboardButton"
    );

const addSubjectButton =
    document.getElementById(
        "addSubjectButton"
    );


/* Subject */

const cancelSubjectButton =
    document.getElementById(
        "cancelSubjectButton"
    );

const subjectForm =
    document.getElementById(
        "subjectForm"
    );

const subjectFormTitle =
    document.getElementById(
        "subjectFormTitle"
    );

const subjectFormDescription =
    document.getElementById(
        "subjectFormDescription"
    );

const subjectSaveText =
    document.getElementById(
        "subjectSaveText"
    );

const subjectName =
    document.getElementById(
        "subjectName"
    );

const examType =
    document.getElementById(
        "examType"
    );

const examMarks =
    document.getElementById(
        "examMarks"
    );

const marksHint =
    document.getElementById(
        "marksHint"
    );

const totalPreview =
    document.getElementById(
        "totalPreview"
    );

const subjectNotes =
    document.getElementById(
        "subjectNotes"
    );


/* Profile */

const backFromProfileButton =
    document.getElementById(
        "backFromProfileButton"
    );

const profileForm =
    document.getElementById(
        "profileForm"
    );

const profileFirstName =
    document.getElementById(
        "profileFirstName"
    );

const profileLastName =
    document.getElementById(
        "profileLastName"
    );

const profileStudentId =
    document.getElementById(
        "profileStudentId"
    );

const profileFaculty =
    document.getElementById(
        "profileFaculty"
    );

const profileDepartment =
    document.getElementById(
        "profileDepartment"
    );

const profileAcademicYear =
    document.getElementById(
        "profileAcademicYear"
    );

const profileCurrentSemester =
    document.getElementById(
        "profileCurrentSemester"
    );

const profilePhotoInput =
    document.getElementById(
        "profilePhotoInput"
    );

const profilePhotoPreview =
    document.getElementById(
        "profilePhotoPreview"
    );

const removeProfilePhotoButton =
    document.getElementById(
        "removeProfilePhotoButton"
    );


/* =========================================================
   DATA
========================================================= */

let studentProfile =
    JSON.parse(
        localStorage.getItem(
            "studentProfile"
        )
    ) || null;


let subjects =
    JSON.parse(
        localStorage.getItem(
            "subjects"
        )
    ) || [];


let profilePhoto =
    localStorage.getItem(
        "profilePhoto"
    ) || "";


let selectedSemester = null;

let editingSubjectId = null;


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (studentProfile) {

            showDashboard();

        } else {

            showSetup();

        }

    }
);


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function hideAllScreens() {

    setupScreen.classList.add(
        "hidden"
    );

    dashboardScreen.classList.add(
        "hidden"
    );

    semesterScreen.classList.add(
        "hidden"
    );

    subjectScreen.classList.add(
        "hidden"
    );

    profileScreen.classList.add(
        "hidden"
    );

}


function showSetup() {

    hideAllScreens();

    setupScreen.classList.remove(
        "hidden"
    );

}


function showDashboard() {

    hideAllScreens();

    dashboardScreen.classList.remove(
        "hidden"
    );

    loadStudentProfile();

    updateProfilePhotoUI();

    updateOverallAverage();

    createSemesterList();

}


function showSemesterScreen(
    semester
) {

    selectedSemester =
        semester;

    hideAllScreens();

    semesterScreen.classList.remove(
        "hidden"
    );

    semesterTitle.textContent =
        semester;

    updateSemesterPage();

}


function showSubjectScreen(
    subject = null
) {

    hideAllScreens();

    subjectScreen.classList.remove(
        "hidden"
    );


    editingSubjectId =
        subject
            ? subject.id
            : null;


    resetSubjectForm();


    if (subject) {

        subjectFormTitle.textContent =
            "Edit Subject";

        subjectFormDescription.textContent =
            "Update the examination result for this subject.";

        subjectSaveText.textContent =
            "Update Subject";


        subjectName.value =
            subject.name;


        subjectNotes.value =
            subject.notes || "";


        /*
         * IMPORTANT:
         * Load the existing exam marks
         * when editing a subject.
         */
        prepareSubjectEdit(subject);


    } else {

        subjectFormTitle.textContent =
            "Add Subject";

        subjectFormDescription.textContent =
            "Enter the examination result you want to record.";

        subjectSaveText.textContent =
            "Save Subject";

    }

}


function showProfileScreen() {

    hideAllScreens();

    profileScreen.classList.remove(
        "hidden"
    );

    loadProfileForm();

}


/* =========================================================
   SETUP PROFILE
========================================================= */

setupForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        studentProfile = {

            firstName:
                document
                    .getElementById(
                        "firstName"
                    )
                    .value
                    .trim(),

            lastName:
                document
                    .getElementById(
                        "lastName"
                    )
                    .value
                    .trim(),

            studentId:
                document
                    .getElementById(
                        "studentId"
                    )
                    .value
                    .trim(),

            faculty:
                document
                    .getElementById(
                        "faculty"
                    )
                    .value
                    .trim(),

            department:
                document
                    .getElementById(
                        "department"
                    )
                    .value
                    .trim(),

            academicYear:
                document
                    .getElementById(
                        "academicYear"
                    )
                    .value
                    .trim(),

            semester:
                document
                    .getElementById(
                        "currentSemester"
                    )
                    .value

        };


        saveProfile();


        showDashboard();

    }
);


/* =========================================================
   PROFILE DISPLAY
========================================================= */

function loadStudentProfile() {

    if (!studentProfile) {
        return;
    }


    const fullName =
        `${studentProfile.firstName} ${studentProfile.lastName}`;


    studentName.textContent =
        studentProfile.firstName ||
        "Student";


    studentFullName.textContent =
        fullName;


    studentFaculty.textContent =
        studentProfile.faculty ||
        "Faculty";


    studentIdDisplay.textContent =
        studentProfile.studentId ||
        "—";


    currentSemesterDisplay.textContent =
        studentProfile.semester
            ? `Semester ${studentProfile.semester}`
            : "—";

}


function saveProfile() {

    localStorage.setItem(
        "studentProfile",
        JSON.stringify(
            studentProfile
        )
    );

}


/* =========================================================
   PROFILE EDITING
========================================================= */

profileButton.addEventListener(
    "click",
    () => {

        showProfileScreen();

    }
);


function loadProfileForm() {

    if (!studentProfile) {
        return;
    }


    profileFirstName.value =
        studentProfile.firstName || "";


    profileLastName.value =
        studentProfile.lastName || "";


    profileStudentId.value =
        studentProfile.studentId || "";


    profileFaculty.value =
        studentProfile.faculty || "";


    profileDepartment.value =
        studentProfile.department || "";


    profileAcademicYear.value =
        studentProfile.academicYear || "";


    profileCurrentSemester.value =
        studentProfile.semester || "1";


    updateProfilePhotoPreview();

}


profileForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        studentProfile = {

            firstName:
                profileFirstName.value.trim(),

            lastName:
                profileLastName.value.trim(),

            studentId:
                profileStudentId.value.trim(),

            faculty:
                profileFaculty.value.trim(),

            department:
                profileDepartment.value.trim(),

            academicYear:
                profileAcademicYear.value.trim(),

            semester:
                profileCurrentSemester.value

        };


        saveProfile();


        showDashboard();

    }
);


backFromProfileButton.addEventListener(
    "click",
    () => {

        showDashboard();

    }
);


/* =========================================================
   PROFILE PHOTO
========================================================= */

profilePhotoInput.addEventListener(
    "change",
    (event) => {

        const file =
            event.target.files[0];


        if (!file) {
            return;
        }


        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "Please select an image file."
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function () {

                profilePhoto =
                    reader.result;


                localStorage.setItem(
                    "profilePhoto",
                    profilePhoto
                );


                updateProfilePhotoUI();

                updateProfilePhotoPreview();

            };


        reader.readAsDataURL(
            file
        );

    }
);


removeProfilePhotoButton.addEventListener(
    "click",
    () => {

        profilePhoto = "";

        localStorage.removeItem(
            "profilePhoto"
        );


        profilePhotoInput.value =
            "";


        updateProfilePhotoUI();

        updateProfilePhotoPreview();

    }
);


function updateProfilePhotoUI() {

    if (profilePhoto) {

        dashboardProfilePhoto.innerHTML = `
            <img
                src="${profilePhoto}"
                alt="Profile photo"
            >
        `;


        headerProfilePhoto.innerHTML = `
            <img
                src="${profilePhoto}"
                alt="Profile photo"
            >
        `;

    } else {

        dashboardProfilePhoto.textContent =
            "👤";


        headerProfilePhoto.textContent =
            "👤";

    }

}


function updateProfilePhotoPreview() {

    if (profilePhoto) {

        profilePhotoPreview.innerHTML = `
            <img
                src="${profilePhoto}"
                alt="Profile photo"
            >
        `;

    } else {

        profilePhotoPreview.textContent =
            "👤";

    }

}


/* =========================================================
   SEMESTER LIST
========================================================= */

function createSemesterList() {

    semesterProgress.innerHTML =
        "";


    for (
        let i = 1;
        i <= 8;
        i++
    ) {

        const semester =
            `Semester ${i}`;


        const semesterSubjects =
            subjects.filter(
                subject =>
                    subject.semester ===
                    semester
            );


        const average =
            calculateAverage(
                semesterSubjects
            );


        const subjectCount =
            semesterSubjects.length;


        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


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

function calculateAverage(
    subjectArray
) {

    if (
        !subjectArray.length
    ) {

        return 0;

    }


    const total =
        subjectArray.reduce(
            (
                sum,
                subject
            ) => {

                return sum +
                    Number(
                        subject.total || 0
                    );

            },
            0
        );


    return Math.round(
        total /
        subjectArray.length
    );

}


function updateOverallAverage() {

    const average =
        calculateAverage(
            subjects
        );


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

    subjectList.innerHTML =
        "";


    if (
        !semesterSubjects.length
    ) {

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


                    <button
                        type="button"
                        class="subject-edit-button"
                        data-id="${subject.id}"
                    >
                        Edit
                    </button>

                </div>

            `;


            const editButton =
                card.querySelector(
                    ".subject-edit-button"
                );


            editButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();


                    const subjectToEdit =
                        subjects.find(
                            item =>
                                item.id ===
                                subject.id
                        );


                    if (
                        subjectToEdit
                    ) {

                        showSubjectScreen(
                            subjectToEdit
                        );

                    }

                }
            );


            subjectList.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   SUBJECT STATUS
========================================================= */

function getSubjectStatus(
    subject
) {

    const total =
        Number(
            subject.total || 0
        );


    if (
        subject.exam20 !== null &&
        subject.final80 !== null
    ) {

        return total >= 50
            ? "Passed"
            : "Failed";

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

        const type =
            examType.value;


        if (
            type === "20"
        ) {

            examMarks.max =
                "20";


            examMarks.placeholder =
                "Enter marks out of 20";


            marksHint.textContent =
                "Maximum: 20 marks";

        }


        else if (
            type === "80"
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
   SAVE / UPDATE SUBJECT
========================================================= */

subjectForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        if (
            !selectedSemester
        ) {

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


        let subject;


        /*
         * EDIT EXISTING SUBJECT
         */

        if (
            editingSubjectId !== null
        ) {

            subject =
                subjects.find(
                    item =>
                        item.id ===
                        editingSubjectId
                );

        }


        /*
         * IF NOT EDITING, FIND AN EXISTING
         * SUBJECT WITH THE SAME NAME.
         *
         * This allows:
         *
         * Computer Networks
         * → 20% Exam
         *
         * then later:
         *
         * Computer Networks
         * → Final Exam
         */

        if (!subject) {

            subject =
                subjects.find(
                    item =>

                        item.name
                            .toLowerCase() ===
                        name.toLowerCase() &&

                        item.semester ===
                        selectedSemester
                );

        }


        /*
         * CREATE NEW SUBJECT
         */

        if (!subject) {

            subject = {

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
                subject
            );

        }


        /*
         * Keep the latest subject name.
         */

        subject.name =
            name;


        /*
         * Save selected examination.
         */

        if (
            type === "20"
        ) {

            subject.exam20 =
                marks;

        }


        if (
            type === "80"
        ) {

            subject.final80 =
                marks;

        }


        /*
         * Save notes if entered.
         */

        subject.notes =
            subjectNotes.value.trim();


        /*
         * Calculate total.
         *
         * Example:
         *
         * 20% Exam = 16
         * Final = 64
         *
         * Total = 80
         */

        subject.total =
            Number(
                subject.exam20 || 0
            ) +
            Number(
                subject.final80 || 0
            );


        localStorage.setItem(
            "subjects",
            JSON.stringify(
                subjects
            )
        );


        editingSubjectId =
            null;


        showSemesterScreen(
            selectedSemester
        );

    }
);


/* =========================================================
   EDIT SUBJECT — PRELOAD EXAM DATA
========================================================= */

function prepareSubjectEdit(
    subject
) {

    subjectName.value =
        subject.name;


    subjectNotes.value =
        subject.notes || "";


    /*
     * If only the 20% exam exists,
     * preload it.
     */

    if (
        subject.exam20 !== null &&
        subject.final80 === null
    ) {

        examType.value =
            "20";

        examMarks.value =
            subject.exam20;

        updateExamInput();

    }


    /*
     * If only the final exists,
     * preload it.
     */

    else if (
        subject.exam20 === null &&
        subject.final80 !== null
    ) {

        examType.value =
            "80";

        examMarks.value =
            subject.final80;

        updateExamInput();

    }


    /*
     * If both exist, leave the
     * exam selector empty so the
     * user chooses which one to edit.
     */

    else {

        examType.value =
            "";

        examMarks.value =
            "";

        marksHint.textContent =
            "Select the exam you want to edit.";

        totalPreview.textContent =
            `${subject.total || 0} total`;

    }

}


/* =========================================================
   UPDATE EXAM INPUT
========================================================= */

function updateExamInput() {

    const type =
        examType.value;


    if (
        type === "20"
    ) {

        examMarks.max =
            "20";

        examMarks.placeholder =
            "Enter marks out of 20";

        marksHint.textContent =
            "Maximum: 20 marks";

    }


    else if (
        type === "80"
    ) {

        examMarks.max =
            "80";

        examMarks.placeholder =
            "Enter marks out of 80";

        marksHint.textContent =
            "Maximum: 80 marks";

    }


    updateMarksPreview();

}


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

        if (
            selectedSemester
        ) {

            showSemesterScreen(
                selectedSemester
            );

        } else {

            showDashboard();

        }

    }
);


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
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}
