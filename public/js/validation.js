function formSubmit(event) {
    try {
        let firstName = document.getElementById('first_name').value.trim();
        let lastName = document.getElementById('last_name').value.trim();
        let jobTitle = document.getElementById('job_title').value.trim();
        let company = document.getElementById('company').value.trim();
        let email = document.getElementById('email').value.trim();
        let emailIsDefinitelyInvalid = false;
        if (email){
            emailIsDefinitelyInvalid = !email.includes("@");
        }
        let source = document.getElementById('source').value != "Please select";
        let sourceOther = (document.getElementById('source').value != 'Other') || (document.getElementById('source').value == 'Other' && document.getElementById('source_other').value.trim());
        let selectedFormat = (!document.getElementById('mailing_list').checked) || (document.getElementById('mailing_list').checked && document.querySelector('#email-formats > input:checked'));
        let errorElement = document.getElementById('err');
        let validationConditions = [firstName, lastName, jobTitle, company, email, !emailIsDefinitelyInvalid, source, sourceOther, selectedFormat];
        let errorMessages = ["Please enter your first name.", "Please enter your last name.", "Please enter your job title.", "Please enter your company name.", "Please enter an email address.", "Please enter a valid email address.", "Please select how we met.", "Please be more specific with how we met.", "Please select an email format."];
        errorElement.innerHTML = "";
        for (let i = 0; i < validationConditions.length; i++) {
            console.log(validationConditions[i]);
            if (!validationConditions[i]) {
                event.preventDefault();
                errorElement.innerHTML += errorMessages[i] + "<br>";
            }
        }
    } catch (err) {
        console.log(err);
        event.preventDefault();
    }
}

document.getElementById('form-body').addEventListener("submit", formSubmit);
